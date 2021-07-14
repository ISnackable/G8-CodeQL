console.log("------------------------------------");
console.log("middlewares > index.js");
console.log("------------------------------------");
// ------------------------------------------------------
// load modules
// ------------------------------------------------------
const fs = require("fs");
const path = require("path");
const jsonMap = require("json-source-map");
const multer = require("multer");
const { hashElement } = require("folder-hash");
const neo4j = require("neo4j-driver");
const projectDB = require("../models/projects.js");
const config = require("../config");
const codeQL = require("../helpers/codeQL")
const { Reset, FgGreen } = require("../constants");

// ------------------------------------------------------
// Multer config
// ------------------------------------------------------
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let filePath = path.posix.normalize(file.originalname);
    let { dir, name } = path.parse(filePath);

    // This is to set the project name in the database. It will take the first file as the project name
    if (!req.projectName) {
      req.projectName = dir ? dir.split("/")[1] : name;
    }

    // Setting the destination to a temporary location first, so can check whether hash is same
    let newDestination = `uploads/temporaryMulterUpload/${dir}`;
    let stat = null;
    try {
      // This is to check if the destination exists
      stat = fs.statSync(newDestination);
    } catch (err) {
      // Create the directory if it does not exist
      fs.mkdirSync(newDestination, { recursive: true });
    }
    if (stat && !stat.isDirectory()) {
      console.error(
        `Directory cannot be created because an inode of a different type exists at "${newDestination}"`
      );
    }

    return cb(null, newDestination);
  },
  filename: function (req, file, callback) {
    let { name, ext } = path.parse(file.originalname);
    callback(null, `${name}${ext}`);
  },
});

function fileFilter(req, file, cb) {
  // https://nodejs.org/zh-cn/knowledge/file-system/security/introduction/
  let rootDirectory = "/usr/src/app/";
  var filename = file.originalname.split(path.sep).join(path.posix.sep);
  let filePath = path.posix.join(rootDirectory, filename);

  if (filename.indexOf("\0") !== -1) {
    req.fileValidationError = "path contains a illegal null byte character";
    return cb(new Error("path contains a illegal null byte character"), false);
  } else if (!/^[ /\w.()-/]+$/.test(filename)) {
    // maybe it's better to check file name instead of the entire file path
    req.fileValidationError = "filepath contains illegal character";
    return cb(new Error("filename contains illegal character"), false);
  } else if (filePath.indexOf(rootDirectory) !== 0) {
    req.fileValidationError = "trying to sneak out of the web root?";
    return cb(new Error("trying to sneak out of the web root?"), false);
  }

  return cb(null, true);
}

// ------------------------------------------------------
//  middleware functions
// ------------------------------------------------------

exports.multer = multer({
  storage: storage,
  fileFilter: fileFilter,
  preservePath: true,
  limits: {
    files: 100,
  },
});

// This is a middleware to check whether the multer upload is already uploaded before
exports.checkDuplicateProject = (req, res, next) => {
  console.log(FgGreen, `middlewares.checkDuplicateProject()`, Reset);

  let projectName = req.projectName;

  const options = {
    algo: "sha1",
    encoding: "hex",
    folders: { ignoreRootName: true, exclude: ["node_modules"] },
  };

  // Hashing the temporaryMulterUpload folder using SHA1 hex, and getting the hash result
  hashElement(`./uploads/temporaryMulterUpload`, options).then((hash) => {
    //--Insert code to check duplicate
    console.log(hash.hash);
    // Compare the hash result in the database
    projectDB.getProjectHash(hash.hash, function (err, result) {
      if (err) {
        res.status(500).send({ message: "Internal Server Error" });
      } else {
        if (result) {
          // results === true, hash exists in the database, remove the temporary multer upload directory
          try {
            //Deletes temporary folder
            fs.rmSync(`./uploads/temporaryMulterUpload`, {
              recursive: true,
            });
            console.log(`./uploads/temporaryMulterUpload is deleted!`);
            console.log("Database already exist, sending response back to frontend.");
          } catch (err) {
            console.error(
              `Error while deleting ./uploads/temporaryMulterUpload.`
            );
          }
          res.status(409).send({ message: "Project already exist on server." });
        } else {
          // results === false, project does not exist in database, rename the temporay multer upload into database${id}
          var data = {
            projectName: projectName,
            hash: hash.hash,
          };

          // add the project into the database
          projectDB.addProject(data, function (err3, results) {
            if (err3) {
              res.status(500).send({ message: "Server error." });
            } else {
              // rename the temporay multer upload into database${id} in the uploads folder
              fs.rename("./uploads/temporaryMulterUpload", "./uploads/" + results.insertId, function (err2) {
                if (err2) {
                  console.log(
                    "Error renaming temporaryMulterUpload to its projectId."
                  );
                  projectDB.removeProject(
                    results.insertId,
                    (err4, results1) => {
                      res.status(500).send({ message: "Server error." });
                    }
                  );
                } else {
                  console.log(results);
                  res.status(201).send({
                    message: "Success. File loaded onto backend",
                    projectID: results.insertId,
                  });
                }
              });
            }
          });
        }
      }
    });
  });
};

