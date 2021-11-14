// // 头铁写法
// let stuName1 = "管哥";
// let stuId1 = 19031225;
// let stuName2 = "圆圆";
// let stuId2 = 21032206;
// let stuName3 = "红包";
// let stuId3 = 21032227;

// // ----------------------------------------------------------工厂模式

// // 创建学生对象
// function createStudent(id, name) {
//   const newStudent = {};
//   newStudent.id = id;
//   newStudent.name = name;
//   newStudent.say = function () {
//     console.log(`我是${this.name}`);
//   };
//   return newStudent;
// }

// // 创建社团成员对象
// function createMember(id, name, club, sector) {
//   const newMember = {};
//   newMember.id = id;
//   newMember.name = name;
//   newMember.club = club;
//   newMember.sector = sector;
//   newMember.say = function () {
//     console.log(`我是${this.name}`);
//   };
//   return newMember;
// }

// // 创建社团管理员对象
// function createLeader(id, name, club, sector) {
//   const newLeader = createStudent(id, name);
//   newLeader.club = club;
//   newLeader.sector = sector;
//   newLeader.say = function () {
//     console.log(`我是${this.name}`);
//   };
//   return newLeader;
// }

// // 社团管理系统登录函数，只有社团管理员能登录，普通成员不行
// function login(member) {
//   console.log("验证通过，进入社团管理系统");
// }

// // ----------------------------------------------------------构造函数模式
// function Student(id, name) {
//   this.id = id;
//   this.name = name;
//   this.say = function () {
//     console.log(`我是${this.name}`);
//   };
// }

// function Member(id, name, club, sector) {
//   this.id = id;
//   this.name = name;
//   this.club = club;
//   this.sector = sector;
//   this.say = function () {
//     console.log(`我是${this.name}`);
//   };
// }

// function Leader(id, name, club, sector) {
//   this.id = id;
//   this.name = name;
//   this.club = club;
//   this.sector = sector;
//   this.say = function () {
//     console.log(`我是${this.name}`);
//   };
// }

// function login(leader) {
//   if (!(leader.constructor === Leader)) {
//     //   if (!(leader instanceof Leader)) {
//     console.log("验证失败");
//     return;
//   }
//   console.log("验证通过，进入社团管理系统");
// }

// // 可以判断类型后，Member类型的对象将不能通过login的验证
// login(new Member());
// login(new Leader());

// // 宇宙的尽头是铁岭，js对象的尽头是Object
// console.log(new Member() instanceof Object);

// ---------------------------------------------------------原型模式
// function login(member) {
//   if (member.token !== "ok") {
//     console.log("验证失败");
//     return;
//   }
//   console.log("验证通过");
// }

// Leader.prototype.token = "ok";
// const kwun = new Leader(19031225, "kwun");

// Member.prototype = kwun;
// const kk = new Member(20051406, "kk");

/**
 * 原型模式的问题
 * 父类（原型）是写死的，不能灵活生成
 * 即，在生成子类实例化的时候不能调用父类的构造函数
 * 例如：
 * Member.prototype = kwun,那么所有Member对象的prototype都是kwun
 * 如果我们有其它的成员，他们使用的是其它的token
 * 我们就需要再手动生成一个新的Leader实例，写一个新的子类构造函数并重新设置
 */

// ---------------------------------------------------------类
// class Member {
//   constructor(id, name, club, sector) {
//     this.id = id;
//     this.name = name;
//     this.club = club;
//     this.sector = sector;
//   }

//   say() {
//     console.log(this.name);
//   }
// }

// class Leader extends Member {
//   constructor(id, name, club, sector, title) {
//     super(id, name, club, sector);
//     this.title = title;
//   }
// }

// const kwun = new Leader(
//   19031225,
//   "kwun",
//   "redhome",
//   "front end",
//   "second manager"
// );

// kwun.say();
