/*
Signal Labs
Area: Signal Schedule
File: schedule/pages/workspace/workspace.js
Version: v5.1.0
Purpose: Scheduling Workspace preview data rendering and inspector interactions.
*/
const roleRows = [
  { role: 'Supervisor', spot: 'S1', cells: ['Morgan Price','Morgan Price','Open','Jordan Ellis','Jordan Ellis','Open','Open'] },
  { role: 'Dispatcher', spot: 'D1', cells: ['Jamie Carter','Jamie Carter','Jamie Carter','Leave','Chris Nolan','Chris Nolan','Chris Nolan'] },
  { role: 'Dispatcher', spot: 'D2', cells: ['Chris Nolan','Open','Taylor Reed','Taylor Reed','Conflict','Taylor Reed','Open'] },
  { role: 'Call Taker', spot: 'C1', cells: ['Taylor Reed','Jordan Ellis','Open','Open','Jamie Carter','Open','Morgan Price'] },
  { role: 'Fire Radio', spot: 'F1', cells: ['Open','Chris Nolan','Chris Nolan','Open','Open','Jordan Ellis','Jordan Ellis'] }
];
const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
const queues = [
  ['Conflicts', '4', 'High', 'Review before publish'],
  ['Open spots', '7', 'Medium', 'Post OT or fill manually'],
  ['Approvals', '5', 'Medium', 'Supervisor queue'],
  ['Mandation candidates', '3', 'Watch', 'Only after OT window']
];
const gridBody = document.querySelector('[data-workspace-grid] tbody');
const inspectorTitle = document.getElementById('workspaceInspectorTitle');
const inspectorBody = document.querySelector('[data-workspace-inspector-body]');
const queueBody = document.querySelector('[data-workspace-queues]');

if (gridBody) renderGrid();
if (queueBody) renderQueues();

function renderGrid() {
  gridBody.innerHTML = roleRows.map((row, rowIndex) => `
    <tr>
      <td class="workspace-role-cell">${escapeHtml(row.role)}<span>${escapeHtml(row.spot)}</span></td>
      ${row.cells.map((cell, dayIndex) => renderCell(row, cell, rowIndex, dayIndex)).join('')}
    </tr>`).join('');
  document.querySelectorAll('[data-workspace-cell]').forEach((button) => {
    button.addEventListener('click', () => selectCell(button));
  });
}
function renderCell(row, cell, rowIndex, dayIndex) {
  const state = cell === 'Open' ? 'open' : cell === 'Conflict' ? 'conflict' : cell === 'Leave' ? 'leave' : 'assigned';
  const label = state === 'open' ? 'Open spot' : state === 'conflict' ? 'Conflict' : state === 'leave' ? 'Leave' : cell;
  const meta = state === 'assigned' ? 'Pattern · 0700-1900' : state === 'open' ? 'Needs coverage' : state === 'leave' ? 'Approved leave' : 'Double assignment';
  return `<td><button type="button" class="workspace-assignment workspace-assignment--${state}" data-workspace-cell data-role="${escapeHtml(row.role)}" data-spot="${escapeHtml(row.spot)}" data-day="${days[dayIndex]}" data-state="${state}" data-label="${escapeHtml(label)}" data-meta="${escapeHtml(meta)}"><strong>${escapeHtml(label)}</strong><span>${escapeHtml(meta)}</span></button></td>`;
}
function selectCell(button) {
  document.querySelectorAll('[data-workspace-cell]').forEach((item) => item.classList.remove('is-selected'));
  button.classList.add('is-selected');
  const detail = button.dataset;
  const stateLabel = detail.state === 'assigned' ? 'Assigned' : detail.state === 'open' ? 'Open' : detail.state === 'leave' ? 'Leave' : 'Conflict';
  if (inspectorTitle) inspectorTitle.textContent = `${detail.day} · ${detail.role} ${detail.spot}`;
  if (inspectorBody) inspectorBody.innerHTML = `
    <span class="schedule-status-pill ${statusClass(detail.state)}">${stateLabel}</span>
    <div class="workspace-detail-list">
      <div class="workspace-detail-row"><span>Selection</span><strong>${escapeHtml(detail.label)}</strong></div>
      <div class="workspace-detail-row"><span>Role</span><strong>${escapeHtml(detail.role)}</strong></div>
      <div class="workspace-detail-row"><span>Coverage spot</span><strong>${escapeHtml(detail.spot)}</strong></div>
      <div class="workspace-detail-row"><span>Source</span><strong>${escapeHtml(detail.meta)}</strong></div>
      <div class="workspace-detail-row"><span>Inspector path</span><strong>${detail.state === 'open' ? 'OT / mandate options' : detail.state === 'conflict' ? 'Conflict resolution' : 'Employee detail'}</strong></div>
    </div>
    <div class="workspace-empty-state">v3.7 foundation only: future builds will connect this panel to live assignment, conflict, leave, mandation, and qualification records.</div>`;
}
function renderQueues() {
  queueBody.innerHTML = queues.map(([name,count,priority,action]) => `<tr><td>${escapeHtml(name)}</td><td>${escapeHtml(count)}</td><td>${escapeHtml(priority)}</td><td>${escapeHtml(action)}</td></tr>`).join('');
}
function statusClass(state) {
  if (state === 'open') return 'schedule-status-pill--warning';
  if (state === 'conflict') return 'schedule-status-pill--danger';
  if (state === 'assigned') return 'schedule-status-pill--success';
  return '';
}
function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, (char) => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
}
