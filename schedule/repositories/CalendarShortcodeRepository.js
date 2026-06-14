/*
Signal Labs
Area: Signal Schedule
File: schedule/repositories/CalendarShortcodeRepository.js
Version: v5.1.0
Purpose: Repository boundary for Calendar Shortcode Admin Controls
*/
import { getCalendarShortcodesPreview } from '../adapters/JsonCalendarShortcodeAdapter.js';

export async function getCalendarShortcodesDashboard() {
  return getCalendarShortcodesPreview();
}
