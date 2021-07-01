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
const projectDB = require("../models/projects.js");
const middlewares = require("../middlewares");
const sevenBin = require("7zip-bin");
const { extractFull } = require("node-7z");
const upload = middlewares.multer.array("files", 100);
const neo4j = require("neo4j-driver");


// --------------------------
// helper functions
// --------------------------

function printDebugInfo(urlPattern, req) {
  console.log("-----------------------------------------");
  console.log("Servicing " + urlPattern + " ..");
  console.log("Servicing " + req.url + " ..");

  console.log("> req.params: " + JSON.stringify(req.params));
  console.log("> req.body: " + JSON.stringify(req.body));
}

// --------------------------------------------------
// end points
// --------------------------------------------------

exports.getProject = (req, res) => {
  printDebugInfo("/teamname/api/projects", req);

  projectDB.getProject(function (err, result) {
    if (!err) {
      res.status(200).send(result);
    } else {
      var output = {
        error: "Unable to get all the existing project information",
      };
      res.status(500).send(output);
    }
  });
};

// exports.projectid = (req, res) => {
//   printDebugInfo("/teamname/api/getProjectID", req);

//   projectDB.getProject(function (err, result) {
//     if (!err) {
//       res.status(200).send(result);
//     } else {
//       var output = {
//         error: "Unable to get all the project ids",
//       };
//       res.status(500).send(JSON.stringify(output));
//     }
//   });
// };

exports.getProjectById = (req, res) => {
  var projectid = req.params.id;
  const projectIDpath = `/api/projects/${projectid}`;

  fs.access(projectIDpath, fs.F_OK, (err) => {
    projectDB.getProjectId(projectid, function (err, result) {
      if (!err) {
        if (result.length == 0) {
          res.status(200).send("Project not found");
        } else {
          res.status(200).send(result);
        }
      } else {
        res.status(500).send("Some error");
      }
    });
  });
};

// Query current database number in the counter
exports.query = (req, res, next) => {
  const id = req.params.id;
  const CodeQLpath = `./databases/database${id}/db-javascript`;
  // Checking if db-javascript folder exists in the database
  // If database creation is incomplete, db-javascript will not exist
  fs.access(CodeQLpath, fs.F_OK, (err) => {
    if (err) {
      console.error(err);
      res.status(422).send("The database does not exist.");
      return;
    } else {
      //file exists

      const args = [
        "database", // first argv
        "analyze", // second argv
        //"--quiet", // suppress output, Incrementally decrease the number of progress messages printed
        "--format=sarifv2.1.0", // set the result output to SARIF v2.1.0 format
        `--output=./SarifFiles/${id}.sarif`, // output file as id.sarif in ./SarifFiles/
        "--sarif-add-snippets", // include code snippets for each location mentioned in the results
        `./databases/database${id}`, // our database to scan
        "../../codeql/javascript/ql/src/codeql-suites/javascript-security-extended.qls",
        "--search-path=../../codeql/misc/suite-helpers", // maybe change? seem like different QL pack use different suite-helpers
      ];

      // Run CodeQL query command, sarif output file is stored in ./SarifFiles
      // Declaring a child variable to use for troubleshooting
      var child = execFile("codeql", args, (error, stdout, stderr) => {
        if (error) {
          console.error("stderr", stderr);
          throw error;
        } else {
          // If no errors, add sarif file name to the DB
          projectDB.insertSarif(`${id}.sarif`, id, function (err, result) {
            if (!err) {
              if (result) {
                var SarifFilePath = `${id}.sarif`;
                var options = {
                  root: path.join(__dirname, "../SarifFiles/"),
                };
                // This API provides access to data on the running file system.
                // Ensure that either (a) the way in which the path argument was constructed into an absolute path is secure if it contains user input
                // or (b) set the root option to the absolute path of a directory to contain access within.
                res.setHeader("Content-Type", "application/json");
                res.sendFile(SarifFilePath, options, function (err) {
                  if (err) {
                    console.error(err);
                  } else {
                    console.log(options);
                    console.log("Sent:", SarifFilePath);
                    res.end();
                    next();
                  }
                });
              } else {
                res.status(422).send("The database does not exist.");
              }
            } else {
              if (err.code == "ER_BAD_NULL_ERROR") {
                res.status(400).send("Bad Request");
              } else {
                res.status(500).send("Internal Server Error");
              }
            }
          });
        }
        console.error(`stderr: ${stderr}`);
      });

      // for debugging purposes only
      child.stdout.on("data", function (data) {
        console.log("[STDOUT]: ", data.toString());
      });
      child.stderr.on("data", function (data) {
        console.log("[STDERR]: ", data.toString());
      });
    }
  });
};

