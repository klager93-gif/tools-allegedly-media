/*
Signal Labs
Area: Signal Schedule
File: schedule/adapters/JsonWeeklyBoardAdapter.js
Version: v5.1.0
Purpose: JSON adapter for Weekly Schedule View preview data
*/
export async function fetchWeeklyBoardPreview() {
  const response = await fetch('./data/weekly-board-preview.json', { cache: 'no-store' });
  if (!response.ok) throw new Error(`Unable to load weekly board preview: ${response.status}`);
  return response.json();
}
