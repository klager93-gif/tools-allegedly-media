const rateInput = document.getElementById("rate");
const hoursInput = document.getElementById("hours");
const thresholdInput = document.getElementById("threshold");
const multiplierInput = document.getElementById("multiplier");

const regularHoursEl = document.getElementById("regularHours");
const overtimeHoursEl = document.getElementById("overtimeHours");

const regularPayEl = document.getElementById("regularPay");
const overtimePayEl = document.getElementById("overtimePay");
const totalPayEl = document.getElementById("totalPay");

const button = document.getElementById("calculate");

function money(amount) {
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD"
  });
}

function calculateOvertime() {

  const rate = Number(rateInput.value);
  const hours = Number(hoursInput.value);
  const threshold = Number(thresholdInput.value);
  const multiplier = Number(multiplierInput.value);

  const regularHours = Math.min(hours, threshold);
  const overtimeHours = Math.max(hours - threshold, 0);

  regularHoursEl.textContent = regularHours.toFixed(2);
  overtimeHoursEl.textContent = overtimeHours.toFixed(2);

  const regularPay = regularHours * rate;
  const overtimePay = overtimeHours * rate * multiplier;
  const totalPay = regularPay + overtimePay;

  regularPayEl.textContent = money(regularPay);
  overtimePayEl.textContent = money(overtimePay);
  totalPayEl.textContent = money(totalPay);
}

button.addEventListener("click", calculateOvertime);

rateInput.addEventListener("input", calculateOvertime);
hoursInput.addEventListener("input", calculateOvertime);
thresholdInput.addEventListener("input", calculateOvertime);
multiplierInput.addEventListener("input", calculateOvertime);