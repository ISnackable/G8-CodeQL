console.log("------------------------------------");
console.log("middlewares > index.js");
console.log("------------------------------------");
// ------------------------------------------------------
// load modules
// ------------------------------------------------------
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const { exec, execFile } = require("child_process");
const { hashElement } = require("folder-hash");
const uploadFiles = require("../models/uploadFiles.js");

// ------------------------------------------------------
// Multer config
// ------------------------------------------------------
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let filePath = path.posix.normalize(file.originalname);
    let { dir, name } = path.parse(filePath);

    let projectId = req.id;
    if (!req.projectName) {
      req.projectName = dir ? dir.split("/")[1] : name;
    }

    let newDestination = `uploads/${projectId}/${dir}`;
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
const middleware = {};

module.exports = middleware;
module.exports.upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  preservePath: true,
  limits: {
    fieldSize: 0,
    files: 100,
  },
});

module.exports.checkDuplicateProject = (req, res, next) => {
  let projectId = req.id;
  let projectName = req.projectName;

  const options = {
    algo: "md5",
    encoding: "hex",
    folders: {
      ignoreRootName: true,
    },
  };

  hashElement(`./uploads/${projectId}`, options).then((hash) => {
    //--Insert code to check duplicate
    console.log(hash.hash);
    uploadFiles.checkDuplicateUpload(hash.hash, function (err, result) {
      if (err) {
        res.status(500).send({ message: "Internal Server Error" });
      } else {
        if (result) {
          try {
            //Deletes or try to delete temporary folder before using
            fs.rmdirSync(`./uploads/${projectId}`, { recursive: true });
          } catch (err) {
            console.error(`Error while deleting ./uploads/${projectId}.`);
          }
          console.log(`./uploads/${projectId} is deleted!`);
          console.log(
            "Database already exist, sending response back to frontend."
          );

          // delete db
          uploadFiles.deleteUploadFiles(projectId, function (err2, results) {
            if (err2) {
              console.error(err3);
            }
          });
          res.status(409).send({ message: "Project already exist on server." });
        } else {
          let data = {
            id: projectId,
            projectName: projectName,
            hash: hash.hash,
          };
          uploadFiles.updateUploadFilesInfo1(data, function (err3, results) {
            if (!err3) {
              console.log(results);
              res.status(201).send({
                message: "Success. File loaded onto backend",
                projectID: results.insertId,
              });
            } else {
              res.status(500).send({ message: "Internal Server Error" });
              console.error(err3);
            }
          });
        }
      }
    });
  });
};
