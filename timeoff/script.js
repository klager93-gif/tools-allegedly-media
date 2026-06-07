/*
Signal Labs
Tool: Time Off Calculator
File: script.js
Version: v0.9.7
Purpose: Tool-specific logic and event handling
*/
const categoryOptionsEl = document.getElementById("categoryOptions");
const categoryInputCardsEl = document.getElementById("categoryInputCards");
const categoryResultsEl = document.getElementById("categoryResults");
const eventCategoryInput = document.getElementById("eventCategory");
const eventNameInput = document.getElementById("eventName");
const eventDateInput = document.getElementById("eventDate");
const eventHoursInput = document.getElementById("eventHours");
const planningEventListEl = document.getElementById("planningEventList");
const plannedEventResultsEl = document.getElementById("plannedEventResults");
const warningResultsEl = document.getElementById("warningResults");
const clearSavedProfileButton = document.getElementById("clearSavedProfile");

const policyResetDateInput = document.getElementById("policyResetDate");
const carryoverLimitInput = document.getElementById("carryoverLimit");
const useItOrLoseItInput = document.getElementById("useItOrLoseIt");
const policyNotesInput = document.getElementById("policyNotes");

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
let isLoadingSavedSettings = false;

const STORAGE_KEY = "signalLabsTimeOffPlannerV097";
const LEGACY_STORAGE_KEYS = [
  "signalLabsTimeOffCalculatorV092",
  "signalLabsTimeOffCalculatorV08",
  "signalLabsTimeOffCalculatorV07",
  "signalLabsTimeOffCalculatorV0621",
  "signalLabsTimeOffCalculatorV062",
  "signalLabsTimeOffCalculatorV061",
  "signalLabsTimeOffCalculatorV06"
];

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




function getOptionalSectionSettings() {
  return {
    planningMode: Boolean(document.getElementById("planningModeEnabled")?.checked),
    policyHelpers: Boolean(document.getElementById("policyHelpersEnabled")?.checked)
  };
}

function applyOptionalSectionVisibility() {
  const settings = getOptionalSectionSettings();

  const sectionMap = {
    planningMode: settings.planningMode,
    policyHelpers: settings.policyHelpers
  };

  Object.entries(sectionMap).forEach(([key, isEnabled]) => {
    document.querySelectorAll(`[data-optional-section="${key}"]`).forEach((section) => {
      section.classList.toggle("optional-section-off", !isEnabled);
      section.setAttribute("aria-disabled", String(!isEnabled));
    });
  });

  [
    ["planningModeEnabled", settings.planningMode],
    ["policyHelpersEnabled", settings.policyHelpers]
  ].forEach(([id, isEnabled]) => {
    const label = document.querySelector(`[data-state-for="${id}"]`);

    if (label) {
      label.textContent = isEnabled ? "ON" : "OFF";
      label.classList.toggle("is-on", isEnabled);
      label.classList.toggle("is-off", !isEnabled);
    }
  });

  document.querySelectorAll(".planned-results-section").forEach((section) => {
    section.classList.toggle("optional-section-disabled", !settings.planningMode);
  });

  document.querySelectorAll(".warning-results-section").forEach((section) => {
    section.classList.toggle("optional-section-disabled", !settings.policyHelpers);
  });
}

function setupOptionalSectionToggles() {
  ["planningModeEnabled", "policyHelpersEnabled"].forEach((id) => {
    const toggle = document.getElementById(id);

    if (!toggle || toggle.dataset.optionalToggleBound === "true") {
      return;
    }

    toggle.dataset.optionalToggleBound = "true";

    toggle.addEventListener("change", () => {
      applyOptionalSectionVisibility();
      calculateTimeOff();
      saveSettings();
    });
  });

  applyOptionalSectionVisibility();
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
      const shouldCollapse = Boolean(collapseStates.cards[index]);
      card.classList.toggle("is-collapsed", shouldCollapse);

      const button = card.querySelector(".collapse-toggle");

      if (button) {
        button.textContent = shouldCollapse ? "Show" : "Hide";
        button.setAttribute("aria-expanded", String(!shouldCollapse));
      }
    });
  }

  if (Array.isArray(collapseStates.results)) {
    document.querySelectorAll("[data-result-section]").forEach((section, index) => {
      const shouldCollapse = Boolean(collapseStates.results[index]);
      section.classList.toggle("is-result-collapsed", shouldCollapse);

      const button = section.querySelector(".result-collapse-toggle");

      if (button) {
        button.textContent = shouldCollapse ? "Show" : "Hide";
        button.setAttribute("aria-expanded", String(!shouldCollapse));
      }
    });
  }
}


