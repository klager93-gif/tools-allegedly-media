/*
Signal Labs
Area: Signal Schedule
File: schedule/repositories/OtVolunteerBoardRepository.js
Version: v4.7.0
Purpose: Repository boundary for OT Volunteer Board Foundation
*/
import { fetchOtVolunteerBoardPreview } from '../adapters/JsonOtVolunteerBoardAdapter.js';

export async function getOtVolunteerBoardPreview() {
  return fetchOtVolunteerBoardPreview();
}
