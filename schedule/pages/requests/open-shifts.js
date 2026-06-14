/*
Signal Labs Tool File: schedule/pages/requests/open-shifts.js
Version: v5.1.0
Purpose: Overtime Opportunity Board preview UI.
*/
import { JsonOpenShiftAdapter } from '../../adapters/JsonOpenShiftAdapter.js';
import { OpenShiftRepository } from '../../repositories/OpenShiftRepository.js';
import { OpenShiftService } from '../../services/OpenShiftService.js';
import { RequestHoursService } from '../../services/RequestHoursService.js';

const adapter = new JsonOpenShiftAdapter();
const repository = new OpenShiftRepository(adapter);
const service = new OpenShiftService(repository);
const hoursService = new RequestHoursService();

let boardData = { openShifts: [], votRequests: [], requestReasons: [] };
let activeFilter = 'all';
let activeShiftId = null;

function text(value, fallback = '—') {
  return value === undefined || value === null || value === '' ? fallback : String(value);
}

function statusLabel(status) {
  const labels = { short: 'Short', watch: 'Watch', covered: 'Covered', open: 'Open' };
  return labels[status] || text(status, 'Unknown');
}

function renderSummary(openShifts, votRequests) {
  const summary = service.summarizeCoverage(openShifts, votRequests);
  const node = document.querySelector('[data-open-shift-summary]');
  if (!node) return;
  node.innerHTML = `
    <div class="open-shift-stat"><strong>${summary.total || 0}</strong><span>Posted Opportunities</span></div>
    <div class="open-shift-stat"><strong>${summary.openSlots || 0}</strong><span>Open Slots</span></div>
    <div class="open-shift-stat"><strong>${summary.volunteers || 0}</strong><span>Volunteers</span></div>
    <div class="open-shift-stat"><strong>${summary.eligibleVolunteers || 0}</strong><span>Eligible Volunteers</span></div>
  `;
}

function renderOpenShifts() {
  const list = document.querySelector('[data-open-shift-list]');
  const count = document.querySelector('[data-opportunity-count]');
  if (!list) return;

  const filtered = service.filterOpportunities(boardData.openShifts || [], activeFilter);
  if (count) count.textContent = `${filtered.length} shown`;

  list.innerHTML = filtered.map(shift => {
    const requests = service.getRequestsForShift(boardData.votRequests || [], shift.id);
    const recommended = service.recommendAward(requests);
    const selectedClass = activeShiftId === shift.id ? ' open-shift-card--selected' : '';
    return `
      <article class="open-shift-card open-shift-card--${shift.coverageStatus || 'open'}${selectedClass}">
        <div class="open-shift-card__topline">
          <span>${text(shift.date)}</span>
          <span>${text(shift.priority)} Priority</span>
        </div>
        <h3>${text(shift.assignment)}</h3>
        <p>${text(shift.shiftName)} · ${text(shift.startTime)}–${text(shift.endTime)} · ${text(shift.hours)} hrs</p>
        <dl class="open-shift-details">
          <div><dt>Slots</dt><dd>${text(shift.slotsAvailable || shift.need)} ${text(shift.role)}</dd></div>
          <div><dt>Current</dt><dd>${text(shift.current)} of ${text(shift.minimum)}</dd></div>
          <div><dt>Coverage</dt><dd>${statusLabel(shift.coverageStatus)}</dd></div>
          <div><dt>Volunteers</dt><dd>${requests.length}</dd></div>
          <div><dt>Need By</dt><dd>${text(shift.needByTime).replace('T', ' ')}</dd></div>
          <div><dt>Recommended</dt><dd>${recommended ? text(recommended.employee) : 'No eligible match'}</dd></div>
        </dl>
        <div class="open-shift-tags">
          ${(shift.qualifiedTags || []).map(tag => `<span>✓ ${text(tag)}</span>`).join('')}
        </div>
        <button type="button" data-review-shift="${shift.id}">Review Volunteers</button>
      </article>
    `;
  }).join('') || '<p class="empty-state">No opportunities match this filter.</p>';

  list.querySelectorAll('[data-review-shift]').forEach(button => {
    button.addEventListener('click', () => {
      activeShiftId = button.dataset.reviewShift;
      renderOpenShifts();
      renderAwardReview(activeShiftId);
    });
  });
}

