const categoryOptionsEl = document.getElementById("categoryOptions");
const categoryInputCardsEl = document.getElementById("categoryInputCards");
const categoryResultsEl = document.getElementById("categoryResults");
const eventCategoryInput = document.getElementById("eventCategory");
const eventNameInput = document.getElementById("eventName");
const eventDateInput = document.getElementById("eventDate");
const eventHoursInput = document.getElementById("eventHours");
const planningEventListEl = document.getElementById("planningEventList");
const plannedEventResultsEl = document.getElementById("plannedEventResults");

const payPeriodInput = document.getElementById("payPeriod");
const targetDateInput = document.getElementById("targetDate");
const hoursPerDayInput = document.getElementById("hoursPerDay");

const projectedBalanceEl = document.getElementById("projectedBalance");
const projectedDaysEl = document.getElementById("projectedDays");
const ptoEarnedEl = document.getElementById("ptoEarned");
const ptoUsedEl = document.getElementById("ptoUsed");

const periodsUntilTargetEl = document.getElementById("periodsUntilTarget");
const targetDateResultEl = document.getElementById("targetDateResult");
const selectedCategoryCountEl = document.getElementById("selectedCategoryCount");

const capResultEl = document.getElementById("capResult");
const hoursUntilCapEl = document.getElementById("hoursUntilCap");
const capStatusEl = document.getElementById("capStatus");

const generatedTimeEl = document.getElementById("generatedTime");
const messageEl = document.getElementById("message");

let plannedEvents = [];

const CATEGORY_CONFIGS = [
  {
    id: "vacation",
    label: "Vacation",
    placeholderBalance: "48",
    placeholderAccrual: "6.15",
    placeholderCap: "240"
  },
  {
    id: "sick",
    label: "Sick",
    placeholderBalance: "24",
    placeholderAccrual: "4.00",
    placeholderCap: "480"
  },
  {
    id: "personal",
    label: "Personal",
    placeholderBalance: "16",
    placeholderAccrual: "1.00",
    placeholderCap: "40"
  },
  {
    id: "comp",
    label: "Comp Time",
    placeholderBalance: "8",
    placeholderAccrual: "0",
    placeholderCap: "80"
  },
  {
    id: "holiday",
    label: "Holiday",
    placeholderBalance: "8",
    placeholderAccrual: "0",
    placeholderCap: "40"
  },
  {
    id: "floatingHoliday",
    label: "Floating Holiday",
    placeholderBalance: "8",
    placeholderAccrual: "0",
    placeholderCap: "24"
  },
  {
    id: "custom",
    label: "Custom",
    placeholderBalance: "0",
    placeholderAccrual: "0",
    placeholderCap: "0"
  }
];

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

function getSelectedCategories() {
  return Array.from(categoryOptionsEl.querySelectorAll("input[type='checkbox']:checked"))
    .map((input) => input.value);
}

function getCategoryConfig(categoryId) {
  return CATEGORY_CONFIGS.find((category) => category.id === categoryId);
}

function getCategoryLabel(categoryId) {
  const category = getCategoryConfig(categoryId);
  return category ? category.label : categoryId;
}

function makeId() {
  return Date.now().toString() + Math.random().toString(16).slice(2);
}

function parseDateValue(value) {
  return value ? new Date(`${value}T00:00:00`) : null;
}

function getPayPeriodsBetween(startDate, endDate) {
  if (!(startDate instanceof Date) || !(endDate instanceof Date)) {
    return 0;
  }

  if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
    return 0;
  }

  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  const days = Math.max((endDate - startDate) / millisecondsPerDay, 0);

  return Math.floor(days / getDaysPerPayPeriod());
}

function getCategoryField(categoryId, fieldName) {
  return document.getElementById(`${categoryId}-${fieldName}`);
}

