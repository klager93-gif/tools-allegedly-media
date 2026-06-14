/*
Signal Labs
Area: Signal Schedule
File: schedule/repositories/OtVolunteerBoardRepository.js
Version: v3.3.3
Purpose: Repository boundary for OT Volunteer Board Foundation
*/
import { fetchOtVolunteerBoardPreview } from '../adapters/JsonOtVolunteerBoardAdapter.js';

export async function getOtVolunteerBoardPreview() {
  return fetchOtVolunteerBoardPreview();
}
