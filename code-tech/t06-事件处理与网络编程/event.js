// const outDiv = document.querySelector("#out");
// const middleDiv = document.querySelector("#middle");
// const innerDiv = document.querySelector("#inner");

// // 事件类型：键盘按下
// window.addEventListener("keydown", (keyEvent) => {
//   console.log(keyEvent.key);
// });

// // 默认冒泡
// outDiv.addEventListener(
//   "click",
//   (e) => {
//     console.log("out");
//   },
//   false
// );
// middleDiv.addEventListener(
//   "click",
//   (e) => {
//     console.log("middle");
//     // 取消冒泡
//     e.stopPropagation();
//   },
//   false
// );
// innerDiv.addEventListener(
//   "click",
//   (e) => {
//     console.log("inner");
//   },
//   false
// );
// // 开启捕获
// middleDiv.addEventListener(
//   "click",
//   () => {
//     console.log("我是捕获");
//   },
//   true
// );

// // // 行内监听
// // // 只能监听一个
// // const inlineEvent = () => {
// //   console.log("行内");
// // };
// // // 1. 在html中onclick内添加
// // // 2. 如下，在dom元素中onclick添加
// // outDiv.onclick = inlineEvent;
