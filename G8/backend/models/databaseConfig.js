console.log("-----------------------------------------");
console.log("Class: DISM/FT/3A/03");
console.log("-----------------------------------------");
console.log("DISM FYP 2021 GRP 8");
console.log("-----------------------------------------");

// ---------------------------------------------------------
// load modules
// ---------------------------------------------------------

  var mysql = require('mysql');

  // attempt to get a connection to the DB
  var conn = mysql.createConnection({
      host: "localhost",
      //port: "/Applications/MAMP/tmp/mysql/mysql.sock", <<< ONLY IF YOU NEED IT
      user: "root", // REPLACE 'root' WITH YOUR USER
      password: "", // <<<< INSERT PASSWORD
      database: "g8",
      multipleStatements: true,
      dateStrings: true
  });
  
          conn.connect(function (err) {
              if (err) {
                  console.log("Error connecting database: " + err.stack);
              }
              else {
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
