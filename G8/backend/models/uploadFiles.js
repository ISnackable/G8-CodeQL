console.log("---------------------------");
console.log("uploadFiles.js");
console.log("---------------------------");
//----------------------------------------
// load modules
//----------------------------------------
var db = require("./databaseConfig.js");
//----------------------------------------
// functions
//----------------------------------------
var uploadFiles = {
  checkDuplicateUpload: function (fileChecksum, callback) {
    console.log("Checking whether database already exist.");
    let sql = "SELECT * from g8.projects WHERE hash=?;"; //Returns 1 if exist else 0
    db.query(sql, [fileChecksum], function (err, result) {
      if (err) {
        //err
        return callback(err, null);
      } else {
        console.log(result.length);
        if (result.length) {
          //1=true=exist
          return callback(null, true);
        } else {
          //0=false=dont-exist
          return callback(null, false);
        }
      }
    });
  },
  updateUploadFilesInfo: function (data, callback) {
    console.log("Checking whether database already exist.");
    let sql = "INSERT INTO projects (project_name,hash) VALUES(?,?);"; //Returns 1 if exist else 0
    db.query(sql, [data.projectName, data.hash], function (err, result) {
      if (err) {
        //err
        return callback(err, null);
      } else {
        return callback(null, result);
      }
    });
  },
  deleteUploadFiles: function (id, callback) {
    console.log("Deleting project ID:" + id);
    let sql = "DELETE FROM projects WHERE (`id` = ?)";
    db.query(sql, id, function (err, result) {
      if (err) {
        return callback(err, null);
      } else {
        return callback(null, result);
      }
    });
  },
  createNewProject: function (callback) {
    console.log("creating new project");
    let sql = "INSERT INTO projects (`id`) VALUES (NULL);";
    db.query(sql, function (err, result) {
      if (err) {
        return callback(err, null);
      } else {
        console.log(result);
        return callback(null, result);
      }
    });
  },
  updateUploadFilesInfo1: function (data, callback) {
    console.log("Checking whether database already exist.");
    let sql = "UPDATE projects SET project_name = ?, hash = ? WHERE id = ?;";
    db.query(
      sql,
      [data.projectName, data.hash, data.id],
      function (err, result) {
        if (err) {
          //err
          return callback(err, null);
        } else {
          return callback(null, result);
        }
      }
    );
  },

  getExistingProject: function (callback) {

    console.log("uploadFiles.getExistingProject() ...");
    var sql = 'SELECT * FROM g8.projects';
    db.query(sql, [], function (err, result) {
        if (err) {
            console.log(err);
            return callback(err, null);
        } 
        else {
            return callback(null, result);
        }
    });
},

getProjectId: function (id, callback) {
  console.log("uploadFiles.getProjectId() ...");

  // displaying all properties of a certain project
  var sql = 'SELECT * FROM g8.projects WHERE id = ?';

  db.query(sql, [id], function (err, result) {
      if (err) {
          console.log(err);
          return callback(err, null);
      } 
      else {
          if (result.length == 0) {
              return callback(null, result);
          }
          else {
              return callback(null, result[0]);
          }
      }
  });
  console.log("end of getProjectId()");
},

};

module.exports = uploadFiles;
