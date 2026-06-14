/*
Signal Labs
Area: Signal Schedule
File: schedule/adapters/JsonDailyBoardAdapter.js
Version: v5.1.0
Purpose: JSON adapter for Daily Schedule Board preview data
*/
export async function fetchDailyBoardPreview() {
  const response = await fetch('./data/daily-board-preview.json', { cache: 'no-store' });
  if (!response.ok) throw new Error(`Unable to load daily board preview: ${response.status}`);
  return response.json();
}
