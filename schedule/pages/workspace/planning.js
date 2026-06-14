/*
Signal Labs
Area: Signal Schedule
File: schedule/pages/workspace/planning.js
Version: v5.1.0
Purpose: Schedule planning and forecast horizon preview rendering.
*/
let planningData = null;
const summaryEl = document.querySelector('[data-planning-summary]');
const runsEl = document.querySelector('[data-planning-runs]');
const issuesEl = document.querySelector('[data-planning-issues]');
const actionsEl = document.querySelector('[data-planning-actions]');
const heatmapEl = document.querySelector('[data-planning-heatmap]');
const inspectorEl = document.querySelector('[data-planning-inspector]');

init();

async function init() {
  try {
    const response = await fetch('../../data/schedule-planning-preview.json', { cache: 'no-store' });
    planningData = await response.json();
  } catch (_error) {
    planningData = { summary: {}, forecastRuns: [], forecastIssues: [], recommendedActions: [], heatmap: [] };
  }
  renderSummary();
  renderRuns();
  renderIssues();
  renderActions();
  renderHeatmap();
}

function renderSummary() {
  if (!summaryEl) return;
  const s = planningData.summary || {};
  const stats = [
    ['Horizon', s.horizon || 'Not set'],
    ['Days', s.coverageDays ?? 0],
    ['Open spots', s.openSpots ?? 0],
    ['Conflicts', s.conflicts ?? 0],
    ['OT posts', s.recommendedOtPosts ?? 0],
    ['Mandates', s.likelyMandates ?? 0]
  ];
  summaryEl.innerHTML = stats.map(([label, value]) => `<div class="planning-stat"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`).join('');
}

function renderRuns() {
  if (!runsEl) return;
  const runs = planningData.forecastRuns || [];
  runsEl.innerHTML = runs.map((run) => `<tr data-planning-run="${escapeHtml(run.id)}"><td>${escapeHtml(run.name)}</td><td>${escapeHtml(run.range)}</td><td><span class="schedule-status-pill ${statusClass(run.status)}">${escapeHtml(run.status)}</span></td><td>${escapeHtml(run.issues)}</td><td>${escapeHtml(run.owner)}</td></tr>`).join('');
  runsEl.querySelectorAll('[data-planning-run]').forEach((row) => row.addEventListener('click', () => inspectRun(row.dataset.planningRun, row)));
}

function renderIssues() {
  if (!issuesEl) return;
  const issues = planningData.forecastIssues || [];
  issuesEl.innerHTML = issues.map((issue, index) => `<tr data-planning-issue="${index}"><td>${escapeHtml(issue.date)}</td><td>${escapeHtml(issue.window)}</td><td>${escapeHtml(issue.type)}</td><td><span class="schedule-status-pill ${statusClass(issue.severity)}">${escapeHtml(issue.severity)}</span></td><td>${escapeHtml(issue.recommendation)}</td></tr>`).join('');
  issuesEl.querySelectorAll('[data-planning-issue]').forEach((row) => row.addEventListener('click', () => inspectIssue(Number(row.dataset.planningIssue))));
}

function renderActions() {
  if (!actionsEl) return;
  const actions = planningData.recommendedActions || [];
  actionsEl.innerHTML = actions.map((action, index) => `<button type="button" class="planning-action" data-planning-action-row="${index}"><span class="schedule-status-pill ${statusClass(action.status)}">${escapeHtml(action.count)}</span><span><strong>${escapeHtml(action.action)}</strong><span>${escapeHtml(action.detail)}</span></span></button>`).join('');
  actionsEl.querySelectorAll('[data-planning-action-row]').forEach((button) => button.addEventListener('click', () => inspectAction(Number(button.dataset.planningActionRow))));
}

function renderHeatmap() {
  if (!heatmapEl) return;
  const heatmap = planningData.heatmap || [];
  heatmapEl.innerHTML = heatmap.map((week) => `<div class="planning-heatmap__week planning-risk--${escapeHtml(week.risk)}"><strong>${escapeHtml(week.week)}</strong><span>Risk: ${escapeHtml(week.risk)}</span><span>Open spots: ${escapeHtml(week.openSpots)}</span><span>Conflicts: ${escapeHtml(week.conflicts)}</span></div>`).join('');
}

function inspectRun(id, row) {
  document.querySelectorAll('[data-planning-run]').forEach((item) => item.classList.remove('is-selected'));
  if (row) row.classList.add('is-selected');
  const run = (planningData.forecastRuns || []).find((item) => item.id === id);
  if (!run || !inspectorEl) return;
  inspectorEl.innerHTML = `<span class="schedule-status-pill ${statusClass(run.status)}">${escapeHtml(run.status)}</span><div class="workspace-detail-list"><div class="workspace-detail-row"><span>Run</span><strong>${escapeHtml(run.name)}</strong></div><div class="workspace-detail-row"><span>Range</span><strong>${escapeHtml(run.range)}</strong></div><div class="workspace-detail-row"><span>Issues</span><strong>${escapeHtml(run.issues)}</strong></div><div class="workspace-detail-row"><span>Owner</span><strong>${escapeHtml(run.owner)}</strong></div></div><div class="workspace-empty-state">Preview: future builds will generate draft assignments and route unresolved risks into OT, mandate, conflict, and approval queues.</div>`;
}

function inspectIssue(index) {
  const issue = (planningData.forecastIssues || [])[index];
  if (!issue || !inspectorEl) return;
  inspectorEl.innerHTML = `<span class="schedule-status-pill ${statusClass(issue.severity)}">${escapeHtml(issue.severity)}</span><div class="workspace-detail-list"><div class="workspace-detail-row"><span>Date</span><strong>${escapeHtml(issue.date)}</strong></div><div class="workspace-detail-row"><span>Window</span><strong>${escapeHtml(issue.window)}</strong></div><div class="workspace-detail-row"><span>Issue</span><strong>${escapeHtml(issue.type)}</strong></div><div class="workspace-detail-row"><span>Detail</span><strong>${escapeHtml(issue.detail)}</strong></div><div class="workspace-detail-row"><span>Recommendation</span><strong>${escapeHtml(issue.recommendation)}</strong></div></div>`;
}

function inspectAction(index) {
  const action = (planningData.recommendedActions || [])[index];
  if (!action || !inspectorEl) return;
  inspectorEl.innerHTML = `<span class="schedule-status-pill ${statusClass(action.status)}">${escapeHtml(action.status)}</span><div class="workspace-detail-list"><div class="workspace-detail-row"><span>Action</span><strong>${escapeHtml(action.action)}</strong></div><div class="workspace-detail-row"><span>Count</span><strong>${escapeHtml(action.count)}</strong></div><div class="workspace-detail-row"><span>Detail</span><strong>${escapeHtml(action.detail)}</strong></div></div>`;
}

function statusClass(status) {
  const value = String(status || '').toLowerCase();
  if (['ready','recommended','low','complete'].includes(value)) return 'schedule-status-pill--success';
  if (['watch','warning','medium','needs review'].includes(value)) return 'schedule-status-pill--warning';
  if (['critical','high','high risk','blocked'].includes(value)) return 'schedule-status-pill--danger';
  return '';
}

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>'"]/g, (char) => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
}
