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
var DB = {
  insertDB: function (hash, callback) {
    console.log("g8.projects.insertDB()...");
    var sql = "SELECT hash FROM projects WHERE hash LIKE ?";

    db.query(sql, [hash], function (err, results) {
      if (err) {
        console.error(err);
        return callback(err, null);
      } else {
        if (results.length > 0) {
          console.log("The folder provided already exists in the database.");
          return callback(null, null);
        } else {
          var sql = `
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
module.exports = DB;

// updateUser: function (user, callback) {
//     console.log("userDB.updateUser() ...");

//     var sql = 'SELECT userid, username, email, profile_pic_url, created_at FROM user WHERE username LIKE ? AND NOT userid = ?';

//     db.query(sql, [user.username, user.id], function (err, result) {
//         if (err) {
//             console.error(err);
//             return callback(err, null);
//         } else {
//             if (result.length > 0) {
//                 console.log("The new username provided already exists.");
//                 return callback(null, null);
//             }
//             else {
//                 var sql = 'UPDATE user SET username = ?, email = ?, profile_pic_url = ? WHERE userid = ?';

//                 db.query(sql, [user.username, user.email, user.profile_pic_url, user.id], function (err, result) {
//                     if (err) {
//                         console.error(err);
//                         return callback(err, null);
//                     } else if (result.affectedRows == 1) {
//                         console.log("Updated successfully.")
//                         return callback(null, result.affectedRows);
//                     } else {
//                         console.log("Update failed.")
//                         return callback(null, result.affectedRows);
//                     }
//                 });
//             }
//         }
//     });
// },

// // Update a single user. ID and created timestamp should not be updatable. PUT Request
// exports.user_update = (req, res) => {

//     var myUser = {
//         id: req.params.id,
//         username: req.body.username,
//         email: req.body.email,
//         profile_pic_url: req.body.profile_pic_url
//     };

//     userDB.updateUser(myUser, function (err, result) {
//         if (!err) {
//             if (result) {
//                 res.status(204).send("No Content");
//             }
//             else {
//                 // The new username provided already exists.
//                 res.status(422).send("Unprocessable Entity");
//             }
//         } else {
//             if (err.code == 'ER_BAD_NULL_ERROR') {
//                 res.status(400).send("Bad Request");
//             }
//             else {
//                 res.status(500).send("Internal Server Error");
//             }
//         }
//     });
// };
