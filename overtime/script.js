const rateInput = document.getElementById("rate");
const hoursInput = document.getElementById("hours");
const payPeriodInput = document.getElementById("payPeriod");
const currencyInput = document.getElementById("currency");
const multiplierInput = document.getElementById("multiplier");

const differentialRateInput = document.getElementById("differentialRate");
const differentialHoursInput = document.getElementById("differentialHours");
const doubleTimeHoursInput = document.getElementById("doubleTimeHours");
const weekendBonusInput = document.getElementById("weekendBonus");
const holidayBonusInput = document.getElementById("holidayBonus");
const otherBonusInput = document.getElementById("otherBonus");

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

const differentialPayEl = document.getElementById("differentialPay");
const doubleTimePayEl = document.getElementById("doubleTimePay");
const bonusPayEl = document.getElementById("bonusPay");
const advancedPayTotalEl = document.getElementById("advancedPayTotal");

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

const adjustmentModalEl = document.getElementById("adjustmentModal");
const closeAdjustmentModalButton = document.getElementById("closeAdjustmentModal");
const adjustmentModalTitleEl = document.getElementById("adjustmentModalTitle");
const adjustmentModalHelpEl = document.getElementById("adjustmentModalHelp");
const adjustmentNameLabelEl = document.getElementById("adjustmentNameLabel");
const adjustmentValueLabelEl = document.getElementById("adjustmentValueLabel");
const adjustmentNameInput = document.getElementById("adjustmentName");
const adjustmentValueInput = document.getElementById("adjustmentValue");
const adjustmentModalMessageEl = document.getElementById("adjustmentModalMessage");
const saveAdjustmentButton = document.getElementById("saveAdjustment");
const cancelAdjustmentButton = document.getElementById("cancelAdjustment");

const STORAGE_KEY = "signalLabsOvertimeCalculatorV0733";
const LEGACY_STORAGE_KEY = "signalLabsOvertimeCalculatorV063";

let taxes = [];
let deductions = [];
let otherAdjustments = [];
let isLoadingSavedSettings = false;
let activeAdjustmentType = null;

function getInputValue(input) {
  return Number(input.value) || 0;
}

function makeId() {
  return Date.now().toString() + Math.random().toString(16).slice(2);
}

function getSelectedCurrency() {
  return currencyInput ? currencyInput.value : "USD";
}

function formatMoney(amount) {
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: getSelectedCurrency()
  });
}

function formatNumber(value) {
  return Number(value).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
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

function getSavedState() {
  return {
    rate: rateInput.value,
    hours: hoursInput.value,
    payPeriod: payPeriodInput.value,
    currency: getSelectedCurrency(),
    multiplier: multiplierInput.value,
    differentialRate: differentialRateInput.value,
    differentialHours: differentialHoursInput.value,
    doubleTimeHours: doubleTimeHoursInput.value,
    weekendBonus: weekendBonusInput.value,
    holidayBonus: holidayBonusInput.value,
    otherBonus: otherBonusInput.value,
    overrideThreshold: overrideThresholdInput.checked,
    customThreshold: customThresholdInput.value,
    taxes,
    deductions,
    otherAdjustments
  };
}

function saveSettings(showMessage = false) {
  if (isLoadingSavedSettings) {
    return;
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(getSavedState()));

    if (showMessage) {
      messageEl.classList.remove("error");
      messageEl.textContent = "Settings saved. They will load automatically next time you visit.";
    }
  } catch (error) {
    if (showMessage) {
      messageEl.textContent = "Unable to save settings in this browser.";
      messageEl.classList.add("error");
    }
  }
}

