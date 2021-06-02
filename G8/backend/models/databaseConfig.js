console.log("-----------------------------------------");
console.log("Class: DISM/FT/3A/03");
console.log("-----------------------------------------");
console.log("DISM FYP 2021 GRP 8");
console.log("-----------------------------------------");

// ---------------------------------------------------------
// load modules
// ---------------------------------------------------------

const mysql = require("mysql");
const config = require("../config");

// attempt to get a connection to the DB
var conn = mysql.createConnection({
  host: "mysql",
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
