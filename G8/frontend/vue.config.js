let publicPath = process.env.NODE_ENV === "production" ? "/" : "G8/";

module.exports = {
  publicPath,
  productionSourceMap: false,
};
