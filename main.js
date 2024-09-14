// Get the calculator display element
const display = document.getElementById("display");
const history = document.getElementById("history");

// Append a value to the display
function appendToDisplay(value) {
  resetDisplayIfError();

  // Replace the last operator if the new value is an operator
  if (isOperator(value) && isOperator(display.value.slice(-1))) {
    display.value = display.value.slice(0, -1) + value; // Replace last operator
  } else if (isValidInput(value)) {
    display.value += value;
  }
}

// Validates if the input is allowed
function isValidInput(value) {
  const lastChar = display.value.slice(-1);

  if (value === "." && lastChar === ".") {
    return false; // Prevent multiple decimals
  }

  if (isOperator(value) && display.value === "") {
    return false; // Prevent starting with an operator
  }

  return true;
}

// Helper function to check if a value is an operator
function isOperator(char) {
  return ["+", "-", "*", "/"].includes(char);
}

// Resets the display if it shows Error
function resetDisplayIfError() {
  if (display.value === "Error") {
    display.value = "";
  }
}

// Function to clear the entire display
function clearDisplay() {
  display.value = "";
  history.textContent = "";
}

// Function to delete the last character in the display
function deleteLastCar() {
  display.value = display.value.slice(0, -1);
}

// Function to evaluate the current expression in the display
function calculate() {
  try {
    const result = new Function("return " + display.value)();
    if (result === Infinity || result === -Infinity) {
      display.value = "Can't divide by Zero";
    } else {
      display.value = result;
    }
    updateHistory(display.value);
  } catch (error) {
    display.value = "Error";
  }
}

// Function to display last operation
function updateHistory(result) {
  history.textContent = `Last result: ${result}`;
}

// Keyboard Support
document.addEventListener("keydown", (event) => {
  const key = event.key;
  if (/[0-9\+\-\*\/\(\)\.]/.test(key)) {
    appendToDisplay(key);
  } else if (key === "Enter") {
    calculate();
  } else if (key === "Backspace") {
    deleteLastCar();
  } else if (key === "Escape") {
    clearDisplay();
  }
});
