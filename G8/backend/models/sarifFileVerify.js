console.log("---------------------------");
console.log("sarifFileVerify.js");
console.log("---------------------------");

//----------------------------------------
// load modules
//----------------------------------------
var db = require('./databaseConfig.js');

//----------------------------------------
// functions
//----------------------------------------
var sarifFileVerifyDB = {
    getSarifFileName: function (sarif_filename, callback) {
        console.log("sarifFileVerifyDB.getSarifFileName() ...");
        var sql = 'SELECT * FROM projects WHERE sarif_filename = ?';
        db.query(sql, [sarif_filename], function (err, result) {
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
        console.log("end of getSarifFileName()");
    }
};

//----------------------------------------
// export
//----------------------------------------
module.exports = sarifFileVerifyDB;