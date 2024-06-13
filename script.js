let firstNumber;
let secondNumber;
let operator;

const add = (a, b) => a + b;

const subtract = (a, b) => a - b;

const multiply = (a, b) => a * b;

const divide = (a, b) => a / b;

const operate = (firstNumber, secondNumber, operator) => {
  switch (operator) {
    case '+':
      return add(firstNumber, secondNumber);
    case '-':
      return subtract(firstNumber, secondNumber);
    case '*':
      return multiply(firstNumber, secondNumber);
    case '/':
      return divide(firstNumber, secondNumber);
  }
};

let displayValue = '0';
const displayEl = document.querySelector('.display__lower');
displayEl.textContent = displayValue;

const numberBtnList = document.querySelectorAll('.btn--number');
const onClickNumberBtn = (event) => {
  if (displayEl.textContent === '0') {
    displayValue = event.target.textContent;
  } else if (displayValue.length < 10) {
    displayValue += event.target.textContent;
  }

  displayEl.textContent = displayValue;
}

Array.from(numberBtnList).map(
  (numberBtn) => numberBtn.addEventListener('click', onClickNumberBtn)
);
