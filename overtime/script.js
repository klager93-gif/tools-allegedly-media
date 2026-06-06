const rateInput = document.getElementById("rate");
const hoursInput = document.getElementById("hours");
const thresholdInput = document.getElementById("threshold");
const multiplierInput = document.getElementById("multiplier");

const totalHoursEl = document.getElementById("totalHours");
const regularHoursEl = document.getElementById("regularHours");
const overtimeHoursEl = document.getElementById("overtimeHours");

const hourlyRateEl = document.getElementById("hourlyRate");
const overtimeRateEl = document.getElementById("overtimeRate");
const effectiveRateEl = document.getElementById("effectiveRate");

const regularPayEl = document.getElementById("regularPay");
const overtimePayEl = document.getElementById("overtimePay");
const totalPayEl = document.getElementById("totalPay");

const generatedTimeEl = document.getElementById("generatedTime");
const messageEl = document.getElementById("message");

const calculateButton = document.getElementById("calculate");
const exampleButton = document.getElementById("example");
const resetButton = document.getElementById("reset");

const openChangelogButton = document.getElementById("openChangelog");
const openRoadmapButton = document.getElementById("openRoadmap");

function resetResults() {
  totalHoursEl.textContent = "0.00";
  regularHoursEl.textContent = "0.00";
  overtimeHoursEl.textContent = "0.00";

  hourlyRateEl.textContent = "$0.00";
  overtimeRateEl.textContent = "$0.00";
  effectiveRateEl.textContent = "$0.00";

  regularPayEl.textContent = "$0.00";
  overtimePayEl.textContent = "$0.00";
  totalPayEl.textContent = "$0.00";

  generatedTimeEl.textContent = "--";
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

  const totalHours = hours;
  const regularHours = Math.min(hours, threshold);
  const overtimeHours = Math.max(hours - threshold, 0);

  const overtimeRate = rate * multiplier;
  const regularPay = regularHours * rate;
  const overtimePay = overtimeHours * overtimeRate;
  const totalPay = regularPay + overtimePay;
  const effectiveRate = totalHours > 0 ? totalPay / totalHours : 0;

  totalHoursEl.textContent = formatNumber(totalHours);
  regularHoursEl.textContent = formatNumber(regularHours);
  overtimeHoursEl.textContent = formatNumber(overtimeHours);

  hourlyRateEl.textContent = formatMoney(rate);
  overtimeRateEl.textContent = formatMoney(overtimeRate);
  effectiveRateEl.textContent = formatMoney(effectiveRate);

  regularPayEl.textContent = formatMoney(regularPay);
  overtimePayEl.textContent = formatMoney(overtimePay);
  totalPayEl.textContent = formatMoney(totalPay);

  generatedTimeEl.textContent = getCurrentUtcTime();
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

openChangelogButton.addEventListener("click", () => {
  openTextModal({
    title: "CHANGELOG",
    file: "CHANGELOG.txt"
  });
});

openRoadmapButton.addEventListener("click", () => {
  openTextModal({
    title: "ROADMAP",
    file: "ROADMAP.txt"
  });
});