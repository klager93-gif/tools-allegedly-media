/*
Signal Labs
Area: Signal Schedule
File: schedule/services/WeeklyBoardService.js
Version: v5.1.0
Purpose: Service calculations for Weekly Schedule View foundation
*/
import { listWeeklyBoardPreview } from '../repositories/WeeklyBoardRepository.js';

export async function getWeeklyBoardPreview() {
  const data = await listWeeklyBoardPreview();
  const dayStatusCounts = data.days.reduce((acc, day) => {
    acc[day.status] = (acc[day.status] || 0) + 1;
    return acc;
  }, {});
  return { ...data, dayStatusCounts };
}
