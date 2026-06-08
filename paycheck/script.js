/*
Signal Labs
Tool: Paycheck Calculator
File: script.js
Version: v0.3.4
Purpose: Tool-specific logic and event handling
*/

const TOOL_VERSION = "v0.3.4";
const TOOL_THEME = "Shared Report Format";
const STORAGE_KEY = "signalLabsPaycheckCalculatorV032";
const LEGACY_STORAGE_KEYS = ["signalLabsPaycheckCalculatorV031"];

const PREMIUM_HOUR_TYPES = [
  { id: "overtime", label: "Overtime", defaultMultiplier: 1.5 },
  { id: "doubleTime", label: "Double Time", defaultMultiplier: 2 },
  { id: "holidayPremium", label: "Holiday Premium", defaultMultiplier: 1.5 },
  { id: "onCall", label: "On-Call", defaultMultiplier: 1 },
  { id: "standby", label: "Standby", defaultMultiplier: 1 },
  { id: "custom", label: "Custom", defaultMultiplier: 1 }
];

const BENEFIT_HOUR_TYPES = [
  { id: "vacation", label: "Vacation" },
  { id: "sick", label: "Sick" },
  { id: "holiday", label: "Holiday" },
  { id: "personal", label: "Personal" },
  { id: "compTime", label: "Comp Time" },
  { id: "bereavement", label: "Bereavement" },
  { id: "custom", label: "Custom" }
];

const ADJUSTMENT_SUGGESTIONS = {
  tax: [
    { label: "Federal Tax", type: "percent", amount: 12 },
    { label: "State Tax", type: "percent", amount: 5 },
    { label: "Social Security", type: "percent", amount: 6.2 },
    { label: "Medicare", type: "percent", amount: 1.45 }
  ],
  deduction: [
    { label: "Health Insurance", type: "static", amount: 75 },
    { label: "Retirement", type: "percent", amount: 5 },
    { label: "Union Dues", type: "static", amount: 25 },
    { label: "Dental / Vision", type: "static", amount: 20 }
  ],
  other: [
    { label: "Garnishment", type: "static", amount: 50 },
    { label: "Uniform", type: "static", amount: 25 },
    { label: "Donation", type: "static", amount: 10 },
    { label: "Other", type: "static", amount: 0 }
  ]
};

const state = {
  premiumHours: [],
  benefitHours: [],
  adjustments: {
    tax: [],
    deduction: [],
    other: []
  }
};

let activeAdjustmentType = "tax";
let activeAmountType = "percent";

function el(id) {
  return document.getElementById(id);
}

