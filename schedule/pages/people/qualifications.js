/*
Signal Labs Tool File: schedule/pages/people/qualifications.js
Version: v5.1.0
Purpose: Render Qualifications & Certification Engine preview with license numbers, notes, and role-based panels.
*/
import { JsonQualificationsCertificationAdapter } from '../../adapters/JsonQualificationsCertificationAdapter.js';
import { QualificationsCertificationRepository } from '../../repositories/QualificationsCertificationRepository.js';
import { QualificationsCertificationService } from '../../services/QualificationsCertificationService.js';

const adapter = new JsonQualificationsCertificationAdapter();
const repository = new QualificationsCertificationRepository(adapter);
const service = new QualificationsCertificationService(repository);
const state = { data: null, role: 'supervisor' };
const $ = (selector) => document.querySelector(selector);
const text = (value, fallback = '—') => value === undefined || value === null || value === '' ? fallback : String(value);
const title = (value) => text(value).replaceAll('_', ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());

function setRole(role) {
  state.role = role;
  const shell = $('[data-qual-shell]');
  shell?.setAttribute('data-active-role', role);
  document.querySelectorAll('[data-qual-role]').forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.qualRole === role)));
  const current = $('[data-current-role]');
  if (current) current.textContent = title(role);
  renderCredentials();
  renderRolePanels();
}

function renderSummary(data) {
  $('[data-qual-summary]').innerHTML = Object.entries(data.summary || {}).map(([key, value]) => `<div class="qual-stat"><strong>${text(value)}</strong><span>${title(key)}</span></div>`).join('');
}

function renderPolicy(data) {
  const policy = data.policyProfile || {};
  $('[data-qual-policy]').innerHTML = `<article><strong>${text(policy.name)}</strong><p>Default license number policy: <b>${title(policy.licenseNumberDefault)}</b></p><p>Warning windows: ${Array.isArray(policy.defaultWarningDays) ? policy.defaultWarningDays.join('/ ') : text(policy.defaultWarningDays)} days</p><p>Notes visibility: ${title(policy.notesVisibility)}</p></article>`;
}

function renderCredential(record) {
  const showProtected = state.role !== 'employee' || record.visibility === 'employee';
  const license = showProtected ? text(record.licenseNumber, 'Not entered') : 'Protected';
  const notes = showProtected ? text(record.notes, 'No notes') : 'Hidden from employee view';
  return `<article class="qual-record is-${text(record.status)}"><div class="qual-record-top"><div><strong>${text(record.employeeName)} · ${text(record.qualification)}</strong><p>${text(record.category)} · Expires ${text(record.expirationDate, 'No expiration')}</p></div><span class="qual-badge is-${text(record.status)}">${title(record.status)}</span></div><div class="qual-detail-grid"><span><b>License #</b>${license}</span><span><b>Certificate #</b>${showProtected ? text(record.certificateNumber, 'Not entered') : 'Protected'}</span><span><b>Issuer</b>${showProtected ? text(record.issuingAuthority, 'Not entered') : 'Protected'}</span><span><b>Days</b>${text(record.daysUntilExpiration)}</span></div><p class="qual-note">${notes}</p></article>`;
}

function renderCredentials() {
  if (!state.data) return;
  const visible = (state.data.employeeCredentials || []).filter((record) => service.visibleForRole(record, state.role));
  $('[data-qual-count]').textContent = `${visible.length} visible`;
  const grouped = service.groupByStatus(visible);
  const order = ['expired', 'missing_license_number', 'expiring_soon', 'active'];
  $('[data-qual-records]').innerHTML = order.filter((key) => grouped[key]?.length).map((key) => `<section class="qual-group"><h3>${title(key)} (${grouped[key].length})</h3>${grouped[key].map(renderCredential).join('')}</section>`).join('') || '<p>No credentials visible for this role.</p>';
}

function renderWarnings(data) {
  $('[data-qual-warnings]').innerHTML = (data.expirationWarnings || []).map((item) => `<article class="qual-warning"><strong>${text(item.employeeName)} · ${text(item.qualification)}</strong><p>${text(item.daysUntilExpiration)} days · ${title(item.warningLevel)}</p><span>${text(item.recommendedAction)}</span></article>`).join('');
}

function renderRequirements(data) {
  $('[data-qual-requirements]').innerHTML = (data.roleRequirements || []).map((item) => `<article class="qual-requirement"><strong>${text(item.role)} · ${text(item.spotType)}</strong><p>Required: ${(item.requiredQualifications || []).join(', ') || '—'}</p><span>${text(item.assignmentGeneratorImpact)}</span></article>`).join('');
}

function renderTypes(data) {
  $('[data-qual-types]').innerHTML = (data.qualificationTypes || []).map((item) => `<article class="qual-type"><strong>${text(item.name)}</strong><p>${text(item.category)} · License number: <b>${title(item.licenseNumberRequirement)}</b></p><p>Expiration required: ${item.expirationRequired ? 'Yes' : 'No'} · Warning: ${text(item.defaultWarningDays)} days</p><span>${text(item.notes)}</span></article>`).join('');
}

function renderRolePanels() {
  if (!state.data) return;
  const roleRank = { employee: 1, supervisor: 2, admin: 3 };
  const activeRank = roleRank[state.role] || 1;
  $('[data-qual-role-panels]').innerHTML = (state.data.rolePanels || []).map((panel) => {
    const panelRank = roleRank[panel.role] || 1;
    const visible = activeRank >= panelRank;
    return `<article class="qual-role-panel ${visible ? 'is-visible' : 'is-hidden'}"><strong>${text(panel.label)}</strong><p>${visible ? 'Visible in this role preview.' : 'Hidden until role allows it.'}</p><div><h4>Visible</h4><ul>${(panel.visibleItems || []).map((item) => `<li>${text(item)}</li>`).join('')}</ul></div>${(panel.hiddenItems || []).length ? `<div><h4>Hidden/Protected</h4><ul>${panel.hiddenItems.map((item) => `<li>${text(item)}</li>`).join('')}</ul></div>` : ''}</article>`;
  }).join('');
}

function renderIntegrations(data) {
  $('[data-qual-integrations]').innerHTML = (data.integrationChecks || []).map((item) => `<article class="qual-integration"><strong>${text(item.module)}</strong><p>${text(item.description)}</p><span class="qual-badge is-${text(item.status)}">${title(item.status)}</span></article>`).join('');
}

function renderRules(data) {
  $('[data-qual-rules]').innerHTML = (data.rules || []).map((rule) => `<li>${text(rule)}</li>`).join('');
}

async function init() {
  try {
    state.data = await service.getPreview();
    renderSummary(state.data);
    renderPolicy(state.data);
    renderWarnings(state.data);
    renderRequirements(state.data);
    renderTypes(state.data);
    renderIntegrations(state.data);
    renderRules(state.data);
    setRole(state.role);
    $('[data-qual-status]').textContent = 'Qualifications & Certifications preview loaded.';
  } catch (error) {
    console.error(error);
    $('[data-qual-status]').textContent = `Unable to load Qualifications preview: ${error.message}`;
  }
}

document.querySelectorAll('[data-qual-role]').forEach((button) => button.addEventListener('click', () => setRole(button.dataset.qualRole || 'employee')));
init();
