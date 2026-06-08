/*
Signal Labs
Tool: Paycheck Calculator
File: script.js
Version: v0.2
Purpose: Tool-specific logic and event handling
*/

const TOOL_VERSION = "v0.2";
const TOOL_THEME = "Deductions & Adjustments";
const STORAGE_KEY = "signalLabsPaycheckCalculatorV02";
const LEGACY_STORAGE_KEYS = ["signalLabsPaycheckCalculatorV011", "signalLabsPaycheckCalculatorV01"];

const hourlyRateInput = document.getElementById("hourlyRateInput");
const hoursWorkedInput = document.getElementById("hoursWorkedInput");
const payPeriodInput = document.getElementById("payPeriodInput");
const currencyInput = document.getElementById("currencyInput");
const messageEl = document.getElementById("message");
const generatedTimeEl = document.getElementById("generatedTime");

const adjustmentModal = document.getElementById("adjustmentModal");
const adjustmentModalTitle = document.getElementById("adjustmentModalTitle");
const adjustmentModalDescription = document.getElementById("adjustmentModalDescription");
const suggestedAdjustmentPills = document.getElementById("suggestedAdjustmentPills");
const adjustmentLabelInput = document.getElementById("adjustmentLabelInput");
const adjustmentValueInput = document.getElementById("adjustmentValueInput");
const adjustmentValueLabel = document.getElementById("adjustmentValueLabel");
const amountTypePercent = document.getElementById("amountTypePercent");
const amountTypeStatic = document.getElementById("amountTypeStatic");

let adjustments = [];
let activeAdjustmentKind = "tax";
let activeAmountType = "percent";

const SUGGESTED_ADJUSTMENTS = {
  tax: [
    { label: "Federal Tax", value: 12, amountType: "percent" },
    { label: "State Tax", value: 5, amountType: "percent" },
    { label: "Social Security", value: 6.2, amountType: "percent" },
    { label: "Medicare", value: 1.45, amountType: "percent" }
  ],
  deduction: [
    { label: "Retirement", value: 5, amountType: "percent" },
    { label: "Health Insurance", value: 150, amountType: "static" },
    { label: "Union Dues", value: 25, amountType: "static" },
    { label: "Dental / Vision", value: 20, amountType: "static" }
  ],
  other: [
    { label: "Garnishment", value: 50, amountType: "static" },
    { label: "Child Support", value: 100, amountType: "static" },
    { label: "Uniform Deduction", value: 15, amountType: "static" },
    { label: "Other", value: 0, amountType: "static" }
  ]
};

function el(id) {
  return document.getElementById(id);
}

function getInputValue(input) {
  return Number(input?.value) || 0;
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

function currentUtcTime() {
  return new Date().toISOString().replace("T", " ").slice(0, 19) + " UTC";
}

function setText(id, value) {
  const node = el(id);
  if (node) {
    node.textContent = value;
  }
}

function makeId() {
  return Date.now().toString() + Math.random().toString(16).slice(2);
}

function getPayPeriodLabel() {
  return payPeriodInput?.selectedOptions?.[0]?.textContent || "Bi-Weekly";
}

function getState() {
  return {
    hourlyRate: hourlyRateInput.value,
    hoursWorked: hoursWorkedInput.value,
    payPeriod: payPeriodInput.value,
    currency: currencyInput.value,
    adjustments
  };
}

function saveSettings(showMessage = false) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(getState()));

    if (showMessage) {
      messageEl.classList.remove("error");
      messageEl.textContent = "Settings saved. They will load automatically next time you visit.";
    }
  } catch (error) {
    if (showMessage) {
      messageEl.classList.add("error");
      messageEl.textContent = "Unable to save settings in this browser.";
    }
  }
}

function getLegacySettings() {
  for (const key of LEGACY_STORAGE_KEYS) {
    const saved = localStorage.getItem(key);

    if (saved) {
      return saved;
    }
  }

  return null;
}

function loadSettings() {
  const saved = localStorage.getItem(STORAGE_KEY) || getLegacySettings();

  if (!saved) {
    return false;
  }

  try {
    const data = JSON.parse(saved);

    hourlyRateInput.value = data.hourlyRate || "";
    hoursWorkedInput.value = data.hoursWorked || "";
    payPeriodInput.value = data.payPeriod || "biweekly";
    currencyInput.value = data.currency || "USD";

    if (Array.isArray(data.adjustments)) {
      adjustments = data.adjustments;
    } else {
      adjustments = [];

      if (data.taxRate) {
        adjustments.push({ id: makeId(), kind: "tax", label: "Estimated Tax", amountType: "percent", value: Number(data.taxRate) || 0 });
      }

      if (data.deductions) {
        adjustments.push({ id: makeId(), kind: "deduction", label: "Deductions", amountType: "static", value: Number(data.deductions) || 0 });
      }
    }

    renderAdjustments();
    return true;
  } catch (error) {
    localStorage.removeItem(STORAGE_KEY);
    return false;
  }
}

