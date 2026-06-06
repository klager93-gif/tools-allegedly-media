const rateInput = document.getElementById("rate");
const hoursInput = document.getElementById("hours");
const payPeriodInput = document.getElementById("payPeriod");
const multiplierInput = document.getElementById("multiplier");

const overrideThresholdInput = document.getElementById("overrideThreshold");
const customThresholdInput = document.getElementById("customThreshold");
const customThresholdWrap = document.getElementById("customThresholdWrap");
const thresholdDisplayEl = document.getElementById("thresholdDisplay");
const thresholdNoteEl = document.getElementById("thresholdNote");

const totalHoursEl = document.getElementById("totalHours");
const regularHoursEl = document.getElementById("regularHours");
const overtimeHoursEl = document.getElementById("overtimeHours");

const hourlyRateEl = document.getElementById("hourlyRate");
const overtimeRateEl = document.getElementById("overtimeRate");
const effectiveRateEl = document.getElementById("effectiveRate");

const regularPayEl = document.getElementById("regularPay");
const overtimePayEl = document.getElementById("overtimePay");
const totalPayEl = document.getElementById("totalPay");

const takeHomePayEl = document.getElementById("takeHomePay");
const netEffectiveRateEl = document.getElementById("netEffectiveRate");

const generatedTimeEl = document.getElementById("generatedTime");
const messageEl = document.getElementById("message");

const taxListEl = document.getElementById("taxList");
const deductionListEl = document.getElementById("deductionList");
const otherListEl = document.getElementById("otherList");

const taxTotalLabelEl = document.getElementById("taxTotalLabel");
const deductionTotalLabelEl = document.getElementById("deductionTotalLabel");
const otherTotalLabelEl = document.getElementById("otherTotalLabel");

const taxResultRowsEl = document.getElementById("taxResultRows");
const deductionResultRowsEl = document.getElementById("deductionResultRows");

const taxResultsTotalEl = document.getElementById("taxResultsTotal");
const deductionResultsTotalEl = document.getElementById("deductionResultsTotal");

let taxes = [];
let deductions = [];
let otherAdjustments = [];

function getInputValue(input) {
  return Number(input.value) || 0;
}

function makeId() {
  return Date.now().toString() + Math.random().toString(16).slice(2);
}

function getDefaultThreshold() {
  switch (payPeriodInput.value) {
    case "weekly":
      return 40;

    case "biweekly":
      return 80;

    case "semimonthly":
      return 86.67;

    case "monthly":
      return 173.33;

    case "custom":
      return 0;

    default:
      return 40;
  }
}

function getPayPeriodLabel() {
  switch (payPeriodInput.value) {
    case "weekly":
      return "Weekly";

    case "biweekly":
      return "Bi-weekly";

    case "semimonthly":
      return "Semi-monthly";

    case "monthly":
      return "Monthly";

    case "custom":
      return "Custom";

    default:
      return "Weekly";
  }
}

function getThreshold() {
  if (overrideThresholdInput.checked || payPeriodInput.value === "custom") {
    return getInputValue(customThresholdInput);
  }

  return getDefaultThreshold();
}

function updateThresholdUI() {
  const threshold = getThreshold();
  const usingCustom =
    overrideThresholdInput.checked || payPeriodInput.value === "custom";

  if (usingCustom) {
    customThresholdWrap.classList.remove("hidden-threshold");
  } else {
    customThresholdWrap.classList.add("hidden-threshold");
  }

  if (threshold > 0) {
    thresholdDisplayEl.textContent = `${formatNumber(threshold)} hours`;
  } else {
    thresholdDisplayEl.textContent = "custom threshold needed";
  }

  if (usingCustom) {
    thresholdNoteEl.textContent =
      "Using a custom overtime threshold. Enter the number of hours before overtime starts.";
    return;
  }

  thresholdNoteEl.textContent =
    `${getPayPeriodLabel()} pay period selected. Overtime starts after ${formatNumber(threshold)} hours.`;
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
  takeHomePayEl.textContent = "$0.00";
  netEffectiveRateEl.textContent = "$0.00";
  taxResultsTotalEl.textContent = "-$0.00";
  deductionResultsTotalEl.textContent = "-$0.00";
  generatedTimeEl.textContent = "--";
}

