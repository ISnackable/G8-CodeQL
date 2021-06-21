var express = require("express");
var serveStatic = require("serve-static");

var app = express();
app.use(serveStatic(__dirname + "/build"));
app.get("*", (req, res) => {
  res.status(404).redirect("/#/404");
});
var port = process.env.PORT || 5000;
app.listen(port);
