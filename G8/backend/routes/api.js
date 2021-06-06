console.log("------------------------------------");
console.log("routes > api.js");
console.log("------------------------------------");

// ------------------------------------------------------
// load modules
// ------------------------------------------------------
const express = require("express");
const router = express.Router();
const apiController = require("../controllers/apiController");

// ------------------------------------------------------
// end points
// ------------------------------------------------------
// Create CodeQL database
router.get("/createDatabase", apiController.createDatabase);
// http://localhost/teamname/api/createDatabase

// Query current CodeQl database number in the counter
router.get("/query", apiController.query);

// obtain all the projectid to display on the frontend 
router.get("/projectid", apiController.projectid)

module.exports = router; // https://expressjs.com/en/4x/api.html#app.mountpath Explains sub-app mount
