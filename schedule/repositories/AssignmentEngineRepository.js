/*
Signal Labs
Area: Signal Schedule
File: schedule/repositories/AssignmentEngineRepository.js
Version: v5.1.0
Purpose: Repository boundary for Assignment Engine preview data
*/
import { fetchAssignmentEnginePreview } from '../adapters/JsonAssignmentEngineAdapter.js';

export async function listAssignmentEnginePreview() {
  return fetchAssignmentEnginePreview();
}
