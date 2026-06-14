/*
Signal Labs
Area: Signal Schedule
File: schedule/adapters/JsonRolesPermissionsAdapter.js
Version: v5.1.0
Purpose: JSON adapter for roles and permissions preview data
*/
export async function fetchRolesPermissionsPreview() {
  const response = await fetch('./data/roles-permissions-preview.json', { cache: 'no-store' });
  if (!response.ok) throw new Error(`Unable to load roles permissions preview: ${response.status}`);
  return response.json();
}
