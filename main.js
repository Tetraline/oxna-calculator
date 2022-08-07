import parse from "./advancedParser.js";

const buttonArray3 = document.querySelector(".buttons__array-3");
const blockerForButtonArray3 = document.querySelector(
  ".buttons__blocker-for-array-3"
);

const toggleButtonArray3 = () => {
  buttonArray3.classList.toggle("buttons__array-3--open");
  blockerForButtonArray3.classList.toggle("buttons__blocker-for-array-3--open");
};

buttonArray3.addEventListener("click", toggleButtonArray3);
blockerForButtonArray3.addEventListener("click", toggleButtonArray3);

// Define a function which accepts the value of the button which has been pressed,
// and takes appropriate action
let previousButtonPressWasEquals = false;
const handleButtonPress = (event) => {
  const value = event.target.value;
  const upperScreen = document.querySelector(".screen__upper");
  const lowerScreen = document.querySelector(".screen__lower");
  switch (value) {
    case "DEL":
      lowerScreen.innerText = lowerScreen.innerText.slice(0, -1);
      break;
    case "AC":
      lowerScreen.innerText = "";
      upperScreen.innerText = "";
      break;
    case "square":
      lowerScreen.innerText = `${lowerScreen.innerText}*${lowerScreen.innerText}`;
    // no break since we want case "=" to immediately execute after this
    case "=":
      previousButtonPressWasEquals = true;
      // Parse string --> Array
      let result = parse(lowerScreen.innerText);
      // Display the result and show the input on the top screen
      if (result[1][1]) {
        if (result[1][1] == "dec") {
          result[1][0] = "too many decimal points";
        } else {
          console.error(`Parser did not understand ${result[1][1]}`);
          result[1][0] = "⚠";
        }
      }
      upperScreen.innerText = result[0];
      lowerScreen.innerText = result[1][0];
      addCalculationToHistory(result[0], result[1][0]);
      break;
    default:
      if (previousButtonPressWasEquals && /\d/.test(value)) {
        lowerScreen.innerText = "";
      }
      previousButtonPressWasEquals = false;
      lowerScreen.innerText += value;
      break;
  }
};

const addCalculationToHistory = (calculation, result) => {
  let history = document.querySelector(".buttons__array-3>p");
  history.innerHTML += `<br>${calculation} ${result}`;
};

const buttons = document.querySelectorAll(
  ".buttons__array-1>button, .buttons__array-2>button, .buttons__array-3>button, .screen__clear"
);
buttons.forEach((button) => {
  button.addEventListener("click", handleButtonPress);
});
