/*
Signal Labs
Area: Signal Schedule
File: schedule/pages/requests/shift-trades.js
Version: v5.1.0
Purpose: Render Shift Trades UI preview with approval workflow and assignment engine hooks
*/
import { loadShiftTradeBoard } from '../../services/ShiftTradeService.js';

const state = { data: null, filter: 'all' };
const statusLine = document.querySelector('[data-trade-status-line]');
const summary = document.querySelector('[data-trade-summary]');
const list = document.querySelector('[data-trade-list]');
const count = document.querySelector('[data-trade-count]');
const ruleList = document.querySelector('[data-trade-rules]');
const preview = document.querySelector('[data-trade-builder-preview]');
const filters = Array.from(document.querySelectorAll('[data-trade-filter]'));

function normalize(value) { return String(value || '').toLowerCase(); }
function matchesFilter(item) {
  if (state.filter === 'all') return true;
  if (state.filter === 'pending') return normalize(item.status).includes('pending');
  if (state.filter === 'warnings') return (item.warnings || []).length > 0;
  if (state.filter === 'below-minimum') return normalize(item.coverageImpact).includes('below');
  if (state.filter === 'draft') return normalize(item.status).includes('draft');
  return true;
}
function renderSummary(data) {
  summary.innerHTML = `
    <div class="trade-stat"><strong>${data.requests.length}</strong><span>Total previews</span></div>
    <div class="trade-stat"><strong>${data.pendingReview}</strong><span>Pending review</span></div>
    <div class="trade-stat"><strong>${data.openRisk}</strong><span>Coverage risks</span></div>
    <div class="trade-stat"><strong>${data.needsAdminAction}</strong><span>Needs admin action</span></div>`;
}
function renderRules(data) {
  ruleList.innerHTML = (data.rules || []).map((rule) => `<li>${rule}</li>`).join('');
}
function renderList() {
  const requests = state.data.requests.filter(matchesFilter);
  count.textContent = `${requests.length} shown`;
  if (!requests.length) {
    list.innerHTML = '<p class="trade-empty">No trade requests match this filter.</p>';
    return;
  }
  list.innerHTML = requests.map((item) => `
    <article class="trade-card">
      <div class="trade-card__top">
        <div><p class="trade-eyebrow">${item.type} • ${item.id}</p><h3>${item.fromEmployee} → ${item.toEmployee}</h3></div>
        <span class="trade-status">${item.status}</span>
      </div>
      <dl class="trade-meta">
        <div><dt>Date / time</dt><dd>${item.date} • ${item.time}</dd></div>
        <div><dt>From</dt><dd>${item.fromAssignment}</dd></div>
        <div><dt>To</dt><dd>${item.toAssignment}</dd></div>
        <div><dt>Coverage</dt><dd>${item.coverageImpact}</dd></div>
        <div><dt>Eligibility</dt><dd>${item.eligibility}</dd></div>
        <div><dt>Reason</dt><dd>${item.reason}</dd></div>
      </dl>
      <div class="trade-tags">${(item.qualificationChecks || []).map((q) => `<span>${q}</span>`).join('')}</div>
      ${(item.warnings || []).length ? `<div class="trade-warning"><strong>Warnings</strong><ul>${item.warnings.map((w) => `<li>${w}</li>`).join('')}</ul></div>` : ''}
      <div class="trade-workflow"><span>Employee acceptance: <strong>${item.employeeAcceptance || 'Pending'}</strong></span><span>Supervisor decision: <strong>${item.supervisorDecision || 'Pending'}</strong></span><span>Assignment hook: <strong>${item.assignmentEngineHook || 'Preview only'}</strong></span></div>
      <div class="trade-recommendation"><strong>Admin recommendation:</strong> ${item.adminRecommendation}</div>
      <details><summary>Audit preview</summary><ul>${(item.audit || []).map((entry) => `<li>${entry}</li>`).join('')}</ul></details>
    </article>`).join('');
}
function renderBuilderPreview() {
  const type = document.querySelector('[data-trade-type]')?.value || 'Trade';
  const coverage = document.querySelector('[data-trade-coverage]')?.value || 'At minimum';
  const qualification = document.querySelector('[data-trade-qualification]')?.value || 'Dispatcher';
  const overtime = document.querySelector('[data-trade-overtime]')?.value || 'Review required';
  preview.innerHTML = `<strong>${type} preview</strong><p>Coverage impact: ${coverage}. Required qualification: ${qualification}. Overtime rule: ${overtime}. Future approval should show both employee acceptance and supervisor decision with an audit reason.</p>`;
}
async function init() {
  try {
    state.data = await loadShiftTradeBoard();
    renderSummary(state.data);
    renderRules(state.data);
    renderList();
    renderBuilderPreview();
    statusLine.textContent = 'Shift Trades & Swap Requests preview loaded.';
  } catch (error) {
    console.error(error);
    statusLine.textContent = 'Unable to load Shift Trades preview data.';
  }
}
filters.forEach((button) => button.addEventListener('click', () => {
  state.filter = button.dataset.tradeFilter;
  filters.forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
  renderList();
}));
document.querySelectorAll('[data-trade-type], [data-trade-coverage], [data-trade-qualification], [data-trade-overtime]').forEach((el) => el.addEventListener('change', renderBuilderPreview));
init();
