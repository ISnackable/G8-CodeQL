/*
    App entry point
    Acts as the main file of the project where you initialize the app and other elements of the project.
*/
console.log("-----------------------------------------");
console.log("Class: DISM/FT/3A/03");
console.log("-----------------------------------------");
console.log("DISM FYP 2021 GRP 8");
console.log("-----------------------------------------");

// --------------------------------------------------
// load modules
// --------------------------------------------------
const express = require("express");
const config = require("./config");
const routes = require("./routes");
// const db = require("./model/databaseConfig.js");
const app = express();

// --------------------------------------------------
// MF configuration
// --------------------------------------------------
app.use(express.urlencoded({ extended: false })); // extended false for no object (security reason)
app.use(express.json());
app.use(routes);

// ------------------------------------------------------
// main
// ------------------------------------------------------
function startServer() {
  try {
    let hostname = process.env.hostname = "localhost";
    let port = process.env.port = 8080;

    app.listen(port, hostname, () => {
      console.log(
        `Server started and accessible via http://${hostname}:${port}/`
      );
    });
  } catch (err) {
    console.error(err);
  }
}
startServer();
