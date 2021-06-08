console.log("------------------------------------");
console.log("controllers > apiController.js");
console.log("------------------------------------");

// --------------------------------------------------
// load modules
// --------------------------------------------------
const fs = require("fs");
const path = require("path");
const { exec, execFile } = require("child_process");
const { hashElement } = require("folder-hash");
const createDB = require("../models/createDB.js");
const sarifFileVerify = require("../models/sarifFileVerify.js");

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
// http://localhost:8080/checkAnalysis
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
    algo: "sha256",
    encoding: "hex",
    files: {
      exclude: ["*"],
    },
    folders: {
      exclude: ["*"],
    },
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
