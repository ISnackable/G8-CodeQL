/*
    App entry point
    Acts as the main file of the project where you initialize the app and other elements of the project.
*/
console.log("------------------------------------");
console.log("Class: DISM/FT/3A/03");
console.log("------------------------------------");
console.log("DISM FYP 2021 GRP 8");
console.log("------------------------------------");

// --------------------------------------------------
// load modules
// --------------------------------------------------
const fs = require("fs");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const config = require("./config");
const routes = require("./routes");
const app = express();

// ------------------------------------------------------
// Entry point Setup
// ------------------------------------------------------
// force to create databases folder if it does not exist
fs.access("./databases", fs.F_OK, (err) => {
  if (err) {
    console.log("'databases' folder does not exist, attempting to create it");
    fs.mkdirSync("./databases");
    console.log("Created 'databases' folder");
  }
});

// force to create SarifFiles folder if it does not exist
fs.access("./SarifFiles", fs.F_OK, (err) => {
  if (err) {
    console.log("'SarifFiles' folder does not exist, attempting to create it");
    fs.mkdirSync("./SarifFiles");
    console.log("Created 'SarifFiles' folder");
  }
});

// force to create Snapshots folder if it does not exist
fs.access("./Snapshots", fs.F_OK, (err) => {
  if (err) {
    console.log("'Snapshots' folder does not exist, attempting to create it");
    fs.mkdirSync("./Snapshots");
    console.log("Created 'Snapshots' folder");
  }
});

// --------------------------------------------------
// MF configuration
// --------------------------------------------------
app.disable("x-powered-by");
app.use(morgan(`:remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] \n\n------------------------------------\n`));
app.use(cors({ exposedHeaders: ["Content-Disposition"] }));
// express has the body parser built in so can call it directly
app.use(express.urlencoded({ extended: false })); // extended false for no object (security reason)
app.use(express.json());
app.use("/g8", routes);

// ------------------------------------------------------
// main
// ------------------------------------------------------
function startServer() {
  try {
    app.listen(config.port, () => {
      console.log(`Server started and accessible via http://localhost:${config.port}/`);
    });
  } catch (err) {
    console.error(err);
  }
}
startServer();