// // http://localhost:8080/teamname/api/verifySarifFile
// exports.verifySarifFile = (req, res) => {
//   var sarifFileName = req.body.sarifFileName;
//   projectDB.getSarifFileName(sarifFileName, function (err, result) {
//     if (!err) {
//       if (result.length == 0) {
//         res.status(200).send("File not found");
//       } else {
//         res.status(200).send(result);
//       }
//     } else {
//       res.status(500).send("Some error");
//     }
//   });
// };

exports.folderUpload = (req, res, next) => {
  if (fs.existsSync("./uploads/temporaryMulterUpload"))
    return res.status(409).send({ message: "A project is being uploaded" });

  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      return res.status(500).send("Internal Server Error");
    } else if (err) {
      // An unknown error occurred when uploading.
      if (req.fileValidationError)
        return res.status(415).send({ message: req.fileValidationError });
      return res.status(500).send({ message: "Opps, Something went wrong" });
    } else if (!req.files) {
      return res.status(400).send({ message: "No files selected" });
    }
    try {
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
          const seven = extractFull(
            `./${file.path}`,
            `./uploads/temporaryMulterUpload/`,
            {
              $bin: pathTo7zip,
              recursive: true,
            }
          );

          seven.on("end", function () {
            try {
              // delete archive file
              fs.unlinkSync(`./${file.path}`);

              // done extracting last archive in files
              if (req.files.length - 1 === index) {
                return next();
                // Assumed no error
                // res.setHeader("Content-Type", "text/plain");
                // return res.status(200).send({ message: "OK." });
              }
            } catch (err) {
              console.error(`Error while deleting ${file.path}.`);
            }
          });

          // cannot set res.status(500) here as callback is too slow, causes express http header error
          seven.on("error", function (err) {
            console.error(err);
            throw new Error("Failed to extract file");
          });
        } else {
          if (req.files.length - 1 === index) {
            // Assumed no error
            return next();
          }
        }
      });
    } catch (error) {
      return res.status(500).send({ message: "Internal Server Error" });
    }
  });
};

/*
    Creating hashes over folders (with default options)
    Content means in this case a folder's children - both the files and the subfolders with their children.

    The hashes are the same if:

    A folder is checked again
    Two folders have the same name and content (but have different parent folders)

    The hashes are different if:

    A file somewhere in the directory structure was renamed or its content was changed
    Two folders have the same name but different content
    Two folders have the same content but different names
  */
