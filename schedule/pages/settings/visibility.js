/*
Signal Labs
Area: Signal Schedule
File: schedule/pages/settings/visibility.js
Version: v5.1.0
Purpose: Render Schedule Visibility & Privacy Controls preview data.
*/
const DATA_URL = 'data/visibility-privacy-preview.json?v=3.8.0';
const state = { data: null };

init();

async function init() {
  const status = document.querySelector('[data-visibility-status]');
  try {
    const response = await fetch(DATA_URL, { cache: 'no-store' });
    if (!response.ok) throw new Error(`Preview data returned ${response.status}`);
    state.data = await response.json();
    render(state.data);
    if (status) status.textContent = 'Preview data loaded. Policies are read-only until authentication and write workflows are added.';
  } catch (error) {
    if (status) status.textContent = `Unable to load visibility preview: ${error.message}`;
  }
}

function render(data) {
  renderSummary(data.summary || {});
  renderGroups(data.userGroups || []);
  renderScheduleRules(data.scheduleVisibilityRules || []);
  renderLeaveRules(data.leaveVisibilityRules || []);
  renderExamples(data.displayExamples || []);
  renderList('[data-admin-controls]', data.adminControls || []);
  renderList('[data-visibility-rules]', data.rules || []);
}

function renderSummary(summary) {
  const target = document.querySelector('[data-visibility-summary]');
  if (!target) return;
  const rows = [
    ['Groups', summary.groups || 0],
    ['Schedule rules', summary.scheduleRules || 0],
    ['Leave rules', summary.leaveRules || 0],
    ['Sensitive hidden', summary.hiddenSensitiveTypes || 0]
  ];
  target.innerHTML = rows.map(([label, value]) => `<div class="visibility-stat"><strong>${escapeHtml(value)}</strong><span>${escapeHtml(label)}</span></div>`).join('');
}

function renderGroups(groups) {
  const target = document.querySelector('[data-user-groups]');
  if (!target) return;
  target.innerHTML = groups.map((group) => `<li><strong>${escapeHtml(group.label)}</strong><span>${escapeHtml(group.description)}</span></li>`).join('');
}

function renderScheduleRules(rules) {
  const target = document.querySelector('[data-schedule-rules]');
  if (!target) return;
  target.innerHTML = makeTable(['Viewer', 'Target', 'Visibility', 'Exact Times', 'Notes', 'Description'], rules.map((rule) => [
    rule.subjectGroup,
    rule.targetGroup,
    visibilityPill(rule.visibility),
    yesNo(rule.showsExactTimes),
    yesNo(rule.notesVisible),
    rule.description
  ]));
}

function renderLeaveRules(rules) {
  const target = document.querySelector('[data-leave-rules]');
  if (!target) return;
  target.innerHTML = makeTable(['Leave Type', 'Employee', 'Supervisor', 'Admin', 'Sensitive'], rules.map((rule) => [
    rule.leaveType,
    visibilityPill(rule.employeeView),
    visibilityPill(rule.supervisorView),
    visibilityPill(rule.adminView),
    rule.sensitive ? '<span class="visibility-pill visibility-pill--hidden">Sensitive</span>' : '<span class="visibility-pill">Standard</span>'
  ]));
}

function renderExamples(examples) {
  const target = document.querySelector('[data-display-examples]');
  if (!target) return;
  target.innerHTML = examples.map((example) => `<div class="visibility-example"><strong>${escapeHtml(example.scenario)}</strong><span>Shown: ${escapeHtml(example.output)}</span><span>Hidden: ${escapeHtml(example.hidden)}</span></div>`).join('');
}

function renderList(selector, items) {
  const target = document.querySelector(selector);
  if (!target) return;
  target.innerHTML = items.map((item) => `<li><span>${escapeHtml(item)}</span></li>`).join('');
}

function makeTable(headers, rows) {
  return `<div class="visibility-table-wrap"><table class="visibility-table"><thead><tr>${headers.map((h) => `<th>${escapeHtml(h)}</th>`).join('')}</tr></thead><tbody>${rows.map((row) => `<tr>${row.map((cell) => `<td>${String(cell).startsWith('<') ? cell : escapeHtml(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}

function visibilityPill(value) {
  const key = String(value || '').replace(/_/g, '-');
  const label = String(value || 'unknown').replace(/_/g, ' ');
  const cls = key.includes('full') || key.includes('show-type') ? 'visibility-pill--full' : key.includes('hours') ? 'visibility-pill--hours' : key.includes('off') ? 'visibility-pill--off' : key.includes('hidden') ? 'visibility-pill--hidden' : '';
  return `<span class="visibility-pill ${cls}">${escapeHtml(label)}</span>`;
}

function yesNo(value) {
  return value ? '<span class="visibility-pill visibility-pill--full">Yes</span>' : '<span class="visibility-pill visibility-pill--hidden">No</span>';
}

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
}
