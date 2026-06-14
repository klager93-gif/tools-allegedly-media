/*
Signal Labs Tool File: schedule/pages/people/seniority.js
Version: v5.1.0
Purpose: Seniority Engine preview UI.
*/
import { JsonSeniorityEngineAdapter } from '../../adapters/JsonSeniorityEngineAdapter.js';
import { SeniorityEngineRepository } from '../../repositories/SeniorityEngineRepository.js';
import { SeniorityEngineService } from '../../services/SeniorityEngineService.js';

const adapter = new JsonSeniorityEngineAdapter();
const repository = new SeniorityEngineRepository(adapter);
const service = new SeniorityEngineService(repository);

let seniorityData = null;
let activeFilter = 'all';

function text(value, fallback = '—') {
  return value === undefined || value === null || value === '' ? fallback : String(value);
}

function formatRank(employee, key) {
  const rank = employee?.ranks?.[key];
  return rank ? `#${rank}` : '—';
}

function renderSummary(data) {
  const summary = service.summarize(data);
  const node = document.querySelector('[data-seniority-summary]');
  if (!node) return;
  node.innerHTML = `
    <div class="seniority-stat"><strong>${summary.employees || 0}</strong><span>Employees</span></div>
    <div class="seniority-stat"><strong>${summary.activeLists || 0}</strong><span>Active Lists</span></div>
    <div class="seniority-stat"><strong>${summary.frozenLists || 0}</strong><span>Frozen Lists</span></div>
    <div class="seniority-stat"><strong>${summary.pendingOverrides || 0}</strong><span>Overrides</span></div>
  `;
}

function getScenarioKey() {
  return document.querySelector('[data-seniority-scenario]')?.value || 'vacation_pick';
}

function getRankType() {
  return document.querySelector('[data-seniority-rank-type]')?.value || 'overall';
}

function getDirection() {
  return document.querySelector('[data-seniority-direction]')?.value || 'highest_seniority_first';
}

function renderCard(employee) {
  const scenarioKey = getScenarioKey();
  const override = service.getEmployeeOverride(seniorityData?.overrides || [], employee.employeeId, scenarioKey);
  const overrideClass = override ? ' seniority-card--skipped' : '';
  const visibleReason = override?.employeeVisible ? override.reason : 'Admin/supervisor only';
  return `
    <article class="seniority-card seniority-card--${text(employee.status, 'unknown')}${overrideClass}">
      <div class="seniority-card__top"><span>${text(employee.role)} · ${text(employee.shiftGroup)}</span><span>${text(employee.status)}</span></div>
      <h3>${text(employee.displayName)} <small>${text(employee.employeeCode)}</small></h3>
      <p>${override ? `Override/Hold: ${text(visibleReason)}` : `Ranked by ${text(getRankType())} seniority for this preview.`}</p>
      <dl>
        <div><dt>Overall</dt><dd>${formatRank(employee, 'overall')}</dd></div>
        <div><dt>Class</dt><dd>${formatRank(employee, 'classification')}</dd></div>
        <div><dt>Shift</dt><dd>${formatRank(employee, 'shift')}</dd></div>
        <div><dt>Hire Date</dt><dd>${text(employee.hireDate)}</dd></div>
        <div><dt>Class Date</dt><dd>${text(employee.classificationDate)}</dd></div>
        <div><dt>Rank Date</dt><dd>${text(employee.rankDate)}</dd></div>
        <div><dt>Years</dt><dd>${text(employee.yearsOfService)}</dd></div>
        <div><dt>Badge</dt><dd>${text(employee.badgeNumber)}</dd></div>
      </dl>
      <div class="seniority-tags">
        <span>${text(employee.department)}</span>
        <span>${text(employee.rank)}</span>
        ${override ? `<span>${text(override.status)} · ${text(override.scope)}</span>` : '<span>No active scenario override</span>'}
      </div>
    </article>
  `;
}

function renderList() {
  const list = document.querySelector('[data-seniority-list]');
  const count = document.querySelector('[data-seniority-count]');
  if (!list || !seniorityData) return;
  const filtered = service.filterEmployees(seniorityData.employees || [], activeFilter);
  const ordered = service.orderEmployees(filtered, getRankType(), getDirection());
  if (count) count.textContent = `${ordered.length} shown`;
  list.innerHTML = ordered.map(renderCard).join('') || '<p class="empty-state">No employees match this filter.</p>';
}

function renderAudit(data) {
  const node = document.querySelector('[data-seniority-audit]');
  if (!node) return;
  node.innerHTML = (data.audit || []).map(row => `
    <article>
      <strong>${text(row.action)}</strong>
      <p>${text(row.actor)} · ${text(row.timestamp)}</p>
      <p>${text(row.details)}</p>
    </article>
  `).join('');
}

function setupFilters() {
  document.querySelectorAll('[data-seniority-filter]').forEach(button => {
    button.addEventListener('click', () => {
      activeFilter = button.dataset.seniorityFilter || 'all';
      document.querySelectorAll('[data-seniority-filter]').forEach(item => item.setAttribute('aria-pressed', item === button ? 'true' : 'false'));
      renderList();
      renderBuilderPreview();
    });
  });
}

function renderBuilderPreview() {
  const preview = document.querySelector('[data-seniority-builder-preview]');
  if (!preview || !seniorityData) return;
  const scenarioKey = getScenarioKey();
  const scenario = (seniorityData.scenarios || []).find(item => item.key === scenarioKey);
  const rankType = getRankType();
  const direction = getDirection();
  const filtered = service.filterEmployees(seniorityData.employees || [], activeFilter);
  const ordered = service.orderEmployees(filtered, rankType, direction);
  const first = ordered[0];
  const policy = seniorityData.policyProfile || {};
  preview.innerHTML = `
    <strong>${text(scenario?.label, scenarioKey)} · ${text(rankType)} · ${text(direction).replaceAll('_', ' ')}</strong>
    <span>${ordered.length} employee records included after current filter. Default agency list: ${text(policy.defaultList)}.</span>
    <small>${first ? `Recommended first by this preview: ${text(first.displayName)} (${formatRank(first, rankType)}).` : 'No employee found for this scenario.'}</small>
    <small>Tie breakers: ${(scenario?.tieBreakers || policy.tieBreakers || []).map(text).join(' → ')}</small>
  `;
  renderList();
}

function setupBuilderPreview() {
  document.querySelectorAll('[data-seniority-scenario], [data-seniority-rank-type], [data-seniority-direction]').forEach(input => input.addEventListener('input', renderBuilderPreview));
}

function renderRankTypes(data) {
  const grid = document.querySelector('.seniority-code-grid');
  if (!grid || !data.rankTypes) return;
  grid.innerHTML = data.rankTypes.map(type => `<span><strong>${text(type.label)}</strong> ${text(type.description)}</span>`).join('');
}

async function init() {
  setupFilters();
  setupBuilderPreview();
  const status = document.querySelector('[data-seniority-status-line]');
  try {
    seniorityData = await service.getPreview();
    renderSummary(seniorityData);
    renderAudit(seniorityData);
    renderRankTypes(seniorityData);
    renderBuilderPreview();
    if (status) status.textContent = 'Seniority Engine preview data loaded.';
  } catch (error) {
    if (status) status.textContent = `Unable to load Seniority Engine preview data: ${error.message}`;
  }
}

init();
