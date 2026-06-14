/*
Signal Labs
Area: Signal Schedule
File: schedule/repositories/CalendarViewRepository.js
Version: v3.9.0
Purpose: Repository boundary for calendar view data
*/
import { getCalendarViewPreview } from '../adapters/JsonCalendarViewAdapter.js';

export async function readCalendarViewPreview() {
  return getCalendarViewPreview();
}