function uid(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function getNumber(id) {
  const node = el(id);
  return Number(node?.value) || 0;
}

function setText(id, value) {
  const node = el(id);
  if (node) node.textContent = value;
}

function getCurrency() {
  return el("currencyInput")?.value || "USD";
}

function formatMoney(amount) {
  return Number(amount || 0).toLocaleString("en-US", {
    style: "currency",
    currency: getCurrency()
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

function getPayPeriodLabel() {
  const select = el("payPeriodInput");
  return select?.selectedOptions?.[0]?.textContent || "Bi-Weekly";
}

function getTypeById(list, id) {
  return list.find(item => item.id === id) || null;
}

function createHourPills(containerId, types, group) {
  const container = el(containerId);
  if (!container) return;

  container.innerHTML = "";

  types.forEach(type => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "hour-pill";
    button.dataset.group = group;
    button.dataset.typeId = type.id;
    button.textContent = type.label;
    button.addEventListener("click", () => addHourEntry(group, type));
    container.appendChild(button);
  });
}

function addHourEntry(group, type, values = {}) {
  if (type.id === "custom" && !values.label) {
    const customName = window.prompt(group === "premium" ? "Custom premium hour label:" : "Custom benefit hour label:");
    if (!customName) return;
    values.label = customName.trim().slice(0, 28) || "Custom";
  }

  const entry = {
    uid: values.uid || uid(group),
    typeId: type.id,
    label: values.label || type.label,
    hours: values.hours || "",
    multiplier: values.multiplier || type.defaultMultiplier || 1
  };

  if (group === "premium") {
    state.premiumHours.push(entry);
  } else {
    state.benefitHours.push(entry);
  }

  renderHourEntries();
  saveSettings();
}

function removeHourEntry(group, entryId) {
  const key = group === "premium" ? "premiumHours" : "benefitHours";
  state[key] = state[key].filter(entry => entry.uid !== entryId);
  renderHourEntries();
  calculatePaycheck(false);
  saveSettings();
}

function updateHourEntry(group, entryId, field, value) {
  const key = group === "premium" ? "premiumHours" : "benefitHours";
  const entry = state[key].find(item => item.uid === entryId);
  if (!entry) return;
  entry[field] = value;
  calculatePaycheck(false);
  saveSettings();
}

function renderHourEntries() {
  renderHourEntryList("premiumHourList", "premium", state.premiumHours);
  renderHourEntryList("benefitHourList", "benefit", state.benefitHours);
}

function renderHourEntryList(containerId, group, entries) {
  const container = el(containerId);
  if (!container) return;

  container.innerHTML = "";

  if (!entries.length) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.innerHTML = group === "premium"
      ? "<strong>No premium hours entered yet.</strong><span>Add overtime, double time, holiday premium, on-call, standby, or custom premium hours when needed.</span>"
      : "<strong>No benefit time entered yet.</strong><span>Add vacation, sick, holiday, personal, comp time, bereavement, or other paid leave hours when needed.</span>";
    container.appendChild(empty);
    return;
  }

  entries.forEach(entry => {
    const row = document.createElement("div");
    row.className = group === "premium" ? "hour-entry-row" : "hour-entry-row benefit-row";

    const label = document.createElement("div");
    label.className = "entry-label";
    label.innerHTML = `${entry.label}<small>${group === "premium" ? "Premium hours" : "Paid leave hours"}</small>`;

    const hoursWrap = document.createElement("label");
    hoursWrap.innerHTML = `<span>Hours</span>`;
    const hoursInput = document.createElement("input");
    hoursInput.type = "number";
    hoursInput.min = "0";
    hoursInput.step = "0.01";
    hoursInput.placeholder = "0";
    hoursInput.value = entry.hours;
    hoursInput.addEventListener("input", () => updateHourEntry(group, entry.uid, "hours", hoursInput.value));
    hoursWrap.appendChild(hoursInput);

    row.appendChild(label);
    row.appendChild(hoursWrap);

    if (group === "premium") {
      const multiplierWrap = document.createElement("label");
      multiplierWrap.innerHTML = `<span>Multiplier</span>`;
      const multiplierInput = document.createElement("input");
      multiplierInput.type = "number";
      multiplierInput.min = "0";
      multiplierInput.step = "0.01";
      multiplierInput.placeholder = "1.5";
      multiplierInput.value = entry.multiplier;
      multiplierInput.addEventListener("input", () => updateHourEntry(group, entry.uid, "multiplier", multiplierInput.value));
      multiplierWrap.appendChild(multiplierInput);
      row.appendChild(multiplierWrap);
    }

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.className = "icon-button";
    removeButton.textContent = "×";
    removeButton.setAttribute("aria-label", `Remove ${entry.label}`);
    removeButton.addEventListener("click", () => removeHourEntry(group, entry.uid));
    row.appendChild(removeButton);

    container.appendChild(row);
  });
}

function openAdjustmentModal(type) {
  activeAdjustmentType = type;
  activeAmountType = type === "tax" ? "percent" : "static";

  setText("adjustmentModalTitle", type === "tax" ? "Add Tax" : type === "deduction" ? "Add Deduction" : "Add Other Adjustment");
  setText("adjustmentModalDescription", type === "tax" ? "Add a tax as a percentage or static amount." : type === "deduction" ? "Add insurance, retirement, union dues, or another deduction." : "Add another paycheck adjustment.");

  el("adjustmentLabelInput").value = "";
  el("adjustmentAmountInput").value = "";
  renderAmountTypePills();
  renderSuggestionPills();
  el("adjustmentModal")?.classList.remove("hidden");
}

function closeAdjustmentModal() {
  el("adjustmentModal")?.classList.add("hidden");
}

function renderAmountTypePills() {
  const percentButton = el("amountTypePercent");
  const staticButton = el("amountTypeStatic");
  if (!percentButton || !staticButton) return;

  percentButton.classList.toggle("is-selected", activeAmountType === "percent");
  staticButton.classList.toggle("is-selected", activeAmountType === "static");
  setText("adjustmentAmountLabel", activeAmountType === "percent" ? "Percentage" : "Static Amount");
  el("adjustmentAmountInput").placeholder = activeAmountType === "percent" ? "12" : "50";
}

function renderSuggestionPills() {
  const container = el("adjustmentSuggestionPills");
  if (!container) return;
  container.innerHTML = "";

  (ADJUSTMENT_SUGGESTIONS[activeAdjustmentType] || []).forEach(suggestion => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "suggestion-pill";
    button.textContent = suggestion.type === "percent" ? `${suggestion.label} ${suggestion.amount}%` : `${suggestion.label} ${formatMoney(suggestion.amount)}`;
    button.addEventListener("click", () => {
      el("adjustmentLabelInput").value = suggestion.label;
      el("adjustmentAmountInput").value = suggestion.amount;
      activeAmountType = suggestion.type;
      renderAmountTypePills();
    });
    container.appendChild(button);
  });
}

function saveAdjustment() {
  const label = el("adjustmentLabelInput").value.trim();
  const amount = Number(el("adjustmentAmountInput").value) || 0;

  if (!label || amount < 0) {
    showMessage("Enter a label and an amount of 0 or more.", true);
    return;
  }

  state.adjustments[activeAdjustmentType].push({
    uid: uid(activeAdjustmentType),
    label,
    amount,
    amountType: activeAmountType
  });

  closeAdjustmentModal();
  renderAdjustments();
  calculatePaycheck(false);
  saveSettings();
}

function removeAdjustment(type, adjustmentId) {
  state.adjustments[type] = state.adjustments[type].filter(item => item.uid !== adjustmentId);
  renderAdjustments();
  calculatePaycheck(false);
  saveSettings();
}

function renderAdjustments() {
  renderAdjustmentList("taxList", "tax");
  renderAdjustmentList("deductionList", "deduction");
  renderAdjustmentList("otherList", "other");
}

function renderAdjustmentList(containerId, type) {
  const container = el(containerId);
  if (!container) return;
  container.innerHTML = "";

  if (!state.adjustments[type].length) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.innerHTML = `<strong>No ${type === "tax" ? "taxes" : type === "deduction" ? "deductions" : "other adjustments"} added yet.</strong><span>Add items only when needed.</span>`;
    container.appendChild(empty);
    return;
  }

  state.adjustments[type].forEach(item => {
    const row = document.createElement("div");
    row.className = "adjustment-item";

    const label = document.createElement("div");
    label.className = "adjustment-label";
    label.innerHTML = `${item.label}<small>${item.amountType === "percent" ? "Percentage" : "Static Amount"}</small>`;

    const amount = document.createElement("div");
    amount.className = "adjustment-amount";
    amount.textContent = item.amountType === "percent" ? `${formatNumber(item.amount)}%` : formatMoney(item.amount);

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.className = "remove-adjustment";
    removeButton.textContent = "×";
    removeButton.setAttribute("aria-label", `Remove ${item.label}`);
    removeButton.addEventListener("click", () => removeAdjustment(type, item.uid));

    row.appendChild(label);
    row.appendChild(amount);
    row.appendChild(removeButton);
    container.appendChild(row);
  });
}

