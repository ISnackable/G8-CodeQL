console.log("-----------------------------------------");
console.log("Class: DISM/FT/3A/03");
console.log("-----------------------------------------");
console.log("DISM FYP 2021 GRP 8");
console.log("-----------------------------------------");

// ---------------------------------------------------------
// load modules
// ---------------------------------------------------------

var mysql = require("mysql");
const config = require("../config");

// attempt to get a connection to the DB
var conn = mysql.createPool({
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
// try {
// const result = await session.run(query, params);

// console.log(result);
// console.log(JSON.stringify(result));
// const singleRecord = result.records[0];
// const node = singleRecord.get(0);

// console.log(node.properties.name);
// }
// finally {
// await session.close();
// }

// // on application exit:
// await driver.close()
