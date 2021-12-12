function log(text) {
  for (let i = 0; i < 5000; i++) {
    console.log(text);
  }
  return new Promise((resolve) => {
    resolve("end");
  });
}

setTimeout(() => {
  log("a").then((res) => {
    console.log(res);
    log("b").then(console.log("d"));
  });

  log("c");
  log("e");
}, 3000);

// 1. 宏任务 函数
// log(a) log(c)
// 执行到log(a)的时候 注册了一个微任务log(b)
// 执行log(c)
// 2. 检查微任务
// 执行微任务log(b)