function getTotals() {
  const rate = getNumber("hourlyRateInput");
  const regularHours = getNumber("regularHoursInput");

  const regularPay = regularHours * rate;

  const premiumTotals = state.premiumHours.reduce((totals, entry) => {
    const hours = Number(entry.hours) || 0;
    const multiplier = Number(entry.multiplier) || 0;
    const pay = hours * rate * multiplier;
    totals.hours += hours;
    totals.pay += pay;
    return totals;
  }, { hours: 0, pay: 0 });

  const benefitTotals = state.benefitHours.reduce((totals, entry) => {
    const hours = Number(entry.hours) || 0;
    const pay = hours * rate;
    totals.hours += hours;
    totals.pay += pay;
    return totals;
  }, { hours: 0, pay: 0 });

  const grossPay = regularPay + premiumTotals.pay + benefitTotals.pay;

  const adjustmentTotals = { tax: 0, deduction: 0, other: 0 };

  Object.keys(adjustmentTotals).forEach(type => {
    adjustmentTotals[type] = state.adjustments[type].reduce((total, item) => {
      const amount = Number(item.amount) || 0;
      return total + (item.amountType === "percent" ? grossPay * (amount / 100) : amount);
    }, 0);
  });

  const totalPaidHours = regularHours + premiumTotals.hours + benefitTotals.hours;
  const takeHomePay = Math.max(grossPay - adjustmentTotals.tax - adjustmentTotals.deduction - adjustmentTotals.other, 0);
  const effectiveRate = totalPaidHours > 0 ? takeHomePay / totalPaidHours : 0;

  return {
    rate,
    regularHours,
    regularPay,
    premiumHours: premiumTotals.hours,
    premiumPay: premiumTotals.pay,
    benefitHours: benefitTotals.hours,
    benefitPay: benefitTotals.pay,
    totalPaidHours,
    grossPay,
    taxes: adjustmentTotals.tax,
    deductions: adjustmentTotals.deduction,
    other: adjustmentTotals.other,
    takeHomePay,
    effectiveRate
  };
}

