console.log("------------------------------------");
console.log("controllers > apiController.js");
console.log("------------------------------------");

// --------------------------------------------------
// load modules
// --------------------------------------------------
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const { execFile } = require("child_process");
const sevenBin = require("7zip-bin");
const { extractFull } = require("node-7z");
const neo4j = require("neo4j-driver");
const projectDB = require("../models/projects.js");
const middlewares = require("../middlewares");
const config = require("../config");
const { Reset, FgGreen } = require("../constants");
const codeQL = require("../helpers/codeQL");

const upload = middlewares.multer.array("files", 100);

// --------------------------
// helper functions
// --------------------------
// function printDebugInfo(urlPattern, req) {
//   console.log("-----------------------------------------");
//   console.log("Servicing " + urlPattern + " ..");
//   console.log("Servicing " + req.url + " ..");

//   console.log("> req.params: " + JSON.stringify(req.params));
//   console.log("> req.body: " + JSON.stringify(req.body));
// }

// --------------------------------------------------
// end points
// --------------------------------------------------

/**
 * A express endpoint to get all of the projects in the database
 */
exports.getProject = (req, res) => {
  // printDebugInfo("/g8/api/projects", req);
  console.log(FgGreen, `apiController.getProject()`, Reset);

  projectDB.getProject(function (err, result) {
    // Returns the all columns of the all project table if no error
    if (!err) {
      res.status(200).send(result);
    } else {
      let output = {
        message: "Unable to get all the existing project information",
      };
      res.status(500).send(output);
    }
  });
};

/**
 * A express endpoint to get a single projects in the database by id
 */
exports.getProjectById = (req, res) => {
  console.log(FgGreen, `apiController.getProjectById()`, Reset);

  const projectid = req.params.id;

  projectDB.getProjectId(projectid, function (err, result) {
    // Returns the all columns of the specifed project table id if no error
    if (!err) {
      if (result.length === 0) {
        res.status(200).send({ message: "Project not found" });
      } else {
        res.status(200).send(result);
      }
    } else {
      res.status(500).send({ message: "Internal Server Error" });
    }
  });

};

/**
 * A express endpoint to query a codeQL database by the id
 */
exports.query = (req, res, next) => {
  console.log(FgGreen, `apiController.query()`, Reset);

  const id = req.params.id;
  const CodeQLpath = `./databases/database${id}/db-javascript`;
  // Checking if db-javascript folder exists in the database
  // If database creation is incomplete, db-javascript will not exist
  fs.access(CodeQLpath, fs.F_OK, (err) => {
    if (err) {
      console.error(err);
      return res.status(422).send({ message: "The database does not exist." });
    } else {
      //file exists

      let query;
      if (config.codeql_home) {
        query = `${config.codeql_home}/codeql-repo/javascript/ql/src/codeql-suites/javascript-security-extended.qls`;
      } else {
        query = `../../codeql/javascript/ql/src/codeql-suites/javascript-security-extended.qls`;
      }
      // Run CodeQL query command, sarif output file is stored in ./SarifFiles
      // Declaring a child variable to use for troubleshooting
      codeQL.analyzeDatabase(`./databases/database${id}`, query, `./SarifFiles/${id}.sarif`, (code, output) => {
        // if error (Exit Code >= 1)
        if (code) {
          console.error("stderr", output);
        } else {
          // If no errors, add sarif file name to the DB
          projectDB.insertSarif(`${id}.sarif`, id, function (err, result) {
            if (!err) {
              if (result) {
                var SarifFilePath = `${id}.sarif`;
                var options = {
                  root: path.join(__dirname, "../SarifFiles/"),
                };
                res.contentType("application/json").sendFile(SarifFilePath, options, function (err) {
                  if (err) {
                    console.error(err);
                  } else {
                    console.log(options);
                    console.log("Sent:", SarifFilePath);
                  }
                  console.log(`application/jsonapplication/json" `);
                });
              } else {
                console.log(`message: "Bhe database does not exist.st" `);
                res.status(422).send({ message: "The database does not exist." });
              }
            } else {
              console.log(`message: "Bad Request" `);
              if (err.code == "ER_BAD_NULL_ERROR") {
                res.status(400).send({ message: "Bad Request" });
              } else {
                console.log(`message: "Internal Server Error" `);
                res.status(500).send({ message: "Internal Server Error" });
              }
            }
          });
        }
      })
    }
  });
};

/**
 * A express endpoint to get the analyses result (sarif) by id
 */
