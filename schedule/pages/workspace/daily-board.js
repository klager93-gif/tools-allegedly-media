/*
Signal Labs
Area: Signal Schedule
File: schedule/pages/workspace/daily-board.js
Version: v5.1.0
Purpose: Render Daily Schedule Board foundation preview
*/
import { getDailyBoardPreview } from '../../services/DailyBoardService.js';
const $ = selector => document.querySelector(selector);
const safe = value => String(value ?? '');
const label = key => key.replace(/([A-Z])/g, ' $1').replace(/^./, c => c.toUpperCase());
function statusBadge(group){
  if(group.overMaximum > 0) return `<span class="daily-board-badge danger">Over max by ${group.overMaximum}</span>`;
  if(group.underMinimum > 0) return `<span class="daily-board-badge warning">Under minimum by ${group.underMinimum}</span>`;
  return '<span class="daily-board-badge good">Meets minimum</span>';
}
function renderSpot(spot){
  return `<article class="daily-board-spot ${spot.status === 'filled' ? 'filled' : 'open'}"><strong>${safe(spot.spotCode)} — ${safe(spot.label)}</strong><span>${spot.employee ? safe(spot.employee) : 'Open'}</span><span>Source: ${safe(spot.source)}</span><span>${safe(spot.notes)}</span></article>`;
}
function render(data){
  $('[data-daily-board-stats]').innerHTML = Object.entries(data.summary).map(([key,value])=>`<div class="daily-board-stat"><strong>${safe(value)}</strong><span>${label(key)}</span></div>`).join('');
  $('[data-daily-board-filter-text]').textContent = `${data.filters.date} · ${data.filters.agency} · ${data.filters.shift} · ${data.filters.role}`;
  $('[data-daily-board-days]').innerHTML = data.days.map(day=>`<section class="daily-board-day"><h3>${safe(day.label)} ${safe(day.date)}</h3><div class="daily-board-agencies">${day.agencies.map(agency=>`<article class="daily-board-agency"><h4>${safe(agency.agency)}</h4><div class="daily-board-shifts">${agency.shifts.map(shift=>`<section class="daily-board-shift"><div class="daily-board-shift-header"><div><h5>${safe(shift.shift)} · ${safe(shift.time)}</h5><span>${safe(shift.shiftId)}</span></div></div><div class="daily-board-roles">${shift.coverage.map(group=>`<article class="daily-board-role"><div class="daily-board-role-header"><strong>${safe(group.role)}</strong><div class="daily-board-badges"><span class="daily-board-badge">Required ${safe(group.required)}</span><span class="daily-board-badge">Filled ${safe(group.filled)}</span><span class="daily-board-badge">Open ${safe(group.open)}</span>${statusBadge(group)}</div></div><div class="daily-board-spots">${group.spots.map(renderSpot).join('')}</div></article>`).join('')}</div></section>`).join('')}</div></article>`).join('')}</div></section>`).join('');
  $('[data-daily-board-rules]').innerHTML = data.rules.map(rule=>`<article class="daily-board-rule">${safe(rule)}</article>`).join('');
}
getDailyBoardPreview().then(render).catch(error=>{console.error(error); const mount=$('[data-daily-board-days]'); if(mount) mount.innerHTML='<p>Unable to load daily board preview data.</p>';});
