/*
Signal Labs
Area: Signal Schedule
File: schedule/adapters/JsonRequestApprovalWorkflowAdapter.js
Version: v5.1.0
Purpose: JSON adapter for request approval workflow preview data
*/
export async function fetchRequestApprovalWorkflowPreview() {
  const response = await fetch('./data/request-approval-workflow-preview.json', { cache: 'no-store' });
  if (!response.ok) throw new Error(`Unable to load request approval workflow preview: ${response.status}`);
  return response.json();
}
