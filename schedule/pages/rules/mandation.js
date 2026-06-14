/*
Signal Labs
Area: Signal Schedule
File: schedule/pages/rules/mandation.js
Version: v5.1.0
Purpose: Render Mandation Engine Foundation preview with employee and supervisor/admin views
*/
import { loadMandationEngine } from '../../services/MandationEngineService.js';

const state = { data: null, view: 'supervisor' };
const shell = document.querySelector('[data-mandation-shell]');
const summary = document.querySelector('[data-mandation-summary]');
const statusLine = document.querySelector('[data-mandation-status-line]');
const policyGrid = document.querySelector('[data-policy-grid]');
const policyRules = document.querySelector('[data-policy-rules]');
const shortageList = document.querySelector('[data-shortage-list]');
const shortageCount = document.querySelector('[data-shortage-count]');
const rotationList = document.querySelector('[data-rotation-list]');
const rotationCount = document.querySelector('[data-rotation-count]');
const viewButtons = Array.from(document.querySelectorAll('[data-mandation-view]'));

function yesNo(value) { return value ? 'Yes' : 'No'; }
function formatStatus(value) { return String(value || '').replaceAll('-', ' '); }
function isSupervisorView() { return state.view === 'supervisor'; }
function setViewMode() {
  shell?.classList.toggle('employee-mode', !isSupervisorView());
  viewButtons.forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.mandationView === state.view)));
  renderShortages();
  renderRotation();
}
function renderSummary(data) {
  summary.innerHTML = `
    <div class="mandation-stat"><strong>${data.summary.employeesInRotation}</strong><span>In rotation</span></div>
    <div class="mandation-stat"><strong>${data.summary.currentlyEligible}</strong><span>Currently eligible</span></div>
    <div class="mandation-stat"><strong>${data.summary.openShortages}</strong><span>Open shortages</span></div>
    <div class="mandation-stat"><strong>${data.summary.supervisorOverrides}</strong><span>Override previews</span></div>`;
}
function renderPolicy(data) {
  const policy = data.policyProfile;
  const items = [
    ['Holdover', yesNo(policy.allowHoldover)],
    ['Early-in', yesNo(policy.allowEarlyIn)],
    ['Day-off mandate', `${yesNo(policy.allowMandateOnDayOff)} • max ${policy.maxDayOffMandateHours}h`],
    ['Connected mandate max', `${policy.maxConnectedMandateHours}h`],
    ['Max consecutive', `${policy.maxConsecutiveWorkHours}h`],
    ['Minimum rest', `${policy.minimumRestHours}h`],
    ['Short-day logic', yesNo(policy.allowShortDayWindowEligibility)],
    ['Rotation method', policy.rotationMethod]
  ];
  policyGrid.innerHTML = items.map(([label, value]) => `<div class="policy-item"><span>${label}</span><strong>${value}</strong></div>`).join('');
  policyRules.innerHTML = (data.rules || []).map((rule) => `<li>${rule}</li>`).join('');
}
function renderShortages() {
  const data = state.data;
  shortageCount.textContent = `${data.shortages.length} windows`;
  shortageList.innerHTML = data.shortages.map((item) => `
    <article class="mandation-card">
      <div class="mandation-card__top">
        <div><p class="mandation-eyebrow">${item.date} • ${item.window}</p><h3>${item.role} shortage</h3></div>
        <span class="mandation-status is-selected">${item.minimumRequired - item.scheduled} below minimum</span>
      </div>
      <dl class="mandation-meta">
        <div><dt>Reason</dt><dd>${item.reason}</dd></div>
        <div><dt>Coverage</dt><dd>${item.scheduled}/${item.minimumRequired} scheduled</dd></div>
        <div><dt>Recommended</dt><dd>${item.selectedEmployee?.displayName || item.selectedEmployeeId}</dd></div>
        <div><dt>Window type</dt><dd>${item.window}</dd></div>
      </dl>
      <div class="reason-box"><strong>Engine recommendation:</strong> ${item.recommendation}</div>
      ${isSupervisorView() ? `<details class="supervisor-only" open><summary>Supervisor/Admin rule evaluation</summary>${renderEvaluations(item.evaluations)}</details>` : ''}
    </article>`).join('');
}
function renderEvaluations(evaluations) {
  if (!evaluations.length) return '<p>No rule evaluation preview available.</p>';
  return evaluations.map((item) => `
    <div class="reason-box">
      <strong>${item.displayName}: ${formatStatus(item.engineResult)}</strong>
      <p>${item.reason}</p>
      <ul class="rule-list">${(item.ruleChecks || []).map((check) => `<li><span class="${check.result === 'pass' ? 'rule-pass' : 'rule-fail'}">${check.result.toUpperCase()}</span> — ${check.rule}</li>`).join('')}</ul>
    </div>`).join('');
}
function renderRotation() {
  const data = state.data;
  rotationCount.textContent = `${data.rotation.length} employees`;
  rotationList.innerHTML = data.rotation.map((item) => `
    <article class="mandation-card">
      <div class="mandation-card__top">
        <div><p class="mandation-eyebrow">Position ${item.position} • ${item.shiftGroup}</p><h3>${item.displayName}</h3></div>
        <span class="mandation-status is-${item.status}">${formatStatus(item.status)}</span>
      </div>
      <dl class="mandation-meta">
        <div><dt>Mandates YTD</dt><dd>${item.mandatesYearToDate}</dd></div>
        <div><dt>Forced hours YTD</dt><dd>${item.forcedHoursYearToDate}</dd></div>
        <div><dt>Last mandated</dt><dd>${item.lastMandatedDate}</dd></div>
        <div><dt>Role</dt><dd>${item.role}</dd></div>
        ${isSupervisorView() ? `<div class="supervisor-only"><dt>Normal shift</dt><dd>${item.normalShift}</dd></div><div class="supervisor-only"><dt>Actual shift</dt><dd>${item.actualShift}</dd></div><div class="supervisor-only"><dt>Next shift</dt><dd>${item.nextShift}</dd></div>` : ''}
      </dl>
      <div class="reason-box"><strong>${isSupervisorView() ? 'Employee-safe reason' : 'Reason'}:</strong> ${item.employeeViewReason}</div>
      ${isSupervisorView() ? `<div class="override-box supervisor-only"><strong>Supervisor notes:</strong> ${item.supervisorNotes}</div>` : ''}
    </article>`).join('');
}
async function init() {
  try {
    state.data = await loadMandationEngine();
    renderSummary(state.data);
    renderPolicy(state.data);
    setViewMode();
    statusLine.textContent = 'Mandation Engine preview loaded.';
  } catch (error) {
    console.error(error);
    statusLine.textContent = 'Unable to load Mandation Engine preview data.';
    shortageList.innerHTML = '<p class="mandation-empty">Mandation preview data could not be loaded.</p>';
  }
}
viewButtons.forEach((button) => button.addEventListener('click', () => {
  state.view = button.dataset.mandationView;
  setViewMode();
}));
init();
