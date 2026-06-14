/*
Signal Labs
Area: Signal Schedule
File: schedule/adapters/JsonNotificationAdapter.js
Version: v5.1.0
Purpose: JSON adapter for notification foundation preview data
*/
export async function fetchNotificationPreview() {
  const response = await fetch('./data/notifications-preview.json', { cache: 'no-store' });
  if (!response.ok) throw new Error(`Unable to load notification preview: ${response.status}`);
  return response.json();
}
