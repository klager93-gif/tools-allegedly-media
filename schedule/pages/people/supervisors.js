/*
Signal Labs
Area: Signal Schedule
File: schedule/pages/people/supervisors.js
Version: v5.1.0
Purpose: Render Supervisors & Organizational Hierarchy preview
*/
import { getSupervisorHierarchyPreview } from '../../services/SupervisorHierarchyService.js';
const $ = (selector) => document.querySelector(selector);
function scopePill(item){ return `<span class="scope-pill">${item.type}: ${item.label}</span>`; }
function render(data){
  $('[data-supervisor-stats]').innerHTML = Object.entries(data.summary).map(([key,value]) => `<div class="supervisor-stat"><strong>${value}</strong><span>${key.replace(/([A-Z])/g,' $1')}</span></div>`).join('');
  $('[data-supervisor-list]').innerHTML = data.supervisors.map(s => `<article class="supervisor-person"><p class="supervisor-kicker">${s.role}</p><h3>${s.name}</h3><p>${s.primaryScope}</p><div class="scope-pills">${s.scope.map(scopePill).join('')}</div><h4>Effective employees</h4><ul class="employee-list">${s.effectiveEmployees.map(e=>`<li>${e}</li>`).join('')}</ul><div class="permission-pills">${s.permissionsPreview.map(p=>`<span class="permission-pill">${p}</span>`).join('')}</div>${s.warnings.length ? `<div class="warning-list">${s.warnings.map(w=>`<span class="warning-pill">${w}</span>`).join('')}</div>` : ''}</article>`).join('');
  $('[data-scope-types]').innerHTML = data.scopeTypes.map(t => `<article class="scope-card"><h3>${t.title}</h3><p>${t.description}</p><span class="scope-pill">${t.type}</span></article>`).join('');
  $('[data-audit-preview]').innerHTML = data.auditPreview.map(a => `<article class="audit-row"><time>${a.when}</time><strong>${a.actor}</strong><span>${a.summary}</span></article>`).join('');
  $('[data-supervisor-notes]').innerHTML = data.notes.map(n=>`<li>${n}</li>`).join('');
}
getSupervisorHierarchyPreview().then(render).catch(error => { console.error(error); const mount=$('[data-supervisor-list]'); if(mount) mount.innerHTML='<p>Unable to load supervisor hierarchy preview data.</p>'; });
