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
  host: "localhost",
  // host: "mariadb",
  user: config.username,
  password: config.password,
  database: config.database,
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