function createCategoryCard(category) {
  const card = document.createElement("section");
  card.className = "card step-card timeoff-category-card";
  card.dataset.categoryCard = category.id;

  card.innerHTML = `
    <div class="category-card-heading">
      <h3>${category.label}</h3>
      <p>Enter balance, accrual, cap, and expected usage for this category.</p>
    </div>

    <div class="form-grid">
      <label>
        <span>Current Balance</span>
        <input id="${category.id}-currentBalance" type="number" placeholder="${category.placeholderBalance}" step="0.01">
      </label>

      <label>
        <span>Earned Per Period</span>
        <input id="${category.id}-accrualPerPeriod" type="number" placeholder="${category.placeholderAccrual}" step="0.01">
      </label>

      <label>
        <span>Quick Planned Usage</span>
        <input id="${category.id}-plannedUsage" type="number" placeholder="0" step="0.01">
      </label>

      <label>
        <span>Average Used<br><small>Per Period (Optional)</small></span>
        <input id="${category.id}-averageUsage" type="number" placeholder="0" step="0.01">
      </label>

      <label>
        <span>Cap<br><small>(Optional)</small></span>
        <input id="${category.id}-ptoCap" type="number" placeholder="${category.placeholderCap}" step="0.01">
      </label>
    </div>
  `;

  return card;
}

function wireCategoryCardInputs(card) {
  card.querySelectorAll("input").forEach((input) => {
    input.addEventListener("input", calculateTimeOff);
    input.addEventListener("change", calculateTimeOff);
  });
}

function renderCategoryCards() {
  const selectedCategories = getSelectedCategories();
  const existingCards = Array.from(categoryInputCardsEl.querySelectorAll("[data-category-card]"));

  existingCards.forEach((card) => {
    if (!selectedCategories.includes(card.dataset.categoryCard)) {
      card.remove();
    }
  });

  selectedCategories.forEach((categoryId) => {
    if (categoryInputCardsEl.querySelector(`[data-category-card='${categoryId}']`)) {
      return;
    }

    const category = getCategoryConfig(categoryId);

    if (!category) {
      return;
    }

    const card = createCategoryCard(category);
    categoryInputCardsEl.appendChild(card);
    wireCategoryCardInputs(card);
  });
}


function syncEventCategoryOptions() {
  const selectedCategories = getSelectedCategories();
  const currentValue = eventCategoryInput.value;

  eventCategoryInput.innerHTML = "";

  selectedCategories.forEach((categoryId) => {
    const option = document.createElement("option");
    option.value = categoryId;
    option.textContent = getCategoryLabel(categoryId);
    eventCategoryInput.appendChild(option);
  });

  if (selectedCategories.includes(currentValue)) {
    eventCategoryInput.value = currentValue;
  }
}

function renderPlanningEvents() {
  planningEventListEl.innerHTML = "";

  if (plannedEvents.length === 0) {
    const empty = document.createElement("p");
    empty.textContent = "No planned events added.";
    planningEventListEl.appendChild(empty);
    return;
  }

  plannedEvents
    .slice()
    .sort((a, b) => a.date.localeCompare(b.date))
    .forEach((event) => {
      const row = document.createElement("div");
      row.className = "planning-event-item";

      const details = document.createElement("span");
      details.textContent = `${event.name} — ${getCategoryLabel(event.categoryId)} — ${formatDate(parseDateValue(event.date))} — ${formatNumber(event.hours)} hrs`;

      const remove = document.createElement("button");
      remove.type = "button";
      remove.textContent = "×";
      remove.setAttribute("aria-label", `Remove ${event.name}`);

      remove.addEventListener("click", () => {
        plannedEvents = plannedEvents.filter((item) => item.id !== event.id);
        renderPlanningEvents();
        calculateTimeOff();
      });

      row.appendChild(details);
      row.appendChild(remove);
      planningEventListEl.appendChild(row);
    });
}

function getPlannedEventUsage(categoryId, targetDate) {
  return plannedEvents
    .filter((event) => event.categoryId === categoryId)
    .filter((event) => {
      const eventDate = parseDateValue(event.date);
      return eventDate && targetDate && eventDate <= targetDate;
    })
    .reduce((sum, event) => sum + event.hours, 0);
}

