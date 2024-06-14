import { operate } from "./math.js";
import { getDisplayValue, setDisplayValue } from "./ui.js";

let firstNumber;
let secondNumber;
let operator;
setDisplayValue('0');

const numberBtnList = document.querySelectorAll('.btn--number');
const onClickNumberBtn = (event) => {
  const displayValue = getDisplayValue();

  if (displayValue === '0') {
    setDisplayValue(event.target.dataset.value);
  } else if (firstNumber) {
    setDisplayValue(event.target.dataset.value);
  } else if (displayValue.length < 10) {
    setDisplayValue(displayValue + event.target.dataset.value);
  }
}

Array.from(numberBtnList).map(
  (numberBtn) => numberBtn.addEventListener('click', onClickNumberBtn)
);

const operatorBtnList = document.querySelectorAll('.btn--operator');

const onClickOperatorBtn = (event) => {
  const displayValue = getDisplayValue();

  if (!firstNumber) {
    firstNumber = Number(displayValue);
    operator = event.target.dataset.value;
  } else {
    secondNumber = Number(displayValue);
    operator = event.target.dataset.value;
    setDisplayValue(
      operate(firstNumber, secondNumber, operator),
    );
  }
};

Array.from(operatorBtnList).map(
  (operatorBtn) => operatorBtn.addEventListener('click', onClickOperatorBtn)
);

const onClickCalculateBtn = () => {
  secondNumber = Number(getDisplayValue());
  setDisplayValue(
    operate(firstNumber, secondNumber, operator),
  );
  firstNumber = '';
  secondNumber = '';
};

const calculateBtn = document.querySelector('.btn--calculate');

calculateBtn.addEventListener('click', onClickCalculateBtn);

const onClickAllClearBtn = () => {
  firstNumber = '';
  secondNumber = '';
  operator = '';
  setDisplayValue('0')
};

const allClearBtn = document.querySelector('.btn--all-clear');

allClearBtn.addEventListener('click', onClickAllClearBtn);

const onClickDeleteBtn = () => {
  const displayValue = getDisplayValue();

  if (displayValue.length > 1 && displayValue !== '0') {
    setDisplayValue(
      displayValue.slice(0, -1),
    );
  } else {
    setDisplayValue('0')
  }
};

const deleteBtn = document.querySelector('.btn--delete');

deleteBtn.addEventListener('click', onClickDeleteBtn);
