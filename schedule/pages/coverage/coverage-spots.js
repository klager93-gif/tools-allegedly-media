/*
Signal Labs
Area: Signal Schedule
File: schedule/pages/coverage/coverage-spots.js
Version: v5.1.0
Purpose: Render Coverage Spots Foundation preview
*/
import { getCoverageSpotsPreview } from '../../services/CoverageSpotsService.js';
const $ = selector => document.querySelector(selector);
const safe = value => String(value ?? '');
const label = key => key.replace(/([A-Z])/g, ' $1').replace(/^./, c => c.toUpperCase());
function render(data){
  $('[data-coverage-spots-stats]').innerHTML = Object.entries(data.summary).map(([key,value])=>`<div class="coverage-spots-stat"><strong>${safe(value)}</strong><span>${label(key)}</span></div>`).join('');
  $('[data-coverage-spots-days]').innerHTML = data.days.map(day=>`<section class="coverage-spots-day"><h3>${safe(day.label)} ${safe(day.date)} — ${safe(day.agency)}</h3><div class="coverage-spots-shifts">${day.shifts.map(shift=>`<article class="coverage-spots-shift"><div class="coverage-spots-shift-header"><div><h4>${safe(shift.shift)} ${safe(shift.time)} · ${safe(shift.role)}</h4><p>Required ${safe(shift.required)} · Filled ${safe(shift.filled)} · Open ${safe(shift.open)} · Max ${safe(shift.maximum)}</p></div><div class="coverage-spots-meta"><span class="coverage-spots-badge ${shift.underMinimum?'warning':'good'}">${shift.underMinimum?`Under minimum by ${shift.underMinimum}`:'Meets minimum'}</span><span class="coverage-spots-badge">${safe(shift.shiftId)}</span></div></div><div class="coverage-spots-list">${shift.spots.map(spot=>`<article class="coverage-spot ${spot.status==='open'?'open':''}"><strong>${safe(spot.spotCode)} — ${safe(spot.label)}</strong><span>${spot.employee?safe(spot.employee):'Open'}</span><span>Source: ${safe(spot.source)}</span></article>`).join('')}</div></article>`).join('')}</div></section>`).join('');
  $('[data-coverage-spots-rules]').innerHTML = data.rules.map(rule=>`<article class="coverage-spots-rule">${safe(rule)}</article>`).join('');
}
getCoverageSpotsPreview().then(render).catch(error=>{console.error(error); const mount=$('[data-coverage-spots-days]'); if(mount) mount.innerHTML='<p>Unable to load coverage spots preview data.</p>';});