function addPlanningEvent() {
  const categoryId = eventCategoryInput.value;
  const name = eventNameInput.value.trim() || "Planned Time Off";
  const date = eventDateInput.value;
  const hours = Number(eventHoursInput.value);

  messageEl.classList.remove("error");

  if (!categoryId) {
    messageEl.textContent = "Choose a category for this planned event.";
    messageEl.classList.add("error");
    return;
  }

  if (!date) {
    messageEl.textContent = "Choose a date for this planned event.";
    messageEl.classList.add("error");
    return;
  }

  if (Number.isNaN(hours) || hours <= 0) {
    messageEl.textContent = "Enter planned event hours greater than 0.";
    messageEl.classList.add("error");
    return;
  }

  plannedEvents.push({
    id: makeId(),
    categoryId,
    name,
    date,
    hours
  });

  eventNameInput.value = "";
  eventDateInput.value = "";
  eventHoursInput.value = "";

  renderPlanningEvents();
  calculateTimeOff();
}

function clearPlanningEvents() {
  plannedEvents = [];
  renderPlanningEvents();
  calculateTimeOff();
}

function clearPlannedEventResults() {
  plannedEventResultsEl.innerHTML = "";

  const empty = document.createElement("p");
  empty.className = "empty-results";
  empty.textContent = "Add planned events to see running balance impact.";

  plannedEventResultsEl.appendChild(empty);
}

function clearCategoryResults() {
  categoryResultsEl.innerHTML = "";

  const empty = document.createElement("p");
  empty.className = "empty-results";
  empty.textContent = "Select categories and enter values to see category-level results.";

  categoryResultsEl.appendChild(empty);
}

function resetResults() {
  projectedBalanceEl.textContent = "0.00 hrs";
  projectedDaysEl.textContent = "0.00 days";
  ptoEarnedEl.textContent = "0.00 hrs";
  ptoUsedEl.textContent = "0.00 hrs";
  periodsUntilTargetEl.textContent = "0";
  targetDateResultEl.textContent = "--";
  selectedCategoryCountEl.textContent = "0";
  capResultEl.textContent = "Not set";
  hoursUntilCapEl.textContent = "--";
  capStatusEl.textContent = "--";
  generatedTimeEl.textContent = "--";
  clearCategoryResults();
  clearPlannedEventResults();
}

function getCategoryValues(categoryId) {
  return {
    currentBalance: getInputValue(getCategoryField(categoryId, "currentBalance")),
    accrualPerPeriod: getInputValue(getCategoryField(categoryId, "accrualPerPeriod")),
    plannedUsage: getInputValue(getCategoryField(categoryId, "plannedUsage")),
    averageUsage: getInputValue(getCategoryField(categoryId, "averageUsage")),
    ptoCap: getInputValue(getCategoryField(categoryId, "ptoCap"))
  };
}

function hasCategoryInput(categoryId) {
  const fields = [
    "currentBalance",
    "accrualPerPeriod",
    "plannedUsage",
    "averageUsage",
    "ptoCap"
  ];

  return fields.some((fieldName) => {
    const input = getCategoryField(categoryId, fieldName);
    return input && input.value !== "";
  });
}

function getCategoryProjection(categoryId, payPeriodsUntilTarget, targetDate) {
  const config = getCategoryConfig(categoryId);
  const values = getCategoryValues(categoryId);
  const earned = payPeriodsUntilTarget * values.accrualPerPeriod;
  const recurringUsage = payPeriodsUntilTarget * values.averageUsage;
  const eventUsage = getPlannedEventUsage(categoryId, targetDate);
  const used = values.plannedUsage + recurringUsage + eventUsage;
  const uncappedProjection = values.currentBalance + earned - used;
  const hasCap = values.ptoCap > 0;

  let projectedBalance = uncappedProjection;

  if (hasCap) {
    projectedBalance = Math.min(projectedBalance, values.ptoCap);
  }

  projectedBalance = Math.max(projectedBalance, 0);

  let capStatus = "No cap set.";
  let hoursUntilCap = "--";

  if (hasCap) {
    const remainingUntilCap = Math.max(values.ptoCap - projectedBalance, 0);
    hoursUntilCap = `${formatNumber(remainingUntilCap)} hrs`;

    if (values.currentBalance >= values.ptoCap) {
      capStatus = "At or above cap.";
    } else if (projectedBalance >= values.ptoCap) {
      capStatus = "Projected to reach cap by target date.";
    } else {
      capStatus = "Below cap by target date.";
    }
  }

  return {
    id: categoryId,
    label: config ? config.label : categoryId,
    values,
    earned,
    recurringUsage,
    eventUsage,
    used,
    projectedBalance,
    hasCap,
    hoursUntilCap,
    capStatus
  };
}

