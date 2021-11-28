const http = require("http");

const port = 8080;

const server = http.createServer((request, response) => {
  response.statusCode = 200;
  response.setHeader("Content-Type", "application/json;charset=utf-8");

  let data = "";
  request.on("data", (chunk) => {
    data += chunk;
  });

  request.on("end", () => {
    console.log("接收到：", JSON.parse(data));
    // response.write(JSON.stringify({ msg: "登录成功" }));
    response.end();
  });
});

server.listen(port, () => {
  console.log(`服务器运行在 http://localhost:${port}/`);
});
