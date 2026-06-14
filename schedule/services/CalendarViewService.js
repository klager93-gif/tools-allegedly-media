/*
Signal Labs
Area: Signal Schedule
File: schedule/services/CalendarViewService.js
Version: v5.1.0
Purpose: Calendar view service helpers for week/day UI previews
*/
import { readCalendarViewPreview } from '../repositories/CalendarViewRepository.js';

export async function loadCalendarViewModel() {
  const data = await readCalendarViewPreview();
  const shortcodeMap = new Map((data.shortcodes || []).map((item) => [item.code, item]));
  return { ...data, shortcodeMap };
}
