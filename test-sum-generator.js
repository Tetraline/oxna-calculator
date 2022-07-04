// A function to generate sums with which to test my parser

const generateSum = () => {
  let sum = [];
  for (let i = 0; i < 5; i++) {
    sum.push(Math.round(Math.random() * 50));
    let symbol = Math.random() * 4;
    if (symbol < 1) {
      sum.push("+");
    } else {
      if (symbol < 2) {
        sum.push("-");
      } else {
        if (symbol < 3) {
          sum.push("*");
        } else {
          sum.push("/");
        }
      }
    }
  }
  sum.pop();
  return sum.join("");
};

console.log(generateSum());
