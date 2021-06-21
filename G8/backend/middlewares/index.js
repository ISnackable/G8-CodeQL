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
    algo: "md5",
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
  projectDB.insertProcessing(id,(err,result)=>{
    if(err){
      console.log(err);
      res.status(500).send("Something went wrong! Server side.")
      return;
    }
  })

  
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
      projectDB.insertSarifFilenameError(id,(err,result)=>{
        if(err){
          console.log(err);
          res.status(500).send("Something went wrong! Server side.")
          return
        }
      })
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