function renderCategoryResults(categoryProjections, hoursPerDay) {
  categoryResultsEl.innerHTML = "";

  if (categoryProjections.length === 0) {
    clearCategoryResults();
    return;
  }

  categoryProjections.forEach((projection) => {
    const card = document.createElement("section");
    card.className = "category-result-card";

    const projectedDays = projection.projectedBalance / hoursPerDay;
    const capText = projection.hasCap
      ? `${formatNumber(projection.values.ptoCap)} hrs`
      : "Not set";

    card.innerHTML = `
      <div class="category-result-heading">
        <h4>${projection.label}</h4>
        <span>${projection.capStatus}</span>
      </div>

      <div class="result-row category-result-total">
        <span>Projected Balance</span>
        <strong>${formatNumber(projection.projectedBalance)} hrs</strong>
      </div>

      <div class="result-row">
        <span>Projected Days</span>
        <strong>${formatNumber(projectedDays)} days</strong>
      </div>

      <div class="result-row">
        <span>Current Balance</span>
        <strong>${formatNumber(projection.values.currentBalance)} hrs</strong>
      </div>

      <div class="result-row">
        <span>Earned</span>
        <strong>${formatNumber(projection.earned)} hrs</strong>
      </div>

      <div class="result-row">
        <span>Used</span>
        <strong>${formatNumber(projection.used)} hrs</strong>
      </div>

      <div class="result-row">
        <span>Planned Events</span>
        <strong>${formatNumber(projection.eventUsage)} hrs</strong>
      </div>

      <div class="result-row">
        <span>Cap</span>
        <strong>${capText}</strong>
      </div>

      <div class="result-row">
        <span>Hours Until Cap</span>
        <strong>${projection.hoursUntilCap}</strong>
      </div>
    `;

    categoryResultsEl.appendChild(card);
  });
}


function renderPlannedEventResults(categoryProjections, targetDate, today) {
  plannedEventResultsEl.innerHTML = "";

  const eligibleEvents = plannedEvents
    .filter((event) => {
      const eventDate = parseDateValue(event.date);
      return eventDate && targetDate && eventDate <= targetDate;
    })
    .sort((a, b) => a.date.localeCompare(b.date));

  if (eligibleEvents.length === 0) {
    clearPlannedEventResults();
    return;
  }

  const projectionMap = new Map(
    categoryProjections.map((projection) => [projection.id, projection])
  );

  const runningBalances = {};

  categoryProjections.forEach((projection) => {
    runningBalances[projection.id] = projection.values.currentBalance;
  });

  eligibleEvents.forEach((event) => {
    const projection = projectionMap.get(event.categoryId);

    if (!projection) {
      return;
    }

    const eventDate = parseDateValue(event.date);
    const periodsUntilEvent = getPayPeriodsBetween(today, eventDate);
    const earnedByEvent = periodsUntilEvent * projection.values.accrualPerPeriod;
    const recurringUsedByEvent = periodsUntilEvent * projection.values.averageUsage;
    const baseBalanceBeforeEvent = projection.values.currentBalance + earnedByEvent - recurringUsedByEvent;

    const previousEvents = eligibleEvents
      .filter((item) => item.categoryId === event.categoryId)
      .filter((item) => item.date < event.date || (item.date === event.date && item.id < event.id))
      .reduce((sum, item) => sum + item.hours, 0);

    const balanceBeforeEvent = Math.max(baseBalanceBeforeEvent - previousEvents - projection.values.plannedUsage, 0);
    const balanceAfterEvent = Math.max(balanceBeforeEvent - event.hours, 0);
    const warning = event.hours > balanceBeforeEvent;

    const row = document.createElement("div");
    row.className = warning ? "planned-event-result warning" : "planned-event-result";

    row.innerHTML = `
      <div>
        <strong>${event.name}</strong>
        <span>${getCategoryLabel(event.categoryId)} · ${formatDate(eventDate)} · ${formatNumber(event.hours)} hrs</span>
      </div>
      <div>
        <strong>${formatNumber(balanceAfterEvent)} hrs</strong>
        <span>${warning ? "Warning: event exceeds projected available balance." : "Estimated balance after event."}</span>
      </div>
    `;

    plannedEventResultsEl.appendChild(row);
  });
}

