import {operate} from "./math.js";

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

// event handlers
function onClickNumberBtn(event){
  console.log(`number | ${firstNumber} | ${secondNumber} | ${operator} | ${displayValue}`);

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

  displayEl.textContent = displayValue;
}

function onClickOperatorBtn(event) {
  console.log(`operator | ${firstNumber} | ${secondNumber} | ${operator} | ${displayValue}`);
  operator = event.target.dataset.value;

  if (!firstNumber) {
    firstNumber = Number(displayValue);
    displayValue = '';
  } else {
    secondNumber = Number(displayValue);
    displayValue = operate(firstNumber, secondNumber, operator);
    displayEl.textContent = displayValue;
    firstNumber = displayValue;
  }
}

function onClickCalculateBtn() {
  console.log(`calculate | ${firstNumber} | ${secondNumber} | ${operator} | ${displayValue}`);
  secondNumber = Number(displayValue);
  displayValue = operate(firstNumber, secondNumber, operator);
  displayEl.textContent = displayValue;
  firstNumber = null;
  secondNumber = null;
  displayValue = '';
}

function onClickAllClearBtn() {
  firstNumber = null;
  secondNumber = null;
  operator = null;
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
