/*
Signal Labs Tool File: schedule/pages/workspace/assignment-generator.js
Version: v5.1.0
Purpose: Render Assignment Generator Foundation preview with role-based panels.
*/
import { JsonAssignmentGeneratorAdapter } from '../../adapters/JsonAssignmentGeneratorAdapter.js';
import { AssignmentGeneratorRepository } from '../../repositories/AssignmentGeneratorRepository.js';
import { AssignmentGeneratorService } from '../../services/AssignmentGeneratorService.js';

const adapter = new JsonAssignmentGeneratorAdapter();
const repository = new AssignmentGeneratorRepository(adapter);
const service = new AssignmentGeneratorService(repository);
const state = { data: null, role: 'supervisor' };
const $ = (selector) => document.querySelector(selector);
const text = (value, fallback = '—') => value === undefined || value === null || value === '' ? fallback : String(value);
const title = (value) => text(value).replaceAll('_', ' ').replace(/\w/g, (letter) => letter.toUpperCase());

function setRole(role) {
  state.role = role;
  const shell = $('[data-generator-shell]');
  shell?.setAttribute('data-active-role', role);
  document.querySelectorAll('[data-generator-role]').forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.generatorRole === role)));
  const current = $('[data-current-role]');
  if (current) current.textContent = title(role);
  renderRolePanels();
}

function renderSummary(data) {
  const summary = data.summary || {};
  $('[data-generator-summary]').innerHTML = Object.entries(summary).map(([key, value]) => `<div class="generator-stat"><strong>${text(value)}</strong><span>${title(key)}</span></div>`).join('');
}

function renderInputs(data) {
  $('[data-generator-inputs]').innerHTML = (data.inputs || []).map((item) => `<article class="generator-input"><strong>${text(item.label)}</strong><p>${text(item.description)}</p><span class="generator-badge is-${text(item.status)}">${title(item.status)}</span></article>`).join('');
}

function renderDraft(draft) {
  const conflicts = draft.conflicts || [];
  return `<article class="generator-draft is-${text(draft.status)}"><div><strong>${text(draft.spotCode)} · ${text(draft.role)} · ${text(draft.employee)}</strong><p>${text(draft.date)} · ${text(draft.shift)} · ${text(draft.time)}</p></div><div class="generator-draft-meta"><span>${title(draft.source)}</span><span>${title(draft.coverageImpact)}</span><span>${title(draft.status)}</span></div>${conflicts.length ? `<ul>${conflicts.map((item) => `<li>${text(item)}</li>`).join('')}</ul>` : '<p>No conflicts flagged.</p>'}</article>`;
}

function renderRuns(data) {
  const grouped = service.groupDraftsByRun(data.drafts || []);
  $('[data-generator-run-count]').textContent = `${(data.runs || []).length} runs`;
  $('[data-generator-runs]').innerHTML = (data.runs || []).map((run) => `<article class="generator-run"><div class="generator-run-top"><div><h3>${text(run.label)}</h3><p>${text(run.dateRange)} · ${text(run.createdBy)} · ${new Date(run.createdAt).toLocaleString()}</p></div><span class="generator-badge is-${text(run.status)}">${title(run.status)}</span></div><p>${text(run.notes)}</p><div class="generator-drafts">${(grouped[run.id] || []).map(renderDraft).join('')}</div></article>`).join('');
}

function renderRolePanels() {
  if (!state.data) return;
  const roleRank = { employee: 1, supervisor: 2, admin: 3 };
  const activeRank = roleRank[state.role] || 1;
  $('[data-generator-role-panels]').innerHTML = (state.data.rolePanels || []).map((panel) => {
    const panelRank = roleRank[panel.role] || 1;
    const visible = activeRank >= panelRank;
    return `<article class="generator-role-panel ${visible ? 'is-visible' : 'is-hidden'}"><strong>${text(panel.label)}</strong><p>${visible ? 'Visible in this role preview.' : 'Hidden until role allows it.'}</p><div><h4>Visible</h4><ul>${(panel.visibleItems || []).map((item) => `<li>${text(item)}</li>`).join('')}</ul></div>${(panel.hiddenItems || []).length ? `<div><h4>Hidden/Protected</h4><ul>${panel.hiddenItems.map((item) => `<li>${text(item)}</li>`).join('')}</ul></div>` : ''}</article>`;
  }).join('');
}

function renderChecklist(data) {
  $('[data-generator-checklist]').innerHTML = (data.publishChecklist || []).map((item) => `<article class="generator-check"><strong>${text(item.item)}</strong><span class="generator-badge is-${text(item.status)}">${title(item.status)}</span></article>`).join('');
}

function renderRules(data) {
  $('[data-generator-rules]').innerHTML = (data.rules || []).map((rule) => `<li>${text(rule)}</li>`).join('');
}

async function init() {
  try {
    state.data = await service.getPreview();
    renderSummary(state.data);
    renderInputs(state.data);
    renderRuns(state.data);
    renderChecklist(state.data);
    renderRules(state.data);
    setRole(state.role);
    $('[data-generator-status]').textContent = 'Assignment Generator preview loaded.';
  } catch (error) {
    console.error(error);
    $('[data-generator-status]').textContent = `Unable to load Assignment Generator preview: ${error.message}`;
  }
}

document.querySelectorAll('[data-generator-role]').forEach((button) => button.addEventListener('click', () => setRole(button.dataset.generatorRole || 'employee')));
init();
