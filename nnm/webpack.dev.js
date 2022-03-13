const { merge } = require("webpack-merge"); // 合并两个 config ，注意要解构
const common = require("./webpack.common.js");
// 使用 merge 函数合并
const path = require("path");
module.exports = merge(common, {
  // 设置为开发模式
  mode: "development",
  devServer: {
    // 静态资源配置
    static: {
      directory: path.resolve(__dirname, "public"), // 使开发时能访问 /public 文件夹
      serveIndex: true, // （默认）查看没有 index.html 文件的目录时生成目录列表
    },
    historyApiFallback: true, // 当使用 [HTML5 History API] 时，任意的 `404` 响应被替代为 `index.html`
    open: true, // 自动打开浏览器
    hot: true, // 热更新
    compress: false, // 是否开启代码压缩
    host: "localhost",
    port: 9000, // 启动的端口
  },
});