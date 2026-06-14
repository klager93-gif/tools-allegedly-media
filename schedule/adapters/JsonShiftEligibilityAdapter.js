/*
Signal Labs
Area: Signal Schedule
File: schedule/adapters/JsonShiftEligibilityAdapter.js
Version: v5.1.0
Purpose: JSON adapter for Qualification & Eligibility Engine preview data
*/
export async function getShiftEligibilityPreview() {
  const response = await fetch('./data/shift-eligibility-preview.json', { cache: 'no-store' });
  if (!response.ok) {
    throw new Error(`Unable to load shift eligibility preview data: ${response.status}`);
  }
  return response.json();
}
