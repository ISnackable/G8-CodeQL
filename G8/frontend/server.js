const express = require("express");
const serveStatic = require("serve-static");
const { createProxyMiddleware } = require("http-proxy-middleware");
const app = express();

app.use(serveStatic(__dirname + "/build"));
app.use(
  "/g8/api",
  createProxyMiddleware({
    target: "http://backend:8080/",
    changeOrigin: true,
  })
);
app.get("*", (req, res) => {
  res.status(404).redirect("/#/404");
});
var port = process.env.PORT || 5000;
app.listen(port);
