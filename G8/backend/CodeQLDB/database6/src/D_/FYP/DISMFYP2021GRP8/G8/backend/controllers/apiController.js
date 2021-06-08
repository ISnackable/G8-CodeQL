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
const lineReader = require("line-reader");
const createDB = require("../models/createDB.js");

// --------------------------------------------------
// end points
// --------------------------------------------------

// Read up https://dzone.com/articles/understanding-execfile-spawn-exec-and-fork-in-node

// Query current database number in the counter
exports.query = (req, res) => {
  // Counter from the number of hashes there are
  // var data = fs.readFileSync("hash.txt");
  // var counter = data.toString().split("\n").length - 1;
  // console.log("Current Counter: " + counter);
  var id = req.params.id;

  createDB.insertSarif(`${id}.sarif`, id, function (err, result) {
    if (!err) {
      if (result) {
        // if result == There are no existing databases with the same hash
        // Change directory path as necessary
        const args = [
          "database", // first argv
          "analyze", // second argv
          "--quiet", // suppress output, Incrementally decrease the number of progress messages printed
          "--format=sarifv2.1.0", // set the result output to SARIF v2.1.0 format
          `--output=../SarifFiles/${id}.sarif`, // output file as scan.sarif
          "--search-path=../../codeql/misc/suite-helpers", // the list of directories under which QL packs may be found
          "--sarif-add-snippets", // include code snippets for each location mentioned in the results
          `./CodeQLDB/database${id}`, // our database to scan
          "../../codeql/javascript/ql/src/codeql-suites/javascript-security-extended.qls", // maybe change? seem like different QL pack use different suite-helpers
        ];
        // Command to create a database
        // result.insertId is the ID of the database inserted
        execFile("codeql", args, (error, stdout, stderr) => {
          if (error) {
            console.error("stderr", stderr);
            throw error;
          }
          console.log("stdout", stdout);
          console.error(`stderr: ${stderr}`);
        });
        // exec(
        //   'codeql database analyze --format="sarifv2.1.0"  --output="./scan.sarif" ./database' +
        //     counter +
        //     " ../../codeql/javascript/ql/src/codeql-suites/javascript-code-scanning.qls --search-path ../../codeql/misc/suite-helpers",
        //   (error, stdout, stderr) => {
        //     // Errors for troubleshooting
        //     if (error) {
        //       console.error(`exec error: ${error}`);
        //       return;
        //     }
        //     console.log(`stdout: ${stdout}`);
        //     console.error(`stderr: ${stderr}`);
        //   }
        // );
        res.status(204).send("Database updated with sarif file name");
      } else {
        res
          .status(422)
          .send("The database does not exist.");
      }
    } else {
      if (err.code == "ER_BAD_NULL_ERROR") {
        res.status(400).send("Bad Request");
      } else {
        res.status(500).send("Internal Server Error");
      }
    }
  });
};

// Create Database
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
  hashElement("../config", path.join(__dirname, "."), options).then((hash) => {
    // Shows the database being hashed

    // Connects to SQL database and compares existing hashes
    createDB.insertDB(hash.hash, function (err, result) {
      if (!err) {
        if (result) {
          // if result == There are no existing databases with the same hash
          const args = [
            "database", // first argv
            "create", // second argv
            `./CodeQLDB/database${result.insertId}`, // database name to be created
            "--source-root=./", // source code folder
            "--language=javascript", // programming language
          ];
          // Command to create a database
          // result.insertId is the ID of the database inserted
          execFile("codeql", args, (error, stdout, stderr) => {
            if (error) {
              console.error("stderr", stderr);
              throw error;
            }
            console.log("stdout", stdout);
            console.error(`stderr: ${stderr}`);
          });
          // exec(
          //   "codeql database create .database" +
          //     result.insertId +
          //     " --source-root=./ --language=javascript",
          //   (error, stdout, stderr) => {
          //     // Errors for troubleshooting
          //     if (error) {
          //       console.error(`exec error: ${error}`);
          //       return;
          //     }
          //     console.log(`stdout: ${stdout}`);
          //     console.error(`stderr: ${stderr}`);
          //   }
          // );
          res.status(204).send("Database updated with new hash.");
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