exports.repoUpload = (req, res) => {
  if (fs.existsSync("./uploads/temporaryGitClone"))
    return res.status(409).send({ message: "A project is being uploaded" });

  let repoLinkRegExp = /^(http(s)?)(:(\/\/)?)([\w.@:/\-~]+)(\.git)(\/)?$/;
  var repoLink = req.body.repoLink;
  if (!repoLinkRegExp.test(repoLink)) {
    //Checking using regex.
    res.status(400).send({ message: "The link provided is not supported." });
    return;
  }
  try {
    execFile(
      "git",
      ["clone", repoLink, "./uploads/" + "temporaryGitClone"],
      (error, stdout, stderr) => {
        if (error) {
          console.error("stderr", stderr);
          throw error;
        }
        //For debugging purposes on the backend
        console.log("stdout", stdout);
        console.error(`stderr: ${stderr}`);
        execFile(
          "git",
          ["-C", "./uploads/temporaryGitClone", "rev-parse", "HEAD"],
          (error, stdout, stderr) => {
            if (error) {
              console.error("stderr", stderr);
            }

            let hash = stdout;
            if (!hash)
              return res.status(500).send({ message: "Server error." });
            projectDB.getProjectHash(hash, function (err1, result) {
              if (err1) {
                res.status(500).send({ message: "Server error." });
              } else {
                if (result) {
                  console.log(result);
                  console.log(
                    "Database already exist, sending response back to frontend."
                  );
                  try {
                    //Deletes temporary folder
                    fs.rmdirSync(`./uploads/temporaryGitClone`, {
                      recursive: true,
                    });
                    console.log(`./uploads/temporaryGitClone is deleted!`);
                    console.log(
                      "Database already exist, sending response back to frontend."
                    );
                  } catch (err) {
                    console.error(
                      `Error while deleting ./uploads/temporaryGitClone.`
                    );
                  }
                  res
                    .status(409)
                    .send({ message: "Repository already exist on server." });
                } else {
                  console.log(result);

                  // git@github.com:user/repo.git
                  // ssh://login@server.com:12345/absolute/path/to/repository
                  // https://<your_username>@bitbucket.org/<workspace_ID>/<repo_name>.git
                  // https://emmap1@bitbucket.org/tutorials/tutorials.git.bitbucket.org.git
                  // https://github.com:ISnackable/DISMFYP2021GRP8.git
                  var matchRepoName = /^(?:git@|https:\/\/).*[:/](.*).git$/;
                  var data = {
                    projectName: repoLink.match(matchRepoName)[1],
                    hash: hash,
                  };
                  projectDB.addProject(data, function (err3, results) {
                    if (err3) {
                      res.status(500).send({ message: "Server error." });
                    } else {
                      fs.rename(
                        "./uploads/temporaryGitClone",
                        "./uploads/" + results.insertId,
                        function (err2) {
                          if (err2) {
                            console.log(
                              "Error renaming temporaryGitClone to its hash."
                            );
                            projectDB.removeProject(
                              results.insertId,
                              (err4, results1) => {
                                res
                                  .status(500)
                                  .send({ message: "Server error." });
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
          }
        );
      }
    );
  } catch (error) {
    res.status(500).send({ message: "Server error." });
  }
};

exports.customQuery = (req, res) => {
  var CusQuery = req.body.CustomQuery;
  fs.writeFile("../../codeql-custom-queries-javascript/CustomQuery.ql", CusQuery, function (err) {
    if (err) {
      console.error(err);
      return;
    } else {
      console.log("Query successfully saved.");

      const id = req.params.id;
      const args = [
        "database", // first argv
        "analyze", // second argv
        //"--quiet", // suppress output, Incrementally decrease the number of progress messages printed
        "--format=sarifv2.1.0", // set the result output to SARIF v2.1.0 format
        `--output=./SarifFiles/${id}.sarif`, // output file as id.sarif in ./SarifFiles/
        "--sarif-add-snippets", // include code snippets for each location mentioned in the results
        `./databases/database${id}`, // our database to scan
        "../../codeql-custom-queries-javascript/CustomQuery.ql",
        "--search-path=../../codeql",
      ];

      // Run CodeQL query command, sarif output file is stored in ./SarifFiles
      // Declaring a child variable to use for troubleshooting
      var child = execFile("codeql", args, (error, stdout, stderr) => {
        if (error) {
          console.error("stderr", stderr);
          throw error;
        } else {
          // If no errors, add sarif file name to the DB
          projectDB.insertSarif(`${id}.sarif`, id, function (err, result) {
            if (!err) {
              if (result) {
                var SarifFilePath = `${id}.sarif`;
                var options = {
                  root: path.join(__dirname, "../SarifFiles/"),
                };
                // This API provides access to data on the running file system.
                // Ensure that either (a) the way in which the path argument was constructed into an absolute path is secure if it contains user input
                // or (b) set the root option to the absolute path of a directory to contain access within.
                res.setHeader("Content-Type", "application/json");
                res.sendFile(SarifFilePath, options, function (err) {
                  if (err) {
                    console.error(err);
                  } else {
                    console.log(options);
                    console.log("Sent:", SarifFilePath);
                    res.end();
                  }
                });
              } else {
                res.status(422).send("The database does not exist.");
              }
            } else {
              if (err.code == "ER_BAD_NULL_ERROR") {
                res.status(400).send("Bad Request");
              } else {
                res.status(500).send("Internal Server Error");
              }
            }
          });
        }
        console.error(`stderr: ${stderr}`);
      });
      // for debugging purposes only
      child.stdout.on("data", function (data) {
        console.log("[STDOUT]: ", data.toString());
      });
      child.stderr.on("data", function (data) {
        console.log("[STDERR]: ", data.toString());
      });
    }
  });
};

exports.deleteProject = (req, res) => {
  const id = req.params.id;
  var databaseFolder = `./databases/database${id}`;
  var sarifFile = `./SarifFiles/${id}.sarif`;

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
          fs.rmdirSync(databaseFolder, { recursive: true });
          console.log("CodeQL Database Folder deleted successfully");
        }
      });
      fs.access(sarifFile, fs.F_OK, (err) => {
        if (err) {
          console.error(err);
          console.log("The sarif file does not exist.");
          return;
        } else {
          fs.rmdirSync(sarifFile, { recursive: true });
          console.log("Sarif File deleted successfully.");
        }
      });

      // TODO: replace localhost with neo
      const driver = neo4j.driver(
        "bolt://localhost:7687",
        neo4j.auth.basic("neo4j", "s3cr3t"),
        {
          /* encrypted: 'ENCRYPTION_OFF' */
        }
      );

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

      var output = {
        "Project deleted": result.affectedRows,
      };
      res.status(200).send(output);
    }
  });
};
