/*
Signal Labs
Area: Signal Schedule
File: schedule/pages/requests/approvals.js
Version: v5.1.0
Purpose: Render Request Approval Workflow preview
*/
import { getRequestApprovalWorkflowPreview } from '../../services/RequestApprovalWorkflowService.js';
const $ = (selector) => document.querySelector(selector);
function safe(value){ return String(value ?? ''); }
function statLabel(key){ return key.replace(/([A-Z])/g,' $1').replace(/^./, c => c.toUpperCase()); }
function render(data){
  $('[data-approval-stats]').innerHTML = Object.entries(data.summary).map(([key,value]) => `<div class="approval-stat"><strong>${safe(value)}</strong><span>${statLabel(key)}</span></div>`).join('');
  $('[data-approval-queues]').innerHTML = data.queues.map(queue => `<article class="queue-card"><h3>${safe(queue.name)}</h3><p>${safe(queue.route)}</p><p><strong>Authority:</strong> ${safe(queue.permission)}</p><span class="pending">${safe(queue.pending)} pending</span></article>`).join('');
  $('[data-approval-requests]').innerHTML = data.requests.map(request => `<article class="request-card"><div><h3>${safe(request.type)}</h3><p><strong>${safe(request.employee)}</strong></p><p>${safe(request.reason)}</p><div class="request-meta"><span class="approval-badge">${safe(request.id)}</span><span class="approval-badge warning">${safe(request.status)}</span></div></div><div><p><strong>Step:</strong> ${safe(request.currentStep)}</p><p><strong>Hours:</strong> ${safe(request.hours)}</p><p><strong>Submitted:</strong> ${safe(request.submitted)}</p></div><div><p><strong>Coverage:</strong> ${safe(request.coverage)}</p><p><strong>Eligibility:</strong> ${safe(request.eligibility)}</p><p><strong>Recommendation:</strong> ${safe(request.recommendation)}</p></div></article>`).join('');
  $('[data-approval-chains]').innerHTML = data.chains.map(chain => `<article class="chain-card"><h3>${safe(chain.workflow)}</h3><div class="chain-steps">${chain.steps.map(step => `<span>${safe(step)}</span>`).join('')}</div></article>`).join('');
  $('[data-policy-checks]').innerHTML = data.policyChecks.map(note => `<li>${safe(note)}</li>`).join('');
}
getRequestApprovalWorkflowPreview().then(render).catch(error => { console.error(error); const mount=$('[data-approval-queues]'); if(mount) mount.innerHTML='<p>Unable to load request approval workflow preview data.</p>'; });
