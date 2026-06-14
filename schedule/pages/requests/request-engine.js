/*
Signal Labs
Area: Signal Schedule
File: schedule/pages/requests/request-engine.js
Version: v5.1.0
Purpose: Render Request & Approval Engine foundation preview.
*/
const $ = (selector) => document.querySelector(selector);
const safe = (value) => String(value ?? '');
const labelize = (key) => key.replace(/([A-Z])/g, ' $1').replace(/^./, (c) => c.toUpperCase());

function copyText(text) {
  if (navigator.clipboard?.writeText) return navigator.clipboard.writeText(text);
  const area = document.createElement('textarea');
  area.value = text;
  document.body.appendChild(area);
  area.select();
  document.execCommand('copy');
  area.remove();
  return Promise.resolve();
}

async function loadPreview() {
  try {
    const res = await fetch('data/request-approval-engine-preview.json', { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (error) {
    console.warn('Falling back to API route for request approval engine preview.', error);
    const res = await fetch('/api/request-approval-engine', { cache: 'no-store' });
    if (!res.ok) throw new Error(`Unable to load request engine preview: HTTP ${res.status}`);
    const payload = await res.json();
    return payload.data;
  }
}

function render(data) {
  $('[data-request-stats]').innerHTML = Object.entries(data.summary || {}).map(([key, value]) => `
    <div class="request-stat"><strong>${safe(value)}</strong><span>${safe(labelize(key))}</span></div>
  `).join('');
  $('[data-request-queues]').innerHTML = (data.queues || []).map((queue) => `
    <article class="request-queue">
      <h3>${safe(queue.name)}</h3>
      <p>${safe(queue.description)}</p>
      <span class="request-badge">${safe(queue.count)} pending</span>
      <div class="request-actions"><button type="button" data-copy="${safe(queue.name)} queue">Copy Queue</button></div>
    </article>
  `).join('');
  $('[data-request-list]').innerHTML = (data.requests || []).map((request) => `
    <article class="request-item">
      <div>
        <h3>${safe(request.type)} — ${safe(request.employee)}</h3>
        <p>${safe(request.reason)}</p>
        <span class="request-badge">${safe(request.id)}</span><span class="request-badge warn">${safe(request.status)}</span>
      </div>
      <div>
        <p><strong>Range:</strong> ${safe(request.dateRange)}</p>
        <p><strong>Hours:</strong> ${safe(request.hours)}</p>
        <p><strong>Step:</strong> ${safe(request.currentStep)}</p>
      </div>
      <div>
        <p><strong>Policy:</strong> ${safe(request.policy)}</p>
        <p><strong>Coverage:</strong> ${safe(request.coverage)}</p>
        <div class="request-actions"><button type="button" data-copy="${safe(request.id)}">Copy Request ID</button><button type="button" data-copy="/api/request-approval-engine/${safe(request.id)}">Copy API</button></div>
      </div>
    </article>
  `).join('');
  $('[data-request-workflow]').innerHTML = (data.workflow || []).map((step) => `<span>${safe(step)}</span>`).join('');
  $('[data-request-policy]').innerHTML = (data.policyChecks || []).map((item) => `<li>${safe(item)}</li>`).join('');
}

document.addEventListener('click', (event) => {
  const button = event.target.closest('[data-copy]');
  if (!button) return;
  copyText(button.dataset.copy || '').then(() => {
    const original = button.textContent;
    button.textContent = 'Copied';
    setTimeout(() => { button.textContent = original; }, 1200);
  });
});

loadPreview().then(render).catch((error) => {
  console.error(error);
  const list = $('[data-request-list]');
  if (list) list.innerHTML = '<p>Unable to load Request & Approval Engine preview data.</p>';
});