function calculateTimeOff() {
  const selectedCategories = getSelectedCategories();
  const hoursPerDay = getInputValue(hoursPerDayInput) || 8;
  const targetDateValue = targetDateInput.value;
  const targetDate = parseDateValue(targetDateValue);
  const today = new Date();

  messageEl.classList.remove("error");

  if (selectedCategories.length === 0) {
    resetResults();
    messageEl.textContent = "Choose at least one time-off category.";
    messageEl.classList.add("error");
    return;
  }

  const hasAnyInput = selectedCategories.some((categoryId) => hasCategoryInput(categoryId));

  if (!hasAnyInput) {
    resetResults();
    selectedCategoryCountEl.textContent = formatWholeNumber(selectedCategories.length);
    messageEl.textContent = "Enter values or load an example to begin.";
    return;
  }

  if (hoursPerDay <= 0) {
    resetResults();
    messageEl.textContent = "Hours per day must be greater than 0.";
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

  let combinedCurrentBalance = 0;
  let combinedEarned = 0;
  let combinedUsed = 0;
  let combinedProjectedBalance = 0;
  let combinedCap = 0;
  let hasAnyCap = false;
  let hasNegativeValue = false;

  const categoryProjections = selectedCategories.map((categoryId) => {
    const projection = getCategoryProjection(categoryId, payPeriodsUntilTarget, targetDate);

    if (
      projection.values.currentBalance < 0 ||
      projection.values.accrualPerPeriod < 0 ||
      projection.values.plannedUsage < 0 ||
      projection.values.averageUsage < 0 ||
      projection.values.ptoCap < 0
    ) {
      hasNegativeValue = true;
    }

    combinedCurrentBalance += projection.values.currentBalance;
    combinedEarned += projection.earned;
    combinedUsed += projection.used;
    combinedProjectedBalance += projection.projectedBalance;

    if (projection.hasCap) {
      combinedCap += projection.values.ptoCap;
      hasAnyCap = true;
    }

    return projection;
  });

  if (hasNegativeValue) {
    resetResults();
    messageEl.textContent = "Enter valid positive values. Time off hours cannot be negative.";
    messageEl.classList.add("error");
    return;
  }

  const projectedDays = combinedProjectedBalance / hoursPerDay;

  let hoursUntilCap = "--";
  let capStatus = "No balance cap set.";

  if (hasAnyCap) {
    const remainingUntilCap = Math.max(combinedCap - combinedProjectedBalance, 0);
    hoursUntilCap = `${formatNumber(remainingUntilCap)} hrs`;

    if (combinedCurrentBalance >= combinedCap) {
      capStatus = "At or above combined cap.";
    } else if (combinedProjectedBalance >= combinedCap) {
      capStatus = "Projected to reach combined cap by target date.";
    } else {
      capStatus = "Below combined cap by target date.";
    }
  }

  projectedBalanceEl.textContent = `${formatNumber(combinedProjectedBalance)} hrs`;
  projectedDaysEl.textContent = `${formatNumber(projectedDays)} days`;
  ptoEarnedEl.textContent = `${formatNumber(combinedEarned)} hrs`;
  ptoUsedEl.textContent = `${formatNumber(combinedUsed)} hrs`;

  periodsUntilTargetEl.textContent = formatWholeNumber(payPeriodsUntilTarget);
  targetDateResultEl.textContent = formatDate(targetDate);
  selectedCategoryCountEl.textContent = formatWholeNumber(selectedCategories.length);

  capResultEl.textContent = hasAnyCap ? `${formatNumber(combinedCap)} hrs` : "Not set";
  hoursUntilCapEl.textContent = hoursUntilCap;
  capStatusEl.textContent = capStatus;

  renderCategoryResults(categoryProjections, hoursPerDay);
  renderPlannedEventResults(categoryProjections, targetDate, today);

  generatedTimeEl.textContent = getCurrentUtcTime();
  messageEl.textContent = "Time off projection updated.";
}

function setCategorySelection(categoryIds) {
  categoryOptionsEl.querySelectorAll("input[type='checkbox']").forEach((checkbox) => {
    checkbox.checked = categoryIds.includes(checkbox.value);
  });

  renderCategoryCards();
}

function setCategoryValues(categoryId, values) {
  getCategoryField(categoryId, "currentBalance").value = values.currentBalance;
  getCategoryField(categoryId, "accrualPerPeriod").value = values.accrualPerPeriod;
  getCategoryField(categoryId, "plannedUsage").value = values.plannedUsage;
  getCategoryField(categoryId, "averageUsage").value = values.averageUsage;
  getCategoryField(categoryId, "ptoCap").value = values.ptoCap;
}

function loadExample() {
  setCategorySelection(["vacation", "sick", "personal"]);

  payPeriodInput.value = "biweekly";
  targetDateInput.value = getDefaultTargetDate();
  hoursPerDayInput.value = "8";

  setCategoryValues("vacation", {
    currentBalance: "48",
    accrualPerPeriod: "6.15",
    plannedUsage: "24",
    averageUsage: "0",
    ptoCap: "240"
  });

  setCategoryValues("sick", {
    currentBalance: "32",
    accrualPerPeriod: "4",
    plannedUsage: "0",
    averageUsage: "0",
    ptoCap: "480"
  });

  setCategoryValues("personal", {
    currentBalance: "16",
    accrualPerPeriod: "1",
    plannedUsage: "8",
    averageUsage: "0",
    ptoCap: "40"
  });

  plannedEvents = [
    {
      id: makeId(),
      categoryId: "vacation",
      name: "Summer Vacation",
      date: addDays(new Date(), 35).toISOString().slice(0, 10),
      hours: 24
    },
    {
      id: makeId(),
      categoryId: "personal",
      name: "Appointment Day",
      date: addDays(new Date(), 50).toISOString().slice(0, 10),
      hours: 8
    }
  ];

  renderPlanningEvents();
  calculateTimeOff();
}

function clearCalculator() {
  setCategorySelection(["vacation"]);

  payPeriodInput.value = "biweekly";
  targetDateInput.value = "";
  hoursPerDayInput.value = "";

  categoryInputCardsEl.querySelectorAll("input").forEach((input) => {
    input.value = "";
  });

  plannedEvents = [];
  renderPlanningEvents();

  resetResults();

  messageEl.classList.remove("error");
  messageEl.textContent = "Enter values or load an example to begin.";
}

categoryOptionsEl.querySelectorAll("input[type='checkbox']").forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    renderCategoryCards();
    syncEventCategoryOptions();
    plannedEvents = plannedEvents.filter((event) => getSelectedCategories().includes(event.categoryId));
    renderPlanningEvents();
    calculateTimeOff();
  });
});

[
  payPeriodInput,
  targetDateInput,
  hoursPerDayInput
].forEach((input) => {
  input.addEventListener("input", calculateTimeOff);
  input.addEventListener("change", calculateTimeOff);
});

document.getElementById("calculate").addEventListener("click", calculateTimeOff);
document.getElementById("example").addEventListener("click", loadExample);
document.getElementById("reset").addEventListener("click", clearCalculator);
document.getElementById("addPlanningEvent").addEventListener("click", addPlanningEvent);
document.getElementById("clearPlanningEvents").addEventListener("click", clearPlanningEvents);

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

renderCategoryCards();
syncEventCategoryOptions();
renderPlanningEvents();
resetResults();
