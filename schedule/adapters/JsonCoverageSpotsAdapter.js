/*
Signal Labs
Area: Signal Schedule
File: schedule/adapters/JsonCoverageSpotsAdapter.js
Version: v5.1.0
Purpose: JSON adapter for coverage spots foundation preview data
*/
export async function fetchCoverageSpotsPreview() {
  const response = await fetch('./data/coverage-spots-preview.json', { cache: 'no-store' });
  if (!response.ok) throw new Error(`Unable to load coverage spots preview: ${response.status}`);
  return response.json();
}
