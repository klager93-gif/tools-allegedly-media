/*
Signal Labs
Area: Signal Schedule
File: schedule/pages/people/training.js
Version: v5.1.0
Purpose: Training & Certifications preview interactions
*/
import { loadTrainingCertificationPreview, filterTrainingRecords } from '../../services/TrainingCertificationService.js';

const state = { data: null, filter: 'all' };
const els = {
  summary: document.querySelector('[data-training-summary]'),
  status: document.querySelector('[data-training-status-line]'),
  list: document.querySelector('[data-training-list]'),
  count: document.querySelector('[data-training-count]'),
  rules: document.querySelector('[data-training-rules]'),
  preview: document.querySelector('[data-training-builder-preview]'),
  filters: Array.from(document.querySelectorAll('[data-training-filter]')),
  builder: {
    role: document.querySelector('[data-training-role]'),
    credential: document.querySelector('[data-training-credential]'),
    expiration: document.querySelector('[data-training-expiration]'),
    impact: document.querySelector('[data-training-impact]')
  }
};

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[char]));
}

function statusClass(record) {
  if (record.status === 'expired' || record.scheduleImpact === 'blocked') return 'training-pill--bad';
  if (record.status === 'expiring' || record.scheduleImpact === 'restricted') return 'training-pill--warn';
  return 'training-pill--good';
}

function renderSummary(summary) {
  els.summary.innerHTML = `
    <div class="training-stat"><strong>${summary.totalRecords ?? 0}</strong><span>Total records</span></div>
    <div class="training-stat"><strong>${summary.expiringSoon ?? 0}</strong><span>Expiring soon</span></div>
    <div class="training-stat"><strong>${summary.expired ?? 0}</strong><span>Expired</span></div>
    <div class="training-stat"><strong>${summary.restricted ?? 0}</strong><span>Restricted</span></div>
  `;
}

function renderRules(rules) {
  els.rules.innerHTML = rules.map((rule) => `<li>${escapeHtml(rule)}</li>`).join('');
}

function renderBuilderPreview() {
  const { role, credential, expiration, impact } = els.builder;
  els.preview.innerHTML = `<strong>${escapeHtml(role.value)} requirement preview</strong><br>Credential: ${escapeHtml(credential.value)}. Expiration rule: ${escapeHtml(expiration.value)}. Schedule impact: ${escapeHtml(impact.value)}. Future production logic should apply this rule to coverage, overtime, trades, assignments, and admin override decisions.`;
}

function renderList() {
  const records = filterTrainingRecords(state.data.records, state.filter);
  els.count.textContent = `${records.length} shown`;
  els.status.textContent = `Training & Certifications preview loaded. Filter: ${state.filter}.`;
  els.list.innerHTML = records.map((record) => `
    <article class="training-card">
      <div class="training-card__top">
        <div><h3>${escapeHtml(record.employee)}</h3><p>${escapeHtml(record.role)} • ${escapeHtml(record.credential)}</p></div>
        <span class="training-pill ${statusClass(record)}">${escapeHtml(record.status)}</span>
      </div>
      <div class="training-pill-row">
        <span class="training-pill">Impact: ${escapeHtml(record.scheduleImpact)}</span>
        <span class="training-pill">Action: ${escapeHtml(record.adminAction)}</span>
      </div>
      <div class="training-detail-grid">
        <div class="training-detail"><span>Credential</span><strong>${escapeHtml(record.credential)}</strong></div>
        <div class="training-detail"><span>Expires</span><strong>${escapeHtml(record.expiresOn || 'Not set')}</strong></div>
        <div class="training-detail"><span>Days</span><strong>${record.daysRemaining ?? '—'}</strong></div>
        <div class="training-detail"><span>Rule</span><strong>${escapeHtml(record.scheduleImpact)}</strong></div>
      </div>
    </article>
  `).join('') || '<p>No records match this filter.</p>';
}

function setFilter(filter) {
  state.filter = filter;
  els.filters.forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.trainingFilter === filter)));
  renderList();
}

async function init() {
  try {
    state.data = await loadTrainingCertificationPreview();
    renderSummary(state.data.summary);
    renderRules(state.data.policyChecks);
    renderBuilderPreview();
    renderList();
    els.filters.forEach((button) => button.addEventListener('click', () => setFilter(button.dataset.trainingFilter)));
    Object.values(els.builder).forEach((control) => control.addEventListener('change', renderBuilderPreview));
  } catch (error) {
    console.error(error);
    els.status.textContent = 'Training & Certifications preview failed to load.';
  }
}

init();
