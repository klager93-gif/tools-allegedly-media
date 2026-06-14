/*
Signal Labs
Area: Signal Schedule
File: schedule/adapters/JsonAssignmentEngineAdapter.js
Version: v5.1.0
Purpose: JSON adapter for Assignment Engine preview data
*/
export async function fetchAssignmentEnginePreview() {
  const response = await fetch('./data/assignment-engine-preview.json', { cache: 'no-store' });
  if (!response.ok) {
    throw new Error(`Unable to load assignment engine preview: ${response.status}`);
  }
  return response.json();
}
