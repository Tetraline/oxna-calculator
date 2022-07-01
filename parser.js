// Takes some inspiration from real parsers
// e.g. https://youtu.be/dDtZLm7HIJs
// But I didn't implement it fully
// Instead,
// "1+2+3" ----returns--> ["1","+","2","+","3"]
// Which can then be read left to right with the calculator function

const digit = (string) => {
  //const pattern = /\d|\.|e|π/;
  const pattern = /\d|\./;
  if (pattern.test(string[0])) {
    return [string[0], string.substring(1)];
  } else {
    return [, string];
  }
};

const char = (string) => {
  const pattern = /[/*\-+=]/;
  if (pattern.test(string[0])) {
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

const parse = (string) => {
  let calculation = [];
  while (string.length > 0) {
    digitParse = someDigit(string);
    calculation.push(digitParse[0]);
    string = digitParse[1];
    charParse = char(string);
    if (digitParse[1] === charParse[1]) {
      console.log("parse: FATAL ERROR: Probably an illegal input.");
      console.log(
        "parse: Inputs must end in = and only have permitted characters"
      );
      return 0;
    }
    calculation.push(charParse[0]);
    string = charParse[1];
  }
  // If someone chains operators
  // e.g. 1++2
  // Make the calculation 1+0+2
  calculation.forEach((element, i) => {
    if (element == "") {
      if (calculation[i - 1] == "*") {
        calculation[i] = "1";
      } else {
        calculation[i] = "0";
      }
    }
  });
  return calculation;
};
