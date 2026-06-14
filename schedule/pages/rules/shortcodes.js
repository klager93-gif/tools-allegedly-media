/*
Signal Labs
Area: Signal Schedule
File: schedule/pages/rules/shortcodes.js
Version: v5.1.0
Purpose: Render Calendar Shortcode Admin Controls preview
*/
import { getShortcodeAdminDashboard } from '../../services/CalendarShortcodeService.js';

function renderSummary(summary) {
  const node = document.querySelector('[data-shortcode-summary]');
  if (!node) return;
  const rows = [
    ['Active Codes', summary.total],
    ['Employee Visible', summary.employeeVisible],
    ['Admin Editable', summary.adminEditable],
    ['Custom Codes', summary.customReady ? 'Ready' : 'Off']
  ];
  node.innerHTML = rows.map(([label, value]) => `<article class="shortcode-summary-card"><span>${label}</span><strong>${value}</strong></article>`).join('');
}
function renderCodes(items) {
  const node = document.querySelector('[data-shortcode-codes]');
  if (!node) return;
  node.innerHTML = (items || []).map((item) => `<article class="shortcode-card"><div class="shortcode-card-header"><div><strong>${item.label}</strong><small>${item.fullText}</small></div><span class="shortcode-pill">${item.code}</span></div><span class="shortcode-tag">${item.category}</span><span class="shortcode-tag">${item.calendarVisibility}</span>${item.linkedBank ? `<span class="shortcode-tag">Bank: ${item.linkedBank}</span>` : ''}<span class="shortcode-tag">${item.employeeVisible ? 'Employee visible' : 'Admin only'}</span></article>`).join('');
}
function renderEditPreview(items) {
  const node = document.querySelector('[data-shortcode-edits]');
  if (!node) return;
  node.innerHTML = (items || []).map((item) => `<article class="shortcode-edit-item"><strong>${item.field}</strong><p>Current: ${item.current}</p><small>${item.allowed} · ${item.adminAction}</small></article>`).join('');
}
function renderCalendar(days) {
  const node = document.querySelector('[data-shortcode-calendar]');
  if (!node) return;
  node.innerHTML = (days || []).map((day) => `<article class="shortcode-day"><div class="shortcode-day-head"><strong>${day.day}</strong><small>${day.date}</small></div><div class="shortcode-day-codes">${day.compact.map((code) => `<span class="shortcode-pill">${code}</span>`).join('')}</div><ul>${day.details.map((detail) => `<li>${detail}</li>`).join('')}</ul></article>`).join('');
}
function renderAudit(items) {
  const node = document.querySelector('[data-shortcode-audit]');
  if (!node) return;
  node.innerHTML = (items || []).map((item) => `<article class="shortcode-audit-item"><strong>${item.action}</strong><p>${item.reason}</p><small>${item.date} · ${item.actor}</small></article>`).join('');
}
async function init() {
  try {
    const data = await getShortcodeAdminDashboard();
    renderSummary(data.summary || {});
    renderCodes(data.shortcodes || []);
    renderEditPreview(data.editPreview || []);
    renderCalendar(data.calendarPreview || []);
    renderAudit(data.auditPreview || []);
  } catch (error) {
    console.error(error);
  }
}
init();
