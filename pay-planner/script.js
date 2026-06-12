/*
Signal Labs
Tool: Pay Planner
File: script.js
Version: v0.1.0
Purpose: Minimal incubator calculation script for unlisted Pay Planner page.
*/
(function () {
  function money(value) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value || 0);
  }

  function numberValue(id) {
    var el = document.getElementById(id);
    if (!el) return 0;
    var value = parseFloat(el.value);
    return Number.isFinite(value) ? value : 0;
  }

  function setText(id, value) {
    var el = document.getElementById(id);
    if (el) el.textContent = value;
  }

  function calculate() {
    var target = numberValue('plannerTargetInput');
    var rate = numberValue('plannerRateInput');
    var multiplier = Math.max(numberValue('plannerMultiplierInput'), 1);
    var current = numberValue('plannerCurrentInput');
    var gap = Math.max(target - current, 0);
    var regularHours = rate > 0 ? gap / rate : 0;
    var overtimeRate = rate * multiplier;
    var overtimeHours = overtimeRate > 0 ? gap / overtimeRate : 0;

    setText('plannerGapResult', money(gap));
    setText('plannerRegularResult', regularHours.toFixed(2) + ' hrs');
    setText('plannerOvertimeResult', overtimeHours.toFixed(2) + ' hrs');
  }

  function init() {
    ['plannerTargetInput', 'plannerRateInput', 'plannerMultiplierInput', 'plannerCurrentInput'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.addEventListener('input', calculate);
    });
    calculate();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
