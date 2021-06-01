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
// http://localhost/api/createDatabase

// Query current CodeQl database number in the counter
router.get("/query", apiController.createDatabase);

router.get("/createDatabase2", apiController.createDatabase2);

module.exports = router; // https://expressjs.com/en/4x/api.html#app.mountpath Explains sub-app mount
