// -----------变量声明-----------
/**
 * let 和 const 的区别：let声明的变量能够改变，const不行
 *
 * var 和 let/const的区别：
 * 1. 都会变量提升，但是var能够在声明之前被访问（access），let/const不行（暂时性死区）
 * 2. var在浏览器环境中会被挂载到全局对象window上，可以用 window.变量名 访问，let/const不行
 * 3. var在一个作用域内能够重复声明同一个变量名，let/const不行
 * 4. var仅会在函数作用域内被限制，let/const还会在块级作用域内被限制
 */

// console.log(`var1声明之前: ${var1}`);
// var var1 = 0;
// console.log(`var1声明之后: ${var1}`);
// console.log(`全局挂载：${window.var1}`);

// console.log(`let1声明之前: ${let1}`);
// let let1 = 2;
// console.log(`let1声明之后: ${let1}`);
// console.log(`全局挂载：${window.let1}`);

// console.log(`CONST1声明之前: ${CONST1}`);

// const CONST1 = 3;
// CONST1 = 4;
// console.log(`CONST1声明之后: ${CONST1}`);
// console.log(`全局挂载：${this.CONST1}`);

// {
//   let var3 = 3;
// }

// console.log(var3);

// function calc() {
//   let var2 = 2;
// }

// console.log(var2);

// -----------基本数据类型-----------
/**
 * js的数据类型有：Number、String、Boolean、Null、undefined、object、symbol、bigInt
 * 引用数据类型只有object，变量存的是引用的地址而不是实际的值
 */

// let obj = {
//   a: 1,
//   b: 2
// }
// console.log(obj.a)

// -----------函数-----------
// const obj = {
//   year: 1999,
// };
// obj.year = { year: 2000 };
// obj = { year: 2001 };
// function age(birthObj) {
//   console.log(obj.year);
//   console.log(birthObj.year);
//   birthObj.year = 2000;
//   console.log(obj.year);
//   console.log(birthObj.year);
//   birthObj = { year: 2001 };
//   console.log(obj.year);
//   console.log(birthObj.year);
//   return birthObj;
// }

// const age1 = (birthObj) => {
//   console.log(obj.year);
//   console.log(birthObj.year);
//   birthObj.year = 2000;
//   console.log(obj.year);
//   console.log(birthObj.year);
//   birthObj = { year: 2001 };
//   console.log(obj.year);
//   console.log(birthObj.year);
//   return birthObj;
// };
// age1 = () => {};

// console.log(age(2000));

// -----------循环判断-----------
// for (var i = 0; i < 10; i++) {
//   console.log(i);
// }

// -----------for in of-----------

// const a = [3, 4, 5];
// // a = { 0:3, 1:4, 2:5 }
// console.log("for in 打印属性");
// for (i in a) {
//   console.log(i);
// }
// console.log("for of 打印值");
// for (i of a) {
//   console.log(i);
// }