function calculatePaycheck(showSuccess = true) {
  const totals = getTotals();
  const hasHours = totals.regularHours > 0 || totals.premiumHours > 0 || totals.benefitHours > 0;

  if (!hasHours && totals.rate <= 0) {
    resetResults();
    showMessage("Enter values or load an example to begin.");
    return;
  }

  if (totals.rate <= 0 || !hasHours) {
    resetResults();
    showMessage("Enter an hourly rate and at least one hour value.", true);
    return;
  }

  setText("grossPayResult", formatMoney(totals.grossPay));
  setText("regularPayResult", formatMoney(totals.regularPay));
  setText("premiumPayResult", formatMoney(totals.premiumPay));
  setText("benefitPayResult", formatMoney(totals.benefitPay));
  setText("totalHoursResult", `${formatNumber(totals.totalPaidHours)} hrs`);
  setText("taxesResult", `-${formatMoney(totals.taxes)}`);
  setText("deductionsResult", `-${formatMoney(totals.deductions)}`);
  setText("otherAdjustmentsResult", `-${formatMoney(totals.other)}`);
  setText("takeHomeResult", formatMoney(totals.takeHomePay));
  setText("effectiveRateResult", formatMoney(totals.effectiveRate));
  setText("generatedTime", currentUtcTime());

  if (showSuccess) showMessage("Paycheck estimate updated.");
  saveSettings();
}

function resetResults() {
  setText("grossPayResult", "$0.00");
  setText("regularPayResult", "$0.00");
  setText("premiumPayResult", "$0.00");
  setText("benefitPayResult", "$0.00");
  setText("totalHoursResult", "0.00 hrs");
  setText("taxesResult", "-$0.00");
  setText("deductionsResult", "-$0.00");
  setText("otherAdjustmentsResult", "-$0.00");
  setText("takeHomeResult", "$0.00");
  setText("effectiveRateResult", "$0.00");
  setText("generatedTime", "--");
}

function showMessage(text, isError = false) {
  const message = el("message");
  if (!message) return;
  message.classList.toggle("error", isError);
  message.textContent = text;
}

function getState() {
  return {
    regularHours: el("regularHoursInput").value,
    hourlyRate: el("hourlyRateInput").value,
    payPeriod: el("payPeriodInput").value,
    currency: el("currencyInput").value,
    premiumHours: state.premiumHours,
    benefitHours: state.benefitHours,
    adjustments: state.adjustments
  };
}

