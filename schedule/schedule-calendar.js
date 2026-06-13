/*
Signal Labs Tool File: schedule/schedule-calendar.js
Version: v2.5.0
Purpose: User-facing Calendar Foundation preview renderer.
*/
import { JsonCalendarAdapter } from './adapters/JsonCalendarAdapter.js';
import { CalendarRepository } from './repositories/CalendarRepository.js';
import { CalendarService } from './services/CalendarService.js';

const $ = (selector) => document.querySelector(selector);
const service = new CalendarService(new CalendarRepository(new JsonCalendarAdapter()));
const monthYear = { year: 2026, monthIndex: 5, label: 'June 2026' };
let calendarData = { days: [], preview: [], events: [], summary: {} };
let selectedDate = '2026-06-12';

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character]));
}

function rowsForDate(date) {
  const found = calendarData.days.find((day) => day.date === date);
  return found || { date, label: date, rows: [], events: [] };
}

function renderSummary() {
  const target = $('#calendarSummary');
  if (!target) return;
  const summary = calendarData.summary || {};
  const items = [
    ['Coverage Rows', summary.calendarRows || 0],
    ['Event Placeholders', summary.eventRows || 0],
    ['Covered Rows', summary.coveredRows || 0],
    ['Short Rows', summary.shortRows || 0],
    ['Open Slots', summary.openSlots || 0]
  ];
  target.innerHTML = items.map(([label, value]) => `<article class="calendar-summary-item"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></article>`).join('');
}

function renderCalendarGrid() {
  const target = $('#calendarGrid');
  if (!target) return;
  const first = new Date(monthYear.year, monthYear.monthIndex, 1);
  const daysInMonth = new Date(monthYear.year, monthYear.monthIndex + 1, 0).getDate();
  const blanks = first.getDay();
  const cells = [];

  for (let i = 0; i < blanks; i += 1) cells.push('<div class="calendar-day is-muted" aria-hidden="true"></div>');

  for (let day = 1; day <= daysInMonth; day += 1) {
    const date = `${monthYear.year}-06-${String(day).padStart(2, '0')}`;
    const dayData = rowsForDate(date);
    const statuses = [...new Set(dayData.rows.map((row) => row.coverageStatus))];
    const hasEvents = dayData.events.length > 0;
    const classes = ['calendar-day'];
    if (date === selectedDate) classes.push('is-selected');
    const pills = statuses.map((status) => `<span class="calendar-pill status-${escapeHtml(status)}">${escapeHtml(status)}</span>`).join('') + (hasEvents ? '<span class="calendar-pill">event</span>' : '');
    const rowText = dayData.rows.length ? `${dayData.rows.length} coverage row${dayData.rows.length === 1 ? '' : 's'}` : 'No preview rows';
    cells.push(`
      <button class="${classes.join(' ')}" type="button" data-calendar-date="${date}">
        <span class="calendar-day-number"><b>${day}</b></span>
        <small>${escapeHtml(rowText)}</small>
        <span class="calendar-pill-row">${pills}</span>
      </button>
    `);
  }
  target.innerHTML = cells.join('');
}

function renderDayDetail() {
  const dayData = rowsForDate(selectedDate);
  const label = $('#selectedDayLabel');
  const coverage = $('#dayCoverageList');
  const events = $('#dayEventList');
  if (label) label.textContent = dayData.label || selectedDate;
  if (coverage) {
    coverage.innerHTML = dayData.rows.length ? dayData.rows.map((row) => {
      const people = row.scheduledEmployees && row.scheduledEmployees.length ? row.scheduledEmployees.map((name) => `<li>${escapeHtml(name)}</li>`).join('') : '<li>No one assigned yet</li>';
      const openSlots = Number(row.openSlots || Math.max(0, Number(row.minimumRequired || 0) - Number((row.scheduledEmployees || []).length)));
      return `
        <article class="coverage-detail is-${escapeHtml(row.coverageStatus)}">
          <strong>${escapeHtml(row.assignmentName)} — ${escapeHtml(row.shiftName)}</strong>
          <span>${escapeHtml(row.role)} · Minimum ${escapeHtml(row.minimumRequired)} · ${escapeHtml(row.location || '')}</span>
          <span>Status: ${escapeHtml(row.coverageStatus)}${openSlots ? ` · Open slots: ${openSlots}` : ''}</span>
          <ul>${people}</ul>
        </article>
      `;
    }).join('') : '<article class="coverage-detail"><strong>No preview coverage</strong><span>This date has no schedule rows yet.</span></article>';
  }
  if (events) {
    events.innerHTML = dayData.events.length ? dayData.events.map((event) => `
      <article class="event-detail">
        <strong>${escapeHtml(event.type)}</strong>
        <span>${escapeHtml(event.assignmentName)} · ${escapeHtml(event.status)} · ${escapeHtml(event.impact)}</span>
        <span>${event.employee ? escapeHtml(event.employee) : 'No employee assigned'}</span>
      </article>
    `).join('') : '<article class="event-detail"><strong>No event placeholders</strong><span>Leave, training, VOT, and mandation events will appear here in future releases.</span></article>';
  }
}

function bindCalendar() {
  document.addEventListener('click', (event) => {
    const button = event.target.closest('[data-calendar-date]');
    if (!button) return;
    selectedDate = button.getAttribute('data-calendar-date');
    renderCalendarGrid();
    renderDayDetail();
  });
}

async function init() {
  bindCalendar();
  try {
    calendarData = await service.getCalendarPreview();
  } catch (error) {
    console.error(error);
    calendarData = { days: [], preview: [], events: [], summary: { calendarRows: 0, eventRows: 0, coveredRows: 0, shortRows: 0, openSlots: 0 } };
  }
  renderSummary();
  renderCalendarGrid();
  renderDayDetail();
}

document.addEventListener('DOMContentLoaded', init);