function getGrossPay() {
  return getInputValue(hourlyRateInput) * getInputValue(hoursWorkedInput);
}

function getAdjustmentAmount(adjustment, grossPay) {
  const value = Number(adjustment.value) || 0;
  return adjustment.amountType === "percent" ? grossPay * (value / 100) : value;
}

function getAdjustmentTotals(grossPay) {
  return adjustments.reduce((totals, adjustment) => {
    const amount = getAdjustmentAmount(adjustment, grossPay);

    if (adjustment.kind === "tax") {
      totals.taxes += amount;
    } else if (adjustment.kind === "deduction") {
      totals.deductions += amount;
    } else {
      totals.other += amount;
    }

    return totals;
  }, { taxes: 0, deductions: 0, other: 0 });
}

function resetResults() {
  setText("grossPayResult", formatMoney(0));
  setText("taxesResult", `-${formatMoney(0)}`);
  setText("deductionsResult", `-${formatMoney(0)}`);
  setText("otherAdjustmentsResult", `-${formatMoney(0)}`);
  setText("takeHomeResult", formatMoney(0));
  setText("effectiveRateResult", formatMoney(0));
  generatedTimeEl.textContent = "--";
}

function calculatePaycheck() {
  const rate = getInputValue(hourlyRateInput);
  const hours = getInputValue(hoursWorkedInput);

  messageEl.classList.remove("error");

  if (!hourlyRateInput.value && !hoursWorkedInput.value) {
    resetResults();
    messageEl.textContent = "Enter values or load an example to begin.";
    return;
  }

  if (rate <= 0 || hours <= 0) {
    resetResults();
    messageEl.classList.add("error");
    messageEl.textContent = "Enter positive numbers for hourly rate and hours worked.";
    return;
  }

  if (adjustments.some((adjustment) => Number(adjustment.value) < 0)) {
    resetResults();
    messageEl.classList.add("error");
    messageEl.textContent = "Adjustment values cannot be negative.";
    return;
  }

  const grossPay = getGrossPay();
  const totals = getAdjustmentTotals(grossPay);
  const takeHomePay = Math.max(grossPay - totals.taxes - totals.deductions - totals.other, 0);
  const effectiveRate = hours > 0 ? takeHomePay / hours : 0;

  setText("grossPayResult", formatMoney(grossPay));
  setText("taxesResult", `-${formatMoney(totals.taxes)}`);
  setText("deductionsResult", `-${formatMoney(totals.deductions)}`);
  setText("otherAdjustmentsResult", `-${formatMoney(totals.other)}`);
  setText("takeHomeResult", formatMoney(takeHomePay));
  setText("effectiveRateResult", formatMoney(effectiveRate));

  generatedTimeEl.textContent = currentUtcTime();
  messageEl.textContent = "Paycheck estimate updated.";
  saveSettings();
}

function getKindTitle(kind) {
  if (kind === "tax") return "Tax";
  if (kind === "deduction") return "Deduction";
  return "Other Adjustment";
}

function getListForKind(kind) {
  if (kind === "tax") return el("taxList");
  if (kind === "deduction") return el("deductionList");
  return el("otherList");
}

function renderAdjustmentList(kind) {
  const list = getListForKind(kind);
  const items = adjustments.filter((adjustment) => adjustment.kind === kind);

  list.innerHTML = "";

  if (items.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-adjustments";
    empty.textContent = `No ${kind === "other" ? "other adjustments" : `${kind}s`} added.`;
    list.appendChild(empty);
    return;
  }

  items.forEach((adjustment) => {
    const row = document.createElement("div");
    row.className = "adjustment-item";

    const valueLabel = adjustment.amountType === "percent"
      ? `${formatNumber(adjustment.value)}%`
      : formatMoney(adjustment.value);

    row.innerHTML = `
      <div>
        <strong>${adjustment.label}</strong>
        <span>${valueLabel}</span>
      </div>
      <button type="button" aria-label="Remove ${adjustment.label}" data-remove-adjustment="${adjustment.id}">×</button>
    `;

    list.appendChild(row);
  });
}

function renderAdjustments() {
  renderAdjustmentList("tax");
  renderAdjustmentList("deduction");
  renderAdjustmentList("other");
  document.querySelectorAll("[data-remove-adjustment]").forEach((button) => {
    button.addEventListener("click", () => {
      adjustments = adjustments.filter((adjustment) => adjustment.id !== button.dataset.removeAdjustment);
      renderAdjustments();
      calculatePaycheck();
    });
  });
}

