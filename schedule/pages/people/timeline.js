/*
Signal Labs
Area: Signal Schedule
File: schedule/pages/people/timeline.js
Version: v5.1.0
Purpose: Render Employee Timeline & Audit Trail preview
*/
import { getEmployeeTimelinePreview } from '../../services/EmployeeTimelineService.js';
const qs = (sel) => document.querySelector(sel);
let timelineData = null;
function chip(category, actorType) {
  const cls = category === 'Profile' ? 'timeline-chip timeline-chip--profile' : actorType === 'System' ? 'timeline-chip timeline-chip--system' : category === 'Requests' ? 'timeline-chip timeline-chip--request' : 'timeline-chip';
  return `<span class="${cls}">${category}</span>`;
}
function eventTemplate(event){
  return `<article class="timeline-event" data-category="${event.category}">
    <div class="timeline-event__time">${event.when}</div>
    <div class="timeline-event__body">
      <div class="timeline-event__head"><h3>${event.title}</h3>${chip(event.category,event.actorType)}</div>
      <p>${event.description}</p>
      <div><strong>${event.actor}</strong> <span class="timeline-chip">${event.actorType}</span></div>
      <div class="timeline-values">
        <div class="timeline-value"><span>Before</span>${event.oldValue || '—'}</div>
        <div class="timeline-value"><span>After</span>${event.newValue || '—'}</div>
      </div>
      <div class="timeline-value"><span>Reason</span>${event.reason || 'No reason provided'}</div>
    </div>
  </article>`;
}
function renderEvents(filter='All'){
  const events = filter === 'All' ? timelineData.events : timelineData.events.filter(e => e.category === filter);
  qs('[data-timeline-list]').innerHTML = events.map(eventTemplate).join('') || '<p>No events match this filter.</p>';
}
function render(data){
  timelineData = data;
  const employee = data.employee;
  qs('[data-timeline-summary]').textContent = `${data.summary.totalEvents} tracked events`;
  qs('[data-timeline-identity]').innerHTML = `<div class="timeline-avatar">${employee.initials}</div><h3>${employee.name}</h3><p>${employee.role} · ${employee.shiftGroup}</p><p>${employee.department}</p>`;
  qs('[data-timeline-stats]').innerHTML = [
    ['Total', data.summary.totalEvents], ['Profile', data.summary.profileEvents], ['Requests', data.summary.requestEvents], ['Schedule', data.summary.scheduleEvents]
  ].map(([label,value])=>`<div class="timeline-stat"><strong>${value}</strong><span>${label}</span></div>`).join('');
  qs('[data-timeline-filters]').innerHTML = data.filters.map((f,i)=>`<button class="timeline-filter" type="button" aria-pressed="${i===0?'true':'false'}" data-filter="${f}">${f}</button>`).join('');
  qs('[data-timeline-policy]').innerHTML = data.policy.map(p=>`<article class="timeline-policy"><strong>${p.label}</strong><span>${p.value}</span></article>`).join('');
  qs('[data-timeline-filters]').addEventListener('click', (event)=>{
    const btn = event.target.closest('[data-filter]');
    if(!btn) return;
    document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed','false'));
    btn.setAttribute('aria-pressed','true');
    renderEvents(btn.dataset.filter);
  });
  renderEvents();
}
getEmployeeTimelinePreview().then(render).catch(err=>{ console.error(err); const mount=qs('[data-timeline-list]'); if(mount) mount.innerHTML='<p>Unable to load employee timeline preview data.</p>'; });
