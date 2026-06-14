/*
Signal Labs Tool File: schedule/pages/coverage/coverage-board.js
Version: v5.1.0
Purpose: Coverage Board foundation preview UI.
*/
import { JsonCoverageBoardAdapter } from '../../adapters/JsonCoverageBoardAdapter.js';
import { CoverageBoardRepository } from '../../repositories/CoverageBoardRepository.js';
import { CoverageBoardService } from '../../services/CoverageBoardService.js';

const adapter = new JsonCoverageBoardAdapter();
const repository = new CoverageBoardRepository(adapter);
const service = new CoverageBoardService(repository);

let boardData = { coverageRows: [], openShifts: [] };
let activeFilter = 'all';

function text(value, fallback = '—') {
  return value === undefined || value === null || value === '' ? fallback : String(value);
}

function statusLabel(status) {
  const labels = {
    'below-minimum': 'Below minimum',
    'at-minimum': 'At minimum',
    covered: 'Covered',
    'above-minimum': 'Above minimum'
  };
  return labels[status] || text(status, 'Unknown');
}

function renderSummary(rows) {
  const summary = service.summarize(rows);
  const node = document.querySelector('[data-coverage-summary]');
  if (!node) return;
  node.innerHTML = `
    <div class="coverage-stat"><strong>${summary.total || 0}</strong><span>Coverage Blocks</span></div>
    <div class="coverage-stat"><strong>${summary.belowMinimum || 0}</strong><span>Below Minimum</span></div>
    <div class="coverage-stat"><strong>${summary.openSlots || 0}</strong><span>Minimum Slots Open</span></div>
    <div class="coverage-stat"><strong>${summary.targetOpenSlots || 0}</strong><span>Target Slots Open</span></div>
  `;
}

function renderBoard() {
  const list = document.querySelector('[data-coverage-list]');
  const count = document.querySelector('[data-coverage-count]');
  if (!list) return;
  const filtered = service.filterRows(boardData.coverageRows || [], activeFilter);
  if (count) count.textContent = `${filtered.length} shown`;
  const groups = service.groupByDate(filtered);
  list.innerHTML = Object.entries(groups).map(([date, rows]) => `
    <section class="coverage-date-group" aria-label="Coverage for ${text(date)}">
      <h3>${text(date)}</h3>
      ${rows.map(row => renderCoverageCard(row)).join('')}
    </section>
  `).join('') || '<p class="empty-state">No coverage rows match this filter.</p>';
}

function renderCoverageCard(row) {
  const openShift = service.findLinkedOpenShift(boardData.openShifts || [], row);
  const assigned = row.assignedEmployees || [];
  const available = row.availableEmployees || [];
  return `
    <article class="coverage-card coverage-card--${row.status || 'unknown'}">
      <div class="coverage-card__topline">
        <span>${text(row.day)} · ${text(row.shiftName)}</span>
        <span>${statusLabel(row.status)} · ${text(row.risk, 'risk unknown')}</span>
      </div>
      <h4>${text(row.assignment)}</h4>
      <p>${text(row.role)} · ${text(row.location)} · ${text(row.startTime)}–${text(row.endTime)}</p>
      <dl class="coverage-details">
        <div><dt>Assigned</dt><dd>${text(row.assignedCount)} / ${text(row.minimumRequired)} min</dd></div>
        <div><dt>Target</dt><dd>${text(row.targetStaffing)}</dd></div>
        <div><dt>Maximum</dt><dd>${text(row.maximumStaffing)}</dd></div>
        <div><dt>Open</dt><dd>${text(row.openSlots)} min · ${text(row.targetOpenSlots)} target</dd></div>
        <div><dt>Leave</dt><dd>${text(row.pendingLeave)}</dd></div>
        <div><dt>Training</dt><dd>${text(row.pendingTraining)}</dd></div>
      </dl>
      <div class="coverage-tags">
        <span>Assigned: ${assigned.length ? assigned.map(text).join(', ') : 'None'}</span>
        <span>Available: ${available.length ? available.map(text).join(', ') : 'None listed'}</span>
      </div>
      <p>${text(row.notes)}</p>
      <div class="coverage-card__actions">
        <span>${openShift ? `Linked OT: ${text(openShift.assignment)} · ${text(openShift.priority)} priority` : 'No linked OT opportunity yet'}</span>
        <a class="coverage-link" href="${openShift ? `open-shifts.html#${openShift.id}` : '#'}" aria-disabled="${openShift ? 'false' : 'true'}">${openShift ? 'Review OT Opportunity' : 'Post OT Later'}</a>
      </div>
    </article>
  `;
}

function setupFilters() {
  document.querySelectorAll('[data-coverage-filter]').forEach(button => {
    button.addEventListener('click', () => {
      activeFilter = button.dataset.coverageFilter || 'all';
      document.querySelectorAll('[data-coverage-filter]').forEach(item => item.setAttribute('aria-pressed', item === button ? 'true' : 'false'));
      renderBoard();
    });
  });
}

function setupBuilderPreview() {
  const preview = document.querySelector('[data-coverage-builder-preview]');
  if (!preview) return;
  const update = () => {
    const assignment = document.querySelector('[data-coverage-assignment]')?.value;
    const role = document.querySelector('[data-coverage-role]')?.value;
    const minimum = Number(document.querySelector('[data-coverage-minimum]')?.value || 0);
    const assigned = Number(document.querySelector('[data-coverage-assigned]')?.value || 0);
    const target = Number(document.querySelector('[data-coverage-target]')?.value || 0);
    const open = Math.max(0, minimum - assigned);
    const targetOpen = Math.max(0, target - assigned);
    const status = assigned < minimum ? 'Below minimum' : assigned === minimum ? 'At minimum' : 'Covered';
    preview.innerHTML = `
      <strong>Coverage Preview</strong>
      <span>${text(assignment)} · ${text(role)} · ${status}</span>
      <span>${assigned} assigned / ${minimum} minimum / ${target} target</span>
      <small>${open} minimum slot(s) open · ${targetOpen} target slot(s) open. Future release can post OT from this gap.</small>
    `;
  };
  document.querySelectorAll('[data-coverage-assignment], [data-coverage-role], [data-coverage-minimum], [data-coverage-assigned], [data-coverage-target]').forEach(input => input.addEventListener('input', update));
  update();
}

async function init() {
  setupFilters();
  setupBuilderPreview();
  const status = document.querySelector('[data-coverage-status-line]');
  try {
    boardData = await service.getCoverageBoardPreview();
    renderSummary(boardData.coverageRows || []);
    renderBoard();
    if (status) status.textContent = 'Coverage Board preview data loaded.';
  } catch (error) {
    if (status) status.textContent = `Unable to load Coverage Board preview data: ${error.message}`;
  }
}

init();
