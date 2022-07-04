// This parser recoginizes
// 1. Addition "+"
// 2. Multiplication "*"
// 3. Negative numbers "-1"
// 4. Bracketed expressions "(2*3)"

// Subtraction is not supported. Instead, add a negative number.
// e.g. "1+-1"

// Division is not supported. Instead, multiply by 1/x (the reciprocal)
// e.g. 75/3 becomes 75 * (1/3)

const digit = (string) => {
  //const pattern = /\d|\.|e|π/;
  const pattern = /\d|\./;
  if (pattern.test(string[0])) {
    return [string[0], string.substring(1)];
  } else {
    return [, string];
  }
};

//const char = (string) => {
//  const pattern = /[/*\-+=]/;
//  if (pattern.test(string[0])) {
//    return [string[0], string.substring(1)];
//  } else {
//    return [, string];
//  }
//};
const char = (char, string = "") => {
  if (string.length == 0) {
    return [,];
  }
  if (string[0] == char) {
    return [string[0], string.substring(1)];
  } else {
    return [, string];
  }
};

const someDigit = (string) => {
  let output = "";
  digitParse = digit(string);
  while (digitParse[0]) {
    output += digitParse[0];
    string = digitParse[1];
    digitParse = digit(string);
  }
  return [output, string];
};

const num = (string) => {
  if (string[0] == "-") {
    string = string.substring(1);
    let output = someDigit(string);
    output[0] = -output[0];
    return output;
  } else {
    return someDigit(string);
  }
};

const factor = (string) => {
  if (string[0] == "(") {
    let output;
    let x;
    output = char("(", string);
    output = expression(output[1]);
    x = output[0];
    output = char(")", output[1]);
    return [x, output[1]];
  } else {
    return num(string);
  }
};

const term = (string) => {
  let x;
  let y;
  let output;
  output = factor(string);
  x = output[0];
  output = char("*", output[1]);
  if (output[0]) {
    output = term(output[1]);
    y = output[0];
    return [+x * +y, output[1]];
  }
  output = char("/", output[1]);
  if (output[0]) {
    output = term(output[1]);
    y = output[0];
    return [+x / +y, output[1]];
  }
  return factor(string);
};

const expression = (string) => {
  let x;
  let y;
  let output;
  output = term(string);
  x = output[0];
  output = char("+", output[1]);
  if (output[0]) {
    output = expression(output[1]);
    y = output[0];
    return [+x + +y, output[1]];
  } else {
    return term(string);
  }
};

const parse = (string) => {
  // Remove spaces
  string = string.replace(/\s/g, "");
  // Replace "-" with "+-"
  // (But not "*-" with "*+-")
  charArray = [...string];
  for (i = charArray.length; i > 0; i--) {
    if (
      charArray[i] == "-" &&
      charArray[i - 1] != "*" &&
      charArray[i - 1] != "+"
    ) {
      charArray.splice(i, 0, "+");
    }
  }
  string = charArray.join("");

  // Find division cases
  return expression(string);
};

console.log(parse("42/11-26/16-32"));
console.log(parse("42/11-26/16*3-32"));
