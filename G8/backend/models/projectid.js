console.log("------------------------------------");
console.log("models > projectid.js");
console.log("------------------------------------");

// ---------------------------------------------------------
// load modules
// ---------------------------------------------------------
var db = require("./databaseConfig.js");
// ---------------------------------------------------------
// functions
// ---------------------------------------------------------

var projectDB = {
  projectid: function (callback) {
    console.log("projectDB.prtojectid() ...");
    var sql = "SELECT id FROM g8.projects";
    db.query(sql, function (err, result) {
      if (err) {
        console.log(err);
        return callback(err, null);
      } else {

        console.log(result);
        if (result.length == 0) {
          return callback(null, null);
        } else {
          return callback(null, result);
        }
      }
    });
  },
};

module.exports = projectDB;
