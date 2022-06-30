//document.ontouchmove = function (e) {
//  e.preventDefault();
//};

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
