// This is a combinator parser inspired by
// https://youtu.be/dDtZLm7HIJs
// which describes an approach to building a parser for addition, multiplication, and negative numbers.
// My parser additionally understands subtraction and division

/**
 * The Grammar on which the parsers functions are built:
 *
 * digit: any digit 1-9. e.g. "1"
 * someDigit: Any positive number. e.g. "10.5"
 * number: Any number. e.g. "-10.5"
 *
 * factor = ( expression ) | number
 * term = factor * term | factor
 * expression = term + expression | term
 *
 * The input is put into the expression function,
 * and then the function calls cascade down
 */

/**
 * Try to parse a single digit, or decimal point, from the front of a string
 * @param {string} string
 * @return {array} The digit, the rest of the string.
 */
const digit = (string) => {
  const pattern = /\d|\./;
  if (pattern.test(string[0])) {
    return [string[0], string.substring(1)];
  } else {
    return [, string];
  }
};

/**
 * Parse as many digits as possible
 * @param {string} string
 * @returns {array} The digits, the rest of the string.
 */
const someDigit = (string) => {
  let output = "";
  let digitParse = digit(string);
  while (digitParse[0]) {
    output += digitParse[0];
    string = digitParse[1];
    digitParse = digit(string);
  }
  if (output.split(".").length > 2) {
    // If there are two decimal points in the number
    return ["dec", "dec"];
  }
  return [output, string];
};

/**
 * Parses an entire number by
 * 1. Check if the number is negative
 * 2. Parse as many digits as possible until a non-digit
 *    character is found
 * @param {string} string
 * @returns {array} The number, the rest of the string
 */
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

/**
 * Parse a given character from the front of the string, if possible.
 * @param {string} char The character to be found
 * @param {string} string The string to be parsed
 * @returns {array} The character if found, the rest of the string
 */
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

/**
 * Detects and evaluates expressions inside brackets,
 * otherwise parses a number if no brackets seen
 * @param {string} string
 * @returns {array} The evaluated bracket | The parsed number, the rest of the string
 */
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

/**
 * Detects and evaluates division and multiplication operations,
 * otherwise passes string to factor() if none seen.
 *
 * @param {string} string
 * @returns {array} The evaluated operation | factor(string), the rest of the string
 */
const term = (string) => {
  let x;
  let y;
  let output;
  output = factor(string);
  x = output[0];
  output = char("/", output[1]);
  if (output[0]) {
    // If parsing a / was successful
    output = term(output[1]);
    y = output[0];
    return [+x / +y, output[1]];
  }
  output = char("*", output[1]);
  if (output[0]) {
    // If parsing a * was successful
    output = term(output[1]);
    y = output[0];
    return [+x * +y, output[1]];
  }
  // If neither "*" or "/" has been found, look for a factor instead
  return factor(string);
};

/**
 * Detects and evaluates addition operations,
 * otherwise passes string to term() if none seen.
 *
 * @param {string} string
 * @returns {array} The evaluated operation | term(string), the rest of the string
 */
const expression = (string) => {
  let x;
  let y;
  let output;
  output = term(string);
  x = output[0];
  output = char("+", output[1]);
  if (output[0]) {
    // If parsing a + was successful
    output = expression(output[1]);
    y = output[0];
    return [+x + +y, output[1]];
  } else {
    // Otherwise look for a term
    return term(string);
  }
};

/**
 * Ensure input is clean.
 * 1. The parsing functions do not tolerate spaces in the string
 * 2. The parser cannot subtract, so subtraction operations need to
 *  be made addition of a negative number
 * @param {string} string  A string to be parsed
 * @returns {array} = [{string}, {array}] The formated calculation, the result from parsing the calculation
 */
const parse = (string) => {
  // Remove spaces
  string = string.replace(/\s/g, "");
  // Replace "-" with "+-"
  // (But not "*-" with "*+-")
  const charArray = [...string];
  for (let i = charArray.length; i > 0; i--) {
    if (
      charArray[i] == "-" &&
      charArray[i - 1] != "*" &&
      charArray[i - 1] != "/" &&
      charArray[i - 1] != "+"
    ) {
      charArray.splice(i, 0, "+");
    }
  }
  string = charArray.join("");
  return [`${string}=`, expression(string)];
};

export default parse;
