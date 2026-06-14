/*
Signal Labs
Area: Signal Schedule
File: schedule/pages/rules/notifications.js
Version: v5.1.0
Purpose: Render Notification Foundation preview
*/
import { getNotificationPreview } from '../../services/NotificationService.js';
const $ = (selector) => document.querySelector(selector);
const safe = (value) => String(value ?? '');
const statLabel = (key) => key.replace(/([A-Z])/g, ' $1').replace(/^./, c => c.toUpperCase());
function render(data) {
  $('[data-notification-stats]').innerHTML = Object.entries(data.summary).map(([key, value]) => `<div class="notification-stat"><strong>${safe(value)}</strong><span>${statLabel(key)}</span></div>`).join('');
  $('[data-notification-channels]').innerHTML = data.channels.map(channel => `<article class="notification-card"><h3>${safe(channel.name)}</h3><p>${safe(channel.audience)}</p><span class="notification-badge">${safe(channel.status)}</span><ul>${channel.examples.map(example => `<li>${safe(example)}</li>`).join('')}</ul></article>`).join('');
  $('[data-notification-rules]').innerHTML = data.rules.map(rule => `<article class="notification-rule"><div><h3>${safe(rule.trigger)}</h3><p><strong>Recipient:</strong> ${safe(rule.recipient)}</p><p><strong>Source:</strong> ${safe(rule.source)}</p></div><div><span class="notification-badge ${String(rule.priority).toLowerCase() === 'high' ? 'warning' : ''}">${safe(rule.priority)}</span><p><strong>Quiet hours:</strong> ${safe(rule.quietHours)}</p></div></article>`).join('');
  $('[data-notification-queue]').innerHTML = data.queue.map(item => `<article class="notification-queue-item"><div><h3>${safe(item.title)}</h3><p>${safe(item.recipient)}</p><div class="notification-meta"><span>${safe(item.id)}</span><span>${safe(item.relatedModule)}</span></div></div><div><p><strong>Channel:</strong> ${safe(item.channel)}</p><p><strong>Status:</strong> ${safe(item.status)}</p><p><strong>Created:</strong> ${safe(item.created)}</p></div></article>`).join('');
  $('[data-notification-preferences]').innerHTML = data.preferences.map(pref => `<article class="notification-card"><h3>${safe(pref.role)}</h3><p>${safe(pref.defaults)}</p><span class="notification-badge ${pref.canOverride ? 'good' : ''}">${pref.canOverride ? 'Can override' : 'Admin controlled'}</span></article>`).join('');
  $('[data-notification-notes]').innerHTML = data.policyNotes.map(note => `<li>${safe(note)}</li>`).join('');
}
getNotificationPreview().then(render).catch(error => { console.error(error); const mount = $('[data-notification-channels]'); if (mount) mount.innerHTML = '<p>Unable to load notification preview data.</p>'; });
