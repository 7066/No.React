const { merge } = require("webpack-merge");
const config = require("./webpack.config");
const development = require("./webpack.dev");
const production = require("./webpack.prod");
const dotenv = require("dotenv");

module.exports = (env) => {
  let path = ".env";
  if (env.development) path += ".development";
  if (env.production) path += ".production";

  dotenv.config({
    path,
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
