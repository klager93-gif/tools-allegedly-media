/*
Signal Labs
Area: Signal Schedule
File: schedule/repositories/LeaveBanksRepository.js
Version: v4.6.1
Purpose: Repository boundary for Leave Banks Foundation
*/
import { fetchLeaveBanksPreview } from '../adapters/JsonLeaveBanksAdapter.js';

export async function getLeaveBanksPreview() {
  return fetchLeaveBanksPreview();
}