// Create Database
exports.createCodeQLDatabase = (req, res, next) => {
  console.log(FgGreen, `middlewares.createCodeQLDatabase()`, Reset);

  const id = req.params.id;
  // When creating a codeql database, insert "processing" to "sarif_filename" column
  projectDB.insertProcessing(id, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Something went wrong! Server side.");
    }
  });

  // Command to create a database
  // Let the database finish creating or db-javascript will be missing.
  codeQL.createDatabase(`./databases/database${id}`, `./uploads/${id}`, "javascript", (code, output) => {
    // error
    if (code) {
      // If error, insert "error" to "sarif_filename" column
      projectDB.insertSarifFilenameError(id, (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).send("Something went wrong! Server side.");
        }
      });

      console.error(`stderr: ${output}`);
      if (output.includes("Invalid source root")) {
        return res.status(400).send({ message: "Database does not exists" });
      } else if (output.includes("exists and is not an empty directory")) {
        return res.status(409).send({ message: "Database already exists" });
      }

      // in stdout
      if (output.includes("No JavaScript or TypeScript code found")) {
        return res.status(400).send({ message: "No JavaScript code found" });
      }

      return res.status(500).send({ message: "Internal Server Error" });
    }

    next();
  });
};

// Create Neo4j
exports.createNeo4J = (req, res) => {
  console.log(FgGreen, `middlewares.createNeo4J()`, Reset);

  const id = req.params.id;
  const SarifExist = `./SarifFiles/${id}.sarif`;

  fs.access(SarifExist, fs.F_OK, (err) => {
    if (err) {
      console.error(err);
      return;
    } else {
      console.log(`Creating Neo4J on ${SarifExist}`);

      var file = fs.readFileSync(SarifExist, "utf8");
      var testSarifJson = jsonMap.parse(file).data;
      // console.log(testSarifJson.runs);
      var results = testSarifJson.runs[0].results;
      var driverRules = testSarifJson.runs[0].tool.driver.rules;

      if (!results.length || !driverRules.length) return;
      // https://betterprogramming.pub/which-is-the-fastest-while-for-foreach-for-of-9022902be15e

      // Global variables
      var qNameArr = new Array();
      var RuleIDArr = new Array();
      var FileName = new Array();
      var ResultArr = new Array();

      var queries = new Array();
      var _loop_1 = function (result) {
        var index = driverRules.findIndex(function (x) {
          return x.id === result.ruleId;
        });
        if (!queries.includes(result.ruleId)) {
          queries.push(result.ruleId);
        }
        FileName.push(
          result.locations[0].physicalLocation.artifactLocation.uri
        );

        // RuleID, Query Name
        RuleIDArr.push([result.ruleId, driverRules[index].properties.name]);

        // Query Name
        qNameArr.push(driverRules[index].properties.name);
        ResultArr.push(result);
      };
      for (var _i = 0, results_1 = results; _i < results_1.length; _i++) {
        var result = results_1[_i];
        _loop_1(result);
      }

      // Replaces " " and "-" with "_" in each array element
      for (i = 0; i < qNameArr.length; i++) {
        qNameArr[i] = qNameArr[i].replace(/ /g, "_");
        qNameArr[i] = qNameArr[i].replace(/-/g, "_");
      }

      // 0 = Filename
      // 1 = RuleID
      for (i = 0; i < RuleIDArr.length; i++) {
        RuleIDArr[i][0] = RuleIDArr[i][0].replace(/ /g, "_");
        RuleIDArr[i][0] = RuleIDArr[i][0].replace(/-/g, "_");
        RuleIDArr[i][1] = RuleIDArr[i][1].replace(/ /g, "_");
        RuleIDArr[i][1] = RuleIDArr[i][1].replace(/-/g, "_");
      }

      var CreateQuery = "";
      var NoDupeQuery = Array.from(new Set(qNameArr));
      for (a = 1; a <= NoDupeQuery.length; a++) {
        CreateQuery += `CREATE (Q${a}:Query {Query:"${NoDupeQuery[a - 1]
          }", ProjectID:"${id}"})\n`;
      }

      var CFCounter = 1;
      var NoDupeFile = Array.from(new Set(FileName));
      // 0 = Filename
      // 1 = RuleID
      // For loop to loop through each different file available
      // Create File
      for (i = 0; i < NoDupeFile.length; i++) {
        CreateQuery += `\nCREATE (F${i + 1}:File {File:"${NoDupeFile[i]
          }", ProjectID:"${id}"})\n`;

        // Checks if current file name is related to the query by comparing rule id
        // Loops through all alerts
        // Create Alert
        for (b = 0; b < ResultArr.length; b++) {
          // If FileName == NoDupeFile
          if (
            ResultArr[b].locations[0].physicalLocation.artifactLocation.uri ==
            NoDupeFile[i]
          ) {
            ResultArr[b].message.text = ResultArr[b].message.text.replace(
              /[\"]/g,
              "'"
            );
            CreateQuery += `CREATE (A${b + 1}:Alert {FileName:'${NoDupeFile[i]
              }', RuleID:'${ResultArr[b].ruleId}', Message_Text:"${ResultArr[b].message.text
              }", FileLocation:'${ResultArr[b].locations[0].physicalLocation.artifactLocation.uri
              }', StartEndLine:'${JSON.stringify(
                ResultArr[b].locations[0].physicalLocation.region
              )}', ProjectID:"${id}"})\n`;

            // Loops through all queries
            // Create Child
            for (c = 0; c < NoDupeQuery.length; c++) {
              // RuleID is paired with QueryName to create a child
              // CREATE (t)-[:CHILD]->(parent)
              if (RuleIDArr[b][1] == NoDupeQuery[c]) {
                CreateQuery += `CREATE (A${b + 1
                  })-[:Child {ProjectID:"${id}"}]->(F${i + 1})\n`;
                CreateQuery += `CREATE (A${b + 1
                  })-[:Child {ProjectID:"${id}"}]->(Q${c + 1})\n`;
              }
            } // End of Create Child

            if (ResultArr[b].hasOwnProperty("codeFlows")) {
              var CodeFlowLen = ResultArr[b].codeFlows.length - 1;

              // Loops through all Code Flow arrays
              // Create Code Flow
              for (
                z = 0;
                z <
                ResultArr[b].codeFlows[CodeFlowLen].threadFlows[0].locations
                  .length;
                z++
              ) {
                // Code Flow Message Text
                var CFMsg =
                  ResultArr[b].codeFlows[CodeFlowLen].threadFlows[0].locations[
                    z
                  ].location.message.text;

                // Code Flow Context Region
                var CFStartEnd =
                  "StartLine: " +
                  ResultArr[b].codeFlows[CodeFlowLen].threadFlows[0].locations[
                    z
                  ].location.physicalLocation?.contextRegion?.startLine +
                  ", EndLine: " +
                  ResultArr[b].codeFlows[CodeFlowLen].threadFlows[0].locations[
                    z
                  ].location.physicalLocation?.contextRegion?.endLine;

                // Replaces " with ' to avoid conflicts/errors
                CFMsg = CFMsg.replace(/[\"]/g, "'");
                CreateQuery += `CREATE (CF${CFCounter}:CodeFlows {Message:"${CFMsg}", StartEndLine:'${CFStartEnd}', ProjectID:"${id}"})\n`;
                // Create Code Flow Childs
                if (z == 0) {
                  // Checks if in a new loop (Creating code flows for another Alert)
                  // Creates Child for current Alert it is looping on
                  CreateQuery += `CREATE (CF${CFCounter})-[:Child {ProjectID:"${id}"}]->(A${b + 1
                    })\n`;
                } else {
                  CreateQuery += `CREATE (CF${CFCounter - 1
                    })-[:Child {ProjectID:"${id}"}]->(CF${CFCounter})\n`;
                }
                CFCounter++;
              }
            }
          } // End of Create Alert If Loop
        } // End of Create Alert For Loop
      } // End of Create File Loop

      const driver = neo4j.driver(
        `bolt://${config.neo_host}:7687`,
        neo4j.auth.basic("neo4j", "s3cr3t"),
        {
          /* encrypted: 'ENCRYPTION_OFF' */
        }
      );
      const deleteQuery = `
        MATCH (n)
        DETACH DELETE n`;
      const query =
        CreateQuery +
        `WITH 1 as dummy
        Match (n)-[r]->(m)
        WHERE n.ProjectID = "${id}" AND r.ProjectID = "${id}" AND m.ProjectID = "${id}"
        Return n,r,m`;

      const session = driver.session({ database: "neo4j" });

      session
        .run(deleteQuery)
        .then(() => session.run(query))
        .then((result) => {
          result.records.forEach((record) => {
            console.log(record.get("n"));
            console.log(record.get("r"));
            console.log(record.get("m"));
          });
          session.close();
          driver.close();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  });
};

// This is a middleware for the id params validation. Id has to be a decimal number
exports.idValidation = (req, res, next) => {
  console.log(FgGreen, `middlewares.idValidation()`, Reset);

  const id = req.params.id;

  // Note: use of !NaN(0x10) or !NaN(1e1) === true
  // Thus, use of regex to make sure id is only decimal, and not numbers like 0x10, 1e1.
  if (/^\d+$/.test(id)) {
    return next();
  } else {
    return res.status(400).send({ message: "Please enter a numeric id" });
  }
};

// This is a middleware to check whether a project is already being processed using the params id
exports.checkProcessing = (req, res, next) => {
  console.log(FgGreen, `middlewares.checkProcessing()`, Reset);

  console.log("checkProcessing Status");
  const id = req.params.id;
  projectDB.getProjectId(id, function (err, result) {
    if (!err) {
      console.log(result.sarif_filename);
      if (result.sarif_filename == "processing") {
        var output = {
          error:
            "Still processing a project. Please wait for current project to successfully analyze.",
        };
        return res.status(503).send(output);
      }
      return next();
    } else {
      var output = {
        error: "Unable to get all the existing project information",
      };
      return res.status(500).send(output);
    }
  });
};
