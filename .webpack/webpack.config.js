const path = require("path");
// 自动创建 html 文件
const HtmlWebpackPlugin = require("html-webpack-plugin");
// 将 CSS 提取到单独的文件中，为每个包含 CSS 的 JS 文件创建一个 CSS 文件，并且支持 CSS 和 SourceMaps 的按需加载
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 不会重复创建标签页
const openBrowser = require("react-dev-utils/openBrowser");
// ant design
const antd_icons = require("../src/constant/antd-icons.js");
const antd_components = require("../src/constant/antd-components.js");

module.exports = (env) => {
  return {
    devServer: {
      host: "127.0.0.1",
      port: 3000,
      open: true,
      proxy: {
        "/7066": {
          target: env.NO_REACT_PROXY,
          pathRewrite: { "^/7066": "" },
          // secure: true, // https
          changeOrigin: true,
        },
      },
      // compress: true,
      // 静态目录
      static: [
        {
          directory: path.join(__dirname, "../public"),
          publicPath: "/public",
        },
      ],
      // 默认打开浏览器
      // onListening: (devServer) => {
      //   const { port } = devServer.server.address();
      //   openBrowser(`http://127.0.0.1:${port}`);
      // },
    },
    // 信息展示
    stats: {
      // 是否添加模块内的资源信息
      moduleAssets: false,
      // 是否添加关于构建模块的信息
      modules: false,
      // 是否添加构建日期与时间信息
      builtAt: true,
    },
    // 入口
    entry: "./src/index.tsx",
    // 出口
    output: {
      filename: "bundle.js",
      // 打包文件
      path: path.resolve(__dirname, "../dist"),
      // 自动清理
      clean: true,
    },
    // 模块-规则
    module: {
      rules: [
        {
          test: /\.[jt]sx?$/,
          exclude: /node_modules/,
          loader: "babel-loader",
        },
        {
          test: /\.(scss|sass|css)$/i,
          use: [
            env.development
              ? "style-loader"
              : {
                  loader: MiniCssExtractPlugin.loader,
                  options: {
                    publicPath: "/",
                  },
                },
            {
              loader: "css-loader",
              options: {
                importLoaders: 2,
              },
            },
            "postcss-loader",
            "sass-loader",
          ],
        },
        {
          test: /\.(jpe?g|png|gif|svg|webp)$/i,
          type: "asset",
          generator: {
            filename: "static/images/[contenthash:8][ext]",
          },
          parser: {
            dataUrlCondition: {
              maxSize: 10 * 1024,
            },
          },
        },
        {
          test: /\.(otf|eot|woff2?|ttf|svg)$/i,
          type: "asset",
          generator: {
            filename: "static/fonts/[hash:8][ext]",
          },
          parser: {
            dataUrlCondition: {
              maxSize: 10 * 1024,
            },
          },
        },
        {
          test: /\.(txt|xml)$/i,
          type: "asset",
          generator: {
            filename: "static/file/[contenthash:8][ext]",
          },
        },
        {
          test: /.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
          type: "asset/resource",
          generator: {
            filename: "static/media/[contenthash:8][ext]",
          },
        },
      ],
    },
    // 路径别名
    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js", ".css", ".scss"],
      alias: {
        "@": path.resolve(__dirname, "../src/modules"),
        "#": path.resolve(__dirname, "../src/components"),
        constant: path.resolve(__dirname, "../src/constant"),
        assets: path.resolve(__dirname, "../src/assets"),
        utils: path.resolve(__dirname, "../src/utils"),
      },
    },
    plugins: [
      // 自动导入
      require("unplugin-auto-import/webpack").default({
        include: [/\.[tj]sx?$/],
        imports: [
          "react",
          "react-router-dom",
          {
            antd: antd_components,
            "@ant-design/icons": antd_icons,
          },
        ],
        dirs: [
          "src/hooks" /**      */ /** 个性化支持 */,
          "src/modules/**/store.ts" /**  */ /** 模块Store */,
        ],
        dts: "@types/auto-imports.d.ts",
        eslintrc: {
          enabled: true,
          filepath: "@types/auto-imports.json",
          globalsPropValue: true,
        },
        // resolvers: [
        //   (name) => {
        //     if (antds.includes(name)) {
        //       return {
        //         name,
        //         from: "antd",
        //       };
        //     }
        //   },
        // ],
      }),
      new HtmlWebpackPlugin({
        template: "./index.html",
        minify: {
          collapseWhitespace: true, //去空格
          removeComments: true, // 去注释
        },
      }),
      new MiniCssExtractPlugin({
        filename: "static/style/[contenthash:8].css",
      }),
    ],
  };
};
