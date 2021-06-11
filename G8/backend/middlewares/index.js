console.log("------------------------------------");
console.log("middlewares > index.js");
console.log("------------------------------------");
// ------------------------------------------------------
// load modules
// ------------------------------------------------------
const fs = require("fs");
const path = require("path");
const multer = require("multer");

// ------------------------------------------------------
// Multer config
// ------------------------------------------------------
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let filePath = path.posix.normalize(file.originalname);
    let { dir } = path.parse(filePath);
    let newDestination = `uploads/5${dir}`;
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

  console.error(filename);
  if (filename.indexOf("\0") !== -1) {
    req.fileValidationError = "path contains a illegal null byte character";
    return cb(new Error("path contains a illegal null byte character"), false);
  } else if (!/^[\w/\-\.]+$/.test(filename)) {
    req.fileValidationError = "filename contains illegal character";
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
