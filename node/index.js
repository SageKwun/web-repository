const express = require("express");
const app = express();
//找到
const path = require("path")
//读取文件
const fs = require("fs")
//返回

app.get("/",(require,response)=>{
    const htmlPath = path.resolve(__dirname,"index.html");
    console.log(htmlPath);
    const html = fs.readFileSync(htmlPath(__dirname,"index.html"),
   //const html = fs.readFileSync(path.resolve(__dirname,"index.html"),
   {
encoding:"utf-8",
   });
    response.send(html);
});

console.log("http://localhost:3000");
app.listen(3000);