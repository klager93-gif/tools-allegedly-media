/*
Signal Labs
Area: Signal Schedule
File: schedule/pages/calendar/schedule-calendar.js
Version: v5.1.0
Purpose: Render user-facing week/day calendar previews using admin shortcodes
*/
import { loadCalendarViewModel } from '../../services/CalendarViewService.js';

const codeClass = (value) => `code-${String(value || '').toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

function isCode(value, shortcodeMap) {
  return shortcodeMap.has(value);
}

function pill(value, shortcodeMap) {
  const title = isCode(value, shortcodeMap) ? shortcodeMap.get(value).label : 'Scheduled shift';
  return `<span class="shift-pill ${isCode(value, shortcodeMap) ? codeClass(value) : ''}" title="${title}">${value}</span>`;
}

function renderWeek(model) {
  const mount = document.getElementById('weekCalendarGrid');
  if (!mount) return;

  const employees = model.employees || [];
  const days = model.week || [];
  let html = '<div class="week-grid"><div class="employee-header">Employee</div>';
  html += days.map((day) => `<div class="week-header">${day.label}</div>`).join('');

  for (const employee of employees) {
    html += `<div class="employee-cell"><strong>${employee.name}</strong><span>${employee.role}</span></div>`;
    for (const day of days) {
      const cell = (day.cells || []).find((item) => item.employee === employee.name);
      html += `<div class="day-cell">${(cell?.items || []).map((item) => pill(item, model.shortcodeMap)).join('')}</div>`;
    }
  }
  html += '</div>';
  mount.innerHTML = html;
}

function renderDay(model) {
  const detail = model.dayDetail || {};
  const eventsMount = document.getElementById('dayTimeline');
  const statusMount = document.getElementById('daySummaryCards');
  if (!eventsMount || !statusMount) return;

  eventsMount.innerHTML = (detail.events || []).map((event) => `
    <article class="day-event">
      <div class="day-event__time">${event.time}</div>
      <div>
        <div class="day-event__title">${event.title} ${pill(event.code, model.shortcodeMap)}</div>
        <div class="day-event__detail">${event.detail}</div>
      </div>
      <span class="shift-pill ${codeClass(event.status)}">${event.status}</span>
    </article>
  `).join('');

  statusMount.innerHTML = `
    <div class="day-card"><h3>Coverage Status</h3><dl>
      <div><dt>Status</dt><dd>${detail.coverageStatus}</dd></div>
      <div><dt>Minimum</dt><dd>${detail.minimumStaffing}</dd></div>
      <div><dt>Assigned</dt><dd>${detail.assigned}</dd></div>
    </dl></div>
    <div class="day-card"><h3>Summary</h3><dl>
      <div><dt>Regular</dt><dd>${detail.summary?.regular || '0h 00m'}</dd></div>
      <div><dt>Overtime</dt><dd>${detail.summary?.overtime || '0h 00m'}</dd></div>
      <div><dt>Double OT</dt><dd>${detail.summary?.doubleOt || '0h 00m'}</dd></div>
      <div><dt>Total</dt><dd><strong>${detail.summary?.total || '0h 00m'}</strong></dd></div>
    </dl></div>
  `;
}

function renderLegend(model) {
  const mount = document.getElementById('calendarLegend');
  if (!mount) return;
  mount.innerHTML = (model.shortcodes || []).map((item) => `<span>${pill(item.code, model.shortcodeMap)} ${item.label}</span>`).join('');
}

async function init() {
  try {
    const model = await loadCalendarViewModel();
    renderWeek(model);
    renderDay(model);
    renderLegend(model);
  } catch (error) {
    console.error(error);
    const mount = document.getElementById('weekCalendarGrid');
    if (mount) mount.innerHTML = '<div class="calendar-section">Calendar view preview data could not be loaded.</div>';
  }
}

init();
