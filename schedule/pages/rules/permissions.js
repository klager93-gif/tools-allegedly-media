/*
Signal Labs
Area: Signal Schedule
File: schedule/pages/rules/permissions.js
Version: v5.1.0
Purpose: Render Roles & Permissions Engine preview
*/
import { getRolesPermissionsPreview } from '../../services/RolesPermissionsService.js';
const $ = (selector) => document.querySelector(selector);
function safe(value){ return String(value ?? ''); }
function render(data){
  $('[data-permission-stats]').innerHTML = Object.entries(data.summary).map(([key,value]) => `<div class="permission-stat"><strong>${value}</strong><span>${key.replace(/([A-Z])/g,' $1')}</span></div>`).join('');
  $('[data-role-list]').innerHTML = data.roles.map(role => `<article class="role-card"><p class="permissions-kicker">${safe(role.template)}</p><h3>${safe(role.name)}</h3><p><strong>Scope:</strong> ${safe(role.scope)}</p><p>${safe(role.notes)}</p><div class="badge-row">${role.badges.map(b=>`<span class="permission-badge">${safe(b)}</span>`).join('')}</div></article>`).join('');
  $('[data-permission-matrix]').innerHTML = data.permissionMatrix.map(row => `<tr><td>${safe(row.area)}</td><td>${safe(row.employee)}</td><td>${safe(row.supervisor)}</td><td>${safe(row.admin)}</td></tr>`).join('');
  $('[data-field-rules]').innerHTML = data.fieldRules.map(rule => `<article class="field-card"><h3>${safe(rule.field)}</h3><div class="rule-row"><span class="scope-badge">Employee: ${safe(rule.employee)}</span><span class="scope-badge">Supervisor: ${safe(rule.supervisor)}</span><span class="permission-badge">Admin: ${safe(rule.admin)}</span><span class="lock-badge">${safe(rule.approval)}</span></div></article>`).join('');
  $('[data-scope-rules]').innerHTML = data.scopeRules.map(rule => `<article class="scope-card"><h3>${safe(rule.title)}</h3><p>${safe(rule.description)}</p></article>`).join('');
  $('[data-approval-rules]').innerHTML = data.approvalRules.map(rule => `<article class="approval-row"><strong>${safe(rule.workflow)}</strong><span>${safe(rule.employee)}</span><span>${safe(rule.supervisor)}</span><span>${safe(rule.admin)}</span></article>`).join('');
  $('[data-permission-notes]').innerHTML = data.notes.map(n=>`<li>${safe(n)}</li>`).join('');
}
getRolesPermissionsPreview().then(render).catch(error => { console.error(error); const mount=$('[data-role-list]'); if(mount) mount.innerHTML='<p>Unable to load roles and permissions preview data.</p>'; });
