/*
Signal Labs
Area: Signal Schedule
File: schedule/services/ShiftEligibilityService.js
Version: v5.1.0
Purpose: Qualification & Eligibility Engine service helpers
*/
import { getPreview } from '../repositories/ShiftEligibilityRepository.js';

export async function loadShiftEligibilityPreview() {
  const data = await getPreview();
  return {
    summary: data.summary || {},
    policyChecks: Array.isArray(data.policyChecks) ? data.policyChecks : [],
    requirements: Array.isArray(data.requirements) ? data.requirements : [],
    checks: Array.isArray(data.checks) ? data.checks : []
  };
}

export function filterEligibilityChecks(checks, filter) {
  if (!Array.isArray(checks) || filter === 'all') return checks || [];
  return checks.filter((check) => check.result === filter || check.source.toLowerCase().includes(filter));
}

export function calculateEligibility({ requiredCredential, employeeCredentialStatus, allowOverride }) {
  if (!requiredCredential || requiredCredential === 'None') {
    return { result: 'eligible', reason: 'No required credential for this shift.' };
  }
  if (employeeCredentialStatus === 'active') {
    return { result: 'eligible', reason: 'Required credential is active.' };
  }
  if (employeeCredentialStatus === 'training') {
    return { result: 'warn', reason: 'Employee is still in training and may need trainer/supervisor approval.' };
  }
  if (allowOverride) {
    return { result: 'blocked', reason: 'Required credential is missing or invalid. Admin override requires reason and audit entry.' };
  }
  return { result: 'blocked', reason: 'Required credential is missing or invalid and override is not allowed.' };
}
