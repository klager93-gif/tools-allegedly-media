const rateInput = document.getElementById("rate");
const hoursInput = document.getElementById("hours");
const thresholdInput = document.getElementById("threshold");
const multiplierInput = document.getElementById("multiplier");

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

  if (!rate || !hours || !threshold || !multiplier) {
    regularPayEl.textContent = "$0.00";
    overtimePayEl.textContent = "$0.00";
    totalPayEl.textContent = "$0.00";
    return;
  }

  const regularHours = Math.min(hours, threshold);
  const overtimeHours = Math.max(hours - threshold, 0);

  const regularPay = regularHours * rate;
  const overtimePay = overtimeHours * rate * multiplier;
  const totalPay = regularPay + overtimePay;

  regularPayEl.textContent = money(regularPay);
  overtimePayEl.textContent = money(overtimePay);
  totalPayEl.textContent = money(totalPay);
}

button.addEventListener("click", calculateOvertime);