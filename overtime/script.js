const rateInput = document.getElementById("rate");
const hoursInput = document.getElementById("hours");
const thresholdInput = document.getElementById("threshold");
const multiplierInput = document.getElementById("multiplier");

const regularHoursEl = document.getElementById("regularHours");
const overtimeHoursEl = document.getElementById("overtimeHours");
const overtimeRateEl = document.getElementById("overtimeRate");

const regularPayEl = document.getElementById("regularPay");
const overtimePayEl = document.getElementById("overtimePay");
const totalPayEl = document.getElementById("totalPay");

const messageEl = document.getElementById("message");

const calculateButton = document.getElementById("calculate");
const exampleButton = document.getElementById("example");
const resetButton = document.getElementById("reset");

function money(amount) {
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD"
  });
}

function resetResults() {
  regularHoursEl.textContent = "0.00";
  overtimeHoursEl.textContent = "0.00";
  overtimeRateEl.textContent = "$0.00";
  regularPayEl.textContent = "$0.00";
  overtimePayEl.textContent = "$0.00";
  totalPayEl.textContent = "$0.00";
}

function calculateOvertime() {
  const rate = Number(rateInput.value);
  const hours = Number(hoursInput.value);
  const threshold = Number(thresholdInput.value);
  const multiplier = Number(multiplierInput.value);

  messageEl.classList.remove("error");

  if (!rateInput.value && !hoursInput.value) {
    resetResults();
    messageEl.textContent = "Enter values or load an example to begin.";
    return;
  }

  if (rate <= 0 || hours <= 0 || threshold <= 0 || multiplier <= 0) {
    resetResults();
    messageEl.textContent = "Enter positive numbers for rate, hours, threshold, and multiplier.";
    messageEl.classList.add("error");
    return;
  }

  const regularHours = Math.min(hours, threshold);
  const overtimeHours = Math.max(hours - threshold, 0);

  const overtimeRate = rate * multiplier;
  const regularPay = regularHours * rate;
  const overtimePay = overtimeHours * overtimeRate;
  const totalPay = regularPay + overtimePay;

  regularHoursEl.textContent = regularHours.toFixed(2);
  overtimeHoursEl.textContent = overtimeHours.toFixed(2);
  overtimeRateEl.textContent = money(overtimeRate);
  regularPayEl.textContent = money(regularPay);
  overtimePayEl.textContent = money(overtimePay);
  totalPayEl.textContent = money(totalPay);

  messageEl.textContent = "Calculation updated.";
}

function loadExample() {
  rateInput.value = "25";
  hoursInput.value = "48";
  thresholdInput.value = "40";
  multiplierInput.value = "1.5";
  calculateOvertime();
}

function clearCalculator() {
  rateInput.value = "";
  hoursInput.value = "";
  thresholdInput.value = "40";
  multiplierInput.value = "1.5";
  resetResults();
  messageEl.classList.remove("error");
  messageEl.textContent = "Enter values or load an example to begin.";
}

calculateButton.addEventListener("click", calculateOvertime);
exampleButton.addEventListener("click", loadExample);
resetButton.addEventListener("click", clearCalculator);

rateInput.addEventListener("input", calculateOvertime);
hoursInput.addEventListener("input", calculateOvertime);
thresholdInput.addEventListener("input", calculateOvertime);
multiplierInput.addEventListener("input", calculateOvertime);