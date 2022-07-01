// // // Add click event to buttonArray3;

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

// // // Add calculator functionality

// Define a function which accepts a string and evaluates it
const parseString = (string) => {
  return "you're beautiful";
};

// Define a function which accepts the value of the button which has been pressed,
// and takes appropriate action
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
      // Put the equals on the screen as normal
      lowerScreen.innerText += "=";
      // Parse string --> Array
      let calculationArray = parse(lowerScreen.innerText);
      // If parsing produced an error, show an error symbol on screen
      if (!calculationArray) {
        upperScreen.innerText = lowerScreen.innerText;
        lowerScreen.innerText = "⚠";
        break;
      }
      // Show the user how we fixed "1++2" into "1+0+2", for example.
      lowerScreen.innerText = calculationArray.join("");
      // Calculate the result
      let result = calculate(calculationArray);
      // Display the result and shift the input to the top screen
      upperScreen.innerText = lowerScreen.innerText;
      lowerScreen.innerText = result;
      break;
    default:
      lowerScreen.innerText += value;
      break;
  }
};
// // // Add click event to buttons in arrays
const buttons = document.querySelectorAll(
  ".buttons__array-1>button, .buttons__array-2>button, .buttons__array-3>button, .screen__clear"
);
buttons.forEach((button) => {
  button.addEventListener("click", handleButtonPress);
});