function saveSettings(showNotice = false) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(getState()));
    if (showNotice) showMessage("Settings saved. They will load automatically next time you visit.");
  } catch (error) {
    if (showNotice) showMessage("Unable to save settings in this browser.", true);
  }
}

function loadSettings() {
  let saved = localStorage.getItem(STORAGE_KEY);

  if (!saved) {
    for (const legacyKey of LEGACY_STORAGE_KEYS) {
      saved = localStorage.getItem(legacyKey);
      if (saved) break;
    }
  }

  if (!saved) return false;

  try {
    const data = JSON.parse(saved);
    el("regularHoursInput").value = data.regularHours || "";
    el("hourlyRateInput").value = data.hourlyRate || "";
    el("payPeriodInput").value = data.payPeriod || "biweekly";
    el("currencyInput").value = data.currency || "USD";
    state.premiumHours = Array.isArray(data.premiumHours) ? data.premiumHours : [];
    state.benefitHours = Array.isArray(data.benefitHours) ? data.benefitHours : [];
    state.adjustments = data.adjustments || { tax: [], deduction: [], other: [] };
    state.adjustments.tax ||= [];
    state.adjustments.deduction ||= [];
    state.adjustments.other ||= [];
    return true;
  } catch (error) {
    localStorage.removeItem(STORAGE_KEY);
    return false;
  }
}

function loadExample() {
  el("regularHoursInput").value = "80";
  el("hourlyRateInput").value = "25";
  el("payPeriodInput").value = "biweekly";
  el("currencyInput").value = "USD";

  state.premiumHours = [
    { uid: uid("premium"), typeId: "overtime", label: "Overtime", hours: "8", multiplier: 1.5 },
    { uid: uid("premium"), typeId: "holidayPremium", label: "Holiday Premium", hours: "8", multiplier: 1.5 }
  ];

  state.benefitHours = [
    { uid: uid("benefit"), typeId: "holiday", label: "Holiday", hours: "8", multiplier: 1 }
  ];

  state.adjustments = {
    tax: [
      { uid: uid("tax"), label: "Federal Tax", amount: 12, amountType: "percent" },
      { uid: uid("tax"), label: "State Tax", amount: 5, amountType: "percent" }
    ],
    deduction: [
      { uid: uid("deduction"), label: "Retirement", amount: 5, amountType: "percent" },
      { uid: uid("deduction"), label: "Insurance", amount: 75, amountType: "static" }
    ],
    other: []
  };

  renderHourEntries();
  renderAdjustments();
  calculatePaycheck();
}

function resetCalculator() {
  localStorage.removeItem(STORAGE_KEY);
  el("regularHoursInput").value = "";
  el("hourlyRateInput").value = "";
  el("payPeriodInput").value = "biweekly";
  el("currencyInput").value = "USD";
  state.premiumHours = [];
  state.benefitHours = [];
  state.adjustments = { tax: [], deduction: [], other: [] };
  renderHourEntries();
  renderAdjustments();
  resetResults();
  showMessage("Calculator reset. Saved settings cleared.");
}

function buildLineItems(entries, group) {
  if (!entries.length) return [`${group}: None`];
  return entries.map(entry => {
    const hours = formatNumber(Number(entry.hours) || 0);
    if (group === "Premium Hours") {
      return `${entry.label}: ${hours} hrs at ${formatNumber(Number(entry.multiplier) || 0)}x`;
    }
    return `${entry.label}: ${hours} hrs`;
  });
}

function buildAdjustmentLines(type, label) {
  const entries = state.adjustments[type] || [];
  if (!entries.length) return [`${label}: None`];
  return entries.map(item => `${item.label}: ${item.amountType === "percent" ? `${formatNumber(item.amount)}%` : formatMoney(item.amount)}`);
}

