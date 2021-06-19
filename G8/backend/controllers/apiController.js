console.log("------------------------------------");
console.log("controllers > apiController.js");
console.log("------------------------------------");

// --------------------------------------------------
// load modules
// --------------------------------------------------
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const { exec, execFile } = require("child_process");
const { hashElement } = require("folder-hash");
const createDB = require("../models/createDB.js");
const sarifFileVerify = require("../models/sarifFileVerify.js");
const projectDB = require("../models/projectid.js");
const uploadFiles = require("../models/uploadFiles.js");
const middlewares = require("../middlewares");
const sevenBin = require("7zip-bin");
const { extractFull } = require("node-7z");

// --------------------------
// standard functions
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

// Read up https://dzone.com/articles/understanding-execfile-spawn-exec-and-fork-in-node

// Query current database number in the counter
// http://localhost:8080/teamname/api/query/:id
exports.query = (req, res) => {
  var id = req.params.id;

  const CodeQLpath = `./CodeQLDB/database${id}/db-javascript`;
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
        `./CodeQLDB/database${id}`, // our database to scan
        "../../codeql/javascript/ql/src/Security/CWE-078/CommandInjection.ql", // maybe change? seem like different QL pack use different suite-helpers
      ];

      // Run CodeQL query command, sarif output file is stored in ./SarifFiles
      // Declaring a child variable to use for troubleshooting
      var child = execFile("codeql", args, (error, stdout, stderr) => {
        if (error) {
          console.error("stderr", stderr);
          throw error;
        } else {
          // If no errors, add sarif file name to the DB
          createDB.insertSarif(`${id}.sarif`, id, function (err, result) {
            if (!err) {
              if (result) {
                var SarifFilePath = `${id}.sarif`;
                var options = {
                  root: path.join(__dirname, "../SarifFiles/"),
                };
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
      child.stdout.on("data", function (data) {
        console.log("[STDOUT]: ", data.toString());
      });
      child.stderr.on("data", function (data) {
        console.log("[STDERR]: ", data.toString());
      });
    }
  });
};

// #sarifFileVerify.getSarifFileName#
// http://localhost:8080/teamname/api/verifySarifFile
exports.verifySarifFile = (req, res) => {
  var sarifFileName = req.body.sarifFileName;
  sarifFileVerify.getSarifFileName(sarifFileName, function (err, result) {
    if (!err) {
      if (result.length == 0) {
        res.status(200).send("File not found");
      } else {
        res.status(200).send(result);
      }
    } else {
      res.status(500).send("Some error");
    }
  });
};

// #uploadFiles.getProjectById#
// http://localhost:8080/teamname/api/projects/:id
exports.getProjectById = (req, res) => {
  var projectid = req.params.id;
  const projectIDpath = `/api/projects/${projectid}`;

  fs.access(projectIDpath, fs.F_OK, (err) => {
      uploadFiles.getProjectId(projectid, function (err, result) {
          if (!err) {
              if (result.length == 0) {
                  res.status(200).send("Project not found");
              }
              else {
                  res.status(200).send(result);
              }
          }
          else {
              res.status(500).send("Some error");
          }
      });
  })
};

// Create Database
// http://localhost:8080/teamname/api/createDatabase
exports.createDatabase = (req, res) => {
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

  // const {  getHashes } = require('crypto');
  // console.log(getHashes()); // ['DSA', 'DSA-SHA', 'DSA-SHA1', ...]

  // options can be viewed at https://www.npmjs.com/package/folder-hash
  // Default algo is SHA1 and encoding is base64, therefore we have to change it
  const options = {
    algo: "md5",
    encoding: "hex",
    folders: { exclude: ['node_modules'] }
  };

  // hashElement is a function from the folder-hash package
  console.log("Creating a hash over the selected folder:");

  // hashElement(<Folder name>, <Directory>, <options>) --> Hashes your desired folder
  // may need to validate folder name (in case of directory traversing attack)
  hashElement("../tests", path.join(__dirname, "."), options).then((hash) => {
    // Shows the database being hashed

    // Connects to SQL database and compares existing hashes
    createDB.insertDB(hash.hash, function (err, result) {
      if (!err) {
        if (result) {
          // if result == There are no existing databases with the same hash
          const args = [
            "database", // first argv
            "create", // second argv
            `./CodeQLDB/database${id}`, // database name to be created
            "--source-root=./tests", // source code folder
            "--language=javascript", // programming language
          ];
          // Command to create a database
          // result.insertId is the ID of the database inserted
          // Let the database finish creating or db-javascript will be missing.
          var child = require("child_process").execFile(
            "codeql",
            args,
            (error, stdout, stderr) => {
              if (error) {
                console.error("stderr", stderr);
                throw error;
              }

              console.error(`stderr: ${stderr}`);
              res.status(204).send("Database updated with new hash.");
            }
          );
          child.stdout.on("data", function (data) {
            console.log("[STDOUT]: ", data.toString());
          });
          child.stderr.on("data", function (data) {
            console.log("[STDERR]: ", data.toString());
          });
        } else {
          res
            .status(422)
            .send("The file provided already exists in the database.");
        }
      } else {
        if (err.code == "ER_BAD_NULL_ERROR") {
          res.status(400).send("Bad Request");
        } else {
          res.status(500).send("Internal Server Error");
        }
      }
    });
  });
};

exports.projectid = (req, res) => {
  printDebugInfo("/teamname/api/getProjectID", req);

  projectDB.projectid(function (err, result) {
    if (!err) {
      res.status(200).send(result);
    } else {
      var output = {
        error: "Unable to get all the project ids",
      };
      res.status(500).send(JSON.stringify(output));
    }
  });
};

var upload = middlewares.upload.array("files", 100);

exports.upload = (req, res, next) => {
  uploadFiles.createNewProject(function (err, result) {
    if (err) {
      var output = {
        error: "Unable to get all the project ids",
      };
      res.status(500).send(JSON.stringify(output));
    } else {
      let projectId = result.insertId;
      req.id = projectId;

      upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
          // A Multer error occurred when uploading.
          return res.status(500).send("Internal Server Error");
        } else if (err) {
          // An unknown error occurred when uploading.
          if (req.fileValidationError)
            return res.status(415).send({ message: req.fileValidationError });
          return res
            .status(500)
            .send({ message: "Opps, Something went wrong" });
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
                `./uploads/${projectId}/`,
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
    }
  });
};

exports.repoLinkupload = (req, res) => {
  try {
    //Deletes or try to delete temporary folder before using
    fs.rmdirSync("./uploadDatabase/temporaryGitClone", { recursive: true });
    console.log(`./uploadDatabase/temporaryGitClone is deleted!`);
  } catch (err) {
    console.error(`Error while deleting ${dir}.`);
  }
  let repoLinkRegExp =
    /^((http(s)?)|(git@[\w.]+))(:(\/\/)?)([\w.@:/\-~]+)(\.git)(\/)?$/;
  var repoLink = req.body.repoLink;
  if (!repoLinkRegExp.test(repoLink)) {
    //Checking using regex.
    res.status(400).send({ message: "The link provided is not supported." });
  }
  try {
    execFile(
      "git",
      ["clone", req.body.repoLink, "./uploadDatabase/" + "temporaryGitClone"],
      (error, stdout, stderr) => {
        if (error) {
          console.error("stderr", stderr);
          throw error;
        }
        //For debugging purposes on the backend
        console.log("stdout", stdout);
        console.error(`stderr: ${stderr}`);
        const options = {
          algo: "sha256",
          encoding: "hex",
          files: {
            exclude: ["*"],
          },
          folders: {
            exclude: ["*"],
          },
        };
        hashElement("./temporaryGitClone", "./uploadDatabase/", options).then(
          (hash) => {
            //--Insert code to check duplicate
            console.log(hash.hash);
            uploadFiles.checkDuplicateUpload(
              hash.hash,
              function (err1, result) {
                if (err1) {
                  res.status(500).send({ message: "Server error." });
                } else {
                  if (result) {
                    console.log(result);
                    console.log(
                      "Database already exist, sending response back to frontend."
                    );
                    res
                      .status(409)
                      .send({ message: "Repository already exist on server." });
                  } else {
                    console.log(result);
                    var matchRepoName =
                      /^(?:git@|https:\/\/)github.com[:/](.*).git$/;
                    var data = {
                      projectName: repoLink.match(matchRepoName)[1],
                      hash: hash.hash,
                    };
                    uploadFiles.updateUploadFilesInfo(
                      data,
                      function (err3, results) {
                        if (err3) {
                          res.status(500).send({ message: "Server error." });
                        } else {
                          fs.rename(
                            "./uploadDatabase/temporaryGitClone",
                            "./uploadDatabase/" + results.insertId,
                            function (err2) {
                              if (err2) {
                                console.log(
                                  "Error renaming temporaryGitClone to its hash."
                                );
                                uploadFiles.deleteUploadFiles(
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
                      }
                    );
                  }
                }
              }
            );
          }
        );
        // ----Insert code for renaming repository folder----
      }
    );
  } catch (error) {
    res.status(500).send({ message: "Server error." });
  }
};

exports.getExistingProject = (req, res) => {
  printDebugInfo("/teamname/api/getExistingProject", req);

  uploadFiles.getExistingProject(function (err, result) {
    if (!err) {
      res.status(200).send(result);
    } else {
      var output = {
        error: "Unable to get all the existing project information",
      };
      res.status(500).send(JSON.stringify(output));
    }
  });
};