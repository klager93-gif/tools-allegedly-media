/*
Signal Labs
Area: Signal Schedule
File: schedule/pages/rules/benefits.js
Version: v5.1.0
Purpose: Render Benefit Ledger and Calendar Shortcode preview
*/
import { getBenefitLedgerDashboard } from '../../services/BenefitLedgerService.js';

const money = (value) => `${Number(value || 0).toFixed(0)}h`;
const pct = (bank) => {
  const earned = Number(bank.earned || 0);
  if (!earned) return 0;
  return Math.max(0, Math.min(100, (Number(bank.remaining || 0) / earned) * 100));
};

function renderSummary(totals) {
  const node = document.querySelector('[data-benefit-summary]');
  if (!node) return;
  node.innerHTML = [
    ['Earned', totals.earned],
    ['Used', totals.used],
    ['Pending', totals.pending],
    ['Remaining', totals.remaining]
  ].map(([label, value]) => `<article class="benefit-summary-card"><span>${label}</span><strong>${money(value)}</strong></article>`).join('');
}

function renderBanks(banks) {
  const node = document.querySelector('[data-benefit-banks]');
  if (!node) return;
  node.innerHTML = banks.map((bank) => `
    <article class="benefit-bank">
      <div class="benefit-row"><div><strong>${bank.name}</strong><small> ${bank.earned} earned · ${bank.used} used · ${bank.pending} pending</small></div><span class="benefit-code">${bank.code}</span></div>
      <div class="benefit-meter" aria-label="${bank.name} remaining"><span style="width:${pct(bank)}%"></span></div>
      <p>${money(bank.remaining)} remaining</p>
    </article>`).join('');
}

function renderImpacts(items) {
  const node = document.querySelector('[data-benefit-impacts]');
  if (!node) return;
  node.innerHTML = items.map((item) => `
    <article class="benefit-impact">
      <div class="benefit-row"><strong>${item.employee}</strong><span class="benefit-code">${item.code}</span></div>
      <p>${item.requestType} · ${item.hours}h · ${item.date}</p>
      <small>${item.bank}: ${money(item.before)} → ${money(item.after)} · ${item.status}</small>
    </article>`).join('');
}

function renderShortcodes(items) {
  const node = document.querySelector('[data-benefit-shortcodes]');
  if (!node) return;
  node.innerHTML = items.map((item) => `
    <article class="shortcode-card">
      <span class="shortcode-pill">${item.code}</span>
      <strong>${item.label}</strong>
      <small>${item.category}${item.bank ? ` · Bank: ${item.bank}` : ''} · ${item.adminEditable ? 'Admin editable' : 'Locked'}</small>
    </article>`).join('');
}

function renderCalendar(days) {
  const node = document.querySelector('[data-benefit-calendar]');
  if (!node) return;
  node.innerHTML = days.map((day) => `
    <article class="calendar-code-day">
      <div class="benefit-row"><strong>${day.day}</strong><small>${day.date}</small></div>
      <div class="calendar-code-items">${day.items.map((item) => `<span class="shortcode-pill" title="${item.label}">${item.code}</span>`).join('')}</div>
      <small>${day.items.map((item) => item.label).join(' · ')}</small>
    </article>`).join('');
}

function renderAdjustments(items) {
  const node = document.querySelector('[data-benefit-adjustments]');
  if (!node) return;
  node.innerHTML = items.map((item) => `
    <article class="benefit-adjustment">
      <div class="benefit-row"><strong>${item.employee}</strong><span>${item.change > 0 ? '+' : ''}${item.change}h</span></div>
      <p>${item.bank} · ${item.reason}</p>
      <small>${item.date} · Entered by ${item.enteredBy}</small>
    </article>`).join('');
}

async function init() {
  try {
    const data = await getBenefitLedgerDashboard();
    renderSummary(data.totals);
    renderBanks(data.banks || []);
    renderImpacts(data.requestImpacts || []);
    renderShortcodes(data.shortcodes || []);
    renderCalendar(data.calendarDays || []);
    renderAdjustments(data.adjustments || []);
  } catch (error) {
    console.error(error);
  }
}

init();
