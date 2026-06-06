const currentBalanceInput = document.getElementById("currentBalance");
const accrualPerPeriodInput = document.getElementById("accrualPerPeriod");
const payPeriodInput = document.getElementById("payPeriod");
const ptoCapInput = document.getElementById("ptoCap");

const targetDateInput = document.getElementById("targetDate");
const plannedUsageInput = document.getElementById("plannedUsage");
const averageUsageInput = document.getElementById("averageUsage");
const hoursPerDayInput = document.getElementById("hoursPerDay");

const projectedBalanceEl = document.getElementById("projectedBalance");
const projectedDaysEl = document.getElementById("projectedDays");
const ptoEarnedEl = document.getElementById("ptoEarned");
const ptoUsedEl = document.getElementById("ptoUsed");

const periodsUntilTargetEl = document.getElementById("periodsUntilTarget");
const targetDateResultEl = document.getElementById("targetDateResult");
const capDateResultEl = document.getElementById("capDateResult");

const capResultEl = document.getElementById("capResult");
const hoursUntilCapEl = document.getElementById("hoursUntilCap");
const capStatusEl = document.getElementById("capStatus");

const generatedTimeEl = document.getElementById("generatedTime");
const messageEl = document.getElementById("message");

function getInputValue(input) {
  return Number(input.value) || 0;
}

function formatNumber(value) {
  return Number(value).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function formatWholeNumber(value) {
  return Math.round(value).toLocaleString("en-US");
}

function formatDate(date) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
    return "--";
  }

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}

function getCurrentUtcTime() {
  return new Date().toISOString().replace("T", " ").slice(0, 19) + " UTC";
}

function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function getDaysPerPayPeriod() {
  switch (payPeriodInput.value) {
    case "weekly":
      return 7;

    case "biweekly":
      return 14;

    case "semimonthly":
      return 15.21875;

    case "monthly":
      return 30.4375;

    default:
      return 14;
  }
}

function getDefaultTargetDate() {
  const today = new Date();
  const target = addDays(today, 90);
  return target.toISOString().slice(0, 10);
}

function resetResults() {
  projectedBalanceEl.textContent = "0.00 hrs";
  projectedDaysEl.textContent = "0.00 days";
  ptoEarnedEl.textContent = "0.00 hrs";
  ptoUsedEl.textContent = "0.00 hrs";
  periodsUntilTargetEl.textContent = "0";
  targetDateResultEl.textContent = "--";
  capDateResultEl.textContent = "--";
  capResultEl.textContent = "Not set";
  hoursUntilCapEl.textContent = "--";
  capStatusEl.textContent = "--";
  generatedTimeEl.textContent = "--";
}