function setupSingleCollapsibleCard(card) {
  const button = card.querySelector(".collapse-toggle");

  if (!button) {
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
}

function setupMobileCollapsibleCards() {
  document.querySelectorAll("[data-collapse-card]").forEach((card) => {
    const button = card.querySelector(".collapse-toggle");

    if (!button) {
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
  document.querySelectorAll("[data-result-section]").forEach((section) => {
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

function getSavedState() {
  const selectedCategories = getSelectedCategories();
  const categoryValues = {};

  selectedCategories.forEach((categoryId) => {
    if (getCategoryField(categoryId, "currentBalance")) {
      categoryValues[categoryId] = {
        currentBalance: getCategoryField(categoryId, "currentBalance").value,
        accrualPerPeriod: getCategoryField(categoryId, "accrualPerPeriod").value,
        plannedUsage: getCategoryField(categoryId, "plannedUsage").value,
        averageUsage: getCategoryField(categoryId, "averageUsage").value,
        ptoCap: getCategoryField(categoryId, "ptoCap").value
      };
    }
  });

  return {
    selectedCategories,
    categoryValues,
    plannedEvents,
    payPeriod: payPeriodInput.value,
    targetDate: targetDateInput.value,
    hoursPerDay: hoursPerDayInput.value,
    eventCategory: eventCategoryInput.value,
    eventName: eventNameInput.value,
    eventDate: eventDateInput.value,
    eventHours: eventHoursInput.value,
    policyResetDate: policyResetDateInput.value,
    carryoverLimit: carryoverLimitInput.value,
    useItOrLoseIt: useItOrLoseItInput.checked,
    policyNotes: policyNotesInput.value,
    collapseStates: getCollapseStates(),
    optionalSections: getOptionalSectionSettings()
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
      messageEl.textContent = "Saved profile updated. Values will load automatically next time you visit.";
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
}

function clearSavedProfile() {
  clearSavedSettings();

  messageEl.classList.remove("error");
  messageEl.textContent =
    "Saved profile cleared from this device. Current values will stay until you leave or reset.";
}

function loadSavedSettings() {
  let saved = localStorage.getItem(STORAGE_KEY);

  if (!saved && Array.isArray(LEGACY_STORAGE_KEYS)) {
    for (const key of LEGACY_STORAGE_KEYS) {
      saved = localStorage.getItem(key);

      if (saved) {
        break;
      }
    }
  }

  if (!saved) {
    return false;
  }

  try {
    isLoadingSavedSettings = true;

    const data = JSON.parse(saved);
    const selectedCategories = Array.isArray(data.selectedCategories) && data.selectedCategories.length > 0
      ? data.selectedCategories
      : ["vacation"];

    setCategorySelection(selectedCategories);

    payPeriodInput.value = data.payPeriod || "biweekly";
    targetDateInput.value = data.targetDate || "";
    hoursPerDayInput.value = data.hoursPerDay || "";

    policyResetDateInput.value = data.policyResetDate || "";
    carryoverLimitInput.value = data.carryoverLimit || "";
    useItOrLoseItInput.checked = Boolean(data.useItOrLoseIt);
    policyNotesInput.value = data.policyNotes || "";

    if (data.categoryValues && typeof data.categoryValues === "object") {
      selectedCategories.forEach((categoryId) => {
        const values = data.categoryValues[categoryId];

        if (!values || !getCategoryField(categoryId, "currentBalance")) {
          return;
        }

        getCategoryField(categoryId, "currentBalance").value = values.currentBalance || "";
        getCategoryField(categoryId, "accrualPerPeriod").value = values.accrualPerPeriod || "";
        getCategoryField(categoryId, "plannedUsage").value = values.plannedUsage || "";
        getCategoryField(categoryId, "averageUsage").value = values.averageUsage || "";
        getCategoryField(categoryId, "ptoCap").value = values.ptoCap || "";
      });
    }

    plannedEvents = Array.isArray(data.plannedEvents)
      ? data.plannedEvents.filter((event) => selectedCategories.includes(event.categoryId))
      : [];

    syncEventCategoryOptions();

    if (data.eventCategory && selectedCategories.includes(data.eventCategory)) {
      eventCategoryInput.value = data.eventCategory;
    }

    eventNameInput.value = data.eventName || "";
    eventDateInput.value = data.eventDate || "";
    eventHoursInput.value = data.eventHours || "";

    renderPlanningEvents();

    if (data.optionalSections) {
      if (document.getElementById("planningModeEnabled")) {
        document.getElementById("planningModeEnabled").checked = data.optionalSections.planningMode !== false;
      }

      if (document.getElementById("policyHelpersEnabled")) {
        document.getElementById("policyHelpersEnabled").checked = data.optionalSections.policyHelpers !== false;
      }
    }

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
  card.className = "card step-card timeoff-category-card collapsible-card mobile-collapsed";
  card.dataset.categoryCard = category.id;
  card.setAttribute("data-collapse-card", "");

  card.innerHTML = `
    <div class="category-card-heading section-title">
      <div>
        <h3>${category.label}</h3>
        <p>Enter balance, accrual, cap, and expected usage for this category.</p>
      </div>

      <button
        class="collapse-toggle"
        type="button"
        aria-expanded="false">
        Show
      </button>
    </div>

    <div class="card-collapse-content">

    <div class="form-grid">
      <label>
        <span>Current Balance</span>
        <input id="${category.id}-currentBalance" type="number" placeholder="${category.placeholderBalance}" min="0" step="0.01">
      </label>

      <label>
        <span>Earned Per Period</span>
        <input id="${category.id}-accrualPerPeriod" type="number" placeholder="${category.placeholderAccrual}" min="0" step="0.01">
      </label>

      <label>
        <span>Quick Planned Usage</span>
        <input id="${category.id}-plannedUsage" type="number" placeholder="0" min="0" step="1">
      </label>

      <label>
        <span>Average Used<br><small>Per Period (Optional)</small></span>
        <input id="${category.id}-averageUsage" type="number" placeholder="0" min="0" step="0.01">
      </label>

      <label>
        <span>Cap<br><small>(Optional)</small></span>
        <input id="${category.id}-ptoCap" type="number" placeholder="${category.placeholderCap}" min="0" step="0.01">
      </label>
    </div>

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
    setupSingleCollapsibleCard(card);
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
  clearSavedSettings();
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

function clearWarningResults() {
  warningResultsEl.innerHTML = "";

  const empty = document.createElement("p");
  empty.className = "empty-results";
  empty.textContent = "Warnings and policy notes will appear after calculation.";

  warningResultsEl.appendChild(empty);
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
  clearWarningResults();
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

  const capLoss = hasCap ? Math.max(uncappedProjection - values.ptoCap, 0) : 0;
  const plannedShortfall = Math.max(used - values.currentBalance - earned, 0);
  const netAccrualPerPeriod = values.accrualPerPeriod - values.averageUsage;

  return {
    id: categoryId,
    label: config ? config.label : categoryId,
    values,
    earned,
    recurringUsage,
    eventUsage,
    used,
    uncappedProjection,
    projectedBalance,
    hasCap,
    capLoss,
    plannedShortfall,
    netAccrualPerPeriod,
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

function addWarning(warnings, level, title, detail) {
  warnings.push({
    level,
    title,
    detail
  });
}

function buildWarnings(categoryProjections, targetDate) {
  const warnings = [];
  const resetDate = parseDateValue(policyResetDateInput.value);
  const carryoverLimit = getInputValue(carryoverLimitInput);
  const policyNotes = policyNotesInput.value.trim();

  categoryProjections.forEach((projection) => {
    if (projection.capLoss > 0) {
      addWarning(
        warnings,
        "warning",
        `${projection.label}: possible cap loss`,
        `Projected earned time may exceed the ${formatNumber(projection.values.ptoCap)} hr cap by ${formatNumber(projection.capLoss)} hrs.`
      );
    }

    if (projection.plannedShortfall > 0) {
      addWarning(
        warnings,
        "danger",
        `${projection.label}: planned usage may exceed balance`,
        `Usage is projected to run ${formatNumber(projection.plannedShortfall)} hrs beyond current balance plus earned time.`
      );
    }

    if (projection.netAccrualPerPeriod < 0) {
      addWarning(
        warnings,
        "warning",
        `${projection.label}: usage is higher than accrual`,
        `Average usage is ${formatNumber(Math.abs(projection.netAccrualPerPeriod))} hrs more than earned each pay period.`
      );
    }

    if (projection.hasCap && projection.values.currentBalance >= projection.values.ptoCap) {
      addWarning(
        warnings,
        "danger",
        `${projection.label}: already at or above cap`,
        "Additional earned time may be lost unless your employer allows exceptions or carryover."
      );
    }
  });

  if (useItOrLoseItInput.checked) {
    addWarning(
      warnings,
      "info",
      "Use-it-or-lose-it reminder",
      "Confirm your employer's deadline, carryover rules, payout rules, and whether each selected category resets separately."
    );
  }

  if (carryoverLimit > 0) {
    const combinedProjectedBalance = categoryProjections.reduce((sum, projection) => sum + projection.projectedBalance, 0);

    if (combinedProjectedBalance > carryoverLimit) {
      addWarning(
        warnings,
        "warning",
        "Carryover limit reminder",
        `Combined projected balance is ${formatNumber(combinedProjectedBalance)} hrs, which is above the entered carryover limit of ${formatNumber(carryoverLimit)} hrs.`
      );
    } else {
      addWarning(
        warnings,
        "info",
        "Carryover limit checked",
        `Combined projected balance is below the entered carryover limit of ${formatNumber(carryoverLimit)} hrs.`
      );
    }
  }

  if (resetDate && !Number.isNaN(resetDate.getTime())) {
    if (targetDate && resetDate <= targetDate) {
      addWarning(
        warnings,
        "warning",
        "Reset date occurs before target date",
        `The entered reset/carryover date (${formatDate(resetDate)}) is before or on the target date. Confirm whether balances reset before relying on this projection.`
      );
    } else {
      addWarning(
        warnings,
        "info",
        "Reset date noted",
        `Reset/carryover date saved for reference: ${formatDate(resetDate)}.`
      );
    }
  }

  if (policyNotes) {
    addWarning(
      warnings,
      "info",
      "Policy note",
      policyNotes
    );
  }

  if (warnings.length === 0) {
    addWarning(
      warnings,
      "good",
      "No major warnings found",
      "Based on the values entered, no cap loss, shortfall, or policy reminder was triggered. Still confirm actual employer rules."
    );
  }

  return warnings;
}

function renderWarningResults(warnings) {
  warningResultsEl.innerHTML = "";

  warnings.forEach((warning) => {
    const row = document.createElement("div");
    row.className = `warning-result ${warning.level}`;

    row.innerHTML = `
      <strong>${warning.title}</strong>
      <span>${warning.detail}</span>
    `;

    warningResultsEl.appendChild(row);
  });
}

function calculateTimeOff() {
  const optionalSettings = getOptionalSectionSettings();
  saveSettings();

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
  renderWarningResults(buildWarnings(categoryProjections, targetDate));

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
  policyResetDateInput.value = addDays(new Date(), 180).toISOString().slice(0, 10);
  carryoverLimitInput.value = "120";
  useItOrLoseItInput.checked = true;
  policyNotesInput.value = "Example only: confirm actual carryover, reset, and payout rules with your employer.";

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
      <title>${escapeReportHtml(title)}</title>
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

function buildTimeOffResultsSummary() {
  const optionalSettings = getOptionalSectionSettings();
  const lines = [];

  lines.push("Signal Labs Time Off Calculator");
  lines.push("Share & Export Prep Summary");
  lines.push("");
  lines.push(`Generated: ${getCurrentUtcTime()}`);
  lines.push("");
  lines.push("Projection");
  lines.push(`Target Date: ${targetDateInput.value || "Not set"}`);
  lines.push(`Pay Period: ${payPeriodInput.value}`);
  lines.push(`Hours Per Day: ${hoursPerDayInput.value || "Not set"}`);
  lines.push("");
  lines.push("Combined Totals");
  lines.push(`Projected Hours: ${getTextFromAnyElement(["combinedProjectedHours", "projectedBalance"], "--")}`);
  lines.push(`Projected Days: ${getTextFromAnyElement(["combinedProjectedDays", "projectedDays"], "--")}`);
  lines.push(`Projected Weeks: ${getTextFromAnyElement(["combinedProjectedWeeks", "projectedWeeks"], "--")}`);
  lines.push(`Projected Cap Status: ${getTextFromAnyElement(["combinedCapStatus"], "--")}`);
  lines.push("");
  lines.push("Category Results");
  collectListText("categoryResults").forEach((line) => lines.push(`- ${line}`));
  lines.push("");
  if (optionalSettings.planningMode) {
    lines.push("Planned Event Impact");
    collectListText("plannedEventResults").forEach((line) => lines.push(`- ${line}`));
    lines.push("");
  }

  if (optionalSettings.policyHelpers) {
    lines.push("Warnings & Policy Notes");
    collectListText("warningResults").forEach((line) => lines.push(`- ${line}`));
  }

  return lines.join("\n");
}

async function copyTimeOffResults() {
  const summary = buildTimeOffResultsSummary();

  try {
    await navigator.clipboard.writeText(summary);
    messageEl.classList.remove("error");
    messageEl.textContent = "Results copied to clipboard.";
  } catch (error) {
    messageEl.classList.add("error");
    messageEl.textContent = "Unable to copy results in this browser.";
  }
}



function getTextFromAnyElement(ids, fallback = "--") {
  for (const id of ids) {
    const node = document.getElementById(id);

    if (node && node.textContent.trim()) {
      return node.textContent.trim();
    }
  }

  return fallback;
}

function buildTimeOffProfessionalReportHtml() {
  calculateTimeOff();
  const optionalSettings = getOptionalSectionSettings();

  const generated = getCurrentUtcTime();
  const targetDate = targetDateInput.value || "--";
  const hoursPerDay = getInputValue(hoursPerDayInput) || 8;
  const selectedCategoryLabels = getSelectedCategoryIds().map((id) => categoryConfig[id].label);
  const categoryRows = collectCategoryReportRows();
  const plannedRows = collectPlannedEventReportRows();

  const categoryTableRows = categoryRows.length
    ? categoryRows.map((row) => `
      <tr>
        <td>${escapeReportHtml(row.category)}</td>
        <td class="value">${escapeReportHtml(row.current)}</td>
        <td class="value">${escapeReportHtml(row.earned)}</td>
        <td class="value">${escapeReportHtml(row.used)}</td>
        <td class="value">${escapeReportHtml(row.projected)}</td>
        <td class="value">${escapeReportHtml(row.cap)}</td>
        <td>${escapeReportHtml(row.status)}</td>
      </tr>
    `).join("")
    : `<tr><td colspan="7">No category results available.</td></tr>`;

  const plannedTableRows = plannedRows.length
    ? plannedRows.map((row) => `
      <tr>
        <td>${escapeReportHtml(row.date)}</td>
        <td>${escapeReportHtml(row.name)}</td>
        <td>${escapeReportHtml(row.category)}</td>
        <td class="value">${escapeReportHtml(row.hours)}</td>
        <td>${escapeReportHtml(row.notes)}</td>
      </tr>
    `).join("")
    : `<tr><td colspan="5">No planned events added.</td></tr>`;

  const warnings = collectListText("warningResults")
    .map((line) => `<li>${escapeReportHtml(line)}</li>`)
    .join("");

  return `
    <main class="report-page">
      <header class="report-header">
        <div class="brand">
          <div class="brand-mark">SL</div>
          <div>
            <div class="brand-title">SIGNAL LABS</div>
            <div class="report-title">Time Off Calculator</div>
          </div>
        </div>

        <div class="report-meta">
          <div><strong>Generated:</strong> ${escapeReportHtml(generated)}</div>
          <div><strong>Build:</strong> v0.9.7</div>
          <div><strong>Theme:</strong> Professional Reports</div>
          <div><strong>Status:</strong> Active Development</div>
        </div>
      </header>

      <section class="grid-2">
        <div>
          <h2>Projection Summary</h2>
          <dl class="summary-list">
            <dt>Target Date</dt><dd>${escapeReportHtml(targetDate)}</dd>
            <dt>Pay Period</dt><dd>${escapeReportHtml(payPeriodInput.value)}</dd>
            <dt>Hours Per Day</dt><dd>${escapeReportHtml(formatNumber(hoursPerDay))}</dd>
            <dt>Pay Periods Until Target</dt><dd>${escapeReportHtml(getTextFromAnyElement(["periodsUntilTarget"], "--"))}</dd>
            <dt>Selected Categories</dt><dd>${escapeReportHtml(selectedCategoryLabels.length ? selectedCategoryLabels.join(", ") : "None")}</dd>
          </dl>
        </div>

        <div>
          <h2>Combined Totals</h2>
          <table>
            <tbody>
              <tr><td>Projected Time Off Balance</td><td class="value">${escapeReportHtml(getTextFromAnyElement(["combinedProjectedHours", "projectedBalance"], "--"))}</td></tr>
              <tr><td>Projected Days</td><td class="value">${escapeReportHtml(getTextFromAnyElement(["combinedProjectedDays", "projectedDays"], "--"))}</td></tr>
              <tr><td>Projected Weeks</td><td class="value">${escapeReportHtml(getTextFromAnyElement(["combinedProjectedWeeks", "projectedWeeks"], "--"))}</td></tr>
              <tr><td>Total Earned</td><td class="value">${escapeReportHtml(getTextFromAnyElement(["combinedEarned", "earnedHours"], "--"))}</td></tr>
              <tr><td>Total Used</td><td class="value">${escapeReportHtml(getTextFromAnyElement(["combinedUsed", "usedHours"], "--"))}</td></tr>
            </tbody>
          </table>

          <h2>Combined Cap Status</h2>
          <table>
            <tbody>
              <tr><td>Combined Cap</td><td class="value">${escapeReportHtml(getTextFromAnyElement(["combinedCap"], "--"))}</td></tr>
              <tr><td>Hours Until Combined Cap</td><td class="value">${escapeReportHtml(getTextFromAnyElement(["combinedUntilCap"], "--"))}</td></tr>
              <tr class="success"><td>Status</td><td class="value">${escapeReportHtml(getTextFromAnyElement(["combinedCapStatus"], "--"))}</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2>Category Results</h2>
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th class="value">Current</th>
              <th class="value">Earned</th>
              <th class="value">Used</th>
              <th class="value">Projected</th>
              <th class="value">Cap</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${categoryTableRows}
          </tbody>
        </table>
      </section>

      ${optionalSettings.planningMode ? `
      <section>
        <h2>Planned Events</h2>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Event Name</th>
              <th>Category</th>
              <th class="value">Hours Used</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            ${plannedTableRows}
          </tbody>
        </table>
      </section>` : ""}

      ${optionalSettings.policyHelpers ? `
      <section>
        <h2>Warnings & Policy Notes</h2>
        <ul class="notes">
          ${warnings || "<li>No warnings or policy notes.</li>"}
        </ul>
      </section>` : ""}

      <footer class="footer">
        <div>Estimates only. Actual time off may vary based on employer policy, accrual rules, caps, holidays, unpaid leave, and payroll timing.</div>
        <div><strong>Signal Labs</strong> • Time Off Planner • v0.9.7</div>
      </footer>
    </main>
  `;
}

function collectCategoryReportRows() {
  const rows = [];
  const selectedIds = getSelectedCategoryIds();
  const data = calculateCategoryData();

  selectedIds.forEach((categoryId) => {
    const category = categoryConfig[categoryId];
    const row = data[categoryId];

    if (!category || !row) {
      return;
    }

    rows.push({
      category: category.label,
      current: `${formatNumber(row.currentBalance)} hrs`,
      earned: `${formatNumber(row.earned)} hrs`,
      used: `${formatNumber(row.totalUsed)} hrs`,
      projected: `${formatNumber(row.projectedBalance)} hrs`,
      cap: row.cap > 0 ? `${formatNumber(row.cap)} hrs` : "None",
      status: row.cap > 0 ? row.capStatus : "No Cap"
    });
  });

  return rows;
}

function collectPlannedEventReportRows() {
  return planningEvents.map((event) => {
    const category = categoryConfig[event.categoryId];

    return {
      date: event.date || "--",
      name: event.name || "Planned Event",
      category: category ? category.label : event.categoryId,
      hours: `${formatNumber(event.hours)} hrs`,
      notes: event.hours > 0 ? `${formatNumber(event.hours / (getInputValue(hoursPerDayInput) || 8))} days` : ""
    };
  });
}

function printTimeOffResults() {
  const reportHtml = buildTimeOffProfessionalReportHtml();
  const opened = openProfessionalReportWindow(reportHtml, "Time Off Calculator Report");

  if (!opened) {
    messageEl.classList.add("error");
    messageEl.textContent = "Unable to open the print report window. Try allowing popups for this site, then press Print Report again.";
  }
}


function clearCalculator() {
  setCategorySelection(["vacation"]);

  payPeriodInput.value = "biweekly";
  targetDateInput.value = "";
  hoursPerDayInput.value = "";
  policyResetDateInput.value = "";
  carryoverLimitInput.value = "";
  useItOrLoseItInput.checked = false;
  policyNotesInput.value = "";

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
  hoursPerDayInput,
  policyResetDateInput,
  carryoverLimitInput,
  useItOrLoseItInput,
  policyNotesInput
].forEach((input) => {
  input.addEventListener("input", calculateTimeOff);
  input.addEventListener("change", calculateTimeOff);
});

document.getElementById("calculate").addEventListener("click", calculateTimeOff);
document.getElementById("example").addEventListener("click", loadExample);
document.getElementById("reset").addEventListener("click", clearCalculator);

if (clearSavedProfileButton) {
  clearSavedProfileButton.addEventListener("click", clearSavedProfile);
}
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


function initializeTimeOffReportButtons() {
  const copyButton = document.getElementById("copyResults");
  const printButton = document.getElementById("printResults");

  if (copyButton) {
    copyButton.addEventListener("click", copyTimeOffResults);
  }

  if (printButton) {
    printButton.addEventListener("click", printTimeOffResults);
  }
}

initializeTimeOffReportButtons();

const loadedSavedSettings = loadSavedSettings();

if (!loadedSavedSettings) {
  renderCategoryCards();
  syncEventCategoryOptions();
  renderPlanningEvents();
  setupOptionalSectionToggles();
  setupMobileCollapsibleCards();
  setupMobileResultSections();
  resetResults();
} else {
  setupMobileCollapsibleCards();
  setupMobileResultSections();
  calculateTimeOff();
  saveSettings();

  messageEl.classList.remove("error");
  messageEl.textContent = "Welcome back. Previous time off values and layout restored.";
}



function initializeOptionalToggleSystem() {
  setupOptionalSectionToggles();
  applyOptionalSectionVisibility();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeOptionalToggleSystem);
} else {
  initializeOptionalToggleSystem();
}



function renderCategoryPills() {
  const container = document.getElementById("categoryPillOptions");
  const hiddenOptions = document.getElementById("categoryOptions");
  if (!container || !hiddenOptions) return;

  const prettyLabels = {
    vacation: "Vacation",
    sick: "Sick",
    personal: "Personal",
    comp: "Comp Time",
    compTime: "Comp Time",
    "comp-time": "Comp Time",
    "comp time": "Comp Time",
    holiday: "Holiday",
    floatingHoliday: "Floating Holiday",
    floating: "Floating Holiday",
    "floating holiday": "Floating Holiday",
    custom: "Custom"
  };

  const checkboxes = Array.from(hiddenOptions.querySelectorAll("input[type='checkbox']"));
  container.innerHTML = "";

  checkboxes.forEach((checkbox) => {
    const raw = checkbox.value || checkbox.dataset.category || checkbox.name || "Category";
    const key = String(raw).trim();
    const compactKey = key.replace(/\s+/g, "");
    const labelText = prettyLabels[key] || prettyLabels[key.toLowerCase()] || prettyLabels[compactKey] || key.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/\b\w/g, (letter) => letter.toUpperCase());

    const pill = document.createElement("button");
    pill.type = "button";
    pill.className = "category-pill" + (checkbox.checked ? " is-selected" : "");
    pill.dataset.category = key;
    pill.innerHTML = `<span class="pill-check">${checkbox.checked ? "✓" : ""}</span><span class="pill-label" title="${labelText}">${labelText}</span>`;

    pill.addEventListener("click", () => {
      checkbox.checked = !checkbox.checked;
      checkbox.dispatchEvent(new Event("change", { bubbles: true }));
      renderCategoryPills();
      if (typeof calculateTimeOff === "function") calculateTimeOff();
      if (typeof saveSettings === "function") saveSettings();
    });

    container.appendChild(pill);
  });
}

function setupCustomCategoryPill() {
  const input = document.getElementById("customCategoryName");
  const button = document.getElementById("addCustomCategoryPill");
  const hiddenOptions = document.getElementById("categoryOptions");
  if (!input || !button || !hiddenOptions || button.dataset.bound === "true") return;

  button.dataset.bound = "true";
  button.addEventListener("click", () => {
    const name = input.value.trim().slice(0, 18);
    if (!name) return;

    const exists = Array.from(hiddenOptions.querySelectorAll("input[type='checkbox']")).some((checkbox) => {
      return (checkbox.value || "").toLowerCase() === name.toLowerCase();
    });

    if (!exists) {
      const label = document.createElement("label");
      label.className = "hidden-by-ui-identity";
      label.innerHTML = `<input type="checkbox" value="${name}" checked> ${name}`;
      hiddenOptions.appendChild(label);
    }

    input.value = "";
    renderCategoryPills();
    if (typeof calculateTimeOff === "function") calculateTimeOff();
    if (typeof saveSettings === "function") saveSettings();
  });
}

function setupQuickHourPills() {
  const eventHours = document.getElementById("eventHours");
  const pills = document.querySelectorAll("#quickHourPills .quick-hour-pill");
  if (!eventHours || !pills.length) return;

  pills.forEach((pill) => {
    if (pill.dataset.bound === "true") return;
    pill.dataset.bound = "true";
    pill.addEventListener("click", () => {
      const value = pill.dataset.hours;
      pills.forEach((item) => item.classList.remove("is-selected"));
      pill.classList.add("is-selected");
      if (value !== "custom") {
        eventHours.value = value;
        eventHours.dispatchEvent(new Event("input", { bubbles: true }));
      } else {
        eventHours.focus();
      }
      if (typeof saveSettings === "function") saveSettings();
    });
  });
}

function setupPolicyTypePills() {
  const useIt = document.getElementById("useItOrLoseIt");
  const pills = document.querySelectorAll("#policyTypePills .policy-pill");
  if (!useIt || !pills.length) return;

  function sync(type) {
    useIt.checked = type === "useItOrLoseIt";
    pills.forEach((pill) => pill.classList.toggle("is-selected", pill.dataset.policyType === type));
    if (typeof calculateTimeOff === "function") calculateTimeOff();
    if (typeof saveSettings === "function") saveSettings();
  }

  pills.forEach((pill) => {
    if (pill.dataset.bound === "true") return;
    pill.dataset.bound = "true";
    pill.addEventListener("click", () => sync(pill.dataset.policyType));
  });

  sync(useIt.checked ? "useItOrLoseIt" : "standard");
}

function setupPolicyNotesExpansion() {
  const button = document.getElementById("togglePolicyNotes");
  const wrap = document.getElementById("policyNotesWrap");
  if (!button || !wrap || button.dataset.bound === "true") return;

  button.dataset.bound = "true";
  button.addEventListener("click", () => {
    const isHidden = wrap.classList.toggle("hidden-by-ui-identity");
    button.textContent = isHidden ? "+ Add Policy Notes" : "Hide Policy Notes";
  });
}

function renderPlannedEventChips() {
  const chipContainer = document.getElementById("plannedEventChips");
  const list = document.getElementById("plannedEventsList");
  if (!chipContainer || !list) return;

  chipContainer.innerHTML = "";
  const items = Array.from(list.querySelectorAll("li, .planned-event-item, [data-event-index]"));

  items.forEach((item) => {
    const text = item.textContent.replace(/\s+/g, " ").trim();
    if (!text) return;
    const chip = document.createElement("span");
    chip.className = "event-chip";
    chip.innerHTML = `<span class="chip-label" title="${text}">${text.slice(0, 54)}</span>`;
    chipContainer.appendChild(chip);
  });
}

function initializeTimeOffUiIdentity() {
  renderCategoryPills();
  setupCustomCategoryPill();
  setupQuickHourPills();
  setupPolicyTypePills();
  setupPolicyNotesExpansion();
  renderPlannedEventChips();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeTimeOffUiIdentity);
} else {
  initializeTimeOffUiIdentity();
}



function initializePlannerIdentity() {
  const summary = document.getElementById("plannerPlainSummary");
  if (!summary) return;

  const resultText = document.body.innerText || "";
  const hasPlanned = !/No planned events added/i.test(resultText);
  const hasProjection = /projected|remaining|available|balance/i.test(resultText);

  if (hasProjection) {
    summary.innerHTML = `
      <strong>Planner Summary</strong>
      <p>Your projection updates as you enter balances, accrual rules, and planned time off. Use the results below to see what you may have available and whether any hours may be at risk.</p>
    `;
  }

  document.querySelectorAll(".result-row").forEach((row) => {
    if (row.dataset.plannerExplainerAdded === "true") return;
    const label = (row.textContent || "").toLowerCase();
    let text = "";

    if (label.includes("projected") || label.includes("remaining")) {
      text = "Current hours + expected accrual - planned usage.";
    } else if (label.includes("planned")) {
      text = "Future time off that reduces your projected balance.";
    } else if (label.includes("carryover") || label.includes("lose") || label.includes("risk")) {
      text = "Hours that may be affected by reset or carryover rules.";
    }

    if (text) {
      row.dataset.plannerExplainerAdded = "true";
      const explainer = document.createElement("span");
      explainer.className = "result-explainer";
      explainer.textContent = text;
      row.appendChild(explainer);
    }
  });
}

function setupPlannerPresets() {
  const pills = document.querySelectorAll("#plannerPresetPills .planner-preset-pill");
  if (!pills.length) return;

  pills.forEach((pill) => {
    if (pill.dataset.bound === "true") return;
    pill.dataset.bound = "true";

    pill.addEventListener("click", () => {
      pills.forEach((item) => item.classList.remove("is-selected"));
      pill.classList.add("is-selected");

      const preset = pill.dataset.preset;
      if (preset === "standard") {
        document.querySelectorAll("#categoryOptions input[type='checkbox']").forEach((input) => {
          input.checked = ["vacation", "sick", "personal"].includes(String(input.value || input.name).toLowerCase());
        });
      } else if (preset === "vacationSick") {
        document.querySelectorAll("#categoryOptions input[type='checkbox']").forEach((input) => {
          input.checked = ["vacation", "sick"].includes(String(input.value || input.name).toLowerCase());
        });
      } else if (preset === "publicSafety") {
        document.querySelectorAll("#categoryOptions input[type='checkbox']").forEach((input) => {
          const value = String(input.value || input.name).toLowerCase();
          input.checked = ["vacation", "sick", "personal", "comp", "comptime", "holiday"].includes(value);
        });
      }

      if (typeof renderCategoryPills === "function") renderCategoryPills();
      if (typeof calculateTimeOff === "function") calculateTimeOff();
      if (typeof saveSettings === "function") saveSettings();
    });
  });
}

function initializeTimeOffPlannerOverhaul() {
  initializePlannerIdentity();
  setupPlannerPresets();
  document.addEventListener("click", () => setTimeout(initializePlannerIdentity, 60));
  document.addEventListener("input", () => setTimeout(initializePlannerIdentity, 60));
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeTimeOffPlannerOverhaul);
} else {
  initializeTimeOffPlannerOverhaul();
}
