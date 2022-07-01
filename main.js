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
  console.log(value);
  const inputScreen = document.querySelector(".screen__upper");
  const outputScreen = document.querySelector(".screen__lower");

  switch (value) {
    case "DEL":
      inputScreen.innerText = inputScreen.innerText.slice(0, -1);
      break;

    case "=":
      outputScreen.innerText = parseString(inputScreen.innerText);
      break;
    default:
      inputScreen.innerText += value;
      break;
  }
};

const buttons = document.querySelectorAll(
  ".buttons__array-1>button, .buttons__array-2>button, .buttons__array-3>button"
);
buttons.forEach((button) => {
  button.addEventListener("click", handleButtonPress);
});
