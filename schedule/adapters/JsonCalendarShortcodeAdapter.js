/*
Signal Labs
Area: Signal Schedule
File: schedule/adapters/JsonCalendarShortcodeAdapter.js
Version: v3.3.3
Purpose: JSON adapter for Calendar Shortcode Admin Controls preview data
*/
export async function getCalendarShortcodesPreview() {
  const response = await fetch('./data/calendar-shortcodes-preview.json', { cache: 'no-store' });
  if (!response.ok) {
    throw new Error('Unable to load Calendar Shortcode preview data.');
  }
  return response.json();
}
