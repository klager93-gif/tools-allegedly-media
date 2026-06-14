/*
Signal Labs
Area: Signal Schedule
File: schedule/adapters/JsonEmployeeProfileAdapter.js
Version: v5.1.0
Purpose: JSON adapter for employee profile self-service preview data
*/
export async function fetchEmployeeProfilePreview() {
  const response = await fetch('./data/employee-profile-preview.json', { cache: 'no-store' });
  if (!response.ok) throw new Error(`Unable to load employee profile preview: ${response.status}`);
  return response.json();
}
