/*
Signal Labs
Area: Signal Schedule
File: schedule/pages/people/eligibility.js
Version: v5.1.0
Purpose: Qualification & Eligibility Engine preview interactions
*/
import { loadShiftEligibilityPreview, filterEligibilityChecks, calculateEligibility } from '../../services/ShiftEligibilityService.js';

const state = { data: null, filter: 'all' };
const els = {
  summary: document.querySelector('[data-eligibility-summary]'),
  status: document.querySelector('[data-eligibility-status]'),
  list: document.querySelector('[data-eligibility-list]'),
  count: document.querySelector('[data-eligibility-count]'),
  rules: document.querySelector('[data-eligibility-rules]'),
  requirements: document.querySelector('[data-eligibility-requirements]'),
  filters: Array.from(document.querySelectorAll('[data-eligibility-filter]')),
  preview: document.querySelector('[data-eligibility-builder-preview]'),
  builder: {
    shift: document.querySelector('[data-eligibility-shift]'),
    credential: document.querySelector('[data-eligibility-credential]'),
    status: document.querySelector('[data-eligibility-credential-status]'),
    override: document.querySelector('[data-eligibility-override]')
  }
};

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[char]));
}

function resultClass(result) {
  if (result === 'eligible') return 'eligibility-pill--good';
  if (result === 'warn') return 'eligibility-pill--warn';
  return 'eligibility-pill--bad';
}

function renderSummary(summary) {
  els.summary.innerHTML = `
    <div class="eligibility-stat"><strong>${summary.totalChecks ?? 0}</strong><span>Total checks</span></div>
    <div class="eligibility-stat"><strong>${summary.eligible ?? 0}</strong><span>Eligible</span></div>
    <div class="eligibility-stat"><strong>${summary.warn ?? 0}</strong><span>Warnings</span></div>
    <div class="eligibility-stat"><strong>${summary.blocked ?? 0}</strong><span>Blocked</span></div>
  `;
}

function renderRules(rules) {
  els.rules.innerHTML = rules.map((rule) => `<li>${escapeHtml(rule)}</li>`).join('');
}

function renderRequirements(requirements) {
  els.requirements.innerHTML = requirements.map((requirement) => `
    <article class="eligibility-requirement">
      <h3>${escapeHtml(requirement.label)}</h3>
      <p><strong>Required:</strong> ${escapeHtml(requirement.requiredCredential)}</p>
      <p><strong>Applies to:</strong> ${escapeHtml(requirement.appliesTo.join(', '))}</p>
      <p><strong>Impact:</strong> ${escapeHtml(requirement.defaultImpact)}${requirement.allowOverride ? ' • Override allowed with reason' : ' • No override by default'}</p>
    </article>
  `).join('');
}

function renderBuilderPreview() {
  const input = {
    requiredCredential: els.builder.credential.value,
    employeeCredentialStatus: els.builder.status.value,
    allowOverride: els.builder.override.value === 'yes'
  };
  const result = calculateEligibility(input);
  els.preview.innerHTML = `
    <strong>${escapeHtml(els.builder.shift.value)} eligibility preview</strong><br>
    Required: ${escapeHtml(input.requiredCredential)}. Employee status: ${escapeHtml(input.employeeCredentialStatus)}.
    Result: <span class="eligibility-pill ${resultClass(result.result)}">${escapeHtml(result.result)}</span><br>
    ${escapeHtml(result.reason)}
  `;
}

function renderList() {
  const checks = filterEligibilityChecks(state.data.checks, state.filter);
  els.count.textContent = `${checks.length} shown`;
  els.status.textContent = `Qualification & Eligibility preview loaded. Filter: ${state.filter}.`;
  els.list.innerHTML = checks.map((check) => `
    <article class="eligibility-card">
      <div class="eligibility-card__top">
        <div><h3>${escapeHtml(check.shift)}</h3><p>${escapeHtml(check.source)} • ${escapeHtml(check.employee)}</p></div>
        <span class="eligibility-pill ${resultClass(check.result)}">${escapeHtml(check.result)}</span>
      </div>
      <div class="eligibility-detail-grid">
        <div class="eligibility-detail"><span>Required</span><strong>${escapeHtml(check.requiredCredential)}</strong></div>
        <div class="eligibility-detail"><span>Status</span><strong>${escapeHtml(check.employeeCredentialStatus)}</strong></div>
        <div class="eligibility-detail"><span>Reason</span><strong>${escapeHtml(check.reason)}</strong></div>
        <div class="eligibility-detail"><span>Admin Action</span><strong>${escapeHtml(check.adminAction)}</strong></div>
      </div>
    </article>
  `).join('') || '<p>No eligibility checks match this filter.</p>';
}

function setFilter(filter) {
  state.filter = filter;
  els.filters.forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.eligibilityFilter === filter)));
  renderList();
}

async function init() {
  try {
    state.data = await loadShiftEligibilityPreview();
    renderSummary(state.data.summary);
    renderRules(state.data.policyChecks);
    renderRequirements(state.data.requirements);
    renderBuilderPreview();
    renderList();
    els.filters.forEach((button) => button.addEventListener('click', () => setFilter(button.dataset.eligibilityFilter)));
    Object.values(els.builder).forEach((control) => control.addEventListener('change', renderBuilderPreview));
  } catch (error) {
    console.error(error);
    els.status.textContent = 'Qualification & Eligibility preview failed to load.';
  }
}

init();
