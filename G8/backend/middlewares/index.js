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
    let { root, dir, base, ext, name } = path.parse(filePath);
    console.log("=================================");
    console.log(filePath);
    console.log(`> root: ${root}`);
    console.log(`> dir: ${dir}`);
    console.log(`> base: ${base}`);
    console.log(`> ext: ${ext}`);
    console.log(`> name: ${name}`);
    console.log("=================================");

    var newDestination = `uploads/5${dir}`;
    var stat = null;
    try {
      stat = fs.statSync(newDestination);
    } catch (err) {
      fs.mkdirSync(newDestination, { recursive: true });
    }
    if (stat && !stat.isDirectory()) {
      throw new Error(
        'Directory cannot be created because an inode of a different type exists at "' +
          newDestination +
          '"'
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
  // console.log("Servicing " + req.url + " ..");
  // console.log("> req.params: " + JSON.stringify(req.params));
  // console.log("> req.body: " + JSON.stringify(req.body));
  // console.log(file);

  // https://nodejs.org/zh-cn/knowledge/file-system/security/introduction/
  let rootDirectory = "/var/www/uploads";
  let filename = file.originalname.split(path.sep).join(path.posix.sep);
  let filePath = path.posix.join(rootDirectory, filename);

  if (file.originalname.indexOf("\0") !== -1) {
    return cb(new Error("path contains a illegal null byte character"), false);
  } else if (!/^[\w\-]+$/.test(file.name)) {
    return cb(new Error("filename contains illegal character"), false);
  } else if (filePath.indexOf(rootDirectory) !== 0) {
    return cb(new Error("trying to sneak out of the web root?"), false);
  }

  console.log(file);

  return cb(null, true);
  // The function should call `cb` with a boolean
  // to indicate if the file should be accepted
  // var ext = path.extname(file.originalname);
  if (file.mimetype !== "image/jpeg" || (ext !== ".jpg" && ext !== ".JPG")) {
    req.fileValidationError = "Only .jpg images are allowed";
    return cb(new Error("Only .jpg images are allowed"), false);
  }
}

// ------------------------------------------------------
//  middleware functions
// ------------------------------------------------------
const middleware = {};

module.exports = middleware;
module.exports.upload = multer({
  storage: storage,
  preservePath: true,
  fileFilter: fileFilter,
});
