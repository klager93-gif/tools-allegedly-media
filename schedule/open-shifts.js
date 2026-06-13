/*
Signal Labs Tool File: schedule/open-shifts.js
Version: v2.3.0
Purpose: Open Shifts / VOT Foundation preview UI.
*/
import { JsonOpenShiftAdapter } from './adapters/JsonOpenShiftAdapter.js';
import { OpenShiftRepository } from './repositories/OpenShiftRepository.js';
import { OpenShiftService } from './services/OpenShiftService.js';
import { RequestHoursService } from './services/RequestHoursService.js';

const adapter = new JsonOpenShiftAdapter();
const repository = new OpenShiftRepository(adapter);
const service = new OpenShiftService(repository);
const hoursService = new RequestHoursService();

function text(value, fallback = '—') {
  return value === undefined || value === null || value === '' ? fallback : String(value);
}

function statusLabel(status) {
  const labels = { short: 'Short', watch: 'Watch', covered: 'Covered', open: 'Open' };
  return labels[status] || text(status, 'Unknown');
}

function renderSummary(openShifts) {
  const summary = service.summarizeCoverage(openShifts);
  const node = document.querySelector('[data-open-shift-summary]');
  if (!node) return;
  node.innerHTML = `
    <div class="open-shift-stat"><strong>${summary.total || 0}</strong><span>Open Opportunities</span></div>
    <div class="open-shift-stat"><strong>${summary.short || 0}</strong><span>Short Coverage</span></div>
    <div class="open-shift-stat"><strong>${summary.watch || 0}</strong><span>Watch Items</span></div>
  `;
}

function renderOpenShifts(openShifts) {
  const list = document.querySelector('[data-open-shift-list]');
  if (!list) return;
  list.innerHTML = openShifts.map(shift => `
    <article class="open-shift-card open-shift-card--${shift.coverageStatus || 'open'}">
      <div class="open-shift-card__topline">
        <span>${text(shift.date)}</span>
        <span>${text(shift.priority)} Priority</span>
      </div>
      <h3>${text(shift.assignment)}</h3>
      <p>${text(shift.shiftName)} · ${text(shift.startTime)}–${text(shift.endTime)} · ${text(shift.hours)} hrs</p>
      <dl class="open-shift-details">
        <div><dt>Need</dt><dd>${text(shift.need)} ${text(shift.role)}</dd></div>
        <div><dt>Current</dt><dd>${text(shift.current)} of ${text(shift.minimum)}</dd></div>
        <div><dt>Coverage</dt><dd>${statusLabel(shift.coverageStatus)}</dd></div>
        <div><dt>Need By</dt><dd>${text(shift.needByTime).replace('T', ' ')}</dd></div>
      </dl>
      <div class="open-shift-tags">
        ${(shift.qualifiedTags || []).map(tag => `<span>✓ ${text(tag)}</span>`).join('')}
      </div>
      <button type="button" disabled>Volunteer Preview</button>
    </article>
  `).join('');
}

function renderVotRequests(requests) {
  const list = document.querySelector('[data-vot-request-list]');
  if (!list) return;
  list.innerHTML = requests.map(request => `
    <article class="vot-request-card">
      <div>
        <h3>${text(request.employee)}</h3>
        <p>${text(request.assignmentPreference)} · ${text(request.shiftPreference)} · ${text(request.calculatedHours)} hrs</p>
      </div>
      <div>
        <strong>${text(request.status)}</strong>
        <span>${text(request.reason)}</span>
      </div>
    </article>
  `).join('');
}

function renderReasons(reasons) {
  const list = document.querySelector('[data-reason-list]');
  if (!list) return;
  list.innerHTML = reasons.map(reason => `
    <li>
      <strong>${text(reason.label)}</strong>
      <span>${text(reason.requestType)} · ${reason.employeeVisible ? 'employee visible' : 'admin only'} · ${reason.active ? 'active' : 'disabled'}</span>
    </li>
  `).join('');
}

function setupCalculator() {
  const start = document.querySelector('[data-vot-start-time]');
  const end = document.querySelector('[data-vot-end-time]');
  const mode = document.querySelector('[data-vot-mode]');
  const shiftHours = document.querySelector('[data-vot-shift-hours]');
  const output = document.querySelector('[data-vot-calculated-hours]');
  const message = document.querySelector('[data-vot-increment-message]');
  if (!start || !end || !mode || !shiftHours || !output || !message) return;

  const update = () => {
    const calculated = mode.value === 'full-shift'
      ? Number(shiftHours.value || 0)
      : hoursService.calculateHours(start.value, end.value);
    output.textContent = `${calculated} hours`;
    message.textContent = mode.value === 'full-shift'
      ? 'Full shift uses scheduled shift hours.'
      : 'Partial shift calculates start time to end time. Admin/Scheduler can override increment rules.';
  };

  [start, end, mode, shiftHours].forEach(input => input.addEventListener('input', update));
  update();
}

async function init() {
  setupCalculator();
  const status = document.querySelector('[data-open-shift-status-line]');
  try {
    const data = await service.getOpenShiftPreview();
    renderSummary(data.openShifts || []);
    renderOpenShifts(data.openShifts || []);
    renderVotRequests(data.votRequests || []);
    renderReasons(data.requestReasons || []);
    if (status) status.textContent = 'Open Shifts / VOT Foundation preview data loaded.';
  } catch (error) {
    if (status) status.textContent = `Unable to load Open Shifts preview data: ${error.message}`;
  }
}

init();