function loadSavedSettings() {
  const saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY);

  if (!saved) {
    return false;
  }

  try {
    isLoadingSavedSettings = true;

    const data = JSON.parse(saved);

    rateInput.value = data.rate || "";
    hoursInput.value = data.hours || "";
    payPeriodInput.value = data.payPeriod || "weekly";
    currencyInput.value = data.currency || "USD";
    multiplierInput.value = data.multiplier || "1.5";
    differentialRateInput.value = data.differentialRate || "";
    differentialHoursInput.value = data.differentialHours || "";
    doubleTimeHoursInput.value = data.doubleTimeHours || "";
    weekendBonusInput.value = data.weekendBonus || "";
    holidayBonusInput.value = data.holidayBonus || "";
    otherBonusInput.value = data.otherBonus || "";
    overrideThresholdInput.checked = Boolean(data.overrideThreshold);
    customThresholdInput.value = data.customThreshold || "";

    taxes = Array.isArray(data.taxes) ? data.taxes : [];
    deductions = Array.isArray(data.deductions) ? data.deductions : [];
    otherAdjustments = Array.isArray(data.otherAdjustments)
      ? data.otherAdjustments
      : [];

    return true;
  } catch (error) {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(LEGACY_STORAGE_KEY);
    return false;
  } finally {
    isLoadingSavedSettings = false;
  }
}

