/*
Signal Labs
Area: Signal Schedule
File: schedule/repositories/TrainingCertificationRepository.js
Version: v2.19.0
Purpose: Repository facade for Training & Certifications data
*/
import { getTrainingCertificationPreview } from '../adapters/JsonTrainingCertificationAdapter.js';

export async function getPreview() {
  return getTrainingCertificationPreview();
}
