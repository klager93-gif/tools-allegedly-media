/*
Signal Labs
Area: Signal Schedule
File: schedule/pages/workspace/assignments.js
Version: v5.1.0
Purpose: Render Assignment Engine Integration preview
*/
import { getAssignmentEnginePreview } from '../../services/AssignmentEngineService.js';
const $ = selector => document.querySelector(selector);
const safe = value => String(value ?? '');
const title = value => safe(value).replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
function statLabel(key){return key.replace(/([A-Z])/g,' $1').replace(/^./,c=>c.toUpperCase());}
function renderRecord(record){
  const employee = record.employee ? safe(record.employee) : 'Open';
  const statusClass = record.status === 'assigned' ? 'assigned' : 'open';
  const impactClass = record.coverageImpact === 'filled' ? 'good' : 'warning';
  return `<article class="assignment-record ${statusClass}"><strong>${safe(record.spotCode)} — ${safe(record.spotLabel)} · ${employee}</strong><div class="assignment-meta"><span class="assignment-badge source">${title(record.source)}</span><span class="assignment-badge ${impactClass}">${title(record.coverageImpact)}</span><span class="assignment-badge">${title(record.status)}</span></div><span>${safe(record.notes)}</span></article>`;
}
function render(data){
  $('[data-assignment-stats]').innerHTML = Object.entries(data.summary).map(([key,value])=>`<div class="assignment-stat"><strong>${safe(value)}</strong><span>${statLabel(key)}</span></div>`).join('');
  $('[data-assignment-filter-text]').textContent = `${data.filters.date} · ${data.filters.agency} · ${data.filters.status} · ${data.filters.source}`;
  $('[data-assignment-groups]').innerHTML = data.grouped.map(group=>`<section class="assignment-group"><h3>${safe(group.agency)}</h3><p>${safe(group.date)} · ${safe(group.shift)} ${safe(group.time)} · ${safe(group.role)}</p><div class="assignment-records">${group.records.map(renderRecord).join('')}</div></section>`).join('');
  $('[data-assignment-sources]').innerHTML = data.sourceTypes.map(source=>`<article class="assignment-source"><strong>${safe(source.label)}</strong><p>${safe(source.description)}</p><span class="assignment-badge">${safe(data.sourceCounts[source.key] || 0)} records</span></article>`).join('');
  $('[data-assignment-history]').innerHTML = data.history.map(item=>`<article class="assignment-history-item"><time>${new Date(item.at).toLocaleString()}</time><div><strong>${safe(item.label)}</strong><p>${safe(item.actor)} · ${safe(item.event)}</p></div></article>`).join('');
  $('[data-assignment-rules]').innerHTML = data.rules.map(rule=>`<article class="assignment-rule">${safe(rule)}</article>`).join('');
}
getAssignmentEnginePreview().then(render).catch(error=>{console.error(error); const mount=$('[data-assignment-groups]'); if(mount) mount.innerHTML='<p>Unable to load assignment engine preview data.</p>';});
