/*
Signal Labs
Area: Signal Schedule
File: schedule/adapters/JsonCalendarViewAdapter.js
Version: v5.1.0
Purpose: JSON adapter for calendar week/day preview data
*/
export async function getCalendarViewPreview() {
  const response = await fetch('./data/calendar-view-preview.json', { cache: 'no-store' });
  if (!response.ok) {
    throw new Error('Unable to load calendar view preview data');
  }
  return response.json();
}
