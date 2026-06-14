/*
Signal Labs
Area: Signal Schedule
File: schedule/repositories/CalendarViewRepository.js
Version: v2.17.1
Purpose: Repository boundary for calendar view data
*/
import { getCalendarViewPreview } from '../adapters/JsonCalendarViewAdapter.js';

export async function readCalendarViewPreview() {
  return getCalendarViewPreview();
}
