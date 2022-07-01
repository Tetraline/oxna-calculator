const calculate = (array) => {
  // Convert the numbers to floats
  // Numbers sit on the even indexes (0,2,4,...)
  array = array.map((element, i) => {
    if (i % 2 == 0) {
      return +element;
    } else {
      return element;
    }
  });
  // We make our way through the array from left to right
  // 1) Shift off the first 3 elements
  // 2) Operate on those number 1, operator, number 2
  // 3) Unshift the result back onto the array
  // 4) Repeat 1-3 until everything has been calculated

  while (array.length > 2) {
    let n1 = array.shift();
    let op = array.shift();
    let n2 = array.shift();
    array.unshift(operate(n1, op, n2));
  }
  return array[0];
};

const operate = (n1, op, n2) => {
  switch (op) {
    case "+":
      return n1 + n2;
    case "-":
      return n1 - n2;
    case "*":
      return n1 * n2;
    case "/":
      return n1 / n2;
  }
};
