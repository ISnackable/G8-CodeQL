console.log("------------------------------------");
console.log("middlewares > index.js");
console.log("------------------------------------");
// ------------------------------------------------------
// load modules
// ------------------------------------------------------
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const { execFile } = require("child_process");
const { hashElement } = require("folder-hash");
const neo4j = require("neo4j-driver");
const projectDB = require("../models/projects.js");

// ------------------------------------------------------
// Multer config
// ------------------------------------------------------
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let filePath = path.posix.normalize(file.originalname);
    let { dir, name } = path.parse(filePath);

    if (!req.projectName) {
      req.projectName = dir ? dir.split("/")[1] : name;
    }

    let newDestination = `uploads/temporaryMulterUpload/${dir}`;
    let stat = null;
    try {
      stat = fs.statSync(newDestination);
    } catch (err) {
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

exports.checkDuplicateProject = (req, res, next) => {
  let projectName = req.projectName;

  const options = {
    algo: "sha1",
    encoding: "hex",
    folders: { ignoreRootName: true, exclude: ["node_modules"] },
  };

  hashElement(`./uploads/temporaryMulterUpload`, options).then((hash) => {
    //--Insert code to check duplicate
    console.log(hash.hash);
    projectDB.getProjectHash(hash.hash, function (err, result) {
      if (err) {
        res.status(500).send({ message: "Internal Server Error" });
      } else {
        if (result) {
          try {
            //Deletes temporary folder
            fs.rmdirSync(`./uploads/temporaryMulterUpload`, {
              recursive: true,
            });
            console.log(`./uploads/temporaryMulterUpload is deleted!`);
            console.log(
              "Database already exist, sending response back to frontend."
            );
          } catch (err) {
            console.error(
              `Error while deleting ./uploads/temporaryMulterUpload.`
            );
          }
          res.status(409).send({ message: "Project already exist on server." });
        } else {
          var data = {
            projectName: projectName,
            hash: hash.hash,
          };

          projectDB.addProject(data, function (err3, results) {
            if (err3) {
              res.status(500).send({ message: "Server error." });
            } else {
              fs.rename(
                "./uploads/temporaryMulterUpload",
                "./uploads/" + results.insertId,
                function (err2) {
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
                }
              );
            }
          });
        }
      }
    });
  });
};

// Create Database
exports.createCodeQLDatabase = (req, res, next) => {
  const id = req.params.id;
  projectDB.insertProcessing(id, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Something went wrong! Server side.");
      return;
    }
  });

  const args = [
    "database", // first argv
    "create", // second argv
    `./databases/database${id}`, // database name to be created
    `--source-root=./uploads/${id}`, // source code folder
    "--language=javascript", // programming language
  ];

  // Command to create a database
  // Let the database finish creating or db-javascript will be missing.
  var child = execFile("codeql", args, (error, stdout, stderr) => {
    if (error) {
      projectDB.insertSarifFilenameError(id, (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send("Something went wrong! Server side.");
          return;
        }
      });
      console.error(error);
      console.error(`stderr: ${stderr}`);
      if (stderr.includes("Invalid source root")) {
        return res.status(400).send({ message: "Database does not exists" });
      } else if (stderr.includes("exists and is not an empty directory")) {
        return res.status(409).send({ message: "Database already exists" });
      }

      // in stdout
      if (stdout.includes("No JavaScript or TypeScript code found")) {
        return res.status(400).send({ message: "No JavaScript code found" });
      }
      // console.error("stderr", stderr);
      return res.status(500).send({ message: "Internal Server Error" });
    }

    console.log(stdout);
    next();
    // res.status(204).send("Database updated with new hash.");
  });
  // for debugging purposes only
  child.stdout.on("data", function (data) {
    console.log("[STDOUT]: ", data.toString());
  });
  child.stderr.on("data", function (data) {
    console.log("[STDERR]: ", data.toString());
  });
};

