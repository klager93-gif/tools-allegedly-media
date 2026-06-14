/*
Signal Labs
Area: Signal Schedule
File: schedule/adapters/JsonSupervisorHierarchyAdapter.js
Version: v5.1.0
Purpose: JSON adapter for supervisor hierarchy preview data
*/
export async function fetchSupervisorHierarchyPreview() {
  const response = await fetch('./data/supervisor-hierarchy-preview.json', { cache: 'no-store' });
  if (!response.ok) throw new Error(`Unable to load supervisor hierarchy preview: ${response.status}`);
  return response.json();
}
