import {operate} from "./math.js";

const maxDigits = 10;
let firstNumber = null;
let secondNumber = null;
let operator = null;
let displayValue = '0';
const displayEl = document.querySelector('.display__lower');
displayEl.textContent = displayValue;

const numberBtnList = document.querySelectorAll('.btn--number');
Array.from(numberBtnList).map(
  (numberBtn) => numberBtn.addEventListener('click', onClickNumberBtn)
);

const operatorBtnList = document.querySelectorAll('.btn--operator');
Array.from(operatorBtnList).map(
  (operatorBtn) => operatorBtn.addEventListener('click', onClickOperatorBtn)
);

const calculateBtn = document.querySelector('.btn--calculate');
calculateBtn.addEventListener('click', onClickCalculateBtn);

const allClearBtn = document.querySelector('.btn--all-clear');
allClearBtn.addEventListener('click', onClickAllClearBtn);

const deleteBtn = document.querySelector('.btn--delete');
deleteBtn.addEventListener('click', onClickDeleteBtn);

const dotBtn = document.querySelector('.btn--dot');
dotBtn.addEventListener('click', onClickDotBtn);

window.addEventListener('keydown', (event) => {
  const button = document.querySelector(`.btn[data-value="${event.key}"]`);

  if (button) {
    button.click();
  }
});

// event handlers
function onClickNumberBtn(event) {
  if (displayValue.length < maxDigits) {
    if (firstNumber === null) {
      if (displayValue === '0') {
        displayValue = event.target.dataset.value;
      } else if (displayValue === firstNumber) {
        displayValue = event.target.dataset.value;
      } else {
        displayValue += event.target.dataset.value;
      }
    } else {
      if (displayValue === firstNumber) {
        displayValue = event.target.dataset.value;
      } else {
        displayValue += event.target.dataset.value;
      }
    }
  }

  displayEl.textContent = displayValue;
}

function onClickOperatorBtn(event) {
  operator = event.target.dataset.value;

  if (!firstNumber) {
    firstNumber = Number(displayValue);
    displayValue = '';
  } else {
    secondNumber = Number(displayValue);

    if (isError(operator, secondNumber)) {
      displayEl.textContent = 'ERROR';
      resetValues();
      displayValue = '';

      return;
    }

    displayValue = operate(firstNumber, secondNumber, operator);
    displayEl.textContent = `${roundNumber(displayValue)}`;
    firstNumber = displayValue;
  }
}

function onClickCalculateBtn() {
  if (operator === null) {
    return;
  }

  secondNumber = Number(displayValue);

  if (isError(operator, secondNumber)) {
    displayEl.textContent = 'ERROR';
  } else {
    displayValue = operate(firstNumber, secondNumber, operator);
    displayEl.textContent = `${roundNumber(displayValue)}`;
  }

  resetValues();
  displayValue = '';
}

function onClickAllClearBtn() {
  resetValues();
  displayValue = '0';
  displayEl.textContent = displayValue;
}

function onClickDeleteBtn() {
  if (displayValue.length > 1 && displayValue !== '0') {
    displayValue = displayValue.slice(0, -1);
    displayEl.textContent = displayValue;
  } else {
    displayValue = '0';
    displayEl.textContent = displayValue;
  }
}

function onClickDotBtn() {
  if (!displayValue.includes('.')) {
    displayValue += '.';
    displayEl.textContent = displayValue;
  }
}

function isError(operator, secondNumber) {
  return operator === '/' && secondNumber === 0
}

function resetValues() {
  firstNumber = null;
  secondNumber = null;
  operator = null;
}

function roundNumber(number) {
  return parseFloat(Math.round(number + 'e' + maxDigits) + 'e-' + maxDigits);
}
