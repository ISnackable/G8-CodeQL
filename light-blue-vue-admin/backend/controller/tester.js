const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

const { exec } = require('child_process');
counter = fs.readFileSync('databasecount.txt', 'utf8', function(err, data) {
 data2 = data.toString();
 return parseInt(data2);
})

var counter2 = parseInt(counter) + 1;
console.log("Counter: " + counter2);

fs.writeFile('databasecount.txt', parseInt(counter2), function(err) {
 if (err) throw err;
 console.log("Counter + 1")
})

exec('codeql database create database' + counter2 + ' --source-root=./ --language=javascript')

// counter = fs.readFileSync('databasecount.txt', 'utf8', function(err, data) {
//     data2 = data.toString();
//     return parseInt(data2);
//    })

//  const { exec } = require('child_process');

//  exec('codeql database analyze --ram=8000 --threads=4 --format="sarifv2.1.0"  --output="./scan.sarif" .\database' + counter + '\ ..\..\..\codeql\javascript\ql\src\codeql-suites\javascript-code-scanning.qls --search-path ..\..\..\codeql\misc\suite-helpers')