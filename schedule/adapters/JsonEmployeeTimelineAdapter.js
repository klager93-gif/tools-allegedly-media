/*
Signal Labs
Area: Signal Schedule
File: schedule/adapters/JsonEmployeeTimelineAdapter.js
Version: v5.1.0
Purpose: JSON adapter for employee timeline and audit trail preview data
*/
export async function fetchEmployeeTimelinePreview() {
  const response = await fetch('./data/employee-timeline-preview.json', { cache: 'no-store' });
  if (!response.ok) throw new Error(`Unable to load employee timeline preview: ${response.status}`);
  return response.json();
}
