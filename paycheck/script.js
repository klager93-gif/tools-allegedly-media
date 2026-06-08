/*
Signal Labs
Tool: Paycheck Calculator
File: script.js
Version: v0.1.1
Purpose: Tool-specific logic and event handling
*/
const TOOL_VERSION = "v0.1.1";
const TOOL_THEME = "Foundation + Hidden Ad Framework";
const STORAGE_KEY = "signalLabsPaycheckCalculatorV011";

const hourlyRateInput = document.getElementById("hourlyRateInput");
const hoursWorkedInput = document.getElementById("hoursWorkedInput");
const payPeriodInput = document.getElementById("payPeriodInput");
const currencyInput = document.getElementById("currencyInput");
const taxRateInput = document.getElementById("taxRateInput");
const deductionsInput = document.getElementById("deductionsInput");
const messageEl = document.getElementById("message");
const generatedTimeEl = document.getElementById("generatedTime");

function el(id) { return document.getElementById(id); }
function getInputValue(input) { return Number(input.value) || 0; }
function getSelectedCurrency() { return currencyInput ? currencyInput.value : "USD"; }
function formatMoney(amount) { return Number(amount || 0).toLocaleString("en-US", { style: "currency", currency: getSelectedCurrency() }); }
function formatNumber(value) { return Number(value || 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
function currentUtcTime() { return new Date().toISOString().replace("T", " ").slice(0, 19) + " UTC"; }
function setText(id, value) { const node = el(id); if (node) node.textContent = value; }
function getPayPeriodLabel() { return payPeriodInput.selectedOptions[0]?.textContent || "Bi-Weekly"; }

function getState() {
  return {
    hourlyRate: hourlyRateInput.value,
    hoursWorked: hoursWorkedInput.value,
    payPeriod: payPeriodInput.value,
    currency: currencyInput.value,
    taxRate: taxRateInput.value,
    deductions: deductionsInput.value
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

function loadSettings() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return false;
  try {
    const data = JSON.parse(saved);
    hourlyRateInput.value = data.hourlyRate || "";
    hoursWorkedInput.value = data.hoursWorked || "";
    payPeriodInput.value = data.payPeriod || "biweekly";
    currencyInput.value = data.currency || "USD";
    taxRateInput.value = data.taxRate || "";
    deductionsInput.value = data.deductions || "";
    return true;
  } catch (error) {
    localStorage.removeItem(STORAGE_KEY);
    return false;
  }
}

function resetResults() {
  setText("grossPayResult", "$0.00");
  setText("taxesResult", "-$0.00");
  setText("deductionsResult", "-$0.00");
  setText("takeHomeResult", "$0.00");
  setText("effectiveRateResult", "$0.00");
  generatedTimeEl.textContent = "--";
}

function calculatePaycheck() {
  const rate = getInputValue(hourlyRateInput);
  const hours = getInputValue(hoursWorkedInput);
  const taxRate = getInputValue(taxRateInput);
  const deductions = getInputValue(deductionsInput);

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

  if (taxRate < 0 || taxRate > 100 || deductions < 0) {
    resetResults();
    messageEl.classList.add("error");
    messageEl.textContent = "Enter a tax rate from 0 to 100 and deductions of 0 or more.";
    return;
  }

  const grossPay = rate * hours;
  const estimatedTaxes = grossPay * (taxRate / 100);
  const takeHomePay = Math.max(grossPay - estimatedTaxes - deductions, 0);
  const effectiveRate = hours > 0 ? takeHomePay / hours : 0;

  setText("grossPayResult", formatMoney(grossPay));
  setText("taxesResult", `-${formatMoney(estimatedTaxes)}`);
  setText("deductionsResult", `-${formatMoney(deductions)}`);
  setText("takeHomeResult", formatMoney(takeHomePay));
  setText("effectiveRateResult", formatMoney(effectiveRate));
  generatedTimeEl.textContent = currentUtcTime();
  messageEl.textContent = "Paycheck estimate updated.";
  saveSettings();
}

function loadExample() {
  hourlyRateInput.value = "25";
  hoursWorkedInput.value = "80";
  payPeriodInput.value = "biweekly";
  currencyInput.value = "USD";
  taxRateInput.value = "22";
  deductionsInput.value = "150";
  calculatePaycheck();
}

function resetCalculator() {
  localStorage.removeItem(STORAGE_KEY);
  hourlyRateInput.value = "";
  hoursWorkedInput.value = "";
  payPeriodInput.value = "biweekly";
  currencyInput.value = "USD";
  taxRateInput.value = "";
  deductionsInput.value = "";
  resetResults();
  messageEl.classList.remove("error");
  messageEl.textContent = "Calculator reset. Saved settings cleared.";
}

function buildPaycheckResultsSummary() {
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
    `Tax Rate: ${formatNumber(getInputValue(taxRateInput))}%`,
    `Deductions: ${formatMoney(getInputValue(deductionsInput))}`,
    "",
    "Results",
    `Gross Pay: ${el("grossPayResult").textContent}`,
    `Estimated Taxes: ${el("taxesResult").textContent}`,
    `Deductions: ${el("deductionsResult").textContent}`,
    `Take-Home Pay: ${el("takeHomeResult").textContent}`,
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

function printResults() {
  const reportWindow = window.open("", "_blank", "width=900,height=1100");
  if (!reportWindow || reportWindow.closed) {
    messageEl.classList.add("error");
    messageEl.textContent = "Unable to open the print report window. Try allowing popups.";
    return;
  }
  const summary = buildPaycheckResultsSummary().replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
  reportWindow.document.open();
  reportWindow.document.write(`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Paycheck Report</title><style>body{font-family:Arial,sans-serif;padding:32px;color:#111;}pre{white-space:pre-wrap;font-size:14px;line-height:1.5;}h1{font-size:24px;}footer{margin-top:24px;border-top:1px solid #ccc;padding-top:12px;font-size:12px;}</style></head><body><h1>Signal Labs Paycheck Report</h1><pre>${summary}</pre><footer>Signal Labs • Paycheck Calculator • ${TOOL_VERSION}</footer><script>window.onload=function(){window.focus();setTimeout(function(){window.print();},250);};<\/script></body></html>`);
  reportWindow.document.close();
}

[hourlyRateInput, hoursWorkedInput, payPeriodInput, currencyInput, taxRateInput, deductionsInput].forEach((input) => {
  input.addEventListener("input", calculatePaycheck);
  input.addEventListener("change", calculatePaycheck);
});

document.getElementById("calculate").addEventListener("click", calculatePaycheck);
document.getElementById("saveSettings").addEventListener("click", () => saveSettings(true));
document.getElementById("example").addEventListener("click", loadExample);
document.getElementById("reset").addEventListener("click", resetCalculator);
document.getElementById("copyResults").addEventListener("click", copyResults);
document.getElementById("printResults").addEventListener("click", printResults);

document.getElementById("openChangelog").addEventListener("click", () => openTextModal({ title: "CHANGELOG", file: "CHANGELOG.md" }));
document.getElementById("openRoadmap").addEventListener("click", () => openTextModal({ title: "ROADMAP", file: "ROADMAP.md" }));

if (loadSettings()) {
  calculatePaycheck();
  messageEl.textContent = "Welcome back. Previous paycheck values restored.";
} else {
  resetResults();
}
