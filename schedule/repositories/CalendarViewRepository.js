/*
Signal Labs
Area: Signal Schedule
File: schedule/repositories/CalendarViewRepository.js
Version: v3.3.3
Purpose: Repository boundary for calendar view data
*/
import { getCalendarViewPreview } from '../adapters/JsonCalendarViewAdapter.js';

export async function readCalendarViewPreview() {
  return getCalendarViewPreview();
}
