const path = require("path");
const { merge } = require("webpack-merge"); // 合并两个 config ，注意要解构
const common = require("./webpack.common.js");
// 使用 merge 函数合并
module.exports = merge(common, {
  // 设置为生产模式
  mode: "production",
  // 输出配置
  output: {
    path: path.resolve(__dirname, "dist"), // 输出路径
    filename: "[name]-[contenthash:8].js", // [] 占位符
    clean: true, // 每次删除上次构建的文件
  },
});