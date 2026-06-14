/*
Signal Labs
Area: Signal Schedule
File: schedule/repositories/DailyBoardRepository.js
Version: v5.1.0
Purpose: Repository boundary for Daily Schedule Board foundation data
*/
import { fetchDailyBoardPreview } from '../adapters/JsonDailyBoardAdapter.js';
export async function listDailyBoardPreview() { return fetchDailyBoardPreview(); }