function createAdjustmentItem(item, type) {
  const row = document.createElement("div");
  row.className = "adjustment-item";

  const label = document.createElement("span");

  if (type === "tax") {
    label.textContent = `${item.name} — ${formatNumber(item.value)}%`;
  } else {
    label.textContent = `${item.name} — ${formatMoney(item.value)}`;
  }

  const remove = document.createElement("button");
  remove.type = "button";
  remove.textContent = "×";

  remove.addEventListener("click", () => {
    if (type === "tax") {
      taxes = taxes.filter((entry) => entry.id !== item.id);
    }

    if (type === "deduction") {
      deductions = deductions.filter((entry) => entry.id !== item.id);
    }

    if (type === "other") {
      otherAdjustments = otherAdjustments.filter((entry) => entry.id !== item.id);
    }

    renderAdjustments();
    calculateOvertime();
  });

  row.appendChild(label);
  row.appendChild(remove);

  return row;
}

function renderList(container, items, type, emptyText) {
  container.innerHTML = "";

  if (items.length === 0) {
    const empty = document.createElement("p");
    empty.textContent = emptyText;
    container.appendChild(empty);
    return;
  }

  items.forEach((item) => {
    container.appendChild(createAdjustmentItem(item, type));
  });
}

function renderAdjustments() {
  renderList(taxListEl, taxes, "tax", "No taxes added.");
  renderList(deductionListEl, deductions, "deduction", "No deductions added.");
  renderList(otherListEl, otherAdjustments, "other", "No other adjustments added.");

  const totalTaxPercent = taxes.reduce((sum, item) => sum + item.value, 0);
  const totalDeductions = deductions.reduce((sum, item) => sum + item.value, 0);
  const totalOther = otherAdjustments.reduce((sum, item) => sum + item.value, 0);

  taxTotalLabelEl.textContent = `Total: ${formatNumber(totalTaxPercent)}%`;
  deductionTotalLabelEl.textContent = `Total: ${formatMoney(totalDeductions)}`;
  otherTotalLabelEl.textContent = `Total: ${formatMoney(totalOther)}`;
}

function addTax() {
  const name = prompt("Tax name:", "Federal Tax");

  if (!name) {
    return;
  }

  const value = Number(prompt("Tax rate percentage:", "12"));

  if (Number.isNaN(value) || value < 0) {
    return;
  }

  taxes.push({
    id: makeId(),
    name,
    value
  });

  renderAdjustments();
  calculateOvertime();
}

function addDeduction() {
  const name = prompt("Deduction name:", "Insurance");

  if (!name) {
    return;
  }

  const value = Number(prompt("Deduction amount:", "75"));

  if (Number.isNaN(value) || value < 0) {
    return;
  }

  deductions.push({
    id: makeId(),
    name,
    value
  });

  renderAdjustments();
  calculateOvertime();
}

function addOtherAdjustment() {
  const name = prompt("Adjustment name:", "Other");

  if (!name) {
    return;
  }

  const value = Number(prompt("Adjustment amount:", "0"));

  if (Number.isNaN(value) || value < 0) {
    return;
  }

  otherAdjustments.push({
    id: makeId(),
    name,
    value
  });

  renderAdjustments();
  calculateOvertime();
}

function renderBreakdown(container, items, type, grossPay) {
  container.innerHTML = "";

  if (items.length === 0) {
    const empty = document.createElement("p");
    empty.textContent =
      type === "tax"
        ? "No taxes added."
        : "No deductions added.";

    container.appendChild(empty);
    return;
  }

  items.forEach((item) => {
    const row = document.createElement("div");
    row.className = "result-row";

    const name = document.createElement("span");
    const value = document.createElement("strong");

    name.textContent = item.name;

    if (type === "tax") {
      value.textContent = `-${formatMoney(grossPay * (item.value / 100))}`;
    } else {
      value.textContent = `-${formatMoney(item.value)}`;
    }

    row.appendChild(name);
    row.appendChild(value);
    container.appendChild(row);
  });
}

