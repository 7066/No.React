const path = require("path");
// 压缩JS
const TerserPlugin = require("terser-webpack-plugin");
// 压缩CSS
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
// 复制文件 public
const CopyWebpackPlugin = require("copy-webpack-plugin");
// Gzip 压缩文件
const Gzip = require("compression-webpack-plugin");
// 打包体积分析
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
module.exports = {
  mode: "production",
  output: {
    filename: "static/js/[name].[contenthash].js",
    publicPath: "./",
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "../public"),
          to: path.resolve(__dirname, "../dist/public"),
        },
      ],
    }),
    new Gzip(),
    new BundleAnalyzerPlugin(),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true,
          },
        },
      }),
      new CssMinimizerPlugin({
        parallel: true,
        minimizerOptions: {
          preset: "advanced",
        },
      }),
    ],
    // 切片
    // splitChunks: {
    //   minSize: 10000,
    //   cacheGroups: {
    //     // react: {
    //     //   chunks: "all",
    //     //   test: /[\\/]node_modules[\\/].*react(.*)/,
    //     //   priority: 80,
    //     //   name: "react",
    //     // },
    //     // lodash: {
    //     //   chunks: "all",
    //     //   test: /[\\/]node_modules[\\/].*lodash(.*)/,
    //     //   priority: 80,
    //     //   name: "lodash",
    //     // },
    //   },
    // },
  },
};