exports.getAnalysesById = (req, res, next) => {
  console.log(FgGreen, `apiController.getAnalysesById()`, Reset);

  const id = req.params.id;
  const SarifFilePath = path.resolve(__dirname, `../SarifFiles/${id}.sarif`);

  // Checking if the sarif file exists
  fs.access(SarifFilePath, fs.F_OK, (err) => {
    if (err) {
      console.error(err);
      return res.status(422).send({ message: "The database does not exist." });
    } else {
      //file exists
      res.contentType("application/json").sendFile(SarifFilePath, function (err) {
        if (err) {
          console.error(err);
        } else {
          console.log("Sent:", SarifFilePath);
          next();
        }
      });
    }
  });
};

/**
 * A express endpoint to upload files with multer
 */
exports.folderUpload = (req, res, next) => {
  console.log(FgGreen, `apiController.folderUpload()`, Reset);

  if (fs.existsSync("./uploads/temporaryMulterUpload"))
    return res.status(409).send({ message: "A project is being uploaded, if you suspect this is an error. Manually delete the 'temporaryMulterUpload' in the backend" });

  upload(req, res, function (err) {
    if (err) {
      // A error occurred when uploading.
      fs.rmSync(`./uploads/temporaryMulterUpload`, { recursive: true });
      if (req.fileValidationError)
        return res.status(415).send({ message: req.fileValidationError });
      return res.status(500).send({ message: "Internal Server Error" });
    } else if (!req.files) {
      return res.status(400).send({ message: "No files selected" });
    }

    // Loops through every file and check if they are an archive
    // If it is an archive, extract the archive using 7zip binary
    req.files.forEach((file, index) => {
      let { ext } = path.parse(file.path);
      if (
        file.mimetype === "application/x-7z-compressed" ||
        file.mimetype === "application/x-zip-compressed" ||
        file.mimetype === "application/zip" ||
        file.mimetype === "application/x-tar" ||
        file.mimetype === "application/x-gzip" ||
        file.mimetype === "application/vnd.rar" ||
        (file.mimetype === "application/octet-stream" &&
          (ext === ".7z" || ext === ".zip"))
      ) {
        const pathTo7zip = sevenBin.path7za;

        // ./${file.path} == backend/uploads/zippedfile
        let temporaryMulterUploadPath = path.join(".", "uploads", "temporaryMulterUpload");
        const seven = extractFull(`./${file.path.split(path.sep).join(path.posix.sep)}`, temporaryMulterUploadPath, {
          $bin: pathTo7zip,
          recursive: true,
        });

        // 7zip successfully extracted the archive
        seven.on("end", function () {
          try {
            // delete archive file
            fs.rmSync(`./${file.path}`);

            // done extracting last archive in files
            // It is neccessary to check whether index is the last index of files
            // so that we can extract all archive files before returning to the next middleware
            if (req.files.length - 1 === index) {
              return next();
            }
          } catch (err) {
            console.error(`Error while deleting ${file.path}.`);
          }
        });

        // cannot set res.status(500) here as callback is too slow, causes express http header error
        seven.on("error", function (err) {
          console.error(err);
        });
      } else {
        if (req.files.length - 1 === index) {
          // Assumed no error
          return next();
        }
      }
    });

  });
};

/**
 * A express endpoint to upload files with git clone
 */