function renderAwardReview(openShiftId) {
  const container = document.querySelector('[data-award-review]');
  if (!container) return;

  const shift = (boardData.openShifts || []).find(item => item.id === openShiftId);
  if (!shift) {
    container.innerHTML = '<p class="empty-state">Select an opportunity to review volunteers.</p>';
    return;
  }

  const requests = service.getRequestsForShift(boardData.votRequests || [], shift.id);
  const recommended = service.recommendAward(requests);

  container.innerHTML = `
    <div class="award-review__header">
      <div>
        <p class="schedule-kicker">Selected Opportunity</p>
        <h3>${text(shift.assignment)} · ${text(shift.shiftName)}</h3>
        <p>${text(shift.date)} · ${text(shift.startTime)}–${text(shift.endTime)} · ${text(shift.slotsAvailable || shift.need)} slot(s)</p>
      </div>
      <div class="award-review__recommendation">
        <span>System Preview</span>
        <strong>${recommended ? text(recommended.employee) : 'No eligible award'}</strong>
      </div>
    </div>
    <div class="eligibility-rules">
      ${(shift.eligibilityRules || []).map(rule => `<span>${text(rule)}</span>`).join('')}
    </div>
    <div class="volunteer-table" role="table" aria-label="Volunteer award preview">
      <div class="volunteer-table__row volunteer-table__row--head" role="row">
        <span>Employee</span><span>Hours</span><span>Eligibility</span><span>Review</span>
      </div>
      ${requests.map(request => `
        <div class="volunteer-table__row" role="row">
          <span><strong>${text(request.employee)}</strong><small>${text(request.employeeId)} · Seniority ${text(request.seniorityRank)}</small></span>
          <span>${text(request.calculatedHours)} hrs</span>
          <span>${text(request.eligibilityStatus)}</span>
          <span>${text(request.awardRecommendation)}</span>
        </div>
      `).join('') || '<p class="empty-state">No volunteers for this opportunity yet.</p>'}
    </div>
    <button type="button" class="award-button" disabled>Award Preview Disabled</button>
  `;
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
  const output = document.querySelector('[data-vot-calculated-hours]');
  const message = document.querySelector('[data-vot-increment-message]');
  if (!start || !end || !output || !message) return;

  const update = () => {
    const calculated = hoursService.calculateHours(start.value, end.value);
    output.textContent = `${calculated} hours`;
    message.textContent = 'Opportunity duration is calculated from start and end time. Admin can override increment rules later.';
    renderPostPreview(calculated);
  };

  [start, end].forEach(input => input.addEventListener('input', update));
  document.querySelectorAll('[data-post-assignment], [data-post-role], [data-post-date], [data-post-slots], [data-post-priority], [data-post-award-rule], [data-post-notes]').forEach(input => {
    input.addEventListener('input', () => renderPostPreview(Number(output.textContent.replace(/[^0-9.]/g, '') || 0)));
  });
  update();
}

function renderPostPreview(hours) {
  const preview = document.querySelector('[data-post-preview]');
  if (!preview) return;
  const assignment = document.querySelector('[data-post-assignment]')?.value;
  const role = document.querySelector('[data-post-role]')?.value;
  const date = document.querySelector('[data-post-date]')?.value;
  const slots = document.querySelector('[data-post-slots]')?.value;
  const priority = document.querySelector('[data-post-priority]')?.value;
  const awardRule = document.querySelector('[data-post-award-rule]')?.value;
  const notes = document.querySelector('[data-post-notes]')?.value;
  preview.innerHTML = `
    <strong>Preview Card</strong>
    <span>${text(date)} · ${text(assignment)} · ${text(slots)} ${text(role)} slot(s) · ${hours} hrs</span>
    <span>${text(priority)} priority · ${text(awardRule)}</span>
    <small>${text(notes)}</small>
  `;
}

function setupFilters() {
  document.querySelectorAll('[data-opportunity-filter]').forEach(button => {
    button.addEventListener('click', () => {
      activeFilter = button.dataset.opportunityFilter || 'all';
      document.querySelectorAll('[data-opportunity-filter]').forEach(item => item.setAttribute('aria-pressed', item === button ? 'true' : 'false'));
      renderOpenShifts();
    });
  });
}

async function init() {
  setupCalculator();
  setupFilters();
  const status = document.querySelector('[data-open-shift-status-line]');
  try {
    boardData = await service.getOpenShiftPreview();
    renderSummary(boardData.openShifts || [], boardData.votRequests || []);
    renderOpenShifts();
    renderReasons(boardData.requestReasons || []);
    if (boardData.openShifts?.[0]) {
      activeShiftId = boardData.openShifts[0].id;
      renderOpenShifts();
      renderAwardReview(activeShiftId);
    }
    if (status) status.textContent = 'Overtime Opportunity Board preview data loaded.';
  } catch (error) {
    if (status) status.textContent = `Unable to load Overtime Opportunity Board preview data: ${error.message}`;
  }
}

init();
