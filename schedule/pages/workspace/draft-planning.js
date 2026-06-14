/*
Signal Labs
Area: Signal Schedule
File: schedule/pages/workspace/draft-planning.js
Version: v5.1.0
Purpose: Draft planning preview interactions for staged moves, drag handles, inspector, and publish checklist.
*/
const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
const rows = [
  { role: 'Supervisor', spot: 'S1', cells: ['Morgan Price','Morgan Price','Open','Jordan Ellis','Jordan Ellis','Open','Open'] },
  { role: 'Dispatcher', spot: 'D1', cells: ['Jamie Carter','Jamie Carter','Jamie Carter','Leave','Chris Nolan','Chris Nolan','Chris Nolan'] },
  { role: 'Dispatcher', spot: 'D2', cells: ['Chris Nolan','Open','Taylor Reed','Taylor Reed','Blocked','Taylor Reed','Open'] },
  { role: 'Call Taker', spot: 'C1', cells: ['Taylor Reed','Jordan Ellis','Open','Warning','Jamie Carter','Open','Morgan Price'] },
  { role: 'Fire Radio', spot: 'F1', cells: ['Open','Chris Nolan','Chris Nolan','Open','Blocked','Jordan Ellis','Jordan Ellis'] }
];
let previewData = null;
const gridBody = document.querySelector('[data-draft-grid] tbody');
const queueBody = document.querySelector('[data-draft-move-queue]');
const checklist = document.querySelector('[data-draft-checklist]');
const inspector = document.querySelector('[data-draft-inspector]');

init();

async function init() {
  try {
    const response = await fetch('../../data/draft-planning-preview.json', { cache: 'no-store' });
    previewData = await response.json();
  } catch (_error) {
    previewData = { moveQueue: [], publishChecklist: [] };
  }
  renderGrid();
  renderMoveQueue();
  renderChecklist();
}

function renderGrid() {
  if (!gridBody) return;
  gridBody.innerHTML = rows.map((row) => `
    <tr>
      <td class="workspace-role-cell">${escapeHtml(row.role)}<span>${escapeHtml(row.spot)}</span></td>
      ${row.cells.map((cell, dayIndex) => renderCell(row, cell, dayIndex)).join('')}
    </tr>`).join('');
  document.querySelectorAll('[data-draft-cell]').forEach((button) => {
    button.addEventListener('click', () => inspectCell(button));
    button.addEventListener('dragstart', (event) => {
      button.classList.add('is-drag-preview');
      event.dataTransfer.setData('text/plain', button.dataset.label || 'Assignment');
    });
    button.addEventListener('dragend', () => button.classList.remove('is-drag-preview'));
  });
}

function renderCell(row, cell, dayIndex) {
  const state = cell === 'Open' ? 'open' : cell === 'Blocked' ? 'conflict' : cell === 'Warning' ? 'warning' : cell === 'Leave' ? 'leave' : 'assigned';
  const label = state === 'open' ? 'Open spot' : state === 'conflict' ? 'Blocked move' : state === 'warning' ? 'Warning' : state === 'leave' ? 'Leave' : cell;
  const meta = state === 'assigned' ? 'Drag handle · Pattern' : state === 'open' ? 'Drop target' : state === 'warning' ? 'Coverage warning' : state === 'leave' ? 'Approved leave' : 'Conflict blocks publish';
  return `<td><button draggable="true" type="button" class="workspace-assignment draft-cell workspace-assignment--${state}" data-draft-cell data-role="${escapeHtml(row.role)}" data-spot="${escapeHtml(row.spot)}" data-day="${days[dayIndex]}" data-state="${state}" data-label="${escapeHtml(label)}" data-meta="${escapeHtml(meta)}"><strong>${escapeHtml(label)}</strong><span>${escapeHtml(meta)}</span></button></td>`;
}

function renderMoveQueue() {
  if (!queueBody) return;
  const moves = previewData.moveQueue || [];
  queueBody.innerHTML = moves.map((move) => `<tr data-draft-move="${escapeHtml(move.id)}"><td>${escapeHtml(move.employee)}</td><td>${escapeHtml(move.from)}</td><td>${escapeHtml(move.to)}</td><td><span class="schedule-status-pill ${statusClass(move.status)}">${escapeHtml(move.status)}</span></td></tr>`).join('');
  queueBody.querySelectorAll('[data-draft-move]').forEach((row) => {
    row.addEventListener('click', () => inspectMove(row.dataset.draftMove));
  });
}

function renderChecklist() {
  if (!checklist) return;
  const items = previewData.publishChecklist || [];
  checklist.className = 'draft-checklist';
  checklist.innerHTML = items.map((item) => `<div class="draft-check-item"><span class="schedule-status-pill ${statusClass(item.status)}">${escapeHtml(item.status)}</span><strong>${escapeHtml(item.label)}</strong><span>${escapeHtml(item.detail)}</span></div>`).join('');
}

function inspectCell(button) {
  document.querySelectorAll('[data-draft-cell]').forEach((item) => item.classList.remove('is-selected'));
  button.classList.add('is-selected');
  if (!inspector) return;
  inspector.innerHTML = `
    <span class="schedule-status-pill ${statusClass(button.dataset.state)}">${escapeHtml(button.dataset.state)}</span>
    <div class="workspace-detail-list">
      <div class="workspace-detail-row"><span>Selection</span><strong>${escapeHtml(button.dataset.label)}</strong></div>
      <div class="workspace-detail-row"><span>Day</span><strong>${escapeHtml(button.dataset.day)}</strong></div>
      <div class="workspace-detail-row"><span>Role</span><strong>${escapeHtml(button.dataset.role)} ${escapeHtml(button.dataset.spot)}</strong></div>
      <div class="workspace-detail-row"><span>Draft behavior</span><strong>${escapeHtml(button.dataset.meta)}</strong></div>
    </div>
    <div class="workspace-empty-state">Preview: future authenticated writes will stage the move, re-run conflicts, and update the publish checklist.</div>`;
}

function inspectMove(id) {
  const move = (previewData.moveQueue || []).find((item) => item.id === id);
  if (!move || !inspector) return;
  inspector.innerHTML = `
    <span class="schedule-status-pill ${statusClass(move.status)}">${escapeHtml(move.status)}</span>
    <div class="workspace-detail-list">
      <div class="workspace-detail-row"><span>Employee</span><strong>${escapeHtml(move.employee)}</strong></div>
      <div class="workspace-detail-row"><span>From</span><strong>${escapeHtml(move.from)}</strong></div>
      <div class="workspace-detail-row"><span>To</span><strong>${escapeHtml(move.to)}</strong></div>
      <div class="workspace-detail-row"><span>Impact</span><strong>${escapeHtml(move.impact)}</strong></div>
    </div>`;
}

function statusClass(status) {
  if (status === 'ready' || status === 'assigned') return 'schedule-status-pill--success';
  if (status === 'warning' || status === 'open' || status === 'failed') return 'schedule-status-pill--warning';
  if (status === 'blocked' || status === 'conflict') return 'schedule-status-pill--danger';
  return '';
}

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>'"]/g, (char) => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
}
