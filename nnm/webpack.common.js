const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  // 设置入口
  entry: {
    index: path.resolve(__dirname, "src/index.jsx"),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/, // 识别 .js .jsx 文件
        use: "babel-loader", // 使用 babel-loader 处理
      },
    ],
  },
  plugins: [
    // 打包时自动生成 .html 文件
    new htmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve(__dirname, "./public/index.html"),
    }),
  ],
};
