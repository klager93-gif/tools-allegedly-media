/*
Signal Labs
Area: Signal Schedule
File: schedule/pages/workspace/weekly-board.js
Version: v5.1.0
Purpose: Render Weekly Schedule View foundation preview
*/
import { getWeeklyBoardPreview } from '../../services/WeeklyBoardService.js';
const $ = selector => document.querySelector(selector);
const safe = value => String(value ?? '');
const label = key => key.replace(/([A-Z])/g, ' $1').replace(/^./, c => c.toUpperCase());
function badge(status){ return `<span class="weekly-board-badge ${safe(status)}">${safe(status).replace('-', ' ')}</span>`; }
function renderSpot(spot){
  const status = safe(spot.status).includes('conflict') ? 'conflict' : safe(spot.status);
  return `<article class="weekly-board-spot ${status}"><strong>${safe(spot.code)} · ${safe(spot.role)}</strong><span>${safe(spot.employee)}</span><span>Source: ${safe(spot.source)}</span></article>`;
}
function render(data){
  $('[data-weekly-board-stats]').innerHTML = Object.entries(data.summary).map(([key,value])=>`<div class="weekly-board-stat"><strong>${safe(value)}</strong><span>${label(key)}</span></div>`).join('');
  $('[data-weekly-board-filter-text]').textContent = `${data.summary.weekStart} to ${data.summary.weekEnd} · ${data.filters.agency} · ${data.filters.status}`;
  $('[data-weekly-board-days]').innerHTML = data.days.map(day=>`<article class="weekly-board-day ${safe(day.status)}"><div class="weekly-board-day-header"><div><strong>${safe(day.label)}</strong><span>${safe(day.date)}</span></div>${badge(day.status)}</div>${day.shifts.map(shift=>`<section class="weekly-board-shift"><h3>${safe(shift.shift)}</h3><small>${safe(shift.time)}</small>${shift.spots.map(renderSpot).join('')}${(shift.warnings||[]).map(w=>`<div class="weekly-board-warning">⚠ ${safe(w)}</div>`).join('')}</section>`).join('')}</article>`).join('');
  $('[data-weekly-board-panels]').innerHTML = data.rolePanels.map(panel=>`<article class="weekly-board-panel"><h3>${safe(panel.role)}</h3><ul>${panel.items.map(item=>`<li>${safe(item)}</li>`).join('')}</ul></article>`).join('');
  $('[data-weekly-board-rules]').innerHTML = data.rules.map(rule=>`<article class="weekly-board-rule">${safe(rule)}</article>`).join('');
}
getWeeklyBoardPreview().then(render).catch(error=>{ console.error(error); const mount=$('[data-weekly-board-days]'); if(mount) mount.innerHTML='<p>Unable to load weekly board preview data.</p>'; });
