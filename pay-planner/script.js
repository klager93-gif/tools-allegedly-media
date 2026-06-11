/*
Signal Labs Tool: Pay Planner
File: script.js
Version: v0.1.0
Purpose: Early unlisted pay goal planning logic.
*/
(function(){function el(id){return document.getElementById(id)}function num(id){var n=parseFloat(el(id)?.value||"0");return Number.isFinite(n)?n:0}function money(v){return "$"+(Number(v||0)).toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})}function hours(v){return (Number(v||0)).toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})+" hrs"}function calc(){var target=num("plannerTargetInput"),current=num("plannerCurrentInput"),rate=num("plannerRateInput"),mult=Math.max(1,num("plannerMultiplierInput")||1);var gap=Math.max(0,target-current);var regular=rate?gap/rate:0;var ot=rate?gap/(rate*mult):0;if(el("plannerGapResult"))el("plannerGapResult").textContent=money(gap);if(el("plannerRegularResult"))el("plannerRegularResult").textContent=hours(regular);if(el("plannerOvertimeResult"))el("plannerOvertimeResult").textContent=hours(ot)}document.addEventListener("input",function(e){if(e.target&&e.target.id&&e.target.id.startsWith("planner"))calc()});document.addEventListener("DOMContentLoaded",calc);})();
