/*
Signal Labs
Tool: Overtime Calculator
File: script.js
Version: v0.9
Purpose: Tool-specific logic and event handling
*/
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

const messageEl = document.getElementById("message");
const generatedTimeEl = document.getElementById("generatedTime");

const STORAGE_KEY = "signalLabsOvertimeCalculatorV09";
const LEGACY_STORAGE_KEYS = [
  "signalLabsOvertimeCalculatorV085",
  "signalLabsOvertimeCalculatorV0821",
  "signalLabsOvertimeCalculatorV083",
  "signalLabsOvertimeCalculatorV082",
  "signalLabsOvertimeCalculatorV081",
  "signalLabsOvertimeCalculatorV0801",
  "signalLabsOvertimeCalculatorV080",
  "signalLabsOvertimeCalculatorV0733",
  "signalLabsOvertimeCalculatorV0732",
  "signalLabsOvertimeCalculatorV0731",
  "signalLabsOvertimeCalculatorV073",
  "signalLabsOvertimeCalculatorV072",
  "signalLabsOvertimeCalculatorV071",
  "signalLabsOvertimeCalculatorV070",
  "signalLabsOvertimeCalculatorV064",
  "signalLabsOvertimeCalculatorV063"
];

let taxes = [];
let deductions = [];
let otherAdjustments = [];
let isLoadingSavedSettings = false;
let activeAdjustmentType = null;

const resultIds = [
  "totalHours",
  "regularHours",
  "overtimeHours",
  "hourlyRate",
  "overtimeRate",
  "effectiveRate",
  "regularPay",
  "overtimePay",
  "totalPay",
  "differentialPay",
  "doubleTimePay",
  "bonusPay",
  "advancedPayTotal",
  "takeHomePay",
  "netEffectiveRate",
  "taxResultsTotal",
  "deductionResultsTotal",
  "goalTargetSummary",
  "goalTargetAmount",
  "goalHoursNeeded",
  "goalOvertimeNeeded",
  "goalShiftsNeeded",
  "goalGrossRequired",
  "goalTakeHomeEstimate"
];

function el(id) {
  return document.getElementById(id);
}

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
  return Number(amount || 0).toLocaleString("en-US", {
    style: "currency",
    currency: getSelectedCurrency()
  });
}

