// 1. 查阅资料，了解Promise的含义及用法
// 2. 运行下面代码，解释下面代码执行的先后顺序

/**
 * 例如：
 * 1. 执行 new Promise的执行器函数，返回一个promise，注册一个微任务
 * 2. 同步执行第 console.log("外部")
 * 3. .....
 */

new Promise((resolve, reject) => {
  console.log("外部promise");
  resolve();
})
  .then(() => {
    console.log("外部第一个then");
    new Promise((resolve, reject) => {
      console.log("内部promise");
      resolve();
    })
      .then(() => {
        console.log("内部第一个then");
      })
      .then(() => {
        console.log("内部第二个then");
      });
    return new Promise((resolve, reject) => {
      console.log("内部promise2");
      resolve();
    })
      .then(() => {
        console.log("内部第一个then2");
      })
      .then(() => {
        console.log("内部第二个then2");
      });
  })
  .then(() => {
    console.log("外部第二个then");
  });
console.log("外部");
