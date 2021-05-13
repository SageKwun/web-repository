// https://segmentfault.com/a/1190000011652907
// Promise对象有三种状态: pending fullfilled rejected

let promise2 = new Promise((resolve, reject) => {
  // 2秒后置为接收状态
  setTimeout(() => {
    resolve("success");
  }, 2000);
});

// 浅薄理解：
// Promise初始化时为pending，根据executer函数的执行决定状态为resolved(一般情况下视为fullfilled)或rejected
// resolved执行.then(f,r)的f函数
// rejected执行.then(f,r)的r函数

// 一下fullfilled态个人应为resolved
promise2
  .then((data) => {
    // 上一个then()调用了resolve，置为fulfilled态
    console.log("第一个then");
    console.log(data);
    return "2";
  })
  .then(
    (data) => {
      // 此时这里的状态也是fulfilled, 因为上一步返回了2
      console.log("第二个then");
      console.log(data); // 2

      return new Promise((resolve, reject) => {
        reject("把状态置为rejected error"); // 返回一个rejected的Promise实例
      });
    },
    (err) => {
      // error
    }
  )
  .then(
    (data) => {
      /* 这里不运行 */
      console.log("第三个then");
      console.log(data);
      // ....
    },
    (err) => {
      // error回调
      // 此时这里的状态也是fulfilled, 因为上一步使用了reject()来返回值
      console.log("出错：" + err); // 出错：把状态置为rejected error
    }
  )
  .then((data) => {
    // 没有明确指定返回值，默认返回fulfilled
    console.log("这里是fulfilled态");
  });
