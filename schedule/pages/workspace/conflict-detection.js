/*
Signal Labs Tool File: schedule/pages/workspace/conflict-detection.js
Version: v5.1.0
Purpose: Render Conflict Detection Foundation preview with role-based panels.
*/
import { JsonConflictDetectionAdapter } from '../../adapters/JsonConflictDetectionAdapter.js';
import { ConflictDetectionRepository } from '../../repositories/ConflictDetectionRepository.js';
import { ConflictDetectionService } from '../../services/ConflictDetectionService.js';

const adapter = new JsonConflictDetectionAdapter();
const repository = new ConflictDetectionRepository(adapter);
const service = new ConflictDetectionService(repository);
const state = { data: null, role: 'supervisor' };
const $ = (selector) => document.querySelector(selector);
const text = (value, fallback = '—') => value === undefined || value === null || value === '' ? fallback : String(value);
const title = (value) => text(value).replaceAll('_', ' ').replace(/\w/g, (letter) => letter.toUpperCase());

function setRole(role) {
  state.role = role;
  const shell = $('[data-conflict-shell]');
  shell?.setAttribute('data-active-role', role);
  document.querySelectorAll('[data-conflict-role]').forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.conflictRole === role)));
  const current = $('[data-current-role]');
  if (current) current.textContent = title(role);
  renderConflicts();
  renderRolePanels();
}

function renderSummary(data) {
  $('[data-conflict-summary]').innerHTML = Object.entries(data.summary || {}).map(([key, value]) => `<div class="conflict-stat"><strong>${text(value)}</strong><span>${title(key)}</span></div>`).join('');
}

function renderSources(data) {
  $('[data-conflict-sources]').innerHTML = (data.sources || []).map((item) => `<article class="conflict-source"><strong>${text(item.label)}</strong><p>${text(item.description)}</p><span class="conflict-badge is-${text(item.status)}">${title(item.status)}</span></article>`).join('');
}

function renderConflict(conflict) {
  return `<article class="conflict-record is-${text(conflict.severity)}"><div class="conflict-record-top"><div><strong>${text(conflict.employee)} · ${title(conflict.type)}</strong><p>${text(conflict.date)} · ${text(conflict.shift)} · ${text(conflict.spot)}</p></div><span class="conflict-badge is-${text(conflict.severity)}">${title(conflict.severity)}</span></div><p>${text(conflict.message)}</p><div class="conflict-meta"><span class="conflict-badge is-${text(conflict.status)}">${title(conflict.status)}</span><span>${text(conflict.recommendedAction)}</span></div></article>`;
}

function renderConflicts() {
  if (!state.data) return;
  const visible = (state.data.conflicts || []).filter((conflict) => service.visibleForRole(conflict, state.role));
  const grouped = service.groupBySeverity(visible);
  $('[data-conflict-count]').textContent = `${visible.length} visible`;
  const order = ['critical', 'warning', 'info'];
  $('[data-conflict-groups]').innerHTML = order.filter((key) => grouped[key]?.length).map((key) => `<section class="conflict-group"><h3>${title(key)} (${grouped[key].length})</h3>${grouped[key].map(renderConflict).join('')}</section>`).join('') || '<p>No conflicts visible for this role.</p>';
}

function renderRolePanels() {
  if (!state.data) return;
  const roleRank = { employee: 1, supervisor: 2, admin: 3 };
  const activeRank = roleRank[state.role] || 1;
  $('[data-conflict-role-panels]').innerHTML = (state.data.rolePanels || []).map((panel) => {
    const panelRank = roleRank[panel.role] || 1;
    const visible = activeRank >= panelRank;
    return `<article class="conflict-role-panel ${visible ? 'is-visible' : 'is-hidden'}"><strong>${text(panel.label)}</strong><p>${visible ? 'Visible in this role preview.' : 'Hidden until role allows it.'}</p><div><h4>Visible</h4><ul>${(panel.visibleItems || []).map((item) => `<li>${text(item)}</li>`).join('')}</ul></div>${(panel.hiddenItems || []).length ? `<div><h4>Hidden/Protected</h4><ul>${panel.hiddenItems.map((item) => `<li>${text(item)}</li>`).join('')}</ul></div>` : ''}</article>`;
  }).join('');
}

function renderRuleChecks(data) {
  $('[data-conflict-rule-checks]').innerHTML = (data.ruleChecks || []).map((rule) => `<article class="conflict-rule"><strong>${text(rule.rule)}</strong><p>${title(rule.level)} rule</p><span class="conflict-badge is-${text(rule.status)}">${title(rule.status)}</span></article>`).join('');
}

function renderResolution(data) {
  $('[data-conflict-resolution]').innerHTML = (data.resolutionQueue || []).map((item) => `<article class="conflict-resolution-item"><strong>#${text(item.priority)} · ${text(item.owner)}</strong><p>${text(item.item)}</p><span class="conflict-badge is-${text(item.status)}">${title(item.status)}</span></article>`).join('');
}

function renderRules(data) {
  $('[data-conflict-rules]').innerHTML = (data.rules || []).map((rule) => `<li>${text(rule)}</li>`).join('');
}

async function init() {
  try {
    state.data = await service.getPreview();
    renderSummary(state.data);
    renderSources(state.data);
    renderRuleChecks(state.data);
    renderResolution(state.data);
    renderRules(state.data);
    setRole(state.role);
    $('[data-conflict-status]').textContent = 'Conflict Detection preview loaded.';
  } catch (error) {
    console.error(error);
    $('[data-conflict-status]').textContent = `Unable to load Conflict Detection preview: ${error.message}`;
  }
}

document.querySelectorAll('[data-conflict-role]').forEach((button) => button.addEventListener('click', () => setRole(button.dataset.conflictRole || 'employee')));
init();