function formatNumber(value) {
  return Number(value || 0).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function formatWholeGoalNumber(value) {
  return Math.ceil(Number(value || 0)).toLocaleString("en-US");
}

function localUtcTime() {
  if (typeof getCurrentUtcTime === "function") {
    return getCurrentUtcTime();
  }

  return new Date().toISOString().replace("T", " ").slice(0, 19) + " UTC";
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

function getCollapseStates() {
  const states = {
    cards: [],
    results: []
  };

  document.querySelectorAll("[data-collapse-card]").forEach((card, index) => {
    states.cards[index] = card.classList.contains("is-collapsed");
  });

  document.querySelectorAll("[data-result-section]").forEach((section, index) => {
    states.results[index] = section.classList.contains("is-result-collapsed");
  });

  return states;
}

function applyCollapseStates(collapseStates) {
  if (!collapseStates) {
    return;
  }

  if (Array.isArray(collapseStates.cards)) {
    document.querySelectorAll("[data-collapse-card]").forEach((card, index) => {
      card.classList.toggle("is-collapsed", Boolean(collapseStates.cards[index]));

      const button = card.querySelector(".collapse-toggle");

      if (button) {
        const collapsed = card.classList.contains("is-collapsed");
        button.textContent = collapsed ? "Show" : "Hide";
        button.setAttribute("aria-expanded", String(!collapsed));
      }
    });
  }

  if (Array.isArray(collapseStates.results)) {
    document.querySelectorAll("[data-result-section]").forEach((section, index) => {
      section.classList.toggle("is-result-collapsed", Boolean(collapseStates.results[index]));

      const button = section.querySelector(".result-collapse-toggle");

      if (button) {
        const collapsed = section.classList.contains("is-result-collapsed");
        button.textContent = collapsed ? "Show" : "Hide";
        button.setAttribute("aria-expanded", String(!collapsed));
      }
    });
  }
}

function getSavedState() {
  return {
    rate: rateInput.value,
    hours: hoursInput.value,
    payPeriod: payPeriodInput.value,
    currency: currencyInput.value,
    multiplier: multiplierInput.value,
    differentialRate: differentialRateInput.value,
    differentialHours: differentialHoursInput.value,
    doubleTimeHours: doubleTimeHoursInput.value,
    weekendBonus: weekendBonusInput.value,
    holidayBonus: holidayBonusInput.value,
    otherBonus: otherBonusInput.value,
    goalType: el("goalType").value,
    goalAmount: el("goalAmount").value,
    goalShiftLength: el("goalShiftLength").value,
    overrideThreshold: overrideThresholdInput.checked,
    customThreshold: customThresholdInput.value,
    taxes,
    deductions,
    otherAdjustments,
    collapseStates: getCollapseStates()
  };
}

function readSavedData() {
  const keysToCheck = [STORAGE_KEY, ...LEGACY_STORAGE_KEYS];

  for (const key of keysToCheck) {
    const saved = localStorage.getItem(key);

    if (!saved) {
      continue;
    }

    try {
      return {
        data: JSON.parse(saved),
        sourceKey: key
      };
    } catch (error) {
      localStorage.removeItem(key);
    }
  }

  return null;
}

function saveSettings(showMessage = false) {
  if (isLoadingSavedSettings) {
    return;
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(getSavedState()));

    if (showMessage) {
      messageEl.classList.remove("error");
      messageEl.textContent = "Settings and layout saved. They will load automatically next time you visit.";
    }
  } catch (error) {
    if (showMessage) {
      messageEl.textContent = "Unable to save settings in this browser.";
      messageEl.classList.add("error");
    }
  }
}

function clearSavedSettings() {
  localStorage.removeItem(STORAGE_KEY);

  LEGACY_STORAGE_KEYS.forEach((key) => {
    localStorage.removeItem(key);
  });
}

function loadSavedSettings() {
  const savedProfile = readSavedData();

  if (!savedProfile || !savedProfile.data) {
    return false;
  }

  try {
    isLoadingSavedSettings = true;
    const data = savedProfile.data;

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
    el("goalType").value = data.goalType || "gross";
    el("goalAmount").value = data.goalAmount || "";
    el("goalShiftLength").value = data.goalShiftLength || "8";
    overrideThresholdInput.checked = Boolean(data.overrideThreshold);
    customThresholdInput.value = data.customThreshold || "";

    taxes = Array.isArray(data.taxes) ? data.taxes : [];
    deductions = Array.isArray(data.deductions) ? data.deductions : [];
    otherAdjustments = Array.isArray(data.otherAdjustments) ? data.otherAdjustments : [];

    if (data.collapseStates) {
      setTimeout(() => applyCollapseStates(data.collapseStates), 0);
    }

    return true;
  } catch (error) {
    clearSavedSettings();
    return false;
  } finally {
    isLoadingSavedSettings = false;
  }
}

function clearSavedProfile() {
  clearSavedSettings();

  messageEl.classList.remove("error");
  messageEl.textContent =
    "Saved profile cleared from this device. Current values will stay until you leave or reset.";
}

function updateThresholdUI() {
  const threshold = getThreshold();
  const usingCustom = overrideThresholdInput.checked || payPeriodInput.value === "custom";

  customThresholdWrap.classList.toggle("hidden-threshold", !usingCustom);

  thresholdDisplayEl.textContent =
    threshold > 0 ? `${formatNumber(threshold)} hours` : "custom threshold needed";

  if (usingCustom) {
    thresholdNoteEl.textContent =
      "Using a custom overtime threshold. Enter the number of hours before overtime starts.";
    return;
  }

  thresholdNoteEl.textContent =
    `${getPayPeriodLabel()} pay period selected. Overtime starts after ${formatNumber(threshold)} hours.`;
}

function setText(id, value) {
  const node = el(id);

  if (node) {
    node.textContent = value;
  }
}

function resetGoalResults() {
  setText("goalTargetSummary", "--");
  setText("goalTargetAmount", "$0.00");
  setText("goalHoursNeeded", "--");
  setText("goalOvertimeNeeded", "--");
  setText("goalShiftsNeeded", "--");
  setText("goalGrossRequired", "$0.00");
  setText("goalTakeHomeEstimate", "$0.00");

  const note = el("goalResultNote");

  if (note) {
    note.classList.remove("error");
    note.textContent = "Enter a goal amount to estimate hours needed.";
  }
}

function resetResults() {
  setText("totalHours", "0.00");
  setText("regularHours", "0.00");
  setText("overtimeHours", "0.00");
  setText("hourlyRate", "$0.00");
  setText("overtimeRate", "$0.00");
  setText("effectiveRate", "$0.00");
  setText("regularPay", "$0.00");
  setText("overtimePay", "$0.00");
  setText("totalPay", "$0.00");
  setText("differentialPay", "$0.00");
  setText("doubleTimePay", "$0.00");
  setText("bonusPay", "$0.00");
  setText("advancedPayTotal", "$0.00");
  setText("takeHomePay", "$0.00");
  setText("netEffectiveRate", "$0.00");
  setText("taxResultsTotal", "-$0.00");
  setText("deductionResultsTotal", "-$0.00");
  resetGoalResults();

  const taxResultRows = el("taxResultRows");
  const deductionResultRows = el("deductionResultRows");

  if (taxResultRows) {
    taxResultRows.innerHTML = "<p>No taxes added.</p>";
  }

  if (deductionResultRows) {
    deductionResultRows.innerHTML = "<p>No deductions added.</p>";
  }

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
  remove.setAttribute("aria-label", `Remove ${item.name}`);

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
  renderList(el("taxList"), taxes, "tax", "No taxes added.");
  renderList(el("deductionList"), deductions, "deduction", "No deductions added.");
  renderList(el("otherList"), otherAdjustments, "other", "No other adjustments added.");

  const totalTaxPercent = taxes.reduce((sum, item) => sum + Number(item.value || 0), 0);
  const totalDeductions = deductions.reduce((sum, item) => sum + Number(item.value || 0), 0);
  const totalOther = otherAdjustments.reduce((sum, item) => sum + Number(item.value || 0), 0);

  setText("taxTotalLabel", `Total: ${formatNumber(totalTaxPercent)}%`);
  setText("deductionTotalLabel", `Total: ${formatMoney(totalDeductions)}`);
  setText("otherTotalLabel", `Total: ${formatMoney(totalOther)}`);
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

  el("adjustmentModalTitle").textContent = config.title;
  el("adjustmentModalHelp").textContent = config.help;
  el("adjustmentNameLabel").textContent = config.nameLabel;
  el("adjustmentValueLabel").textContent = config.valueLabel;
  el("adjustmentName").value = config.defaultName;
  el("adjustmentValue").value = config.defaultValue;
  el("adjustmentModalMessage").textContent = "";
  el("adjustmentModalMessage").classList.remove("error");
  el("saveAdjustment").textContent = config.buttonText;

  el("adjustmentModal").classList.remove("hidden");
  el("adjustmentName").focus();
  el("adjustmentName").select();
}

function closeAdjustmentModal() {
  el("adjustmentModal").classList.add("hidden");
  activeAdjustmentType = null;
}

function saveAdjustmentFromModal() {
  const name = el("adjustmentName").value.trim();
  const value = Number(el("adjustmentValue").value);
  const modalMessage = el("adjustmentModalMessage");

  modalMessage.classList.remove("error");

  if (!activeAdjustmentType) {
    return;
  }

  if (!name) {
    modalMessage.textContent = "Enter a name for this item.";
    modalMessage.classList.add("error");
    return;
  }

  if (Number.isNaN(value) || value < 0) {
    modalMessage.textContent = "Enter a positive value or 0.";
    modalMessage.classList.add("error");
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
    empty.textContent = type === "tax" ? "No taxes added." : "No deductions added.";
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
      value.textContent = `-${formatMoney(grossPay * (Number(item.value || 0) / 100))}`;
    } else {
      value.textContent = `-${formatMoney(Number(item.value || 0))}`;
    }

    row.appendChild(name);
    row.appendChild(value);
    container.appendChild(row);
  });
}

