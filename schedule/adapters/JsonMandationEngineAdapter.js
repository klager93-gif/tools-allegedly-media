/*
Signal Labs
Area: Signal Schedule
File: schedule/adapters/JsonMandationEngineAdapter.js
Version: v5.1.0
Purpose: JSON adapter for Mandation Engine Foundation preview data
*/
export async function fetchMandationEnginePreview() {
  const response = await fetch('./data/mandation-engine-preview.json', { cache: 'no-store' });
  if (!response.ok) {
    throw new Error(`Unable to load mandation engine preview: ${response.status}`);
  }
  return response.json();
}
