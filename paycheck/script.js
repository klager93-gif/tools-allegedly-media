/*
Signal Labs
Tool: Paycheck Calculator
File: script.js
Version: v1.0.4
Purpose: Restores Paycheck Calculator behavior after missing asset regression.
*/

(() => {
  "use strict";

  const $ = (id) => document.getElementById(id);
  const moneyIds = [
    "grossPayResult",
    "regularPayResult",
    "premiumPayResult",
    "shiftDifferentialPayResult",
    "benefitPayResult",
    "otherEarningsResult",
    "specialtyPayResult",
    "taxesResult",
    "deductionsResult",
    "otherAdjustmentsResult",
    "takeHomeResult",
    "effectiveRateResult"
  ];

  const state = {
    premiumHours: [],
    benefitHours: [],
    otherEarnings: [],
    specialtyPay: [],
    taxes: [],
    deductions: [],
    otherAdjustments: [],
    adjustmentTarget: "taxes",
    adjustmentAmountType: "percent"
  };

  const premiumPresets = [
    { label: "Overtime", multiplier: 1.5 },
    { label: "Double Time", multiplier: 2 },
    { label: "Holiday Premium", multiplier: 1.5 },
    { label: "On-call", multiplier: 1 },
    { label: "Standby", multiplier: 1 },
    { label: "Custom Premium", multiplier: 1.5 }
  ];

  const benefitPresets = [
    "Vacation",
    "Sick",
    "Holiday",
    "Comp Time",
    "Personal",
    "Bereavement",
    "Custom Leave"
  ];

  const earningPresets = [
    { label: "Bonus", amount: 100 },
    { label: "Mileage", amount: 25 },
    { label: "Reimbursement", amount: 50 },
    { label: "Custom Earning", amount: 0 }
  ];

  const specialtyPresets = [
    { label: "FTO", amount: 50 },
    { label: "Longevity", amount: 75 },
    { label: "Certification", amount: 100 },
    { label: "Custom Specialty", amount: 0 }
  ];

  const adjustmentSuggestions = {
    taxes: [
      { label: "Federal Tax", amount: 12, type: "percent" },
      { label: "State Tax", amount: 4.95, type: "percent" },
      { label: "Social Security", amount: 6.2, type: "percent" },
      { label: "Medicare", amount: 1.45, type: "percent" }
    ],
    deductions: [
      { label: "Retirement", amount: 7, type: "percent" },
      { label: "Health Insurance", amount: 125, type: "static" },
      { label: "Union Dues", amount: 25, type: "static" }
    ],
    otherAdjustments: [
      { label: "Garnishment", amount: 50, type: "static" },
      { label: "Post-tax Savings", amount: 5, type: "percent" },
      { label: "Custom Adjustment", amount: 0, type: "static" }
    ]
  };

  function numberValue(id, fallback = 0) {
    const el = $(id);
    if (!el) return fallback;
    const value = Number.parseFloat(el.value);
    return Number.isFinite(value) ? value : fallback;
  }

  function setValue(id, value) {
    const el = $(id);
    if (el) el.value = value;
  }

  function currencySymbol() {
    const select = $("currencyInput");
    const selected = select?.selectedOptions?.[0]?.textContent || "USD ($)";
    const match = selected.match(/\(([^)]+)\)/);
    return match ? match[1] : "$";
  }

  function formatMoney(value) {
    const symbol = currencySymbol();
    const sign = value < 0 ? "-" : "";
    return `${sign}${symbol}${Math.abs(value).toFixed(2)}`;
  }

  function setMoney(id, value) {
    const el = $(id);
    if (el) el.textContent = formatMoney(value);
  }

  function setRowVisible(rowName, visible) {
    const row = document.querySelector(`[data-result-row="${rowName}"]`);
    if (row) row.classList.toggle("is-hidden", !visible);
  }

  function makePill(label, onClick) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "pay-pill";
    button.textContent = label;
    button.addEventListener("click", onClick);
    return button;
  }

  function makeField(label, input) {
    const wrapper = document.createElement("label");
    const span = document.createElement("span");
    span.textContent = label;
    wrapper.append(span, input);
    return wrapper;
  }

  function makeInput(value, attrs = {}) {
    const input = document.createElement("input");
    input.type = attrs.type || "number";
    input.step = attrs.step || "0.01";
    input.min = attrs.min || "0";
    input.value = value ?? "";
    if (attrs.placeholder) input.placeholder = attrs.placeholder;
    input.addEventListener("input", calculate);
    return input;
  }

  function removeFrom(collection, item) {
    const index = collection.indexOf(item);
    if (index >= 0) collection.splice(index, 1);
    renderDynamicLists();
    calculate();
  }

  function renderHourList(targetId, collection, mode) {
    const target = $(targetId);
    if (!target) return;
    target.innerHTML = "";
    if (!collection.length) {
      const empty = document.createElement("p");
      empty.className = "empty-state";
      empty.textContent = "No entries added yet.";
      target.append(empty);
      return;
    }

    collection.forEach((item) => {
      const row = document.createElement("div");
      row.className = "hour-row reduction-row";

      const labelInput = makeInput(item.label, { type: "text" });
      labelInput.addEventListener("input", () => { item.label = labelInput.value; });
      const hoursInput = makeInput(item.hours, { placeholder: "Hours" });
      hoursInput.addEventListener("input", () => { item.hours = Number.parseFloat(hoursInput.value) || 0; });

      row.append(
        makeField("Label", labelInput),
        makeField("Hours", hoursInput)
      );

      if (mode === "premium") {
        const multInput = makeInput(item.multiplier, { placeholder: "Multiplier" });
        multInput.addEventListener("input", () => { item.multiplier = Number.parseFloat(multInput.value) || 0; });
        row.append(makeField("Multiplier", multInput));
      } else {
        const rateLabel = document.createElement("div");
        rateLabel.className = "info-note";
        rateLabel.textContent = "Paid at hourly rate";
        row.append(rateLabel);
      }

      const remove = document.createElement("button");
      remove.type = "button";
      remove.className = "remove-row";
      remove.textContent = "Remove";
      remove.addEventListener("click", () => removeFrom(collection, item));
      row.append(remove);
      target.append(row);
    });
  }

  function renderEarningList(targetId, collection) {
    const target = $(targetId);
    if (!target) return;
    target.innerHTML = "";
    if (!collection.length) {
      const empty = document.createElement("p");
      empty.className = "empty-state";
      empty.textContent = "No entries added yet.";
      target.append(empty);
      return;
    }

    collection.forEach((item) => {
      const row = document.createElement("div");
      row.className = "earning-row";
      const labelInput = makeInput(item.label, { type: "text" });
      labelInput.addEventListener("input", () => { item.label = labelInput.value; });
      const amountInput = makeInput(item.amount, { placeholder: "Amount" });
      amountInput.addEventListener("input", () => { item.amount = Number.parseFloat(amountInput.value) || 0; });
      const remove = document.createElement("button");
      remove.type = "button";
      remove.className = "remove-row";
      remove.textContent = "Remove";
      remove.addEventListener("click", () => removeFrom(collection, item));
      row.append(makeField("Label", labelInput), makeField("Amount", amountInput), remove);
      target.append(row);
    });
  }

  function renderAdjustmentList(targetId, collection) {
    const target = $(targetId);
    if (!target) return;
    target.innerHTML = "";
    if (!collection.length) {
      const empty = document.createElement("p");
      empty.className = "empty-state";
      empty.textContent = "No entries added yet.";
      target.append(empty);
      return;
    }

    collection.forEach((item) => {
      const row = document.createElement("div");
      row.className = "adjustment-section";
      const labelInput = makeInput(item.label, { type: "text" });
      labelInput.addEventListener("input", () => { item.label = labelInput.value; });
      const amountInput = makeInput(item.amount, { placeholder: item.type === "percent" ? "Percent" : "Amount" });
      amountInput.addEventListener("input", () => { item.amount = Number.parseFloat(amountInput.value) || 0; });
      const type = document.createElement("select");
      ["percent", "static"].forEach((value) => {
        const option = document.createElement("option");
        option.value = value;
        option.textContent = value === "percent" ? "Percent" : "Static";
        option.selected = item.type === value;
        type.append(option);
      });
      type.addEventListener("change", () => { item.type = type.value; calculate(); });
      const remove = document.createElement("button");
      remove.type = "button";
      remove.className = "remove-row";
      remove.textContent = "Remove";
      remove.addEventListener("click", () => removeFrom(collection, item));
      row.append(makeField("Label", labelInput), makeField("Amount", amountInput), makeField("Type", type), remove);
      target.append(row);
    });
  }

  function renderDynamicLists() {
    renderHourList("premiumHourList", state.premiumHours, "premium");
    renderHourList("benefitHourList", state.benefitHours, "benefit");
    renderEarningList("otherEarningList", state.otherEarnings);
    renderEarningList("specialtyPayList", state.specialtyPay);
    renderAdjustmentList("taxList", state.taxes);
    renderAdjustmentList("deductionList", state.deductions);
    renderAdjustmentList("otherAdjustmentList", state.otherAdjustments);
  }

  function addPills() {
    const premium = $("premiumHourPills");
    premiumPresets.forEach((preset) => {
      premium?.append(makePill(preset.label, () => {
        state.premiumHours.push({ label: preset.label, hours: 0, multiplier: preset.multiplier });
        renderDynamicLists();
      }));
    });

    const benefit = $("benefitHourPills");
    benefitPresets.forEach((label) => {
      benefit?.append(makePill(label, () => {
        state.benefitHours.push({ label, hours: 0 });
        renderDynamicLists();
      }));
    });

    const other = $("otherEarningPills");
    earningPresets.forEach((preset) => {
      other?.append(makePill(preset.label, () => {
        state.otherEarnings.push({ label: preset.label, amount: preset.amount });
        renderDynamicLists();
        calculate();
      }));
    });

    const specialty = $("specialtyPayPills");
    specialtyPresets.forEach((preset) => {
      specialty?.append(makePill(preset.label, () => {
        state.specialtyPay.push({ label: preset.label, amount: preset.amount });
        renderDynamicLists();
        calculate();
      }));
    });
  }

  function selectedValue(hiddenInputId) {
    return $(hiddenInputId)?.value || "";
  }

  function updateProfileSummary(profile) {
    const copy = {
      hourly: ["Hourly profile selected.", "Weekly pay period, 40-hour overtime rule, and standard premium multipliers are ready to customize."],
      salary: ["Salary profile selected.", "Use the hourly equivalent or custom settings for estimates."],
      publicSafety: ["Public safety profile selected.", "Premiums, weekly splits, and benefit hours are ready for police, fire, corrections, dispatch, and EMS examples."],
      healthcare: ["Healthcare profile selected.", "Shift differential and premium defaults are ready to customize."],
      trades: ["Trades profile selected.", "Overtime and specialty earning examples are ready to customize."],
      weeklyOt: ["36/44 weekly OT profile selected.", "Week 1 / week 2 hours are used to calculate regular and overtime hours."],
      custom: ["Custom profile selected.", "Set the pay period, overtime rule, multipliers, and extras manually."]
    };
    const target = $("profileSummary");
    if (!target) return;
    const [title, body] = copy[profile] || copy.hourly;
    target.innerHTML = `<strong>${title}</strong><span>${body}</span>`;
  }

  function configurePills() {
    document.querySelectorAll(".pay-pill[data-profile]").forEach((button) => {
      button.addEventListener("click", () => {
        const profile = button.dataset.profile;
        $("payProfileInput").value = profile;
        document.querySelectorAll(".pay-pill[data-profile]").forEach((pill) => pill.classList.toggle("is-selected", pill === button));
        if (profile === "weeklyOt") {
          $("overtimeRuleInput").value = "weeklySplit";
          document.querySelectorAll(".pay-pill[data-value]").forEach((pill) => {
            if (["weeklySplit"].includes(pill.dataset.value)) pill.classList.add("is-selected");
          });
        }
        updateProfileSummary(profile);
        updateConditionalPanels();
        calculate();
      });
    });

    document.querySelectorAll(".pay-pill[data-value]").forEach((button) => {
      button.addEventListener("click", () => {
        const parent = button.closest(".pay-pill-row, .profile-pill-row, .hour-pill-row, .earning-pill-row, .amount-type-row, .advanced-pay-settings, .pay-period-panel, .overtime-rule-panel") || button.parentElement;
        parent?.querySelectorAll(".pay-pill[data-value]").forEach((pill) => pill.classList.remove("is-selected"));
        button.classList.add("is-selected");
        const value = button.dataset.value;
        const previousInput = parent?.previousElementSibling;
        if (parent?.closest(".pay-period-panel")) $("payPeriodInput").value = value;
        if (parent?.closest(".overtime-rule-panel")) $("overtimeRuleInput").value = value;
        if (parent?.closest(".advanced-pay-settings") && parent?.previousElementSibling?.id === "shiftDifferentialTypeInput") $("shiftDifferentialTypeInput").value = value;
        if (button.closest(".advanced-pay-settings") && ["none", "flat", "percent"].includes(value)) $("shiftDifferentialTypeInput").value = value;
        updateConditionalPanels();
        calculate();
      });
    });
  }

  function configureCollapsibles() {
    document.querySelectorAll(".section-collapse-toggle").forEach((button) => {
      const card = button.closest(".step-card");
      if (!card) return;
      const isExpanded = button.getAttribute("aria-expanded") !== "false";
      card.classList.toggle("is-collapsed", !isExpanded);
      button.textContent = isExpanded ? "Collapse" : "Expand";
      button.addEventListener("click", () => {
        const expanded = button.getAttribute("aria-expanded") !== "false";
        button.setAttribute("aria-expanded", String(!expanded));
        button.textContent = expanded ? "Expand" : "Collapse";
        card.classList.toggle("is-collapsed", expanded);
      });
    });
  }

  function updateConditionalPanels() {
    const rule = selectedValue("overtimeRuleInput");
    $("customOvertimePanel")?.classList.toggle("is-hidden", rule !== "custom");
    $("weeklyOvertimePanel")?.classList.toggle("is-hidden", rule !== "weeklySplit");
    $("regularHoursHelp").textContent = rule === "weeklySplit"
      ? "Weekly OT mode uses week 1 and week 2 hours below."
      : "Used for standard profiles. Weekly OT profiles calculate regular and overtime from week 1/week 2 hours.";
  }

  function adjustmentCollection() {
    if (state.adjustmentTarget === "deductions") return state.deductions;
    if (state.adjustmentTarget === "otherAdjustments") return state.otherAdjustments;
    return state.taxes;
  }

  function openAdjustmentModal(target) {
    state.adjustmentTarget = target;
    state.adjustmentAmountType = "percent";
    const titles = {
      taxes: ["Add Tax", "Add a percentage or static tax withholding."],
      deductions: ["Add Deduction", "Add insurance, retirement, dues, or other deductions."],
      otherAdjustments: ["Add Other Adjustment", "Add any other paycheck adjustment."]
    };
    const [title, description] = titles[target] || titles.taxes;
    $("adjustmentModalTitle").textContent = title;
    $("adjustmentModalDescription").textContent = description;
    $("adjustmentLabelInput").value = "";
    $("adjustmentAmountInput").value = "";
    $("adjustmentAmountLabel").textContent = "Percentage";
    $("amountTypePercent").classList.add("is-selected");
    $("amountTypeStatic").classList.remove("is-selected");

    const pills = $("adjustmentSuggestionPills");
    pills.innerHTML = "";
    (adjustmentSuggestions[target] || []).forEach((preset) => {
      pills.append(makePill(preset.label, () => {
        $("adjustmentLabelInput").value = preset.label;
        $("adjustmentAmountInput").value = preset.amount;
        state.adjustmentAmountType = preset.type;
        $("adjustmentAmountLabel").textContent = preset.type === "percent" ? "Percentage" : "Static Amount";
        $("amountTypePercent").classList.toggle("is-selected", preset.type === "percent");
        $("amountTypeStatic").classList.toggle("is-selected", preset.type === "static");
      }));
    });

    $("adjustmentModal").classList.remove("hidden");
  }

  function closeAdjustmentModal() {
    $("adjustmentModal")?.classList.add("hidden");
  }

  function configureModal() {
    $("addTax")?.addEventListener("click", () => openAdjustmentModal("taxes"));
    $("addDeduction")?.addEventListener("click", () => openAdjustmentModal("deductions"));
    $("addOtherAdjustment")?.addEventListener("click", () => openAdjustmentModal("otherAdjustments"));
    $("closeAdjustmentModal")?.addEventListener("click", closeAdjustmentModal);
    $("cancelAdjustment")?.addEventListener("click", closeAdjustmentModal);
    $("adjustmentModal")?.addEventListener("click", (event) => {
      if (event.target === $("adjustmentModal")) closeAdjustmentModal();
    });
    $("amountTypePercent")?.addEventListener("click", () => {
      state.adjustmentAmountType = "percent";
      $("amountTypePercent").classList.add("is-selected");
      $("amountTypeStatic").classList.remove("is-selected");
      $("adjustmentAmountLabel").textContent = "Percentage";
    });
    $("amountTypeStatic")?.addEventListener("click", () => {
      state.adjustmentAmountType = "static";
      $("amountTypeStatic").classList.add("is-selected");
      $("amountTypePercent").classList.remove("is-selected");
      $("adjustmentAmountLabel").textContent = "Static Amount";
    });
    $("confirmAdjustment")?.addEventListener("click", () => {
      const label = $("adjustmentLabelInput").value.trim() || "Adjustment";
      const amount = numberValue("adjustmentAmountInput", 0);
      adjustmentCollection().push({ label, amount, type: state.adjustmentAmountType });
      renderDynamicLists();
      calculate();
      closeAdjustmentModal();
    });
  }

  function calculateAdjustment(collection, basis) {
    return collection.reduce((sum, item) => {
      const amount = Number(item.amount) || 0;
      if (item.type === "percent") return sum + (basis * amount / 100);
      return sum + amount;
    }, 0);
  }

  function calculateHours() {
    const rule = selectedValue("overtimeRuleInput");
    const threshold = rule === "custom" ? numberValue("customOvertimeThresholdInput", 80) : (rule === "after40" ? 40 : 80);
    if (rule === "weeklySplit") {
      const thresholdWeekly = numberValue("weeklyOvertimeThresholdInput", 40);
      const w1 = numberValue("weekOneHoursInput", 0);
      const w2 = numberValue("weekTwoHoursInput", 0);
      const regular = Math.min(w1, thresholdWeekly) + Math.min(w2, thresholdWeekly);
      const overtime = Math.max(0, w1 - thresholdWeekly) + Math.max(0, w2 - thresholdWeekly);
      $("weeklyOvertimeBreakdown").innerHTML = `<strong>Weekly split:</strong><span>${regular.toFixed(2)} regular hrs / ${overtime.toFixed(2)} OT hrs</span>`;
      return { regular, overtime, total: w1 + w2 };
    }

    const total = numberValue("regularHoursInput", 0);
    if (rule === "manual") return { regular: total, overtime: 0, total };
    const regular = Math.min(total, threshold);
    const overtime = Math.max(0, total - threshold);
    return { regular, overtime, total };
  }

  function calculate() {
    const rate = numberValue("hourlyRateInput", 0);
    const hours = calculateHours();
    const otMultiplier = numberValue("overtimeMultiplierInput", 1.5);
    const regularPay = hours.regular * rate;
    const autoOvertimePay = hours.overtime * rate * otMultiplier;

    const premiumPay = autoOvertimePay + state.premiumHours.reduce((sum, item) => sum + ((Number(item.hours) || 0) * rate * (Number(item.multiplier) || 0)), 0);
    const benefitHours = state.benefitHours.reduce((sum, item) => sum + (Number(item.hours) || 0), 0);
    const benefitPay = benefitHours * rate;
    const otherEarnings = state.otherEarnings.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
    const specialtyPay = state.specialtyPay.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);

    let shiftPay = 0;
    const shiftType = selectedValue("shiftDifferentialTypeInput");
    const shiftAmount = numberValue("shiftDifferentialAmountInput", 0);
    const paidHours = hours.total + benefitHours + state.premiumHours.reduce((sum, item) => sum + (Number(item.hours) || 0), 0);
    if (shiftType === "flat") shiftPay = paidHours * shiftAmount;
    if (shiftType === "percent") shiftPay = regularPay * shiftAmount / 100;

    const gross = regularPay + premiumPay + shiftPay + benefitPay + otherEarnings + specialtyPay;
    const taxes = calculateAdjustment(state.taxes, gross);
    const deductions = calculateAdjustment(state.deductions, gross);
    const otherAdjustments = calculateAdjustment(state.otherAdjustments, gross);
    const takeHome = gross - taxes - deductions - otherAdjustments;
    const effectiveRate = paidHours > 0 ? takeHome / paidHours : 0;

    setMoney("grossPayResult", gross);
    setMoney("regularPayResult", regularPay);
    setMoney("premiumPayResult", premiumPay);
    setMoney("shiftDifferentialPayResult", shiftPay);
    setMoney("benefitPayResult", benefitPay);
    setMoney("otherEarningsResult", otherEarnings);
    setMoney("specialtyPayResult", specialtyPay);
    $("totalHoursResult").textContent = `${paidHours.toFixed(2)} hrs`;
    setMoney("taxesResult", -taxes);
    setMoney("deductionsResult", -deductions);
    setMoney("otherAdjustmentsResult", -otherAdjustments);
    setMoney("takeHomeResult", takeHome);
    setMoney("effectiveRateResult", effectiveRate);

    setRowVisible("regularPay", regularPay > 0);
    setRowVisible("premiumPay", premiumPay > 0);
    setRowVisible("shiftPay", shiftPay > 0);
    setRowVisible("benefitPay", benefitPay > 0);
    setRowVisible("otherEarnings", otherEarnings > 0);
    setRowVisible("specialtyPay", specialtyPay > 0);
    setRowVisible("totalHours", paidHours > 0);
    setRowVisible("taxes", taxes > 0);
    setRowVisible("deductions", deductions > 0);
    setRowVisible("otherAdjustments", otherAdjustments > 0);

    const message = $("message");
    if (message) message.textContent = gross > 0 ? "Estimate updated." : "Enter values or load an example to begin.";
  }

  function loadExample() {
    setValue("regularHoursInput", 80);
    setValue("hourlyRateInput", 31.25);
    $("payPeriodInput").value = "biweekly";
    state.premiumHours = [{ label: "Overtime", hours: 8, multiplier: 1.5 }];
    state.benefitHours = [{ label: "Vacation", hours: 8 }];
    state.otherEarnings = [{ label: "Uniform Allowance", amount: 35 }];
    state.specialtyPay = [{ label: "Certification", amount: 75 }];
    state.taxes = [
      { label: "Federal Tax", amount: 12, type: "percent" },
      { label: "State Tax", amount: 4.95, type: "percent" },
      { label: "Social Security", amount: 6.2, type: "percent" },
      { label: "Medicare", amount: 1.45, type: "percent" }
    ];
    state.deductions = [{ label: "Retirement", amount: 7, type: "percent" }];
    state.otherAdjustments = [];
    renderDynamicLists();
    calculate();
  }

  function resetAll() {
    ["regularHoursInput", "hourlyRateInput", "shiftDifferentialAmountInput", "customOvertimeThresholdInput", "weekOneHoursInput", "weekTwoHoursInput"].forEach((id) => setValue(id, ""));
    setValue("overtimeMultiplierInput", 1.5);
    setValue("doubleTimeMultiplierInput", 2);
    setValue("holidayPremiumMultiplierInput", 1.5);
    state.premiumHours = [];
    state.benefitHours = [];
    state.otherEarnings = [];
    state.specialtyPay = [];
    state.taxes = [];
    state.deductions = [];
    state.otherAdjustments = [];
    renderDynamicLists();
    calculate();
  }

  function saveSettings() {
    const payload = {
      regularHours: $("regularHoursInput")?.value || "",
      hourlyRate: $("hourlyRateInput")?.value || "",
      payPeriod: $("payPeriodInput")?.value || "",
      profile: $("payProfileInput")?.value || "",
      currency: $("currencyInput")?.value || ""
    };
    localStorage.setItem("signalPaycheckSettings", JSON.stringify(payload));
    const message = $("message");
    if (message) message.textContent = "Settings saved in this browser.";
  }

  function copyResults() {
    const lines = [
      "Signal Labs Paycheck Estimate",
      `Gross: ${$("grossPayResult")?.textContent || ""}`,
      `Taxes: ${$("taxesResult")?.textContent || ""}`,
      `Deductions: ${$("deductionsResult")?.textContent || ""}`,
      `Take-home: ${$("takeHomeResult")?.textContent || ""}`
    ];
    navigator.clipboard?.writeText(lines.join("\n")).then(() => {
      const message = $("message");
      if (message) message.textContent = "Results copied.";
    }).catch(() => {
      const message = $("message");
      if (message) message.textContent = "Copy unavailable in this browser.";
    });
  }

  function bindActions() {
    ["regularHoursInput", "hourlyRateInput", "currencyInput", "shiftDifferentialAmountInput", "customOvertimeThresholdInput", "weekOneHoursInput", "weekTwoHoursInput", "weeklyOvertimeThresholdInput", "overtimeMultiplierInput", "doubleTimeMultiplierInput", "holidayPremiumMultiplierInput"].forEach((id) => {
      $(id)?.addEventListener("input", calculate);
      $(id)?.addEventListener("change", calculate);
    });
    $("calculate")?.addEventListener("click", calculate);
    $("example")?.addEventListener("click", loadExample);
    $("reset")?.addEventListener("click", resetAll);
    $("saveSettings")?.addEventListener("click", saveSettings);
    $("copyResults")?.addEventListener("click", copyResults);
    $("printResults")?.addEventListener("click", () => window.print());
  }

  document.addEventListener("DOMContentLoaded", () => {
    addPills();
    configurePills();
    configureCollapsibles();
    configureModal();
    bindActions();
    updateConditionalPanels();
    renderDynamicLists();
    calculate();
  });
})();
