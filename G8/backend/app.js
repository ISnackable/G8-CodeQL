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
const cors = require("cors");
const config = require("./config");
const routes = require("./routes");
const db = require("./models/databaseConfig.js");
const app = express();

app.disable("x-powered-by");
// --------------------------------------------------
// MF configuration
// --------------------------------------------------

app.use(cors());
// express has the body parser built in so can call it directly
app.use(express.urlencoded({ extended: false })); // extended false for no object (security reason)
app.use(express.json());
app.use("/teamname", routes);

// ------------------------------------------------------
// main
// ------------------------------------------------------
function startServer() {
  try {
    app.listen(config.port /*, config.hostname*/, () => {
      console.log(
        `Server started and accessible via http://${config.hostname}:${config.port}/`
      );
    });
  } catch (err) {
    console.error(err);
  }
}
startServer();