function calculatePto() {
  const currentBalance = getInputValue(currentBalanceInput);
  const accrualPerPeriod = getInputValue(accrualPerPeriodInput);
  const ptoCap = getInputValue(ptoCapInput);
  const plannedUsage = getInputValue(plannedUsageInput);
  const averageUsage = getInputValue(averageUsageInput);
  const hoursPerDay = getInputValue(hoursPerDayInput) || 8;

  const targetDateValue = targetDateInput.value;
  const targetDate = targetDateValue ? new Date(`${targetDateValue}T00:00:00`) : null;
  const today = new Date();

  messageEl.classList.remove("error");

  if (!currentBalanceInput.value && !accrualPerPeriodInput.value) {
    resetResults();
    messageEl.textContent = "Enter values or load an example to begin.";
    return;
  }

  if (currentBalance < 0 || accrualPerPeriod < 0 || ptoCap < 0 || plannedUsage < 0 || averageUsage < 0 || hoursPerDay <= 0) {
    resetResults();
    messageEl.textContent = "Enter valid positive values. PTO hours cannot be negative.";
    messageEl.classList.add("error");
    return;
  }

  if (!targetDate || Number.isNaN(targetDate.getTime())) {
    resetResults();
    messageEl.textContent = "Choose a target date.";
    messageEl.classList.add("error");
    return;
  }

  if (targetDate < today) {
    resetResults();
    messageEl.textContent = "Choose a target date in the future.";
    messageEl.classList.add("error");
    return;
  }

  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  const daysUntilTarget = Math.max((targetDate - today) / millisecondsPerDay, 0);
  const payPeriodsUntilTarget = Math.floor(daysUntilTarget / getDaysPerPayPeriod());

  const ptoEarned = payPeriodsUntilTarget * accrualPerPeriod;
  const recurringUsage = payPeriodsUntilTarget * averageUsage;
  const totalUsage = plannedUsage + recurringUsage;

  let projectedBalance = currentBalance + ptoEarned - totalUsage;

  if (ptoCap > 0) {
    projectedBalance = Math.min(projectedBalance, ptoCap);
  }

  projectedBalance = Math.max(projectedBalance, 0);

  const projectedDays = projectedBalance / hoursPerDay;

  let capDate = "--";
  let capStatus = "No PTO cap set.";
  let hoursUntilCap = "--";

  if (ptoCap > 0) {
    const remainingUntilCap = Math.max(ptoCap - currentBalance, 0);
    hoursUntilCap = `${formatNumber(Math.max(ptoCap - projectedBalance, 0))} hrs`;

    if (currentBalance >= ptoCap) {
      capStatus = "At or above cap.";
      capDate = "Already at cap";
    } else if (accrualPerPeriod <= averageUsage) {
      capStatus = "Not projected to reach cap.";
      capDate = "Not projected";
    } else {
      const netAccrualPerPeriod = accrualPerPeriod - averageUsage;
      const periodsToCap = Math.ceil(remainingUntilCap / netAccrualPerPeriod);
      const estimatedCapDate = addDays(today, periodsToCap * getDaysPerPayPeriod());

      capStatus =
        projectedBalance >= ptoCap
          ? "Projected to reach cap by target date."
          : "Below cap by target date.";

      capDate = formatDate(estimatedCapDate);
    }
  }

  projectedBalanceEl.textContent = `${formatNumber(projectedBalance)} hrs`;
  projectedDaysEl.textContent = `${formatNumber(projectedDays)} days`;
  ptoEarnedEl.textContent = `${formatNumber(ptoEarned)} hrs`;
  ptoUsedEl.textContent = `${formatNumber(totalUsage)} hrs`;

  periodsUntilTargetEl.textContent = formatWholeNumber(payPeriodsUntilTarget);
  targetDateResultEl.textContent = formatDate(targetDate);
  capDateResultEl.textContent = capDate;

  capResultEl.textContent = ptoCap > 0 ? `${formatNumber(ptoCap)} hrs` : "Not set";
  hoursUntilCapEl.textContent = hoursUntilCap;
  capStatusEl.textContent = capStatus;

  generatedTimeEl.textContent = getCurrentUtcTime();
  messageEl.textContent = "PTO projection updated.";
}

function loadExample() {
  currentBalanceInput.value = "48";
  accrualPerPeriodInput.value = "6.15";
  payPeriodInput.value = "biweekly";
  ptoCapInput.value = "240";
  targetDateInput.value = getDefaultTargetDate();
  plannedUsageInput.value = "24";
  averageUsageInput.value = "0";
  hoursPerDayInput.value = "8";

  calculatePto();
}

function clearCalculator() {
  currentBalanceInput.value = "";
  accrualPerPeriodInput.value = "";
  payPeriodInput.value = "biweekly";
  ptoCapInput.value = "";
  targetDateInput.value = "";
  plannedUsageInput.value = "";
  averageUsageInput.value = "";
  hoursPerDayInput.value = "";

  resetResults();

  messageEl.classList.remove("error");
  messageEl.textContent = "Enter values or load an example to begin.";
}

document.getElementById("calculate").addEventListener("click", calculatePto);
document.getElementById("example").addEventListener("click", loadExample);
document.getElementById("reset").addEventListener("click", clearCalculator);

[
  currentBalanceInput,
  accrualPerPeriodInput,
  payPeriodInput,
  ptoCapInput,
  targetDateInput,
  plannedUsageInput,
  averageUsageInput,
  hoursPerDayInput
].forEach((input) => {
  input.addEventListener("input", calculatePto);
  input.addEventListener("change", calculatePto);
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

resetResults();
