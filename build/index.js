const { merge } = require("webpack-merge");
const config = require("./webpack.config");
const development = require("./webpack.dev");
const production = require("./webpack.prod");
module.exports = (env) => {
  switch (true) {
    case env.development:
      return merge(config(env), development);

    case env.production:
      return merge(config(env), production);

    default:
      return new Error("无该配置项文件!");
  }
};
