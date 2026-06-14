/*
Signal Labs
Area: Signal Schedule
File: schedule/adapters/JsonLeaveBanksAdapter.js
Version: v5.1.0
Purpose: JSON adapter for Leave Banks Foundation preview data
*/
export async function fetchLeaveBanksPreview() {
  const response = await fetch('./data/leave-banks-preview.json', { cache: 'no-store' });
  if (!response.ok) {
    throw new Error(`Unable to load leave banks preview: ${response.status}`);
  }
  return response.json();
}