function setAmountType(amountType) {
  activeAmountType = amountType;
  amountTypePercent.classList.toggle("is-selected", amountType === "percent");
  amountTypeStatic.classList.toggle("is-selected", amountType === "static");
  adjustmentValueLabel.textContent = amountType === "percent" ? "Percentage" : "Static Amount";
  adjustmentValueInput.placeholder = amountType === "percent" ? "12" : "150";
}

function renderSuggestedPills(kind) {
  suggestedAdjustmentPills.innerHTML = "";

  SUGGESTED_ADJUSTMENTS[kind].forEach((suggestion) => {
    const pill = document.createElement("button");
    pill.type = "button";
    pill.className = "suggested-pill";
    pill.textContent = suggestion.amountType === "percent"
      ? `${suggestion.label} ${suggestion.value}%`
      : `${suggestion.label} ${formatMoney(suggestion.value)}`;

    pill.addEventListener("click", () => {
      adjustmentLabelInput.value = suggestion.label;
      adjustmentValueInput.value = suggestion.value;
      setAmountType(suggestion.amountType);
    });

    suggestedAdjustmentPills.appendChild(pill);
  });
}

function openAdjustmentModal(kind) {
  activeAdjustmentKind = kind;
  adjustmentModal.classList.remove("hidden");
  adjustmentModalTitle.textContent = `Add ${getKindTitle(kind)}`;
  adjustmentModalDescription.textContent = kind === "tax"
    ? "Add estimated tax percentages or static tax amounts."
    : kind === "deduction"
      ? "Add insurance, retirement, union dues, and other paycheck deductions."
      : "Add other paycheck adjustments as percentages or static amounts.";

  adjustmentLabelInput.value = "";
  adjustmentValueInput.value = "";
  setAmountType(kind === "tax" ? "percent" : "static");
  renderSuggestedPills(kind);
  setTimeout(() => adjustmentLabelInput.focus(), 50);
}

function closeAdjustmentModal() {
  adjustmentModal.classList.add("hidden");
}

function saveAdjustment() {
  const label = adjustmentLabelInput.value.trim() || getKindTitle(activeAdjustmentKind);
  const value = Number(adjustmentValueInput.value);

  if (Number.isNaN(value) || value < 0) {
    messageEl.classList.add("error");
    messageEl.textContent = "Enter an adjustment value of 0 or more.";
    return;
  }

  adjustments.push({
    id: makeId(),
    kind: activeAdjustmentKind,
    label,
    amountType: activeAmountType,
    value
  });

  closeAdjustmentModal();
  renderAdjustments();
  calculatePaycheck();
}

function loadExample() {
  hourlyRateInput.value = "25";
  hoursWorkedInput.value = "80";
  payPeriodInput.value = "biweekly";
  currencyInput.value = "USD";
  adjustments = [
    { id: makeId(), kind: "tax", label: "Federal Tax", amountType: "percent", value: 12 },
    { id: makeId(), kind: "tax", label: "State Tax", amountType: "percent", value: 5 },
    { id: makeId(), kind: "deduction", label: "Retirement", amountType: "percent", value: 5 },
    { id: makeId(), kind: "deduction", label: "Health Insurance", amountType: "static", value: 150 }
  ];
  renderAdjustments();
  calculatePaycheck();
}

function resetCalculator() {
  localStorage.removeItem(STORAGE_KEY);
  hourlyRateInput.value = "";
  hoursWorkedInput.value = "";
  payPeriodInput.value = "biweekly";
  currencyInput.value = "USD";
  adjustments = [];
  renderAdjustments();
  resetResults();
  messageEl.classList.remove("error");
  messageEl.textContent = "Calculator reset. Saved settings cleared.";
}

function buildAdjustmentSummary(kind, grossPay) {
  const items = adjustments.filter((adjustment) => adjustment.kind === kind);

  if (items.length === 0) {
    return ["None"];
  }

  return items.map((adjustment) => {
    const inputLabel = adjustment.amountType === "percent"
      ? `${formatNumber(adjustment.value)}%`
      : formatMoney(adjustment.value);
    const amount = getAdjustmentAmount(adjustment, grossPay);
    return `${adjustment.label}: ${inputLabel} (${formatMoney(amount)})`;
  });
}

