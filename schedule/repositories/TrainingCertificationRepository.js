/*
Signal Labs
Area: Signal Schedule
File: schedule/repositories/TrainingCertificationRepository.js
Version: v3.8.1
Purpose: Repository facade for Training & Certifications data
*/
import { getTrainingCertificationPreview } from '../adapters/JsonTrainingCertificationAdapter.js';

export async function getPreview() {
  return getTrainingCertificationPreview();
}
