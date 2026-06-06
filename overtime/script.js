const rateInput = document.getElementById("rate");
const hoursInput = document.getElementById("hours");
const thresholdInput = document.getElementById("threshold");
const multiplierInput = document.getElementById("multiplier");

const federalTaxInput = document.getElementById("federalTax");
const stateTaxInput = document.getElementById("stateTax");
const localTaxInput = document.getElementById("localTax");
const otherTaxInput = document.getElementById("otherTax");

const insuranceDeductionInput = document.getElementById("insuranceDeduction");
const retirementDeductionInput = document.getElementById("retirementDeduction");
const extraWithholdingInput = document.getElementById("extraWithholding");
const otherFixedDeductionInput = document.getElementById("otherFixedDeduction");

const totalHoursEl = document.getElementById("totalHours");
const regularHoursEl = document.getElementById("regularHours");
const overtimeHoursEl = document.getElementById("overtimeHours");

const hourlyRateEl = document.getElementById("hourlyRate");
const overtimeRateEl = document.getElementById("overtimeRate");
const effectiveRateEl = document.getElementById("effectiveRate");

const regularPayEl = document.getElementById("regularPay");
const overtimePayEl = document.getElementById("overtimePay");
const totalPayEl = document.getElementById("totalPay");

const estimatedTaxesEl = document.getElementById("estimatedTaxes");
const fixedDeductionsEl = document.getElementById("fixedDeductions");
const takeHomePayEl = document.getElementById("takeHomePay");
const netEffectiveRateEl = document.getElementById("netEffectiveRate");

const generatedTimeEl = document.getElementById("generatedTime");
const messageEl = document.getElementById("message");

const calculateButton = document.getElementById("calculate");
const exampleButton = document.getElementById("example");
const resetButton = document.getElementById("reset");

const openChangelogButton = document.getElementById("openChangelog");
const openRoadmapButton = document.getElementById("openRoadmap");

function inputValue(input) {
  return Number(input.value) || 0;
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

  estimatedTaxesEl.textContent = "$0.00";
  fixedDeductionsEl.textContent = "$0.00";
  takeHomePayEl.textContent = "$0.00";
  netEffectiveRateEl.textContent = "$0.00";

  generatedTimeEl.textContent = "--";
}

function calculateOvertime() {
  const rate = inputValue(rateInput);
  const hours = inputValue(hoursInput);
  const threshold = inputValue(thresholdInput);
  const multiplier = inputValue(multiplierInput);

  const federalTax = inputValue(federalTaxInput);
  const stateTax = inputValue(stateTaxInput);
  const localTax = inputValue(localTaxInput);
  const otherTax = inputValue(otherTaxInput);

  const insuranceDeduction = inputValue(insuranceDeductionInput);
  const retirementDeduction = inputValue(retirementDeductionInput);
  const extraWithholding = inputValue(extraWithholdingInput);
  const otherFixedDeduction = inputValue(otherFixedDeductionInput);

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

  if (
    federalTax < 0 ||
    stateTax < 0 ||
    localTax < 0 ||
    otherTax < 0 ||
    insuranceDeduction < 0 ||
    retirementDeduction < 0 ||
    extraWithholding < 0 ||
    otherFixedDeduction < 0
  ) {
    resetResults();
    messageEl.textContent = "Tax rates and deductions cannot be negative.";
    messageEl.classList.add("error");
    return;
  }

  const totalTaxRate = federalTax + stateTax + localTax + otherTax;

  if (totalTaxRate > 100) {
    resetResults();
    messageEl.textContent = "Total tax percentage cannot be greater than 100%.";
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

  const estimatedTaxes = totalPay * (totalTaxRate / 100);
  const fixedDeductions =
    insuranceDeduction +
    retirementDeduction +
    extraWithholding +
    otherFixedDeduction;

  const takeHomePay = Math.max(totalPay - estimatedTaxes - fixedDeductions, 0);
  const netEffectiveRate = totalHours > 0 ? takeHomePay / totalHours : 0;

  totalHoursEl.textContent = formatNumber(totalHours);
  regularHoursEl.textContent = formatNumber(regularHours);
  overtimeHoursEl.textContent = formatNumber(overtimeHours);

  hourlyRateEl.textContent = formatMoney(rate);
  overtimeRateEl.textContent = formatMoney(overtimeRate);
  effectiveRateEl.textContent = formatMoney(effectiveRate);

  regularPayEl.textContent = formatMoney(regularPay);
  overtimePayEl.textContent = formatMoney(overtimePay);
  totalPayEl.textContent = formatMoney(totalPay);

  estimatedTaxesEl.textContent = formatMoney(estimatedTaxes);
  fixedDeductionsEl.textContent = formatMoney(fixedDeductions);
  takeHomePayEl.textContent = formatMoney(takeHomePay);
  netEffectiveRateEl.textContent = formatMoney(netEffectiveRate);

  generatedTimeEl.textContent = getCurrentUtcTime();
  messageEl.textContent = "Calculation updated.";
}

function loadExample() {
  rateInput.value = "25";
  hoursInput.value = "48";
  thresholdInput.value = "40";
  multiplierInput.value = "1.5";

  federalTaxInput.value = "12";
  stateTaxInput.value = "5";
  localTaxInput.value = "0";
  otherTaxInput.value = "3";

  insuranceDeductionInput.value = "75";
  retirementDeductionInput.value = "50";
  extraWithholdingInput.value = "0";
  otherFixedDeductionInput.value = "0";

  calculateOvertime();
}

function clearCalculator() {
  rateInput.value = "";
  hoursInput.value = "";
  thresholdInput.value = "40";
  multiplierInput.value = "1.5";

  federalTaxInput.value = "";
  stateTaxInput.value = "";
  localTaxInput.value = "";
  otherTaxInput.value = "";

  insuranceDeductionInput.value = "";
  retirementDeductionInput.value = "";
  extraWithholdingInput.value = "";
  otherFixedDeductionInput.value = "";

  resetResults();

  messageEl.classList.remove("error");
  messageEl.textContent = "Enter values or load an example to begin.";
}

calculateButton.addEventListener("click", calculateOvertime);
exampleButton.addEventListener("click", loadExample);
resetButton.addEventListener("click", clearCalculator);

[
  rateInput,
  hoursInput,
  thresholdInput,
  multiplierInput,
  federalTaxInput,
  stateTaxInput,
  localTaxInput,
  otherTaxInput,
  insuranceDeductionInput,
  retirementDeductionInput,
  extraWithholdingInput,
  otherFixedDeductionInput
].forEach((input) => {
  input.addEventListener("input", calculateOvertime);
});

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