function buildPaycheckResultsSummary() {
  const totals = getTotals();
  return [
    "Signal Labs Paycheck Calculator",
    "Estimated Paycheck Summary",
    "",
    `Generated: ${currentUtcTime()}`,
    `Build: ${TOOL_VERSION}`,
    `Theme: ${TOOL_THEME}`,
    "",
    "Pay Details",
    `Hourly Rate: ${formatMoney(totals.rate)}`,
    `Pay Period: ${getPayPeriodLabel()}`,
    `Regular Hours: ${formatNumber(totals.regularHours)} hrs`,
    "",
    ...buildLineItems(state.premiumHours, "Premium Hours"),
    "",
    ...buildLineItems(state.benefitHours, "Benefit Hours"),
    "",
    ...buildAdjustmentLines("tax", "Taxes"),
    ...buildAdjustmentLines("deduction", "Deductions"),
    ...buildAdjustmentLines("other", "Other Adjustments"),
    "",
    "Results",
    `Before Taxes (Gross): ${formatMoney(totals.grossPay)}`,
    `Regular Pay: ${formatMoney(totals.regularPay)}`,
    `Premium Pay: ${formatMoney(totals.premiumPay)}`,
    `Benefit / Leave Pay: ${formatMoney(totals.benefitPay)}`,
    `Total Paid Hours: ${formatNumber(totals.totalPaidHours)} hrs`,
    `Estimated Taxes: -${formatMoney(totals.taxes)}`,
    `Deductions: -${formatMoney(totals.deductions)}`,
    `Other Adjustments: -${formatMoney(totals.other)}`,
    `Take-Home Pay (Net): ${formatMoney(totals.takeHomePay)}`,
    `Effective Hourly Take-Home: ${formatMoney(totals.effectiveRate)}`
  ].join("\n");
}

async function copyResults() {
  try {
    await navigator.clipboard.writeText(buildPaycheckResultsSummary());
    showMessage("Results copied to clipboard.");
  } catch (error) {
    showMessage("Unable to copy results in this browser.", true);
  }
}

