/*
Signal Labs
Area: Signal Schedule
File: schedule/services/CalendarShortcodeService.js
Version: v5.1.0
Purpose: Service layer for Calendar Shortcode Admin Controls preview logic
*/
import { getCalendarShortcodesDashboard } from '../repositories/CalendarShortcodeRepository.js';

export async function getShortcodeAdminDashboard() {
  const data = await getCalendarShortcodesDashboard();
  const activeCodes = (data.shortcodes || []).filter((item) => item.active);
  const employeeVisible = activeCodes.filter((item) => item.employeeVisible);
  const adminEditable = activeCodes.filter((item) => item.adminEditable);
  return {
    ...data,
    summary: {
      total: activeCodes.length,
      employeeVisible: employeeVisible.length,
      adminEditable: adminEditable.length,
      customReady: Boolean(data.settings?.allowCustomCodes)
    }
  };
}
