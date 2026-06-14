/*
Signal Labs
Area: Signal Schedule
File: schedule/repositories/AssignmentEngineRepository.js
Version: v2.21.0
Purpose: Repository boundary for Assignment Engine preview data
*/
import { fetchAssignmentEnginePreview } from '../adapters/JsonAssignmentEngineAdapter.js';

export async function listAssignmentEnginePreview() {
  return fetchAssignmentEnginePreview();
}