function getFixedAdvancedPay() {
  const differentialPay = getInputValue(differentialRateInput) * getInputValue(differentialHoursInput);
  const doubleTimePay = getInputValue(doubleTimeHoursInput) * getInputValue(rateInput) * 2;
  const bonusPay =
    getInputValue(weekendBonusInput) +
    getInputValue(holidayBonusInput) +
    getInputValue(otherBonusInput);

  return differentialPay + doubleTimePay + bonusPay;
}

function estimateGrossForHours(hours) {
  const rate = getInputValue(rateInput);
  const threshold = getThreshold();
  const multiplier = getInputValue(multiplierInput);
  const regularHours = Math.min(hours, threshold);
  const overtimeHours = Math.max(hours - threshold, 0);

  return (regularHours * rate) + (overtimeHours * rate * multiplier) + getFixedAdvancedPay();
}

function estimateTakeHomeForGross(grossPay) {
  const totalTaxPercent = taxes.reduce((sum, item) => sum + Number(item.value || 0), 0);
  const fixedDeductions = deductions.reduce((sum, item) => sum + Number(item.value || 0), 0);
  const otherTotal = otherAdjustments.reduce((sum, item) => sum + Number(item.value || 0), 0);
  const estimatedTaxes = grossPay * (totalTaxPercent / 100);

  return Math.max(grossPay - estimatedTaxes - fixedDeductions - otherTotal, 0);
}

