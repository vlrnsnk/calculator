import {operate} from "./math.js";

let firstNumber;
let secondNumber;
let operator;
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
  if (displayEl.textContent === '0') {
    displayValue = event.target.dataset.value;
  } else if (displayValue.length < 10) {
    displayValue += event.target.dataset.value;
  }

  displayEl.textContent = displayValue;
}

function onClickOperatorBtn(event) {
  if (!firstNumber) {
    firstNumber = Number(displayValue);
    displayValue = '';
    operator = event.target.dataset.value;
  } else {
    secondNumber = Number(displayValue);
    operator = event.target.dataset.value;
    displayValue = operate(firstNumber, secondNumber, operator);
    displayEl.textContent = displayValue;
  }
}

function onClickCalculateBtn() {
  secondNumber = Number(displayValue);
  displayValue = operate(firstNumber, secondNumber, operator);
  displayEl.textContent = displayValue;
  firstNumber = '';
  secondNumber = '';
  displayValue = '';
}

function onClickAllClearBtn() {
  firstNumber = '';
  secondNumber = '';
  operator = '';
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
