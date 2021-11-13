// sex 男为0，女为1
const frontEnd = [
  {
    name: "圆圆",
    id: 21032206,
    team: "前端",
    sex: 1,
  },
  {
    name: "攀攀",
    id: 21051314,
    team: "前端",
    sex: 0,
  },
  {
    name: "ek",
    id: 20051532,
    team: "前端",
    sex: 0,
  },
  {
    name: "kk",
    id: 20051406,
    team: "ios",
    sex: 1,
  },
  {
    name: "红包",
    team: "设计",
    id: 21032227,
    sex: 0,
  },
];

// 找到性别为0
// 返回数组
// const res = frontEnd.filter((value, index, array) => {
//   console.log(value);
//   console.log(index);
//   return value.sex === 1;
// });
// console.log(res);
// 返回第一个值
// const res = frontEnd.find((ele) => {
//   return ele.sex === 0;
// });
// console.log(res);

// 给数组里所有值+1
// 返回一个新数组
// const nums = [1, 2, 3, 4];
// const newNums = nums.map((value, index, array) => {
//   return value + 1;
// });
// console.log(nums);
// console.log(newNums);

// 分别打印数组里所有值+1后的值
// 无返回
// const newNums = nums.forEach((value, index, array) => {
//   console.log(value + 1);
// });
// console.log(nums);
// console.log(newNums);

// 返回所有name拼接成字符串
// const nameStr = frontEnd.reduce((previous, current, currentIndex) => {
//   return previous + current.name;
// });
// 1. pre = ''   current = {攀攀}     ''+圆圆
// 2. pre = ''+ 圆圆  current = {攀攀}   ''+圆圆+攀攀

// console.log(nameStr);

// const num = [1, 3, 2, 5, 4];
// const max = num.reduce((pre, cur) => {
//   return pre > cur ? pre : cur;
// });
// console.log(max);

// const num = [1, 2, 3, 4];

// num.filter((ele) => ele === 1).forEach((ele) => console.log(ele + 1));

// ------------------ 练习------------------

function run(arr) {
  // 1. 打印arr里有几个元素
  console.log(arr.length);
  // 2. 用一行代码完成（按顺序）
  //        将arr内sex属性为0的值改为'男'，1改为'女'
  //        筛选出arr内team为'前端'的元素
  //        打印一行内容，内容为筛选后arr内所有男生的名字学号，格式以女生为例: "姓名:圆圆,学号:21032206;姓名:圆圆,学号:21032206;姓名:kk,学号:20051406;"
  console.log(
    arr
      .map((ele) => {
        ele.sex = ele.sex === 0 ? "男" : "女";
        return ele;
      })
      .filter((ele) => ele.team === "前端")
      .reduce(
        (pre, cur) =>
          pre + (cur.sex === "男" ? `姓名:${cur.name},学号:${cur.id};` : ""),
        ""
      )
  );
  // 3. 返回筛选后的arr
  return arr.filter((ele) => ele.team === "前端");
}

// 打印一下运行结果看看做的对不对吧~
console.log(run(frontEnd));
