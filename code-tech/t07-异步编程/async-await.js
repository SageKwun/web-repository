// -------------------------- 1. async隐式返回一个Promise
// async function foo() {
//   return 2;
// }
// console.log(foo()); // Promise {<resolved>: 2}

// -------------------------- 2. await返回一个Promise，相当于generator的yield

// async function foo() {
//   console.log(1);
//   let a = await 100;
//   console.log(a);
//   console.log(2);
// }
// console.log(0);
// foo();
// console.log(3);

// -------------------------- 3. 实战
async function foo() {
  console.log("foo");
}

async function bar() {
  console.log("bar start");
  await foo();
  console.log("bar end");
}

console.log("script start");

setTimeout(function () {
  console.log("setTimeout");
}, 0);

bar();

new Promise(function (resolve) {
  console.log("promise executor");
  resolve();
}).then(function () {
  console.log("promise then");
});

console.log("script end");
