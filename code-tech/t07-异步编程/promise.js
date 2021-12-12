// --------------------------使用onResolved，onRejected
// new Promise((resolve, reject) => {
//   console.log("new Promise");
//   resolve("data");
// })
//   .then(
//     (data) => {
//       console.log("get data: ", data);
//       return new Error("failure");
//     },
//     (error) => {
//       console.log(error);
//     }
//   )
//   .then(
//     (data) => {
//       console.log("get data: ", data);
//       throw new Error("failure");
//     },
//     (error) => {
//       console.log(error);
//     }
//   )
//   .then(
//     (data) => {
//       console.log("get data: ", data);
//       return new Error("failure");
//     },
//     (error) => {
//       console.log(error);
//     }
//   )
//   .then(
//     (data) => {
//       console.log("get data: ", data);
//       return new Error("failure");
//     },
//     (error) => {
//       console.log(error);
//     }
//   )
//   .catch((error) => console.log(error));

// --------------------------使用catch
// new Promise((resolve, reject) => {
//   console.log("new Promise");
//   resolve("data");
// })
//   .then((data) => {
//     console.log("get data: ", data);
//     throw new Error("failure");
//   })
//   .then((data) => {
//     console.log("get data: ", data);
//     throw new Error("failure");
//   })
//   .then((data) => {
//     console.log("get data: ", data);
//     return new Error("failure");
//   })
//   .then((data) => {
//     console.log("get data: ", data);
//     return new Error("failure");
//   })
//   .catch((error) => console.log("catch error: ", error));
