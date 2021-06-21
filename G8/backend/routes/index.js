console.log("------------------------------------");
console.log("routes > index.js");
console.log("------------------------------------");

// ------------------------------------------------------
// load modules
// ------------------------------------------------------
const express = require("express");
const api = require("./api");
const router = express.Router();

// ------------------------------------------------------
// MF config / end points
// ------------------------------------------------------
router.use("/api", api);

// move frontend html to here
// GET, POST, PUT, DELETE, or any other HTTP request method for any other routes
router.all("*", (req, res) => {
  res.status(404).send("Url not found!");
});

module.exports = router; // https://expressjs.com/en/4x/api.html#router, https://expressjs.com/en/4x/api.html#app.mountpath Explains sub-app mount
