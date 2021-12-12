function fn1(a, b) {
  console.log(a);
  console.log(b);
  console.log(arguments);
}

const fn2 = (a, b) => {
  console.log(a);
  console.log(b);
  console.log(arguments);
};

// fn1(1);
// fn1(1, 2);
// fn1(1, 2, 3);
// fn2(1);
// fn2(1, 2);
// fn2(1, 2, 3);

function sum(...x) {
  console.log(x);
}