function calculateOvertime() {
  updateThresholdUI();

  const rate = getInputValue(rateInput);
  const hours = getInputValue(hoursInput);
  const threshold = getThreshold();
  const multiplier = getInputValue(multiplierInput);

  messageEl.classList.remove("error");

  if (!rateInput.value && !hoursInput.value) {
    resetResults();
    messageEl.textContent = "Enter values or load an example to begin.";
    return;
  }

  if (rate <= 0 || hours <= 0 || multiplier <= 0) {
    resetResults();
    messageEl.textContent =
      "Enter positive numbers for hourly rate, hours worked, and overtime multiplier.";
    messageEl.classList.add("error");
    return;
  }

  if (threshold <= 0) {
    resetResults();
    messageEl.textContent =
      "Enter a positive overtime threshold or choose a standard pay period.";
    messageEl.classList.add("error");
    return;
  }

  const totalTaxPercent = taxes.reduce((sum, item) => sum + item.value, 0);

  if (totalTaxPercent > 100) {
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
  const grossPay = regularPay + overtimePay;

  const grossEffectiveRate = totalHours > 0 ? grossPay / totalHours : 0;

  const estimatedTaxes = grossPay * (totalTaxPercent / 100);
  const fixedDeductions = deductions.reduce((sum, item) => sum + item.value, 0);
  const otherTotal = otherAdjustments.reduce((sum, item) => sum + item.value, 0);

  const totalReductions = estimatedTaxes + fixedDeductions + otherTotal;

  const takeHomePay = Math.max(grossPay - totalReductions, 0);
  const netEffectiveRate = totalHours > 0 ? takeHomePay / totalHours : 0;

  totalHoursEl.textContent = formatNumber(totalHours);
  regularHoursEl.textContent = formatNumber(regularHours);
  overtimeHoursEl.textContent = formatNumber(overtimeHours);

  hourlyRateEl.textContent = formatMoney(rate);
  overtimeRateEl.textContent = formatMoney(overtimeRate);
  effectiveRateEl.textContent = formatMoney(grossEffectiveRate);

  regularPayEl.textContent = formatMoney(regularPay);
  overtimePayEl.textContent = formatMoney(overtimePay);
  totalPayEl.textContent = formatMoney(grossPay);

  taxResultsTotalEl.textContent = `-${formatMoney(estimatedTaxes)}`;
  deductionResultsTotalEl.textContent = `-${formatMoney(fixedDeductions + otherTotal)}`;

  takeHomePayEl.textContent = formatMoney(takeHomePay);
  netEffectiveRateEl.textContent = formatMoney(netEffectiveRate);

  renderBreakdown(taxResultRowsEl, taxes, "tax", grossPay);
  renderBreakdown(
    deductionResultRowsEl,
    [...deductions, ...otherAdjustments],
    "deduction",
    grossPay
  );

  generatedTimeEl.textContent = getCurrentUtcTime();

  messageEl.textContent = "Calculation updated.";
}

function loadExample() {
  rateInput.value = "25";
  hoursInput.value = "92";
  payPeriodInput.value = "biweekly";
  multiplierInput.value = "1.5";

  overrideThresholdInput.checked = false;
  customThresholdInput.value = "";

  taxes = [
    {
      id: makeId(),
      name: "Federal Tax",
      value: 12
    },
    {
      id: makeId(),
      name: "State Tax",
      value: 5
    },
    {
      id: makeId(),
      name: "Other Tax",
      value: 3
    }
  ];

  deductions = [
    {
      id: makeId(),
      name: "Insurance",
      value: 75
    },
    {
      id: makeId(),
      name: "Retirement",
      value: 50
    }
  ];

  otherAdjustments = [];

  updateThresholdUI();
  renderAdjustments();
  calculateOvertime();
}

function clearCalculator() {
  rateInput.value = "";
  hoursInput.value = "";
  payPeriodInput.value = "weekly";
  multiplierInput.value = "1.5";

  overrideThresholdInput.checked = false;
  customThresholdInput.value = "";

  taxes = [];
  deductions = [];
  otherAdjustments = [];

  updateThresholdUI();
  renderAdjustments();
  resetResults();

  messageEl.classList.remove("error");
  messageEl.textContent = "Enter values or load an example to begin.";
}

function clearAdjustments() {
  taxes = [];
  deductions = [];
  otherAdjustments = [];

  renderAdjustments();
  calculateOvertime();
}

document.getElementById("calculate").addEventListener("click", calculateOvertime);
document.getElementById("example").addEventListener("click", loadExample);
document.getElementById("reset").addEventListener("click", clearCalculator);
document.getElementById("clearAdjustments").addEventListener("click", clearAdjustments);

document.getElementById("addTax").addEventListener("click", addTax);
document.getElementById("addTaxInline").addEventListener("click", addTax);

document.getElementById("addDeduction").addEventListener("click", addDeduction);
document.getElementById("addDeductionInline").addEventListener("click", addDeduction);

document.getElementById("addOther").addEventListener("click", addOtherAdjustment);
document.getElementById("addOtherInline").addEventListener("click", addOtherAdjustment);

[
  rateInput,
  hoursInput,
  payPeriodInput,
  multiplierInput,
  overrideThresholdInput,
  customThresholdInput
].forEach((input) => {
  input.addEventListener("input", calculateOvertime);
  input.addEventListener("change", calculateOvertime);
});

document.getElementById("openChangelog").addEventListener("click", () => {
  openTextModal({
    title: "CHANGELOG",
    file: "CHANGELOG.txt"
  });
});

document.getElementById("openRoadmap").addEventListener("click", () => {
  openTextModal({
    title: "ROADMAP",
    file: "ROADMAP.txt"
  });
});

updateThresholdUI();
renderAdjustments();
resetResults();