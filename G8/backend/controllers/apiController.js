console.log("------------------------------------");
console.log("controllers > apiController.js");
console.log("------------------------------------");

// --------------------------------------------------
// load modules
// --------------------------------------------------
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const { hashElement } = require("folder-hash");
const lineReader = require("line-reader");

// --------------------------------------------------
// end points
// --------------------------------------------------

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

  // hashElement(<Folder name>, <Directory>, <options>)
  hashElement("./database22", path.join(__dirname, "."), options).then(
    (hash) => {
      // Shows the database being hashed
      console.log(hash.toString());

      // eachLine is a function from the line-reader package
      // This function allows us to read each line in a txt file
      // line = content from the line the function is reading
      // last = boolean, returns true or false depending if the function is reading the last line of the file
      lineReader.eachLine("hash.txt", function (line, last) {
        console.log("Hash: " + line);

        // Checking if the line read matches the hash of the folder we are comparing
        if (line == hash.hash) {
          console.log("Hash matched: " + hash.hash);
          console.log("Database Exists");
          return false; // stop reading
        } else {
          if (last == true) {
            // last returns true when the file is being read at the last line
            fs.appendFile("hash.txt", hash.hash + "\n", function (err) {
              // Appends the hash to a new line of the file
              if (err) throw err; // Error checking for appendFile
              console.log("File does not exist");

              // CodeQL Databases are not allowed to have the same name, or an error will occur

              // Solution to solve the clashing of database names
              // Making a counter to append to the database name

              // Counter from the number of hashes there are
              var data = fs.readFileSync("hash.txt");
              var counter = data.toString().split("\n").length - 1;
              console.log("Current Counter: " + counter);

              // Starts a shell to run the codeql create database command
              // Appends the number of hashes there are to database name
              // E.g. counter = 10, database name = database10
              // Change directory path as necessary
              exec(
                "codeql database create ../database/database" +
                  counter +
                  " --source-root=./ --language=javascript",
                (error, stdout, stderr) => {
                  // Errors for troubleshooting
                  if (error) {
                    console.error(`exec error: ${error}`);
                    return;
                  }
                  console.log(`stdout: ${stdout}`);
                  console.error(`stderr: ${stderr}`);
                }
              );
            });
          }
        }
      });
    }
  );
};

// Query current database number in the counter
exports.query = (req, res) => {
  // Counter from the number of hashes there are
  var data = fs.readFileSync("hash.txt");
  var counter = data.toString().split("\n").length - 1;
  console.log("Current Counter: " + counter);

  // Command for running the CodeQL query
  // Change directory path as necessary
  exec(
    'codeql database analyze --format="sarifv2.1.0"  --output="./scan.sarif" ./controller/database' +
      counter +
      " ../../codeql/javascript/ql/src/codeql-suites/javascript-code-scanning.qls --search-path ../../codeql/misc/suite-helpers",
    (error, stdout, stderr) => {
      // Errors for troubleshooting
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
    }
  );
};
