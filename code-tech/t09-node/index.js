const express = require("express");
const app = express();
// 1. 找到文件
const path = require("path");
// 2. 读取文件
const fs = require("fs");
// 3. 返回文件

app.get("/", (require, response) => {
  const htmlPath = path.resolve(__dirname, "index.html");
  console.log(htmlPath);
  const html = fs.readFileSync(htmlPath, {
    encoding: "utf-8",
  });
  console.log(html);
  response.send(html);
});

console.log("http://localhost:3000/");
app.listen(3000);