function clearSavedSettings() {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(LEGACY_STORAGE_KEY);
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
  differentialPayEl.textContent = "$0.00";
  doubleTimePayEl.textContent = "$0.00";
  bonusPayEl.textContent = "$0.00";
  advancedPayTotalEl.textContent = "$0.00";
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
    saveSettings();
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

function getAdjustmentConfig(type) {
  if (type === "tax") {
    return {
      title: "Add Tax",
      help: "Add a tax percentage. Example: Federal Tax at 12%.",
      nameLabel: "Tax Name",
      valueLabel: "Tax Percentage",
      defaultName: "Federal Tax",
      defaultValue: "12",
      buttonText: "Add Tax"
    };
  }

  if (type === "deduction") {
    return {
      title: "Add Deduction",
      help: "Add a fixed deduction amount. Example: Insurance at $75.",
      nameLabel: "Deduction Name",
      valueLabel: "Deduction Amount",
      defaultName: "Insurance",
      defaultValue: "75",
      buttonText: "Add Deduction"
    };
  }

  return {
    title: "Add Other Adjustment",
    help: "Add any other fixed amount to subtract from estimated take-home pay.",
    nameLabel: "Adjustment Name",
    valueLabel: "Adjustment Amount",
    defaultName: "Other",
    defaultValue: "0",
    buttonText: "Add Adjustment"
  };
}

function openAdjustmentModal(type) {
  const config = getAdjustmentConfig(type);

  activeAdjustmentType = type;

  adjustmentModalTitleEl.textContent = config.title;
  adjustmentModalHelpEl.textContent = config.help;
  adjustmentNameLabelEl.textContent = config.nameLabel;
  adjustmentValueLabelEl.textContent = config.valueLabel;
  adjustmentNameInput.value = config.defaultName;
  adjustmentValueInput.value = config.defaultValue;
  adjustmentModalMessageEl.textContent = "";
  adjustmentModalMessageEl.classList.remove("error");
  saveAdjustmentButton.textContent = config.buttonText;

  adjustmentModalEl.classList.remove("hidden");
  adjustmentNameInput.focus();
  adjustmentNameInput.select();
}

function closeAdjustmentModal() {
  adjustmentModalEl.classList.add("hidden");
  activeAdjustmentType = null;
}

function saveAdjustmentFromModal() {
  const name = adjustmentNameInput.value.trim();
  const value = Number(adjustmentValueInput.value);

  adjustmentModalMessageEl.classList.remove("error");

  if (!activeAdjustmentType) {
    return;
  }

  if (!name) {
    adjustmentModalMessageEl.textContent = "Enter a name for this item.";
    adjustmentModalMessageEl.classList.add("error");
    return;
  }

  if (Number.isNaN(value) || value < 0) {
    adjustmentModalMessageEl.textContent = "Enter a positive value or 0.";
    adjustmentModalMessageEl.classList.add("error");
    return;
  }

  const item = {
    id: makeId(),
    name,
    value
  };

  if (activeAdjustmentType === "tax") {
    taxes.push(item);
  }

  if (activeAdjustmentType === "deduction") {
    deductions.push(item);
  }

  if (activeAdjustmentType === "other") {
    otherAdjustments.push(item);
  }

  renderAdjustments();
  saveSettings();
  calculateOvertime();
  closeAdjustmentModal();
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
  saveSettings();

  const rate = getInputValue(rateInput);
  const hours = getInputValue(hoursInput);
  const threshold = getThreshold();
  const multiplier = getInputValue(multiplierInput);
  const differentialRate = getInputValue(differentialRateInput);
  const differentialHours = getInputValue(differentialHoursInput);
  const doubleTimeHours = getInputValue(doubleTimeHoursInput);
  const weekendBonus = getInputValue(weekendBonusInput);
  const holidayBonus = getInputValue(holidayBonusInput);
  const otherBonus = getInputValue(otherBonusInput);

  messageEl.classList.remove("error");

  if (!rateInput.value && !hoursInput.value) {
    resetResults();
    messageEl.textContent = "Enter values or load an example to begin.";
    return;
  }

  if (rate <= 0 || hours <= 0) {
    resetResults();
    messageEl.textContent =
      "Enter positive numbers for hourly rate and hours worked.";
    messageEl.classList.add("error");
    return;
  }

  if (multiplier < 1) {
    resetResults();
    messageEl.textContent =
      "Overtime multiplier should be 1.0 or higher.";
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

  if (
    differentialRate < 0 ||
    differentialHours < 0 ||
    doubleTimeHours < 0 ||
    weekendBonus < 0 ||
    holidayBonus < 0 ||
    otherBonus < 0
  ) {
    resetResults();
    messageEl.textContent =
      "Advanced pay values cannot be negative.";
    messageEl.classList.add("error");
    return;
  }

  if (differentialHours > hours) {
    resetResults();
    messageEl.textContent =
      "Differential hours should not be greater than total hours worked.";
    messageEl.classList.add("error");
    return;
  }

  if (doubleTimeHours > hours) {
    resetResults();
    messageEl.textContent =
      "Additional double-time hours should not be greater than total hours worked.";
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

  const differentialPay = differentialRate * differentialHours;
  const doubleTimePay = doubleTimeHours * rate * 2;
  const bonusPay = weekendBonus + holidayBonus + otherBonus;
  const advancedPay = differentialPay + doubleTimePay + bonusPay;

  const grossPay = regularPay + overtimePay + advancedPay;

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

  differentialPayEl.textContent = formatMoney(differentialPay);
  doubleTimePayEl.textContent = formatMoney(doubleTimePay);
  bonusPayEl.textContent = formatMoney(bonusPay);
  advancedPayTotalEl.textContent = formatMoney(advancedPay);

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

  messageEl.textContent = "Calculation updated. Settings saved.";
}

function loadExample() {
  rateInput.value = "25";
  hoursInput.value = "92";
  payPeriodInput.value = "biweekly";
  currencyInput.value = "USD";
  multiplierInput.value = "1.5";
  differentialRateInput.value = "2";
  differentialHoursInput.value = "24";
  doubleTimeHoursInput.value = "4";
  weekendBonusInput.value = "50";
  holidayBonusInput.value = "0";
  otherBonusInput.value = "25";


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
  saveSettings();
  calculateOvertime();
}

function clearCalculator() {
  rateInput.value = "";
  hoursInput.value = "";
  payPeriodInput.value = "weekly";
  currencyInput.value = "USD";
  multiplierInput.value = "1.5";
  differentialRateInput.value = "";
  differentialHoursInput.value = "";
  doubleTimeHoursInput.value = "";
  weekendBonusInput.value = "";
  holidayBonusInput.value = "";
  otherBonusInput.value = "";


  overrideThresholdInput.checked = false;
  customThresholdInput.value = "";

  taxes = [];
  deductions = [];
  otherAdjustments = [];

  clearSavedSettings();

  updateThresholdUI();
  renderAdjustments();
  resetResults();

  messageEl.classList.remove("error");
  messageEl.textContent = "Calculator reset. Saved settings cleared.";
}

function clearAdjustments() {
  taxes = [];
  deductions = [];
  otherAdjustments = [];

  renderAdjustments();
  saveSettings();
  calculateOvertime();
}


function setupMobileCollapsibleCards() {
  const cards = document.querySelectorAll("[data-collapse-card]");

  cards.forEach((card) => {
    const button = card.querySelector(".collapse-toggle");
    const content = card.querySelector(".card-collapse-content");

    if (!button || !content) {
      return;
    }

    const updateButton = () => {
      const isCollapsed = card.classList.contains("is-collapsed");
      button.textContent = isCollapsed ? "Show" : "Hide";
      button.setAttribute("aria-expanded", String(!isCollapsed));
    };

    if (card.classList.contains("mobile-collapsed") && window.innerWidth <= 700) {
      card.classList.add("is-collapsed");
    }

    updateButton();

    button.addEventListener("click", () => {
      card.classList.toggle("is-collapsed");
      updateButton();
    });
  });
}



function setupMobileResultSections() {
  const sections = document.querySelectorAll("[data-result-section]");

  sections.forEach((section) => {
    const button = section.querySelector(".result-collapse-toggle");

    if (!button) {
      return;
    }

    const updateButton = () => {
      const isCollapsed = section.classList.contains("is-result-collapsed");
      button.textContent = isCollapsed ? "Show" : "Hide";
      button.setAttribute("aria-expanded", String(!isCollapsed));
    };

    if (section.classList.contains("mobile-result-collapsed") && window.innerWidth <= 700) {
      section.classList.add("is-result-collapsed");
    }

    updateButton();

    button.addEventListener("click", () => {
      section.classList.toggle("is-result-collapsed");
      updateButton();
    });
  });
}


document.getElementById("calculate").addEventListener("click", calculateOvertime);
document.getElementById("saveSettings").addEventListener("click", () => saveSettings(true));
document.getElementById("example").addEventListener("click", loadExample);
document.getElementById("reset").addEventListener("click", clearCalculator);
document.getElementById("clearAdjustments").addEventListener("click", clearAdjustments);

document.getElementById("addTax").addEventListener("click", () => openAdjustmentModal("tax"));
document.getElementById("addTaxInline").addEventListener("click", () => openAdjustmentModal("tax"));

document.getElementById("addDeduction").addEventListener("click", () => openAdjustmentModal("deduction"));
document.getElementById("addDeductionInline").addEventListener("click", () => openAdjustmentModal("deduction"));

document.getElementById("addOther").addEventListener("click", () => openAdjustmentModal("other"));
document.getElementById("addOtherInline").addEventListener("click", () => openAdjustmentModal("other"));

closeAdjustmentModalButton.addEventListener("click", closeAdjustmentModal);
cancelAdjustmentButton.addEventListener("click", closeAdjustmentModal);
saveAdjustmentButton.addEventListener("click", saveAdjustmentFromModal);

adjustmentModalEl.addEventListener("click", (event) => {
  if (event.target === adjustmentModalEl) {
    closeAdjustmentModal();
  }
});

[adjustmentNameInput, adjustmentValueInput].forEach((input) => {
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      saveAdjustmentFromModal();
    }
  });
});

[
  rateInput,
  hoursInput,
  payPeriodInput,
  currencyInput,
  multiplierInput,
  differentialRateInput,
  differentialHoursInput,
  doubleTimeHoursInput,
  weekendBonusInput,
  holidayBonusInput,
  otherBonusInput,
  overrideThresholdInput,
  customThresholdInput
].forEach((input) => {
  input.addEventListener("input", calculateOvertime);
  input.addEventListener("change", calculateOvertime);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !adjustmentModalEl.classList.contains("hidden")) {
    closeAdjustmentModal();
  }
});

document.getElementById("openChangelog").addEventListener("click", () => {
  openTextModal({
    title: "CHANGELOG",
    file: "CHANGELOG.md"
  });
});

document.getElementById("openRoadmap").addEventListener("click", () => {
  openTextModal({
    title: "ROADMAP",
    file: "ROADMAP.md"
  });
});

const loadedSavedSettings = loadSavedSettings();

setupMobileCollapsibleCards();
setupMobileResultSections();

updateThresholdUI();
renderAdjustments();

if (loadedSavedSettings) {
  calculateOvertime();
} else {
  resetResults();
}