function buildPaycheckResultsSummary() {
  const grossPay = getGrossPay();
  const totals = getAdjustmentTotals(grossPay);

  return [
    "Signal Labs Paycheck Calculator",
    "Estimated Paycheck Summary",
    "",
    `Generated: ${currentUtcTime()}`,
    `Build: ${TOOL_VERSION}`,
    `Theme: ${TOOL_THEME}`,
    "",
    "Inputs",
    `Hourly Rate: ${formatMoney(getInputValue(hourlyRateInput))}`,
    `Hours Worked: ${formatNumber(getInputValue(hoursWorkedInput))}`,
    `Pay Period: ${getPayPeriodLabel()}`,
    "",
    "Taxes",
    ...buildAdjustmentSummary("tax", grossPay).map((line) => `- ${line}`),
    "",
    "Deductions",
    ...buildAdjustmentSummary("deduction", grossPay).map((line) => `- ${line}`),
    "",
    "Other Adjustments",
    ...buildAdjustmentSummary("other", grossPay).map((line) => `- ${line}`),
    "",
    "Results",
    `Before Taxes (Gross): ${el("grossPayResult").textContent}`,
    `Estimated Taxes: -${formatMoney(totals.taxes)}`,
    `Deductions: -${formatMoney(totals.deductions)}`,
    `Other Adjustments: -${formatMoney(totals.other)}`,
    `Take-Home Pay (Net): ${el("takeHomeResult").textContent}`,
    `Effective Hourly Take-Home: ${el("effectiveRateResult").textContent}`
  ].join("\n");
}

async function copyResults() {
  try {
    await navigator.clipboard.writeText(buildPaycheckResultsSummary());
    messageEl.classList.remove("error");
    messageEl.textContent = "Results copied to clipboard.";
  } catch (error) {
    messageEl.classList.add("error");
    messageEl.textContent = "Unable to copy results in this browser.";
  }
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function printResults() {
  calculatePaycheck();
  const reportWindow = window.open("", "_blank", "width=900,height=1100");

  if (!reportWindow || reportWindow.closed) {
    messageEl.classList.add("error");
    messageEl.textContent = "Unable to open the print report window. Try allowing popups.";
    return;
  }

  const summary = escapeHtml(buildPaycheckResultsSummary());

  reportWindow.document.open();
  reportWindow.document.write(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Paycheck Report</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 32px; color: #111; }
        h1 { margin-bottom: 6px; }
        pre { white-space: pre-wrap; line-height: 1.45; border-top: 3px solid #174a8b; padding-top: 18px; }
        footer { border-top: 2px solid #174a8b; margin-top: 24px; padding-top: 10px; color: #333; font-size: 12px; }
      </style>
    </head>
    <body>
      <h1>Signal Labs Paycheck Report</h1>
      <pre>${summary}</pre>
      <footer>Signal Labs • Paycheck Calculator • ${TOOL_VERSION}</footer>
      <script>
        window.onload = function () {
          window.focus();
          setTimeout(function () { window.print(); }, 250);
        };
      <\/script>
    </body>
    </html>
  `);
  reportWindow.document.close();
}

[hourlyRateInput, hoursWorkedInput, payPeriodInput, currencyInput].forEach((input) => {
  input.addEventListener("input", calculatePaycheck);
  input.addEventListener("change", calculatePaycheck);
});

document.getElementById("calculate").addEventListener("click", calculatePaycheck);
document.getElementById("saveSettings").addEventListener("click", () => saveSettings(true));
document.getElementById("example").addEventListener("click", loadExample);
document.getElementById("reset").addEventListener("click", resetCalculator);
document.getElementById("copyResults").addEventListener("click", copyResults);
document.getElementById("printResults").addEventListener("click", printResults);

document.getElementById("addTax").addEventListener("click", () => openAdjustmentModal("tax"));
document.getElementById("addDeduction").addEventListener("click", () => openAdjustmentModal("deduction"));
document.getElementById("addOther").addEventListener("click", () => openAdjustmentModal("other"));
document.getElementById("closeAdjustmentModal").addEventListener("click", closeAdjustmentModal);
document.getElementById("cancelAdjustment").addEventListener("click", closeAdjustmentModal);
document.getElementById("saveAdjustment").addEventListener("click", saveAdjustment);
amountTypePercent.addEventListener("click", () => setAmountType("percent"));
amountTypeStatic.addEventListener("click", () => setAmountType("static"));

adjustmentModal.addEventListener("click", (event) => {
  if (event.target === adjustmentModal) {
    closeAdjustmentModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !adjustmentModal.classList.contains("hidden")) {
    closeAdjustmentModal();
  }
});

document.getElementById("openChangelog").addEventListener("click", () => {
  openTextModal({ title: "CHANGELOG", file: "CHANGELOG.md" });
});

document.getElementById("openRoadmap").addEventListener("click", () => {
  openTextModal({ title: "ROADMAP", file: "ROADMAP.md" });
});

if (!loadSettings()) {
  renderAdjustments();
  resetResults();
} else {
  calculatePaycheck();
  messageEl.classList.remove("error");
  messageEl.textContent = "Welcome back. Previous paycheck values restored.";
}
