import {operate} from "./math.js";

const displayEl = document.querySelector('.display__lower');
const displayHigherEl = document.querySelector('.display__higher');
const numberBtnList = document.querySelectorAll('.btn--number');
const operatorBtnList = document.querySelectorAll('.btn--operator');
const calculateBtn = document.querySelector('.btn--calculate');
const allClearBtn = document.querySelector('.btn--all-clear');
const deleteBtn = document.querySelector('.btn--delete');
const dotBtn = document.querySelector('.btn--dot');

const maxDigits = 10;
let firstNumber = null;
let secondNumber = null;
let operator = null;
let displayValue = '0';
let wasPressedEqualBtn = false;

displayEl.textContent = displayValue;

Array.from(numberBtnList).map((numberBtn) => numberBtn.addEventListener('click', onClickNumberBtn));
Array.from(operatorBtnList).map((operatorBtn) => operatorBtn.addEventListener('click', onClickOperatorBtn));
calculateBtn.addEventListener('click', onClickCalculateBtn);
allClearBtn.addEventListener('click', onClickAllClearBtn);
deleteBtn.addEventListener('click', onClickDeleteBtn);
dotBtn.addEventListener('click', onClickDotBtn);

window.addEventListener('keydown', onKeyDownHandler);

// event handlers
function onClickNumberBtn(event) {
  if (operator === null && wasPressedEqualBtn) {
    firstNumber = null;
    wasPressedEqualBtn = false;
  }

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
  wasPressedEqualBtn = false;

  if (operator !== null) {
    onClickCalculateBtn();
    wasPressedEqualBtn = false;
    operator = event.target.dataset.value;
    displayHigherEl.textContent = `${firstNumber} ${operator}`;
  } else {
    operator = event.target.dataset.value;
    displayHigherEl.textContent = `${firstNumber} ${operator}`;

    if (!firstNumber) {
      firstNumber = Number(displayValue);
      displayValue = '';
      displayHigherEl.textContent = `${firstNumber} ${operator}`;
    } else {
      if (displayValue !== '') {
        secondNumber = Number(displayValue);
      } else {
        return;
      }

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
}

function onClickCalculateBtn() {
  if (operator === null) {
    return;
  }

  secondNumber = displayValue === '' ? firstNumber : Number(displayValue);

  if (isError(operator, secondNumber)) {
    displayEl.textContent = 'ERROR';
  } else {
    displayValue = operate(firstNumber, secondNumber, operator);
    displayEl.textContent = `${roundNumber(displayValue)}`;
    displayHigherEl.textContent += ` ${secondNumber} =`;
  }

  firstNumber = displayValue;
  secondNumber = null;
  displayValue = '';
  operator = null;
  wasPressedEqualBtn = true;
}

function onClickAllClearBtn() {
  resetValues();
  displayValue = '0';
  displayEl.textContent = displayValue;
  displayHigherEl.textContent = '';
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

function onKeyDownHandler(event) {
  const button = document.querySelector(`.btn[data-value="${event.key}"]`);

  if (event.key === 'Enter') {
    calculateBtn.click();
  }

  if (button) {
    button.click();
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
  return parseFloat(Math.round(parseFloat(number + 'e' + maxDigits)) + 'e-' + maxDigits);
}