// Create Neo4j
exports.createNeo4J = (req, res) => {
  const id = req.params.id;
  const SarifExist = `./SarifFiles/${id}.sarif`;

  fs.access(SarifExist, fs.F_OK, (err) => {
    if (err) {
      console.error(err);
      res.status(422).send("The sarif file does not exist.");
      return;
    } else {
      console.log(`Creating Neo4J on ${SarifExist}`);

      exports.__esModule = true;
      var jsonMap = require("json-source-map");
      var fs = require("fs");

      var file = fs.readFileSync(SarifExist, "utf8");

      var testSarifJson = jsonMap.parse(file).data;
      // console.log(testSarifJson.runs);
      var results = testSarifJson.runs[0].results;
      var driverRules = testSarifJson.runs[0].tool.driver.rules;
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
        CreateQuery += `CREATE (Q${a}:Query {Query:"${
          NoDupeQuery[a - 1]
        }", ProjectID:"${id}"})\n`;
      }

      var CFCounter = 1;
      var NoDupeFile = Array.from(new Set(FileName));
      // 0 = Filename
      // 1 = RuleID
      // For loop to loop through each different file available
      // Create File
      for (i = 0; i < NoDupeFile.length; i++) {
        CreateQuery += `\nCREATE (F${i + 1}:File {File:"${
          NoDupeFile[i]
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
            CreateQuery += `CREATE (A${b + 1}:Alert {FileName:'${
              NoDupeFile[i]
            }', RuleID:'${ResultArr[b].ruleId}', Message_Text:"${
              ResultArr[b].message.text
            }", FileLocation:'${
              ResultArr[b].locations[0].physicalLocation.artifactLocation.uri
            }', StartEndLine:'${JSON.stringify(
              ResultArr[b].locations[0].physicalLocation.region
            )}', ProjectID:"${id}"})\n`;

            // Loops through all queries
            // Create Child
            for (c = 0; c < NoDupeQuery.length; c++) {
              // RuleID is paired with QueryName to create a child
              // CREATE (t)-[:CHILD]->(parent)
              if (RuleIDArr[b][1] == NoDupeQuery[c]) {
                CreateQuery += `CREATE (A${
                  b + 1
                })-[:Child {ProjectID:"${id}"}]->(F${i + 1})\n`;
                CreateQuery += `CREATE (A${
                  b + 1
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
                  ].location.physicalLocation.contextRegion.startLine +
                  ", EndLine: " +
                  ResultArr[b].codeFlows[CodeFlowLen].threadFlows[0].locations[
                    z
                  ].location.physicalLocation.contextRegion.endLine;

                // Replaces " with ' to avoid conflicts/errors
                CFMsg = CFMsg.replace(/[\"]/g, "'");
                CreateQuery += `CREATE (CF${CFCounter}:CodeFlows {Message:"${CFMsg}", StartEndLine:'${CFStartEnd}', ProjectID:"${id}"})\n`;
                // Create Code Flow Childs
                if (z == 0) {
                  // Checks if in a new loop (Creating code flows for another Alert)
                  // Creates Child for current Alert it is looping on
                  CreateQuery += `CREATE (CF${CFCounter})-[:Child {ProjectID:"${id}"}]->(A${
                    b + 1
                  })\n`;
                } else {
                  CreateQuery += `CREATE (CF${
                    CFCounter - 1
                  })-[:Child {ProjectID:"${id}"}]->(CF${CFCounter})\n`;
                }
                CFCounter++;
              }
            }
          } // End of Create Alert If Loop
        } // End of Create Alert For Loop
      } // End of Create File Loop

      // TODO: replace localhost with neo
      const driver = neo4j.driver(
        "bolt://localhost:7687",
        neo4j.auth.basic("neo4j", "s3cr3t"),
        {
          /* encrypted: 'ENCRYPTION_OFF' */
        }
      );

      const query =
        CreateQuery +
        `WITH 1 as dummy
        Match (n)-[r]->(m)
        WHERE n.ProjectID = "${id}" AND r.ProjectID = "${id}" AND m.ProjectID = "${id}"
        Return n,r,m`;

      const session = driver.session({ database: "neo4j" });

      session
        .run(query)
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

exports.showAllInProjectNeo4J = (req, res) => {
  const driver = neo4j.driver(
    "bolt://localhost:7687",
    neo4j.auth.basic("neo4j", "s3cr3t"),
    {
      /* encrypted: 'ENCRYPTION_OFF' */
    }
  );
  const id = req.params.id;
  const query = `WITH 1 as dummy
  Match (n)-[r]->(m)
  WHERE n.ProjectID = "${id}" AND r.ProjectID = "${id}" AND m.ProjectID = "${id}"
  Return n,r,m`;
  var nodes = [];
  var edges = [];
  const session = driver.session({ database: "neo4j" });
  session
    .run(query)
    .then((result) => {
      var build_node = (identity, labels, group, title) => {
        return { id: identity, label: labels, title: title, group: group };
      };
      var build_edge = (start, end) => {
        return { from: start, to: end,length:100 };
      };
      var get_label = (node) => {
        if (node.labels[0] == "CodeFlows") {
          return node.properties.Message;
        } else if (node.labels[0] == "Alert") {
          return node.properties.Message_Text;
        } else if (node.labels[0] == "Query") {
          return node.properties.Query;
        } else if (node.labels[0] == "File") {
          return node.properties.File;
        } else {
          return undefined;
        }
      };

      // function not used
      // var check_duplicate_id = (node) => {
      //   nodes.forEach((single_node) => {
      //     if (single_node.id == node.identity.low) {
      //       return true;
      //     } else {
      //       return false;
      //     }
      //   });
      // };

      var check_duplicate = [];
      result.records.forEach((record) => {
        if (!check_duplicate[record.get("n").identity.low]) {
          check_duplicate[record.get("n").identity.low] = true;
          nodes.push(
            build_node(
              record.get("n").identity.low,
              get_label(record.get("n")),
              record.get("n").labels[0],
              JSON.stringify(record.get("n").properties)
            )
          );
        }
        if (!check_duplicate[record.get("m").identity.low]) {
          check_duplicate[record.get("m").identity.low] = true;
          nodes.push(
            build_node(
              record.get("m").identity.low,
              get_label(record.get("m")),
              record.get("m").labels[0],
              JSON.stringify(record.get("m").properties)
            )
          );
        }
        edges.push(
          build_edge(record.get("r").start.low, record.get("r").end.low)
        );
      });
      session.close();
      driver.close();
      var output = {
        nodes: nodes,
        edges: edges,
      };
      console.log(output);
      res.status(200).send(JSON.stringify(output));
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send({ message: "Server error" });
    });
};

exports.idValidation = (req, res, next) => {
  const id = req.params.id;

  // Note: use of !NaN(0x10) or !NaN(1e1) === true
  // Thus, use of regex to make sure id is only decimal, and not numbers like 0x10, 1e1.
  if (/^\d+$/.test(id)) {
    return next();
  } else {
    return res.status(400).send({ message: "Please enter a numeric id" });
  }
};