function findHoursForTarget(targetAmount, targetType) {
  let low = 0;
  let high = 1;

  const getValue = (hours) => {
    const grossPay = estimateGrossForHours(hours);
    return targetType === "takehome" ? estimateTakeHomeForGross(grossPay) : grossPay;
  };

  while (getValue(high) < targetAmount && high < 10000) {
    high *= 2;
  }

  if (high >= 10000 && getValue(high) < targetAmount) {
    return null;
  }

  for (let index = 0; index < 80; index += 1) {
    const mid = (low + high) / 2;

    if (getValue(mid) >= targetAmount) {
      high = mid;
    } else {
      low = mid;
    }
  }

  return high;
}

function calculateGoalMode() {
  const rate = getInputValue(rateInput);
  const threshold = getThreshold();
  const multiplier = getInputValue(multiplierInput);
  const goalAmount = getInputValue(el("goalAmount"));
  const goalType = el("goalType").value;
  const shiftLength = getInputValue(el("goalShiftLength")) || 8;
  const note = el("goalResultNote");

  resetGoalResults();

  if (!el("goalAmount").value) {
    return;
  }

  setText("goalTargetSummary", goalType === "takehome" ? "Take-home" : "Gross");
  setText("goalTargetAmount", formatMoney(goalAmount));

  if (rate <= 0 || threshold <= 0 || multiplier < 1 || goalAmount <= 0 || shiftLength <= 0) {
    note.classList.add("error");
    note.textContent = "Enter a valid rate, threshold, multiplier, shift length, and goal amount.";
    return;
  }

  const hoursNeeded = findHoursForTarget(goalAmount, goalType);

  if (hoursNeeded === null) {
    note.classList.add("error");
    note.textContent = "Goal is too large to estimate with the current settings.";
    return;
  }

  const grossRequired = estimateGrossForHours(hoursNeeded);
  const takeHomeEstimate = estimateTakeHomeForGross(grossRequired);
  const overtimeNeeded = Math.max(hoursNeeded - threshold, 0);
  const shiftsNeeded = Math.ceil(hoursNeeded / shiftLength);

  setText("goalHoursNeeded", `${formatNumber(hoursNeeded)} hrs`);
  setText("goalOvertimeNeeded", `${formatNumber(overtimeNeeded)} hrs`);
  setText("goalShiftsNeeded", `${formatWholeGoalNumber(shiftsNeeded)} shifts`);
  setText("goalGrossRequired", formatMoney(grossRequired));
  setText("goalTakeHomeEstimate", formatMoney(takeHomeEstimate));

  note.textContent =
    goalType === "takehome"
      ? "Take-home goal estimate uses your current tax, deduction, and adjustment settings."
      : "Gross goal estimate uses your current pay period and overtime settings.";
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
  const hasGoalAmount = Boolean(el("goalAmount").value);

  messageEl.classList.remove("error");

  if (!rateInput.value && !hoursInput.value && !hasGoalAmount) {
    resetResults();
    messageEl.textContent = "Enter values or load an example to begin.";
    return;
  }

  if (rate <= 0 || (!hasGoalAmount && hours <= 0)) {
    resetResults();
    messageEl.textContent =
      hasGoalAmount
        ? "Enter a positive hourly rate for Goal Mode."
        : "Enter positive numbers for hourly rate and hours worked.";
    messageEl.classList.add("error");
    return;
  }

  if (multiplier < 1) {
    resetResults();
    messageEl.textContent = "Overtime multiplier should be 1.0 or higher.";
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
    messageEl.textContent = "Advanced pay values cannot be negative.";
    messageEl.classList.add("error");
    return;
  }

  const totalTaxPercent = taxes.reduce((sum, item) => sum + Number(item.value || 0), 0);

  if (totalTaxPercent > 100) {
    resetResults();
    messageEl.textContent = "Total tax percentage cannot be greater than 100%.";
    messageEl.classList.add("error");
    return;
  }

  if (hours <= 0 && hasGoalAmount) {
    resetResults();
    calculateGoalMode();
    generatedTimeEl.textContent = localUtcTime();
    messageEl.textContent = "Goal Mode updated. Enter hours worked to calculate regular pay results.";
    return;
  }

  if (differentialHours > hours) {
    resetResults();
    messageEl.textContent = "Differential hours should not be greater than total hours worked.";
    messageEl.classList.add("error");
    return;
  }

  if (doubleTimeHours > hours) {
    resetResults();
    messageEl.textContent = "Additional double-time hours should not be greater than total hours worked.";
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
  const fixedDeductions = deductions.reduce((sum, item) => sum + Number(item.value || 0), 0);
  const otherTotal = otherAdjustments.reduce((sum, item) => sum + Number(item.value || 0), 0);
  const totalReductions = estimatedTaxes + fixedDeductions + otherTotal;

  const takeHomePay = Math.max(grossPay - totalReductions, 0);
  const netEffectiveRate = totalHours > 0 ? takeHomePay / totalHours : 0;

  setText("totalHours", formatNumber(totalHours));
  setText("regularHours", formatNumber(regularHours));
  setText("overtimeHours", formatNumber(overtimeHours));

  setText("hourlyRate", formatMoney(rate));
  setText("overtimeRate", formatMoney(overtimeRate));
  setText("effectiveRate", formatMoney(grossEffectiveRate));

  setText("regularPay", formatMoney(regularPay));
  setText("overtimePay", formatMoney(overtimePay));
  setText("totalPay", formatMoney(grossPay));

  setText("differentialPay", formatMoney(differentialPay));
  setText("doubleTimePay", formatMoney(doubleTimePay));
  setText("bonusPay", formatMoney(bonusPay));
  setText("advancedPayTotal", formatMoney(advancedPay));

  setText("taxResultsTotal", `-${formatMoney(estimatedTaxes)}`);
  setText("deductionResultsTotal", `-${formatMoney(fixedDeductions + otherTotal)}`);

  setText("takeHomePay", formatMoney(takeHomePay));
  setText("netEffectiveRate", formatMoney(netEffectiveRate));

  renderBreakdown(el("taxResultRows"), taxes, "tax", grossPay);
  renderBreakdown(el("deductionResultRows"), [...deductions, ...otherAdjustments], "deduction", grossPay);

  calculateGoalMode();

  generatedTimeEl.textContent = localUtcTime();
  messageEl.textContent = "Calculation updated. Settings saved.";
}



function getProfessionalReportCss() {
  return `
    @page {
      size: letter;
      margin: 0.45in;
    }

    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      color: #111;
      background: #fff;
      font-family: Arial, Helvetica, sans-serif;
      font-size: 11px;
      line-height: 1.35;
    }

    .report-page {
      width: 100%;
      max-width: 7.6in;
      margin: 0 auto;
    }

    .report-header {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 20px;
      align-items: start;
      padding-bottom: 10px;
      border-bottom: 3px solid #174a8b;
      margin-bottom: 14px;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .brand-mark {
      width: 42px;
      height: 42px;
      border: 2px solid #174a8b;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #174a8b;
      font-weight: 800;
      font-size: 16px;
    }

    .brand-title {
      font-size: 24px;
      letter-spacing: 0.12em;
      font-weight: 700;
      color: #0c1b2d;
    }

    .report-title {
      font-size: 16px;
      font-weight: 700;
      margin-top: 2px;
      color: #111;
      letter-spacing: 0;
    }

    .report-meta {
      font-size: 10px;
      line-height: 1.45;
      min-width: 190px;
    }

    h2 {
      font-size: 12px;
      color: #174a8b;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      margin: 12px 0 6px;
    }

    h3 {
      font-size: 11px;
      color: #174a8b;
      margin: 8px 0 4px;
    }

    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }

    .summary-list {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 5px 16px;
      margin: 0;
    }

    .summary-list dt {
      font-weight: 700;
    }

    .summary-list dd {
      margin: 0;
      text-align: right;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 9px;
      break-inside: avoid;
    }

    th,
    td {
      border: 1px solid #b8c0c8;
      padding: 5px 7px;
      vertical-align: top;
    }

    th {
      background: #f1f4f7;
      font-weight: 700;
      text-align: left;
    }

    td.value,
    th.value {
      text-align: right;
      white-space: nowrap;
    }

    tr.total td {
      background: #eef4fb;
      font-weight: 700;
    }

    tr.success td {
      background: #eef8ef;
      font-weight: 700;
    }

    .notes {
      margin: 0 0 10px 18px;
      padding: 0;
    }

    .notes li {
      margin-bottom: 3px;
    }

    .footer {
      border-top: 2px solid #174a8b;
      margin-top: 12px;
      padding-top: 8px;
      text-align: center;
      font-size: 10px;
      color: #333;
    }

    .footer strong {
      color: #0c2d55;
    }

    .muted {
      color: #555;
    }

    @media print {
      .report-page {
        max-width: none;
      }
    }
  `;
}

function escapeReportHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function openProfessionalReportWindow(reportHtml, title) {
  const reportWindow = window.open("", "_blank", "noopener,noreferrer,width=900,height=1100");

  if (!reportWindow) {
    return false;
  }

  reportWindow.document.open();
  reportWindow.document.write(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>${escapeReportHtml(title)}</title>
      <style>${getProfessionalReportCss()}</style>
    </head>
    <body>
      ${reportHtml}
      <script>
        window.addEventListener("load", () => {
          window.focus();
          setTimeout(() => window.print(), 150);
        });
      <\/script>
    </body>
    </html>
  `);
  reportWindow.document.close();

  return true;
}

function buildOvertimeResultsSummary() {
  const lines = [];

  lines.push("Signal Labs Overtime Calculator");
  lines.push("Share & Export Prep Summary");
  lines.push("");
  lines.push(`Generated: ${localUtcTime()}`);
  lines.push("");

  lines.push("Inputs");
  lines.push(`Hourly Rate: ${formatMoney(getInputValue(rateInput))}`);
  lines.push(`Total Hours Worked: ${formatNumber(getInputValue(hoursInput))}`);
  lines.push(`Pay Period: ${getPayPeriodLabel()}`);
  lines.push(`Overtime Threshold: ${formatNumber(getThreshold())} hours`);
  lines.push(`Overtime Multiplier: ${formatNumber(getInputValue(multiplierInput))}`);
  lines.push("");

  lines.push("Results");
  lines.push(`Total Hours: ${el("totalHours").textContent}`);
  lines.push(`Regular Hours: ${el("regularHours").textContent}`);
  lines.push(`Overtime Hours: ${el("overtimeHours").textContent}`);
  lines.push(`Regular Pay: ${el("regularPay").textContent}`);
  lines.push(`Overtime Pay: ${el("overtimePay").textContent}`);
  lines.push(`Advanced Pay: ${el("advancedPayTotal").textContent}`);
  lines.push(`Total Gross Pay: ${el("totalPay").textContent}`);
  lines.push(`Estimated Take-Home Pay: ${el("takeHomePay").textContent}`);
  lines.push(`Net Effective Rate: ${el("netEffectiveRate").textContent}`);
  lines.push("");

  lines.push("Goal Mode");
  lines.push(`Target: ${el("goalTargetAmount").textContent}`);
  lines.push(`Hours Needed: ${el("goalHoursNeeded").textContent}`);
  lines.push(`Estimated Shifts Needed: ${el("goalShiftsNeeded").textContent}`);

  return lines.join("\n");
}

async function copyOvertimeResults() {
  const summary = buildOvertimeResultsSummary();

  try {
    await navigator.clipboard.writeText(summary);
    messageEl.classList.remove("error");
    messageEl.textContent = "Results copied to clipboard.";
  } catch (error) {
    messageEl.classList.add("error");
    messageEl.textContent = "Unable to copy results in this browser.";
  }
}


function buildOvertimeProfessionalReportHtml() {
  calculateOvertime();

  const generated = localUtcTime();
  const rate = getInputValue(rateInput);
  const hours = getInputValue(hoursInput);
  const threshold = getThreshold();
  const multiplier = getInputValue(multiplierInput);
  const differentialRate = getInputValue(differentialRateInput);
  const differentialHours = getInputValue(differentialHoursInput);
  const doubleTimeHours = getInputValue(doubleTimeHoursInput);
  const weekendBonus = getInputValue(weekendBonusInput);
  const holidayBonus = getInputValue(holidayBonusInput);
  const flatBonus = getInputValue(otherBonusInput);
  const goalAmount = getInputValue(el("goalAmount"));
  const goalShiftLength = getInputValue(el("goalShiftLength")) || 8;

  return `
    <main class="report-page">
      <header class="report-header">
        <div class="brand">
          <div class="brand-mark">SL</div>
          <div>
            <div class="brand-title">SIGNAL LABS</div>
            <div class="report-title">Overtime Calculator</div>
          </div>
        </div>

        <div class="report-meta">
          <div><strong>Generated:</strong> ${escapeReportHtml(generated)}</div>
          <div><strong>Build:</strong> v0.9</div>
          <div><strong>Theme:</strong> Professional Reports</div>
          <div><strong>Status:</strong> Active Development</div>
        </div>
      </header>

      <section>
        <h2>Input Summary</h2>
        <div class="grid-2">
          <dl class="summary-list">
            <dt>Hourly Rate</dt><dd>${escapeReportHtml(formatMoney(rate))}</dd>
            <dt>Total Hours Worked</dt><dd>${escapeReportHtml(formatNumber(hours))}</dd>
            <dt>Pay Period</dt><dd>${escapeReportHtml(getPayPeriodLabel())}</dd>
            <dt>Overtime Multiplier</dt><dd>${escapeReportHtml(formatNumber(multiplier))}x</dd>
            <dt>Overtime Starts After</dt><dd>${escapeReportHtml(formatNumber(threshold))} hours</dd>
          </dl>

          <dl class="summary-list">
            <dt>Shift Differential Rate</dt><dd>${escapeReportHtml(formatMoney(differentialRate))}</dd>
            <dt>Differential Hours</dt><dd>${escapeReportHtml(formatNumber(differentialHours))}</dd>
            <dt>Double-Time Additional Hours</dt><dd>${escapeReportHtml(formatNumber(doubleTimeHours))}</dd>
            <dt>Weekend Bonus</dt><dd>${escapeReportHtml(formatMoney(weekendBonus))}</dd>
            <dt>Holiday Bonus</dt><dd>${escapeReportHtml(formatMoney(holidayBonus))}</dd>
            <dt>Flat Bonus</dt><dd>${escapeReportHtml(formatMoney(flatBonus))}</dd>
          </dl>
        </div>
      </section>

      <section class="grid-2">
        <div>
          <h2>Hours Breakdown</h2>
          <table>
            <thead><tr><th>Description</th><th class="value">Hours</th></tr></thead>
            <tbody>
              <tr><td>Regular Hours</td><td class="value">${escapeReportHtml(el("regularHours").textContent)}</td></tr>
              <tr><td>Overtime Hours</td><td class="value">${escapeReportHtml(el("overtimeHours").textContent)}</td></tr>
              <tr class="total"><td>Total Hours</td><td class="value">${escapeReportHtml(el("totalHours").textContent)}</td></tr>
            </tbody>
          </table>
        </div>

        <div>
          <h2>Rates</h2>
          <table>
            <thead><tr><th>Description</th><th class="value">Rate</th></tr></thead>
            <tbody>
              <tr><td>Hourly Rate</td><td class="value">${escapeReportHtml(el("hourlyRate").textContent)}</td></tr>
              <tr><td>Overtime Rate</td><td class="value">${escapeReportHtml(el("overtimeRate").textContent)}</td></tr>
              <tr><td>Gross Effective Rate</td><td class="value">${escapeReportHtml(el("effectiveRate").textContent)}</td></tr>
              <tr><td>Net Effective Rate</td><td class="value">${escapeReportHtml(el("netEffectiveRate").textContent)}</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2>Pay Breakdown</h2>
        <table>
          <thead><tr><th>Description</th><th class="value">Amount</th></tr></thead>
          <tbody>
            <tr><td>Regular Pay</td><td class="value">${escapeReportHtml(el("regularPay").textContent)}</td></tr>
            <tr><td>Overtime Pay</td><td class="value">${escapeReportHtml(el("overtimePay").textContent)}</td></tr>
            <tr><td>Shift Differential Pay</td><td class="value">${escapeReportHtml(el("differentialPay").textContent)}</td></tr>
            <tr><td>Additional Double-Time Pay</td><td class="value">${escapeReportHtml(el("doubleTimePay").textContent)}</td></tr>
            <tr><td>Bonus Pay</td><td class="value">${escapeReportHtml(el("bonusPay").textContent)}</td></tr>
            <tr class="total"><td>Total Gross Pay</td><td class="value">${escapeReportHtml(el("totalPay").textContent)}</td></tr>
            <tr><td>Taxes</td><td class="value">${escapeReportHtml(el("taxResultsTotal").textContent)}</td></tr>
            <tr><td>Deductions</td><td class="value">${escapeReportHtml(el("deductionResultsTotal").textContent)}</td></tr>
            <tr class="success"><td>Estimated Take-Home Pay</td><td class="value">${escapeReportHtml(el("takeHomePay").textContent)}</td></tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2>Goal Mode Results</h2>
        <table>
          <tbody>
            <tr><th>Goal Type</th><td>${escapeReportHtml(el("goalType").selectedOptions[0].textContent)}</td><th>Hours Needed</th><td class="value">${escapeReportHtml(el("goalHoursNeeded").textContent)}</td></tr>
            <tr><th>Target Amount</th><td>${escapeReportHtml(goalAmount ? formatMoney(goalAmount) : "$0.00")}</td><th>Overtime Hours Needed</th><td class="value">${escapeReportHtml(el("goalOvertimeNeeded").textContent)}</td></tr>
            <tr><th>Typical Shift Length</th><td>${escapeReportHtml(formatNumber(goalShiftLength))} hrs</td><th>Estimated Shifts Needed</th><td class="value">${escapeReportHtml(el("goalShiftsNeeded").textContent)}</td></tr>
          </tbody>
        </table>
      </section>

      <footer class="footer">
        <div>Estimates only. Actual pay may vary based on taxes, deductions, employer policies, and applicable labor laws.</div>
        <div><strong>Signal Labs</strong> • Overtime Calculator • v0.9</div>
      </footer>
    </main>
  `;
}

function printOvertimeResults() {
  const reportHtml = buildOvertimeProfessionalReportHtml();
  const opened = openProfessionalReportWindow(reportHtml, "Overtime Calculator Report");

  if (!opened) {
    messageEl.classList.add("error");
    messageEl.textContent = "Unable to open the print report window. Check your popup blocker.";
  }
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
  el("goalType").value = "gross";
  el("goalAmount").value = "2500";
  el("goalShiftLength").value = "12";

  overrideThresholdInput.checked = false;
  customThresholdInput.value = "";

  taxes = [
    { id: makeId(), name: "Federal Tax", value: 12 },
    { id: makeId(), name: "State Tax", value: 5 },
    { id: makeId(), name: "Other Tax", value: 3 }
  ];

  deductions = [
    { id: makeId(), name: "Insurance", value: 75 },
    { id: makeId(), name: "Retirement", value: 50 }
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
  el("goalType").value = "gross";
  el("goalAmount").value = "";
  el("goalShiftLength").value = "";

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
      saveSettings();
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
      saveSettings();
    });
  });
}

function bindEvent(id, eventName, handler) {
  const node = el(id);

  if (node) {
    node.addEventListener(eventName, handler);
  }
}

bindEvent("calculate", "click", calculateOvertime);
bindEvent("saveSettings", "click", () => saveSettings(true));
bindEvent("example", "click", loadExample);
bindEvent("reset", "click", clearCalculator);
bindEvent("clearAdjustments", "click", clearAdjustments);
bindEvent("clearSavedProfile", "click", clearSavedProfile);
bindEvent("copyResults", "click", copyOvertimeResults);
bindEvent("printResults", "click", printOvertimeResults);

bindEvent("addTax", "click", () => openAdjustmentModal("tax"));
bindEvent("addTaxInline", "click", () => openAdjustmentModal("tax"));
bindEvent("addDeduction", "click", () => openAdjustmentModal("deduction"));
bindEvent("addDeductionInline", "click", () => openAdjustmentModal("deduction"));
bindEvent("addOther", "click", () => openAdjustmentModal("other"));
bindEvent("addOtherInline", "click", () => openAdjustmentModal("other"));

bindEvent("closeAdjustmentModal", "click", closeAdjustmentModal);
bindEvent("cancelAdjustment", "click", closeAdjustmentModal);
bindEvent("saveAdjustment", "click", saveAdjustmentFromModal);

el("adjustmentModal").addEventListener("click", (event) => {
  if (event.target === el("adjustmentModal")) {
    closeAdjustmentModal();
  }
});

[el("adjustmentName"), el("adjustmentValue")].forEach((input) => {
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
  el("goalType"),
  el("goalAmount"),
  el("goalShiftLength"),
  overrideThresholdInput,
  customThresholdInput
].forEach((input) => {
  input.addEventListener("input", calculateOvertime);
  input.addEventListener("change", calculateOvertime);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !el("adjustmentModal").classList.contains("hidden")) {
    closeAdjustmentModal();
  }
});

bindEvent("openChangelog", "click", () => {
  openTextModal({
    title: "CHANGELOG",
    file: "CHANGELOG.md"
  });
});

bindEvent("openRoadmap", "click", () => {
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
  saveSettings();
  messageEl.classList.remove("error");
  messageEl.textContent = "Welcome back. Previous values and layout restored.";
} else {
  resetResults();
}
