/*
Signal Labs
Area: Signal Schedule
File: schedule/pages/requests/ot-volunteer-board.js
Version: v5.1.0
Purpose: Render OT Volunteer Board Foundation preview
*/
import { getOtVolunteerBoardDashboard, getRecommendedVolunteer } from '../../services/OtVolunteerBoardService.js';

const text = (value) => String(value ?? '');
const chipClass = (status) => {
  if (['eligible', 'ready', 'posted'].includes(status)) return 'ot-board-chip--ok';
  if (['watch', 'pending', 'review'].includes(status)) return 'ot-board-chip--warn';
  if (['critical', 'withdrawn'].includes(status)) return 'ot-board-chip--danger';
  return '';
};

function renderSummary(data) {
  const node = document.querySelector('[data-ot-board-summary]');
  if (!node) return;
  const items = [
    ['Posted', data.summary?.postedOpportunities || 0],
    ['Slots', data.summary?.totalSlots || 0],
    ['Volunteers', data.summary?.volunteers || 0],
    ['Ready', data.summary?.readyToAward || 0],
    ['Watch', data.summary?.watchList || 0]
  ];
  node.innerHTML = items.map(([label, value]) => `<article class="ot-board-summary-card"><span>${label}</span><strong>${value}</strong></article>`).join('');
}

function renderOpportunities(data) {
  const node = document.querySelector('[data-ot-board-opportunities]');
  if (!node) return;
  node.innerHTML = (data.opportunities || []).map((item) => {
    const recommended = getRecommendedVolunteer(item, data.volunteersByOpportunity);
    return `<article class="ot-board-card ot-board-card--${text(item.priority)}">
      <div class="ot-board-card-top"><span>${text(item.date)}</span><span>${text(item.priority)}</span></div>
      <h3>${text(item.assignment)} · ${text(item.shift)}</h3>
      <p>${text(item.reason)} · ${text(item.coverageImpact)}</p>
      <div class="ot-board-facts">
        <div class="ot-board-fact"><span>Slots</span><strong>${text(item.slots)}</strong></div>
        <div class="ot-board-fact"><span>Hours</span><strong>${text(item.hours)}</strong></div>
        <div class="ot-board-fact"><span>Volunteers</span><strong>${text(item.volunteers?.length || 0)}</strong></div>
        <div class="ot-board-fact"><span>Recommend</span><strong>${recommended ? text(recommended.employee) : 'None'}</strong></div>
      </div>
      <div class="ot-board-tags">${(item.eligibilityRules || []).map((rule) => `<span>✓ ${text(rule)}</span>`).join('')}</div>
      <div class="ot-board-note">Award rule: ${text(item.awardRule)} · Linked open shift: ${text(item.linkedOpenShiftId)}</div>
    </article>`;
  }).join('');
}

function renderVolunteers(items) {
  const node = document.querySelector('[data-ot-board-volunteers]');
  if (!node) return;
  node.innerHTML = (items || []).map((item) => `<article class="ot-board-volunteer">
    <div class="ot-board-row"><div><strong>${text(item.employee)}</strong><small>${text(item.employeeId)} · seniority ${text(item.seniorityRank)} · ${text(item.otHoursYtd)} OT hrs YTD</small></div><span class="ot-board-chip ${chipClass(item.status)}">${text(item.status)}</span></div>
    <small>${text(item.fatigueStatus)} · ${text(item.awardRecommendation)} · ${new Date(item.submittedAt).toLocaleString()}</small>
  </article>`).join('');
}

function renderQueue(items) {
  const node = document.querySelector('[data-ot-board-queue]');
  if (!node) return;
  node.innerHTML = (items || []).map((item) => `<article class="ot-board-queue-item">
    <div class="ot-board-row"><strong>${text(item.nextAction)}</strong><span class="ot-board-chip ${chipClass(item.status)}">${text(item.status)}</span></div>
    <small>${text(item.opportunityId)} · ${text(item.recommended)}</small>
  </article>`).join('');
}

function renderRules(items) {
  const node = document.querySelector('[data-ot-board-rules]');
  if (!node) return;
  node.innerHTML = (items || []).map((item) => `<article class="ot-board-rule">${text(item)}</article>`).join('');
}

async function init() {
  try {
    const data = await getOtVolunteerBoardDashboard();
    renderSummary(data);
    renderOpportunities(data);
    renderVolunteers(data.volunteers);
    renderQueue(data.awardQueue);
    renderRules(data.rules);
  } catch (error) {
    console.error(error);
  }
}

init();
