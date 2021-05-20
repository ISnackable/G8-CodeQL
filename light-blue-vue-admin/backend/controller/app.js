console.log("-----------------------------------------");
console.log("Class: DISM/FT/3A/03")
console.log("-----------------------------------------");
console.log("DISM FYP 2021 GRP 8")
console.log("-----------------------------------------");

// --------------------------------------------------
// load modules
// --------------------------------------------------
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const { exec } = require('child_process');

// --------------------------------------------------
// end points
// --------------------------------------------------

// Create Database
app.get('/createDatabase', function (req, res) {
   
   // Solution to solve the clashing of database names
   // Making a local counter to append to the database name

   // Reads local counter file which is in txt
   // Returns the contents/counter in the txt file --> databasecount.txt
   counter = fs.readFileSync('databasecount.txt', 'utf8', function(err, data) {
    data2 = data.toString();
    return parseInt(data2);
   })
   

   // Parses the counter into a integer to allow increment of 1
   var counter2 = parseInt(counter) + 1;
   console.log("Counter: " + counter2);
   
   // Edits counter file and replaces current count in file with an increment of 1
   fs.writeFile('databasecount.txt', parseInt(counter2), function(err) {
    if (err) throw err;
    console.log("New counter written in file.")
   })

   // Starts a shell to run the codeql create database command
   // Source root still needs fixing (Currently taking in current directory as a database)
   exec('codeql database create database' + counter2 + ' --source-root=./ --language=javascript')
});


app.get('/query', function (req, res) {

   counter = fs.readFileSync('databasecount.txt', 'utf8', function(err, data) {
      data2 = data.toString();
      return parseInt(data2);
     })
   
   // Not working
   exec('codeql database analyze --ram=8000 --threads=4 --format="sarifv2.1.0"  --output="./javascript-security-extended.sarif" .\database' + counter + '\ ..\..\..\codeql\javascript\ql\src\codeql-suites\javascript-code-scanning.qls --search-path ..\..\..\codeql\misc\suite-helpers')
});