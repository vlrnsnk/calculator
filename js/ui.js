const displayEl = document.querySelector('.display__lower');

const getDisplayValue = () => displayEl.textContent;

const setDisplayValue = (value) => {
  displayEl.textContent = value;
};

export { getDisplayValue, setDisplayValue };