function escapeHtml(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function reportMoney(value) {
  return escapeHtml(formatMoney(value));
}

function reportNumber(value) {
  return escapeHtml(formatNumber(value));
}

function buildReportRows(rows) {
  if (!rows.length) {
    return `<tr><td colspan="3" class="muted">None entered.</td></tr>`;
  }

  return rows.map(row => `
    <tr>
      <td>${escapeHtml(row.label)}</td>
      <td>${escapeHtml(row.detail)}</td>
      <td class="amount">${escapeHtml(row.amount)}</td>
    </tr>
  `).join("");
}

function buildPremiumReportRows(totals) {
  return state.premiumHours.map(entry => {
    const hours = Number(entry.hours) || 0;
    const multiplier = Number(entry.multiplier) || 0;
    const pay = hours * totals.rate * multiplier;
    return {
      label: entry.label,
      detail: `${formatNumber(hours)} hrs × ${formatMoney(totals.rate)} × ${formatNumber(multiplier)}x`,
      amount: formatMoney(pay)
    };
  });
}

function buildBenefitReportRows(totals) {
  return state.benefitHours.map(entry => {
    const hours = Number(entry.hours) || 0;
    const pay = hours * totals.rate;
    return {
      label: entry.label,
      detail: `${formatNumber(hours)} hrs × ${formatMoney(totals.rate)}`,
      amount: formatMoney(pay)
    };
  });
}

function buildAdjustmentReportRows(type) {
  return (state.adjustments[type] || []).map(item => {
    const rawAmount = Number(item.amount) || 0;
    const calculated = item.amountType === "percent"
      ? getTotals().grossPay * (rawAmount / 100)
      : rawAmount;

    return {
      label: item.label,
      detail: item.amountType === "percent" ? `${formatNumber(rawAmount)}% of gross pay` : "Static amount",
      amount: `-${formatMoney(calculated)}`
    };
  });
}

function buildPaycheckProfessionalReportHtml() {
  const totals = getTotals();
  const generated = currentUtcTime();
  const regularRows = totals.regularHours > 0 ? [{
    label: "Regular Hours",
    detail: `${formatNumber(totals.regularHours)} hrs × ${formatMoney(totals.rate)}`,
    amount: formatMoney(totals.regularPay)
  }] : [];

  const premiumRows = buildPremiumReportRows(totals);
  const benefitRows = buildBenefitReportRows(totals);
  const taxRows = buildAdjustmentReportRows("tax");
  const deductionRows = buildAdjustmentReportRows("deduction");
  const otherRows = buildAdjustmentReportRows("other");

  return `
    <main class="report-page">
      <header class="report-header">
        <div class="brand">
          <div class="brand-mark">SL</div>
          <div>
            <div class="brand-title">SIGNAL LABS</div>
            <div class="report-title">Paycheck Calculator</div>
          </div>
        </div>

        <div class="report-meta">
          <div><strong>Generated:</strong> ${escapeHtml(generated)}</div>
          <div><strong>Build:</strong> ${escapeHtml(TOOL_VERSION)}</div>
          <div><strong>Theme:</strong> ${escapeHtml(TOOL_THEME)}</div>
          <div><strong>Pay Period:</strong> ${escapeHtml(getPayPeriodLabel())}</div>
        </div>
      </header>

      <section class="grid-2">
        <div>
          <h2>Summary</h2>
          <dl class="summary-list">
            <dt>Before Taxes (Gross)</dt><dd>${reportMoney(totals.grossPay)}</dd>
            <dt>Total Paid Hours</dt><dd>${reportNumber(totals.totalPaidHours)} hrs</dd>
            <dt>Total Reductions</dt><dd>-${reportMoney(totals.taxes + totals.deductions + totals.other)}</dd>
            <dt>Take-Home Pay (Net)</dt><dd>${reportMoney(totals.takeHomePay)}</dd>
          </dl>
        </div>

        <div>
          <h2>Pay Details</h2>
          <dl class="summary-list">
            <dt>Hourly Rate</dt><dd>${reportMoney(totals.rate)}</dd>
            <dt>Regular Hours</dt><dd>${reportNumber(totals.regularHours)} hrs</dd>
            <dt>Premium Entries</dt><dd>${premiumRows.length}</dd>
            <dt>Benefit Entries</dt><dd>${benefitRows.length}</dd>
          </dl>
        </div>
      </section>

      <section>
        <h2>Hours & Earnings</h2>
        <table>
          <thead><tr><th>Type</th><th>Details</th><th class="value">Estimated Pay</th></tr></thead>
          <tbody>
            ${buildReportRows(regularRows)}
            ${buildReportRows(premiumRows)}
            ${buildReportRows(benefitRows)}
            <tr class="total"><td colspan="2">Before Taxes (Gross)</td><td class="value">${reportMoney(totals.grossPay)}</td></tr>
          </tbody>
        </table>
      </section>

      <section class="grid-2">
        <div>
          <h2>Taxes</h2>
          <table>
            <thead><tr><th>Description</th><th>Details</th><th class="value">Amount</th></tr></thead>
            <tbody>${buildReportRows(taxRows)}</tbody>
          </table>
        </div>

        <div>
          <h2>Deductions</h2>
          <table>
            <thead><tr><th>Description</th><th>Details</th><th class="value">Amount</th></tr></thead>
            <tbody>${buildReportRows(deductionRows)}</tbody>
          </table>
        </div>
      </section>

      <section>
        <h2>Other Adjustments</h2>
        <table>
          <thead><tr><th>Description</th><th>Details</th><th class="value">Amount</th></tr></thead>
          <tbody>${buildReportRows(otherRows)}</tbody>
        </table>
      </section>

      <section>
        <h2>Estimated Pay</h2>
        <table>
          <tbody>
            <tr><td>Regular Pay</td><td class="value">${reportMoney(totals.regularPay)}</td></tr>
            <tr><td>Premium Pay</td><td class="value">${reportMoney(totals.premiumPay)}</td></tr>
            <tr><td>Benefit / Leave Pay</td><td class="value">${reportMoney(totals.benefitPay)}</td></tr>
            <tr class="total"><td>Before Taxes (Gross)</td><td class="value">${reportMoney(totals.grossPay)}</td></tr>
            <tr><td>Estimated Taxes</td><td class="value">-${reportMoney(totals.taxes)}</td></tr>
            <tr><td>Deductions</td><td class="value">-${reportMoney(totals.deductions)}</td></tr>
            <tr><td>Other Adjustments</td><td class="value">-${reportMoney(totals.other)}</td></tr>
            <tr><td>Effective Hourly Take-Home</td><td class="value">${reportMoney(totals.effectiveRate)}</td></tr>
            <tr class="success"><td>Take-Home Pay (Net)</td><td class="value">${reportMoney(totals.takeHomePay)}</td></tr>
          </tbody>
        </table>
      </section>

      <ul class="notes">
        <li>Results are estimates only and may differ from actual payroll withholding, employer policy, taxes, benefits, deductions, overtime rules, and payroll timing.</li>
        <li>This report uses the shared Signal Labs report format.</li>
      </ul>

      <footer class="footer">
        <div>Estimates only. Actual pay may vary based on taxes, deductions, employer policies, and applicable labor laws.</div>
        <div><strong>Signal Labs</strong> • Paycheck Calculator • ${escapeHtml(TOOL_VERSION)}</div>
      </footer>
    </main>
  `;
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

function openProfessionalReportWindow(reportHtml, title) {
  const reportWindow = window.open("", "_blank", "width=900,height=1100");

  if (!reportWindow || reportWindow.closed) {
    return false;
  }

  reportWindow.document.open();
  reportWindow.document.write(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>${escapeHtml(title)}</title>
      <style>${getProfessionalReportCss()}</style>
    </head>
    <body>
      ${reportHtml}
      <script>
        window.onload = function () {
          window.focus();
          setTimeout(function () {
            window.print();
          }, 250);
        };
      <\/script>
    </body>
    </html>
  `);
  reportWindow.document.close();

  return true;
}

function printResults() {
  const opened = openProfessionalReportWindow(buildPaycheckProfessionalReportHtml(), "Paycheck Calculator Report");

  if (!opened) {
    showMessage("Unable to open the print report window. Try allowing popups for this site, then press Print Report again.", true);
    return;
  }

  showMessage("Print report opened.");
}

function initializeEvents() {
  createHourPills("premiumHourPills", PREMIUM_HOUR_TYPES, "premium");
  createHourPills("benefitHourPills", BENEFIT_HOUR_TYPES, "benefit");

  el("calculate")?.addEventListener("click", () => calculatePaycheck());
  el("saveSettings")?.addEventListener("click", () => saveSettings(true));
  el("example")?.addEventListener("click", loadExample);
  el("reset")?.addEventListener("click", resetCalculator);
  el("copyResults")?.addEventListener("click", copyResults);
  el("printResults")?.addEventListener("click", printResults);

  ["regularHoursInput", "hourlyRateInput", "payPeriodInput", "currencyInput"].forEach(id => {
    el(id)?.addEventListener("input", () => calculatePaycheck(false));
    el(id)?.addEventListener("change", () => calculatePaycheck(false));
  });

  el("addTax")?.addEventListener("click", () => openAdjustmentModal("tax"));
  el("addDeduction")?.addEventListener("click", () => openAdjustmentModal("deduction"));
  el("addOther")?.addEventListener("click", () => openAdjustmentModal("other"));
  el("closeAdjustmentModal")?.addEventListener("click", closeAdjustmentModal);
  el("cancelAdjustment")?.addEventListener("click", closeAdjustmentModal);
  el("saveAdjustment")?.addEventListener("click", saveAdjustment);
  el("amountTypePercent")?.addEventListener("click", () => { activeAmountType = "percent"; renderAmountTypePills(); });
  el("amountTypeStatic")?.addEventListener("click", () => { activeAmountType = "static"; renderAmountTypePills(); });
  el("adjustmentModal")?.addEventListener("click", event => {
    if (event.target === el("adjustmentModal")) closeAdjustmentModal();
  });
}

initializeEvents();
const restored = loadSettings();
renderHourEntries();
renderAdjustments();
if (restored) {
  calculatePaycheck(false);
  showMessage("Saved paycheck settings loaded.");
} else {
  resetResults();
}
