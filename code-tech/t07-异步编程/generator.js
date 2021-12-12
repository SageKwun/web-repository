function* genDemo() {
  console.log("开始执行第一段");
  yield "generator 2";

  console.log("开始执行第二段");
  yield "generator 2";

  console.log("开始执行第三段");
  yield "generator 2";

  console.log("执行结束");
  return "generator 2";
}

console.log("main 0");
let gen = genDemo();
console.log(gen.next().value);
console.log("main 1");
console.log(gen.next().value);
console.log("main 2");
console.log(gen.next().value);
console.log("main 3");
console.log(gen.next().value);
console.log("main 4");
