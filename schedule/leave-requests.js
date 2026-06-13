/*
Signal Labs Tool File: schedule/leave-requests.js
Version: v2.2.0
Purpose: Leave Requests Foundation preview rendering.
*/
import { JsonLeaveRequestsAdapter } from './adapters/JsonLeaveRequestsAdapter.js';
import { LeaveRequestRepository } from './repositories/LeaveRequestRepository.js';
import { LeaveRequestService } from './services/LeaveRequestService.js';

const adapter = new JsonLeaveRequestsAdapter();
const repository = new LeaveRequestRepository(adapter);
const service = new LeaveRequestService(repository);

const els = {
  summary: document.querySelector('[data-leave-summary]'),
  typeSelect: document.querySelector('[data-leave-type-select]'),
  requestList: document.querySelector('[data-leave-request-list]'),
  statusLine: document.querySelector('[data-leave-status-line]')
};

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

function renderSummary(summary) {
  if (!els.summary) return;
  els.summary.innerHTML = `
    <div class="leave-stat"><strong>${summary.total}</strong><span>Total preview requests</span></div>
    <div class="leave-stat"><strong>${summary.pending}</strong><span>Pending review</span></div>
    <div class="leave-stat"><strong>${summary.approved}</strong><span>Approved preview rows</span></div>
    <div class="leave-stat"><strong>${summary.shortImpact}</strong><span>Short-staffing impacts</span></div>
  `;
}

function renderTypes(types) {
  if (!els.typeSelect) return;
  els.typeSelect.innerHTML = types.map((type) => `<option value="${escapeHtml(type.id)}">${escapeHtml(type.label)}</option>`).join('');
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
        <span class="leave-pill">${escapeHtml(request.hours)} hours</span>
        <span class="leave-pill leave-pill--impact">${escapeHtml(request.staffingImpact)}</span>
      </div>
      <p>${escapeHtml(request.coverageNote)}</p>
      <div class="leave-actions" aria-label="Preview-only review actions">
        <button class="leave-button leave-button--primary" type="button" disabled>Approve Preview</button>
        <button class="leave-button" type="button" disabled>Deny Preview</button>
        <button class="leave-button" type="button" disabled>Send to Staffing Review</button>
      </div>
    </article>
  `).join('');
}

async function initLeaveRequests() {
  try {
    const preview = await service.getLeaveRequestsPreview();
    renderSummary(preview.summary);
    renderTypes(preview.types);
    renderRequests(preview.requests);
    if (els.statusLine) {
      els.statusLine.textContent = 'Preview data loaded. No production leave request writes are active in v2.2.0.';
    }
  } catch (error) {
    if (els.statusLine) els.statusLine.textContent = error.message;
  }
}

initLeaveRequests();