exports.repoUpload = (req, res) => {
  console.log(FgGreen, `apiController.repoUpload()`, Reset);

  if (fs.existsSync("./uploads/temporaryGitClone"))
    return res.status(409).send({ message: "A project is being uploaded" });

  // This regex test whether the git link is from github/gitlab.
  // We choose not to support other git based website such as BitBucket
  // As their format is different from Github/GitLab.
  let repoLinkRegExp = /^(?:https?):(\/\/)?(github|gitlab)(.*?)(\.git)(\/?|\#[-\d\w._]+?)$/;
  var repoLink = req.body.repoLink;
  if (!repoLinkRegExp.test(repoLink)) {
    //Checking using regex.
    res.status(400).send({ message: "The link provided is not supported." });
    return;
  }
  try {
    // Here, we clone the Git Repo into a temporaryGitClone folder.
    // The --depth=1 option only clone the main branch to reduce network prcoessing power.
    execFile("git", ["clone", repoLink, "./uploads/" + "temporaryGitClone", "--depth=1"], (error, stdout, stderr) => {
      if (error) {
        console.error("stderr", stderr);
      }
      //For debugging purposes on the backend
      console.log("stdout", stdout);
      console.error(`stderr: ${stderr}`);

      // Here, we using rev-parse to check the SHA1 of the git repo.
      // This is to check whether an existing project is already int the database
      execFile("git", ["-C", "./uploads/temporaryGitClone", "rev-parse", "HEAD"], (error, stdout, stderr) => {
        if (error) {
          console.error("stderr", stderr);
        }

        let hash = stdout;
        if (!hash)
          return res.status(500).send({ message: "Server error." });
        projectDB.getProjectHash(hash, function (err1, result) {
          if (err1) {
            fs.rmSync(`./uploads/temporaryGitClone`, { recursive: true });
            res.status(500).send({ message: "Server error." });
          } else {
            if (result) {
              console.log(result);
              console.log(
                "Database already exist, sending response back to frontend."
              );
              try {
                //Deletes temporary folder
                fs.rmSync(`./uploads/temporaryGitClone`, { recursive: true });
                console.log(`./uploads/temporaryGitClone is deleted!`);
                console.log("Database already exist, sending response back to frontend.");
              } catch (err) {
                console.error(`Error while deleting ./uploads/temporaryGitClone.`);
              }
              res.status(409).send({ message: "Repository already exist on server." });
            } else {
              console.log(result);

              const matchRepoName = /^(?:https?:\/\/).*[:/](.*).git$/;
              var data = {
                projectName: repoLink.match(matchRepoName)[1],
                hash: hash,
              };
              projectDB.addProject(data, function (err3, results) {
                if (err3) {
                  fs.rmSync(`./uploads/temporaryGitClone`, { recursive: true });
                  res.status(500).send({ message: "Server error." });
                } else {
                  // if the project is successfully added, rename it into the insertId
                  fs.rename("./uploads/temporaryGitClone", "./uploads/" + results.insertId, function (err2) {
                    if (err2) {
                      console.log(
                        "Error renaming temporaryGitClone to its hash."
                      );
                      projectDB.removeProject(results.insertId, (err4, results1) => {
                        res.status(500).send({ message: "Server error." });
                      });
                      fs.rmSync(`./uploads/temporaryGitClone`, { recursive: true });
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
    });
  } catch (error) {
    res.status(500).send({ message: "Server error." });
  }
};

/**
 * A express endpoint to get all the neo4j nodes by id
 */
exports.showAllInProjectNeo4J = (req, res) => {
  console.log(FgGreen, `apiController.showAllInProjectNeo4J()`, Reset);

  const driver = neo4j.driver(`bolt://${config.neo_host}:7687`, neo4j.auth.basic(config.neo_user, config.neo_pwd));
  const id = req.params.id;
  const query = `WITH 1 as dummy
  Match (n)-[r]->(m)
  WHERE n.ProjectID = "${id}" AND r.ProjectID = "${id}" AND m.ProjectID = "${id}"
  Return n,r,m`;
  const nodes = [];
  const edges = [];
  const session = driver.session({ database: "neo4j" });
  session
    .run(query)
    .then((result) => {
      var build_node = (identity, labels, group, title) => {
        return { id: identity, label: labels, title: title, group: group };
      };
      var build_edge = (start, end) => {
        return { from: start, to: end, length: 200 };
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

/**
 * A express endpoint to create a custom query & send the result back
 */
exports.customQuery = (req, res) => {
  console.log(FgGreen, `apiController.customQuery()`, Reset);

  const id = req.params.id;
  const CodeQLpath = `./databases/database${id}/db-javascript`;
  let metadata = `/\*\*
\* @name my-custom-query
\* @description This is a custom query generated from the frontend web application. 
\* @kind ${req.body.CustomQuery?.toLowerCase().includes("dataflow")
      ? "path-problem"
      : "problem"
    }
\* @problem.severity recommendation
\* @percision high
\* @id javascript/my-custom-query
\* @tags custom
\*/
\n`;

  let selectQuery = req.body.CustomQuery?.match(/[Ss]elect(.*)/g)[0];

  // This is to check whether the select statement contains mutiple fields
  // This check is required as @kind path/path-problems requires even fields
  // Adds a filler text if it is not even
  if (!selectQuery?.includes(",") || selectQuery?.split(",")?.length % 2 !== 0) {
    console.warn("Select statement is not even");
    req.body.CustomQuery += `, "Filler text"`;
    console.log(req.body.CustomQuery);
  }

  let CusQuery = metadata + req.body.CustomQuery;

  fs.access(CodeQLpath, fs.F_OK, (err) => {
    if (err) {
      console.error(err);
      return res.status(422).send({ message: "The database does not exist." });
    } else {
      fs.writeFile("./codeql-custom-queries-javascript/CustomQuery.ql", CusQuery, function (err) {
        if (err) {
          return console.error(err);
        } else {
          console.log("Query successfully saved.");

          // Run CodeQL query command, sarif output file is stored in ./SarifFiles
          // Declaring a child variable to use for troubleshooting
          codeQL.analyzeDatabase(`./databases/database${id}`, `./codeql-custom-queries-javascript/CustomQuery.ql`, "./SarifFiles/TemporaryCustomQuery.sarif", (code, output) => {
            // if error (Exit Code >= 1)
            if (code) {
              console.error("stderr", output);
              return res.status(500).send({ message: "Internal Server Error" });
            } else {
              var SarifFilePath = `TemporaryCustomQuery.sarif`;
              var options = {
                root: path.join(__dirname, "../SarifFiles/"),
              };

              res.contentType("application/json").sendFile(SarifFilePath, options, function (err) {
                if (err) {
                  console.error(err);
                } else {
                  console.log(options);
                  console.log("Sent:", SarifFilePath);
                  res.end();
                }
              });
            }
          });
        }
      });
    }
  });
};

/**
 * A express endpoint to delete a project in the database by id
 */
exports.deleteProject = (req, res) => {
  console.log(FgGreen, `apiController.deleteProject()`, Reset);

  const id = req.params.id;
  const databaseFolder = `./databases/database${id}`;
  const sarifFile = `./SarifFiles/${id}.sarif`;
  const uploadsFolder = `./uploads/${id}`;

  if (databaseFolder.indexOf('\0') !== -1 || sarifFile.indexOf('\0') !== -1 || uploadsFolder.indexOf('\0') !== -1) {
    return res.status(400).send('That was evil.');
  }

  // provide some basic check to make sure the path is not malicious
  let rootDirectory = "/usr/src/app/";
  let databaseFolderPath = path.join(rootDirectory, databaseFolder).split(path.sep).join(path.posix.sep);
  let sarifFilePath = path.join(rootDirectory, sarifFile).split(path.sep).join(path.posix.sep);
  let uploadsFolderPath = path.join(rootDirectory, uploadsFolder).split(path.sep).join(path.posix.sep);
  if (databaseFolderPath.indexOf(rootDirectory) !== 0 || sarifFilePath.indexOf(rootDirectory) !== 0 || uploadsFolderPath.indexOf(rootDirectory) !== 0) {
    return res.status(400).send('trying to sneak out of the web root?');
  }

  // Attemps to remove projectid from the database first
  projectDB.removeProject(id, function (err, result) {
    // If no error, continues to remove codeql database, sarif files and neo4j nodes for the id
    if (!err) {
      fs.access(databaseFolder, fs.F_OK, (err) => {
        if (err) {
          console.error(err);
          console.log("The database folder does not exist.");
          return;
        } else {
          fs.rmSync(databaseFolder, { recursive: true });
          console.log("CodeQL Database Folder deleted successfully");
        }
      });
      fs.access(sarifFile, fs.F_OK, (err) => {
        if (err) {
          console.error(err);
          console.log("The sarif file does not exist.");
          return;
        } else {
          fs.rmSync(sarifFile, { recursive: true });
          console.log("Sarif File deleted successfully.");
        }
      });
      fs.access(uploadsFolder, fs.F_OK, (err) => {
        if (err) {
          console.error(err);
          console.log("The uploads file does not exist.");
          return;
        } else {
          fs.rmSync(uploadsFolder, { recursive: true });
          console.log("Uploads file deleted successfully");
        }
      });

      const driver = neo4j.driver(`bolt://${config.neo_host}:7687`, neo4j.auth.basic(config.neo_user, config.neo_pwd));

      const query = `
        MATCH (n {ProjectID: '${id}'})
        DETACH DELETE n`;
      const session = driver.session({ database: "neo4j" });

      session
        .run(query)
        .then((result) => {
          console.log(result);
          console.log(`Successfully deleted Neo4J for ProjectID: ${id}`);
          session.close();
          driver.close();
        })
        .catch((error) => {
          console.error(error);
        });

      let output = {
        message: "Project deleted",
        affectedRows: result.affectedRows,
      };
      res.status(200).send(output);
    }
  });
};

/**
 * A express endpoint to download a codeQL database snapshot by id
 */
exports.getSnapshots = (req, res) => {
  console.log(FgGreen, `apiController.getSnapshots()`, Reset);

  const id = req.params.id;
  const file = `./Snapshots/database${id}.zip`;

  codeQL.createSnapshot(`./databases/database${id}`, file, (code, output) => {
    // error
    if (code) {
      console.error(`stderr: ${output}`);;

      if (
        output.includes("is not a recognized CodeQL database") ||
        output.includes("has not been finalized")
      ) {
        return res.status(400).send({
          message: "Database does not exist or the wrong folder is selected.",
        });
      } else if (output.includes("already exists")) {
        console.log(`Downloading ${file}`);
        return res.download(file);
      }
      return res.status(500).send({
        message: "Internal Server Error",
      });
    } else {
      console.log(`Downloading ${file}`);
      res.download(file);
    }
  });
};
