/*
Signal Labs Tool File: schedule/pages/requests/leave-requests.js
Version: v5.1.0
Purpose: Leave Requests Foundation preview rendering with request hours and admin override logic.
*/
import { JsonLeaveRequestsAdapter } from '../../adapters/JsonLeaveRequestsAdapter.js';
import { LeaveRequestRepository } from '../../repositories/LeaveRequestRepository.js';
import { LeaveRequestService } from '../../services/LeaveRequestService.js';

const adapter = new JsonLeaveRequestsAdapter();
const repository = new LeaveRequestRepository(adapter);
const service = new LeaveRequestService(repository);

const els = {
  summary: document.querySelector('[data-leave-summary]'),
  typeSelect: document.querySelector('[data-leave-type-select]'),
  requestList: document.querySelector('[data-leave-request-list]'),
  statusLine: document.querySelector('[data-leave-status-line]'),
  modeSelect: document.querySelector('[data-request-mode]'),
  startTime: document.querySelector('[data-start-time]'),
  endTime: document.querySelector('[data-end-time]'),
  scheduledShiftHours: document.querySelector('[data-scheduled-shift-hours]'),
  roleSelect: document.querySelector('[data-request-role]'),
  overrideCheckbox: document.querySelector('[data-admin-override]'),
  calculatedHours: document.querySelector('[data-calculated-hours]'),
  incrementMessage: document.querySelector('[data-increment-message]'),
  settingsList: document.querySelector('[data-increment-settings-list]')
};

let requestTypes = [];
let incrementSettings = [];

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"]/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;'
  }[char]));
}

function formatDateRange(request) {
  if (request.startDate === request.endDate) return request.startDate;
  return `${request.startDate} → ${request.endDate}`;
}

function formatTimeRange(request) {
  if (request.fullDay) return `Full day · scheduled ${request.scheduledShiftHours || request.hours} hrs`;
  if (request.startTime && request.endTime) return `${request.startTime} → ${request.endTime}`;
  return 'Time range pending';
}

function getSelectedIncrementSetting() {
  const typeId = els.typeSelect?.value || 'vacation';
  return incrementSettings.find((setting) => setting.id === typeId)
    || requestTypes.find((type) => type.id === typeId)
    || { employeeMinimumIncrementMinutes: 30, label: 'Selected Type' };
}

function renderSummary(summary) {
  if (!els.summary) return;
  els.summary.innerHTML = `
    <div class="leave-stat"><strong>${summary.total}</strong><span>Total preview requests</span></div>
    <div class="leave-stat"><strong>${summary.pending}</strong><span>Pending review</span></div>
    <div class="leave-stat"><strong>${summary.totalHours}</strong><span>Preview hours</span></div>
    <div class="leave-stat"><strong>${summary.overrideCount}</strong><span>Admin overrides</span></div>
  `;
}

function renderTypes(types) {
  if (!els.typeSelect) return;
  els.typeSelect.innerHTML = types.map((type) => `<option value="${escapeHtml(type.id)}">${escapeHtml(type.label)}</option>`).join('');
}

function renderIncrementSettings(settings) {
  if (!els.settingsList) return;
  els.settingsList.innerHTML = settings.map((setting) => `
    <article class="leave-setting-card">
      <strong>${escapeHtml(setting.label)}</strong>
      <span>Employee increment: ${escapeHtml(setting.employeeMinimumIncrementMinutes)} min</span>
      <span>${setting.adminOverrideAllowed ? 'Admin override allowed' : 'Admin override disabled'}</span>
    </article>
  `).join('');
}

function renderRequests(requests) {
  if (!els.requestList) return;
  els.requestList.innerHTML = requests.map((request) => `
    <article class="leave-request-card">
      <header>
        <div>
          <h3>${escapeHtml(request.employeeName)}</h3>
          <p>${escapeHtml(request.assignment)} · ${escapeHtml(request.shift)}</p>
        </div>
        <span class="leave-pill leave-pill--${escapeHtml(request.status)}">${escapeHtml(request.status)}</span>
      </header>
      <div class="leave-meta">
        <span class="leave-pill">${escapeHtml(request.typeLabel)}</span>
        <span class="leave-pill">${escapeHtml(formatDateRange(request))}</span>
        <span class="leave-pill">${escapeHtml(formatTimeRange(request))}</span>
        <span class="leave-pill">${escapeHtml(request.calculatedHours ?? request.hours)} hours</span>
        <span class="leave-pill leave-pill--impact">${escapeHtml(request.staffingImpact)}</span>
        ${request.incrementOverrideUsed ? '<span class="leave-pill leave-pill--override">Admin override</span>' : ''}
      </div>
      <p>${escapeHtml(request.coverageNote)}</p>
      ${request.incrementOverrideReason ? `<p class="leave-override-note">Override note: ${escapeHtml(request.incrementOverrideReason)}</p>` : ''}
      <div class="leave-actions" aria-label="Preview-only review actions">
        <button class="leave-button leave-button--primary" type="button" disabled>Approve Preview</button>
        <button class="leave-button" type="button" disabled>Deny Preview</button>
        <button class="leave-button" type="button" disabled>Send to Staffing Review</button>
      </div>
    </article>
  `).join('');
}

function updateHoursPreview() {
  const setting = getSelectedIncrementSetting();
  const fullDay = els.modeSelect?.value === 'full-day';
  const hours = service.calculateHours({
    fullDay,
    scheduledShiftHours: Number(els.scheduledShiftHours?.value || 8),
    startTime: els.startTime?.value || '13:00',
    endTime: els.endTime?.value || '17:00'
  });
  const role = els.roleSelect?.value || 'employee';
  const adminOverride = els.overrideCheckbox?.value === 'on';
  const result = fullDay
    ? { valid: true, overrideUsed: false, message: 'Full day selected. Hours use the scheduled shift hours value.' }
    : service.validateIncrement({
      role,
      startTime: els.startTime?.value,
      endTime: els.endTime?.value,
      incrementMinutes: setting.employeeMinimumIncrementMinutes,
      adminOverride
    });

  if (els.calculatedHours) els.calculatedHours.textContent = `${hours} hours`;
  if (els.incrementMessage) {
    els.incrementMessage.textContent = result.message;
    els.incrementMessage.dataset.state = result.valid ? (result.overrideUsed ? 'override' : 'valid') : 'invalid';
  }
}

function bindHoursPreview() {
  [els.typeSelect, els.modeSelect, els.startTime, els.endTime, els.scheduledShiftHours, els.roleSelect, els.overrideCheckbox]
    .filter(Boolean)
    .forEach((element) => element.addEventListener('input', updateHoursPreview));
}

async function initLeaveRequests() {
  try {
    const preview = await service.getLeaveRequestsPreview();
    requestTypes = preview.types;
    incrementSettings = preview.incrementSettings;
    renderSummary(preview.summary);
    renderTypes(preview.types);
    renderIncrementSettings(preview.incrementSettings);
    renderRequests(preview.requests);
    bindHoursPreview();
    updateHoursPreview();
    if (els.statusLine) {
      els.statusLine.textContent = 'Preview data loaded. v2.4.0 keeps request hour calculation and admin override planning synced with the current Schedule release; no production leave writes are active.';
    }
  } catch (error) {
    if (els.statusLine) els.statusLine.textContent = error.message;
  }
}

initLeaveRequests();
