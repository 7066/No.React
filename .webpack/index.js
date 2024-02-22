const { merge } = require("webpack-merge");
const config = require("./webpack.config");
const development = require("./webpack.dev");
const production = require("./webpack.prod");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

module.exports = (env) => {
  let url = ".env";
  if (env.development) url += ".development";
  if (env.production) url += ".production";

  dotenv.config({
    path: fs.existsSync(path.resolve(__dirname, url)),
  });

  switch (true) {
    case env.development:
      return merge(config(Object.assign({}, env, process.env)), development);

    case env.production:
      return merge(config(Object.assign({}, env, process.env)), production);

    default:
      return new Error("无该配置项文件!");
  }
};
