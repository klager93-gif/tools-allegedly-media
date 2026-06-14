/*
Signal Labs
Area: Signal Schedule
File: schedule/services/TrainingCertificationService.js
Version: v5.1.0
Purpose: Training & Certifications service helpers
*/
import { getPreview } from '../repositories/TrainingCertificationRepository.js';

export async function loadTrainingCertificationPreview() {
  const data = await getPreview();
  return {
    summary: data.summary || {},
    policyChecks: Array.isArray(data.policyChecks) ? data.policyChecks : [],
    records: Array.isArray(data.records) ? data.records : []
  };
}

export function filterTrainingRecords(records, filter) {
  if (!Array.isArray(records) || filter === 'all') return records || [];
  if (filter === 'expiring') return records.filter((record) => record.status === 'expiring');
  if (filter === 'expired') return records.filter((record) => record.status === 'expired');
  if (filter === 'training') return records.filter((record) => record.status === 'training');
  if (filter === 'restricted') return records.filter((record) => ['restricted', 'blocked'].includes(record.scheduleImpact));
  return records;
}
