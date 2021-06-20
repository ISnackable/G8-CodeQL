console.log("------------------------------------");
console.log("models > projects.js");
console.log("------------------------------------");

// ---------------------------------------------------------
// load modules
// ---------------------------------------------------------
var db = require("./databaseConfig.js");
// ---------------------------------------------------------
// functions
// ---------------------------------------------------------

var projectDB = {
  getProject: function (callback) {
    console.log("projectDB.getProject() ...");
    var sql = "SELECT * FROM g8.projects";
    db.query(sql, [], function (err, result) {
      if (err) {
        console.log(err);
        return callback(err, null);
      } else {
        return callback(null, result);
      }
    });
  },
  // getProject: function (callback) {
  //   console.log("projectDB.getProject() ...");
  //   let sql = "SELECT id FROM g8.projects";
  //   db.query(sql, function (err, result) {
  //     if (err) {
  //       console.log(err);
  //       return callback(err, null);
  //     } else {
  //       console.log(result);
  //       if (result.length == 0) {
  //         return callback(null, null);
  //       } else {
  //         return callback(null, result);
  //       }
  //     }
  //   });
  // },
  getProjectId: function (id, callback) {
    console.log("projectDB.getProjectId() ...");

    // displaying all properties of a certain project
    var sql = "SELECT * FROM g8.projects WHERE id = ?";

    db.query(sql, [id], function (err, result) {
      if (err) {
        console.log(err);
        return callback(err, null);
      } else {
        if (result.length == 0) {
          return callback(null, result);
        } else {
          return callback(null, result[0]);
        }
      }
    });
    console.log("end of getProjectId()");
  },
  getProjectHash: function (fileChecksum, callback) {
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
  addProject: function (data, callback) {
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
  removeProject: function (id, callback) {
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
  getSarifFileName: function (sarif_filename, callback) {
    console.log("projectDB.getSarifFileName() ...");
    let sql = "SELECT * FROM projects WHERE sarif_filename = ?";
    db.query(sql, [sarif_filename], function (err, result) {
      if (err) {
        console.log(err);
        return callback(err, null);
      } else {
        if (result.length == 0) {
          return callback(null, result);
        } else {
          return callback(null, result[0]);
        }
      }
    });
    console.log("end of getSarifFileName()");
  },
  insertSarif: function (sarif_filename, id, callback) {
    console.log("projectDB.insertSarif()");

    let sql = "UPDATE projects SET sarif_filename = ? WHERE id = ?";
    db.query(sql, [sarif_filename, id], function (err, result) {
      if (err) {
        console.error(err);
        return callback(err, null);
      } else if (result.affectedRows == 1) {
        console.log("Sarif file name added to database");
        return callback(null, result);
      } else {
        console.log("Database update failed.");
        return callback(null, result.affectedRows);
      }
    });
  },
};

module.exports = projectDB;