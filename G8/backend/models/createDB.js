console.log("------------------------------------");
console.log("controllers > apiController.js");
console.log("------------------------------------");

// ---------------------------------------------------------
// load modules
// ---------------------------------------------------------
var db = require("./databaseConfig.js");
// ---------------------------------------------------------
// functions
// ---------------------------------------------------------
var apiDB = {
  insertDB: function (hash, callback) {
    console.log("g8.projects.insertDB()...");
    // refrain from using "LIKE"? incase of similar hashes
    let sql = "SELECT hash FROM projects WHERE hash = ?";

    db.query(sql, [hash], function (err, results) {
      if (err) {
        console.error(err);
        return callback(err, null);
      } else {
        if (results.length > 0) {
          console.log("The folder provided already exists in the database.");
          return callback(null, null);
        } else {
          let sql = `
                        INSERT INTO 
                            projects
                            (hash)
                        VALUES
                            (?)`;

          db.query(sql, [hash], function (err, result) {
            if (err) {
              console.error(err);
              return callback(err, null);
            } else if (result.affectedRows == 1) {
              console.log("Database updated successfully.");
              return callback(null, result);
            } else {
              console.log("Database update failed.");
              return callback(null, result.affectedRows);
            }
          });
        }
      }
    });
  },
};

// ---------------------------------------------------------
// export
// ---------------------------------------------------------

module.exports = apiDB;
