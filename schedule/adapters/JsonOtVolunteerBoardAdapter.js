/*
Signal Labs
Area: Signal Schedule
File: schedule/adapters/JsonOtVolunteerBoardAdapter.js
Version: v5.1.0
Purpose: JSON adapter for OT Volunteer Board preview data
*/
export async function fetchOtVolunteerBoardPreview() {
  const response = await fetch('./data/ot-volunteer-board-preview.json', { cache: 'no-store' });
  if (!response.ok) {
    throw new Error(`Unable to load OT volunteer board preview: ${response.status}`);
  }
  return response.json();
}
