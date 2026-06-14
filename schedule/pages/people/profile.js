/*
Signal Labs
Area: Signal Schedule
File: schedule/pages/people/profile.js
Version: v5.1.0
Purpose: Render Employee Profile & Self-Service Settings preview
*/
import { getEmployeeProfilePreview } from '../../services/EmployeeProfileService.js';

const chips = {
  editable: ['Editable','profile-chip profile-chip--ok'],
  viewOnly: ['View only','profile-chip profile-chip--lock'],
  approval: ['Approval required','profile-chip profile-chip--warn'],
  deletable: ['Can delete','profile-chip'],
  locked: ['Locked','profile-chip profile-chip--lock'],
  enabled: ['Enabled','profile-chip profile-chip--ok'],
  disabled: ['Disabled','profile-chip profile-chip--lock']
};
function chip(type, label){ const c=chips[type]||[label||type,'profile-chip']; return `<span class="${c[1]}">${label||c[0]}</span>`; }
function el(sel){ return document.querySelector(sel); }
function fieldCard(field){
  const meta=[];
  meta.push(field.employeeCanEdit ? chip('editable') : chip('viewOnly'));
  if(field.requiresApproval) meta.push(chip('approval'));
  meta.push(field.employeeCanDelete ? chip('deletable') : chip('locked','Cannot delete'));
  return `<article class="profile-field"><strong>${field.label}</strong><span>${field.value || 'Not provided'}</span><div class="profile-field__meta">${meta.join('')}</div></article>`;
}
function renderProfile(data){
  const employee=data.employee;
  el('[data-profile-policy-summary]').textContent = `${data.policy.editableFieldCount} editable fields`;
  el('[data-profile-identity]').innerHTML = `<div class="profile-avatar">${employee.initials}</div><h3>${employee.name}</h3><p>${employee.role} · ${employee.shiftGroup}</p><p>${employee.department}</p>`;
  el('[data-profile-stats]').innerHTML = data.stats.map(stat=>`<div class="profile-stat"><strong>${stat.value}</strong><span>${stat.label}</span></div>`).join('');
  el('[data-profile-field-count]').textContent = `${data.fields.length} fields`;
  el('[data-profile-fields]').innerHTML = data.fields.map(fieldCard).join('');
  el('[data-profile-notification-count]').textContent = `${data.notifications.length} channels`;
  el('[data-profile-notifications]').innerHTML = data.notifications.map(n=>`<article class="profile-notification"><strong>${n.label}</strong><span>${n.description}</span><div class="profile-notification__meta">${chip(n.enabled?'enabled':'disabled')}${chip(n.employeeCanChange?'editable':'locked', n.employeeCanChange?'Employee can change':'Admin controlled')}</div></article>`).join('');
  el('[data-profile-policy-grid]').innerHTML = data.policies.map(p=>`<article class="profile-policy"><strong>${p.field}</strong><span>${p.rule}</span><div class="profile-field__meta">${p.badges.map(b=>chip(b.type,b.label)).join('')}</div></article>`).join('');
  el('[data-profile-audit-list]').innerHTML = data.audit.map(a=>`<article class="profile-audit"><time>${a.when}</time><strong>${a.actor}</strong><span>${a.summary}</span></article>`).join('');
}
getEmployeeProfilePreview().then(renderProfile).catch(err=>{ console.error(err); const mount=el('[data-profile-fields]'); if(mount) mount.innerHTML='<p>Unable to load employee profile preview data.</p>'; });
