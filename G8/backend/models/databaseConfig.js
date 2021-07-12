console.log("------------------------------------");
console.log("models > databaseConfig.js");
console.log("------------------------------------");
// ---------------------------------------------------------
// load modules
// ---------------------------------------------------------

const mariadb = require("mariadb/callback");
const config = require("../config");

// attempt to get a connection to the DB
var conn = mariadb.createConnection({
  host: config.db_host,
  user: config.db_user,
  password: config.db_pwd,
  database: config.db_name,
  dateStrings: true,
});

conn.connect(function (err) {
  if (err) {
    console.log("Error connecting database: " + err.stack);
  } else {
    console.log("Database connected");
  }
});

module.exports = conn;
