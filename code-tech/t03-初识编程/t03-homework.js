let stuArr = [
  {
    name: "圆圆",
    team: "前端",
    grade: 2021,
  },
  {
    name: "红包",
    team: "前端",
    grade: 2021,
  },
  {
    name: "攀攀",
    team: "前端",
    grade: 2021,
  },
  {
    name: "kk",
    team: "前端",
    grade: 2020,
  },
];

// // 1. 输出stuArr数组里每个对象的name
// for (i of stuArr) {
//   console.log(`名字是${i.name}`);
// }
// // 2. 设计一个函数，传入一个对象，打印该对象的毕业年份，无返回值
// const foo = (obj) => console.log(obj.grade + 4);
// // 3. 写一段代码，将stuArr里 name 为 红包 的对象的 team 改为 设计部
// for (i of stuArr) {
//   i.team = i.name === "红包" ? "设计部" : undefined;
// }

function age(people) {
  console.log(people ?? "");
}

age();
