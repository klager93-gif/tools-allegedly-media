/*
Signal Labs
Area: Signal Schedule
File: schedule/pages/workspace/publishing.js
Version: v5.1.0
Purpose: Schedule publishing beta foundation preview rendering.
*/
let publicationData = null;
const summaryEl = document.querySelector('[data-publishing-summary]');
const versionsEl = document.querySelector('[data-publishing-versions]');
const checklistEl = document.querySelector('[data-publishing-checklist]');
const snapshotsEl = document.querySelector('[data-publishing-snapshots]');
const eventsEl = document.querySelector('[data-publishing-events]');
const inspectorEl = document.querySelector('[data-publishing-inspector]');

init();

async function init() {
  try {
    const response = await fetch('data/schedule-publication-preview.json', { cache: 'no-store' });
    publicationData = await response.json();
  } catch (_error) {
    publicationData = { summary: {}, versions: [], checklist: [], snapshots: [], events: [], rules: [] };
  }
  renderSummary();
  renderVersions();
  renderChecklist();
  renderSnapshots();
  renderEvents();
}

function renderSummary() {
  if (!summaryEl) return;
  const s = publicationData.summary || {};
  const stats = [
    ['Current draft', s.currentDraft || 'None'],
    ['Published', s.latestPublished || 'None'],
    ['Changes', s.pendingChanges ?? 0],
    ['Blocked', s.blockedItems ?? 0],
    ['Visibility', s.visibilityGroups ?? 0],
    ['Rollback', s.rollbackPoints ?? 0]
  ];
  summaryEl.innerHTML = stats.map(([label, value]) => `<div class="publishing-stat"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`).join('');
}

function renderVersions() {
  if (!versionsEl) return;
  const versions = publicationData.versions || [];
  versionsEl.innerHTML = versions.map((version) => `<tr data-publishing-version="${escapeHtml(version.id)}"><td>${escapeHtml(version.name)}</td><td>${escapeHtml(version.range)}</td><td><span class="schedule-status-pill ${statusClass(version.status)}">${escapeHtml(version.status)}</span></td><td>${escapeHtml(version.publishedAt)}</td><td>${escapeHtml(version.visibility)}</td></tr>`).join('');
  versionsEl.querySelectorAll('[data-publishing-version]').forEach((row) => row.addEventListener('click', () => inspectVersion(row.dataset.publishingVersion, row)));
}

function renderChecklist() {
  if (!checklistEl) return;
  checklistEl.innerHTML = (publicationData.checklist || []).map((item, index) => `<button type="button" class="publishing-check" data-publishing-check="${index}"><span class="schedule-status-pill ${statusClass(item.status)}">${escapeHtml(item.status)}</span><span><strong>${escapeHtml(item.item)}</strong><span>${escapeHtml(item.detail)}</span></span></button>`).join('');
  checklistEl.querySelectorAll('[data-publishing-check]').forEach((button) => button.addEventListener('click', () => inspectChecklist(Number(button.dataset.publishingCheck))));
}

function renderSnapshots() {
  if (!snapshotsEl) return;
  snapshotsEl.innerHTML = (publicationData.snapshots || []).map((snap) => `<div class="publishing-snapshot"><strong>${escapeHtml(snap.label)}</strong><span>${escapeHtml(snap.source)} · ${escapeHtml(snap.records)} records · ${escapeHtml(snap.createdAt)}</span></div>`).join('');
}

function renderEvents() {
  if (!eventsEl) return;
  eventsEl.innerHTML = (publicationData.events || []).map((event) => `<div class="publishing-event"><strong>${escapeHtml(event.time)} · ${escapeHtml(event.event)}</strong><span>${escapeHtml(event.actor)} — ${escapeHtml(event.detail)}</span></div>`).join('');
}

function inspectVersion(id, row) {
  document.querySelectorAll('[data-publishing-version]').forEach((item) => item.classList.remove('is-selected'));
  if (row) row.classList.add('is-selected');
  const version = (publicationData.versions || []).find((item) => item.id === id);
  if (!version || !inspectorEl) return;
  inspectorEl.innerHTML = `<span class="schedule-status-pill ${statusClass(version.status)}">${escapeHtml(version.status)}</span><div class="workspace-detail-list"><div class="workspace-detail-row"><span>Version</span><strong>${escapeHtml(version.name)}</strong></div><div class="workspace-detail-row"><span>Range</span><strong>${escapeHtml(version.range)}</strong></div><div class="workspace-detail-row"><span>Published</span><strong>${escapeHtml(version.publishedAt)}</strong></div><div class="workspace-detail-row"><span>By</span><strong>${escapeHtml(version.publishedBy)}</strong></div><div class="workspace-detail-row"><span>Visibility</span><strong>${escapeHtml(version.visibility)}</strong></div></div><div class="workspace-empty-state">Preview: future builds will publish immutable snapshots, notify employees, and support rollback events.</div>`;
}

function inspectChecklist(index) {
  const item = (publicationData.checklist || [])[index];
  if (!item || !inspectorEl) return;
  inspectorEl.innerHTML = `<span class="schedule-status-pill ${statusClass(item.status)}">${escapeHtml(item.status)}</span><div class="workspace-detail-list"><div class="workspace-detail-row"><span>Check</span><strong>${escapeHtml(item.item)}</strong></div><div class="workspace-detail-row"><span>Detail</span><strong>${escapeHtml(item.detail)}</strong></div></div>`;
}

function statusClass(status) {
  const value = String(status || '').toLowerCase();
  if (['ready','published','complete'].includes(value)) return 'schedule-status-pill--success';
  if (['ready for review','needs review','draft','queued'].includes(value)) return 'schedule-status-pill--warning';
  if (['blocked','failed','critical'].includes(value)) return 'schedule-status-pill--danger';
  return '';
}

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>'"]/g, (char) => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
}
