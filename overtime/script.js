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

const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalContent = document.getElementById("modalContent");

const openChangelogButton = document.getElementById("openChangelog");
const openRoadmapButton = document.getElementById("openRoadmap");
const closeModalButton = document.getElementById("closeModal");

function money(amount) {
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD"
  });
}

function number(value) {
  return value.toFixed(2);
}

function currentUtcTime() {
  return new Date().toISOString().replace("T", " ").slice(0, 19) + " UTC";
}

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

    messageEl.textContent =
      "Enter values or load an example to begin.";

    return;
  }

  if (
    rate <= 0 ||
    hours <= 0 ||
    threshold <= 0 ||
    multiplier <= 0
  ) {

    resetResults();

    messageEl.textContent =
      "Enter positive numbers for rate, hours, threshold, and multiplier.";

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

  const effectiveRate =
    totalHours > 0
      ? totalPay / totalHours
      : 0;

  totalHoursEl.textContent = number(totalHours);

  regularHoursEl.textContent = number(regularHours);

  overtimeHoursEl.textContent = number(overtimeHours);

  hourlyRateEl.textContent = money(rate);

  overtimeRateEl.textContent = money(overtimeRate);

  effectiveRateEl.textContent = money(effectiveRate);

  regularPayEl.textContent = money(regularPay);

  overtimePayEl.textContent = money(overtimePay);

  totalPayEl.textContent = money(totalPay);

  generatedTimeEl.textContent = currentUtcTime();

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

  messageEl.textContent =
    "Enter values or load an example to begin.";
}

async function openTextFile(title, fileName) {

  modal.classList.remove("hidden");

  modalTitle.textContent = title;

  modalContent.textContent = "Loading...";

  try {

    const response = await fetch(fileName);

    const text = await response.text();

    modalContent.textContent = text;

  } catch {

    modalContent.textContent =
      "Unable to load file.";
  }
}

function closeModal() {

  modal.classList.add("hidden");
}

calculateButton.addEventListener(
  "click",
  calculateOvertime
);

exampleButton.addEventListener(
  "click",
  loadExample
);

resetButton.addEventListener(
  "click",
  clearCalculator
);

rateInput.addEventListener(
  "input",
  calculateOvertime
);

hoursInput.addEventListener(
  "input",
  calculateOvertime
);

thresholdInput.addEventListener(
  "input",
  calculateOvertime
);

multiplierInput.addEventListener(
  "input",
  calculateOvertime
);

openChangelogButton.addEventListener(
  "click",
  () => openTextFile(
    "CHANGELOG",
    "CHANGELOG.txt"
  )
);

openRoadmapButton.addEventListener(
  "click",
  () => openTextFile(
    "ROADMAP",
    "ROADMAP.txt"
  )
);

closeModalButton.addEventListener(
  "click",
  closeModal
);

modal.addEventListener(
  "click",
  (event) => {

    if (event.target === modal) {

      closeModal();
    }
  }
);

document.addEventListener(
  "keydown",
  (event) => {

    if (
      event.key === "Escape" &&
      !modal.classList.contains("hidden")
    ) {

      closeModal();
    }
  }
);