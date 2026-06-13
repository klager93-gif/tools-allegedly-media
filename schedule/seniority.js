/*
Signal Labs Tool File: schedule/seniority.js
Version: v2.16.0
Purpose: Seniority and Rotation Engine preview UI.
*/
import { JsonSeniorityRotationAdapter } from './adapters/JsonSeniorityRotationAdapter.js';
import { SeniorityRotationRepository } from './repositories/SeniorityRotationRepository.js';
import { SeniorityRotationService } from './services/SeniorityRotationService.js';

const adapter = new JsonSeniorityRotationAdapter();
const repository = new SeniorityRotationRepository(adapter);
const service = new SeniorityRotationService(repository);

let rotationData = [];
let activeFilter = 'all';

function text(value, fallback = '—') {
  return value === undefined || value === null || value === '' ? fallback : String(value);
}

function renderSummary(rows) {
  const summary = service.summarize(rows);
  const node = document.querySelector('[data-seniority-summary]');
  if (!node) return;
  node.innerHTML = `
    <div class="seniority-stat"><strong>${summary.total || 0}</strong><span>Employees</span></div>
    <div class="seniority-stat"><strong>${summary.eligible || 0}</strong><span>Eligible</span></div>
    <div class="seniority-stat"><strong>${summary.skipped || 0}</strong><span>Skipped</span></div>
    <div class="seniority-stat"><strong>${summary.mandate || 0}</strong><span>Mandate Candidates</span></div>
  `;
}

function renderCard(row) {
  const tags = row.qualifications || [];
  return `
    <article class="seniority-card seniority-card--${text(row.status, 'unknown')}">
      <div class="seniority-card__top"><span>#${text(row.rank)} · ${text(row.status)}</span><span>${text(row.scenario)}</span></div>
      <h3>${text(row.employeeName)} <small>${text(row.employeeCode)}</small></h3>
      <p>${text(row.recommendation)}</p>
      <dl>
        <div><dt>Seniority Date</dt><dd>${text(row.seniorityDate)}</dd></div>
        <div><dt>Equalized OT</dt><dd>${text(row.equalizedOtHours)} hrs</dd></div>
        <div><dt>Mandates YTD</dt><dd>${text(row.mandatesYtd)}</dd></div>
        <div><dt>Last Offered</dt><dd>${text(row.lastOffered)}</dd></div>
      </dl>
      <div class="seniority-tags">
        ${tags.map(tag => `<span>${text(tag)}</span>`).join('')}
        ${row.skipReason ? `<span>Skip: ${text(row.skipReason)}</span>` : '<span>No skip reason</span>'}
      </div>
    </article>
  `;
}

function renderList() {
  const list = document.querySelector('[data-seniority-list]');
  const count = document.querySelector('[data-seniority-count]');
  if (!list) return;
  const filtered = service.filterRows(rotationData, activeFilter);
  if (count) count.textContent = `${filtered.length} shown`;
  list.innerHTML = filtered.map(renderCard).join('') || '<p class="empty-state">No employees match this filter.</p>';
}

function renderAudit(rows) {
  const node = document.querySelector('[data-seniority-audit]');
  if (!node) return;
  node.innerHTML = rows.slice(0, 5).map(row => `
    <article>
      <strong>${text(row.employeeName)}</strong>
      <p>${row.skipReason ? `Skipped — ${text(row.skipReason)}` : `Offer order #${text(row.rank)} — ${text(row.recommendation)}`}</p>
    </article>
  `).join('');
}

function setupFilters() {
  document.querySelectorAll('[data-seniority-filter]').forEach(button => {
    button.addEventListener('click', () => {
      activeFilter = button.dataset.seniorityFilter || 'all';
      document.querySelectorAll('[data-seniority-filter]').forEach(item => item.setAttribute('aria-pressed', item === button ? 'true' : 'false'));
      renderList();
    });
  });
}

function setupBuilderPreview() {
  const preview = document.querySelector('[data-seniority-builder-preview]');
  if (!preview) return;
  const update = () => {
    const scenario = document.querySelector('[data-seniority-scenario]')?.value || 'Open OT Award';
    const rule = document.querySelector('[data-seniority-rule]')?.value || 'Lowest equalized OT first';
    const qualification = document.querySelector('[data-seniority-qualification]')?.value || 'Dispatcher';
    const eligible = service.eligibleForQualification(rotationData, qualification);
    const ordered = service.sortRows(eligible, rule);
    const first = ordered[0];
    preview.innerHTML = `
      <strong>${text(scenario)} · ${text(rule)}</strong>
      <span>${ordered.length} qualified and eligible for ${text(qualification)}.</span>
      <small>${first ? `Recommended first contact: ${text(first.employeeName)} (${text(first.equalizedOtHours)} equalized OT hours).` : 'No eligible employee found for this qualification.'}</small>
    `;
  };
  document.querySelectorAll('[data-seniority-scenario], [data-seniority-rule], [data-seniority-qualification]').forEach(input => input.addEventListener('input', update));
  update();
}

async function init() {
  setupFilters();
  const status = document.querySelector('[data-seniority-status-line]');
  try {
    rotationData = await service.getSeniorityRotationPreview();
    renderSummary(rotationData);
    renderList();
    renderAudit(rotationData);
    setupBuilderPreview();
    if (status) status.textContent = 'Seniority & Rotation preview data loaded.';
  } catch (error) {
    if (status) status.textContent = `Unable to load Seniority & Rotation preview data: ${error.message}`;
  }
}

init();
