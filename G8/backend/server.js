console.log("-----------------------------------------");
console.log("Class: DISM/FT/3A/03")
console.log("-----------------------------------------");
console.log("DISM FYP 2021 GRP 8")
console.log("-----------------------------------------");

// --------------------------------------------------
// load modules
// --------------------------------------------------
var app = require('./controller/app.js');
var db = require('./model/databaseConfig.js');

// --------------------------------------------------
// configuration
// --------------------------------------------------
const hostname = 'localhost';
const port = 8081;


// --------------------------------------------------
// main
// --------------------------------------------------
var server = app.listen(port, function () {
    //                                     |---------|
    console.log('Web App Hosted at http://%s:%s',hostname, port);
    //                                        |--------------|
});