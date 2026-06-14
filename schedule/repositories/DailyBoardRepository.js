/*
Signal Labs
Area: Signal Schedule
File: schedule/repositories/DailyBoardRepository.js
Version: v3.3.3
Purpose: Repository boundary for Daily Schedule Board foundation data
*/
import { fetchDailyBoardPreview } from '../adapters/JsonDailyBoardAdapter.js';
export async function listDailyBoardPreview() { return fetchDailyBoardPreview(); }
