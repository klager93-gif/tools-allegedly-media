/*
Signal Labs
Area: Signal Schedule
File: schedule/services/EmployeeTimelineService.js
Version: v5.1.0
Purpose: Service layer for employee timeline and audit trail preview logic
*/
import { listEmployeeTimelinePreview } from '../repositories/EmployeeTimelineRepository.js';
export async function getEmployeeTimelinePreview() {
  const data = await listEmployeeTimelinePreview();
  const categoryCounts = data.events.reduce((acc, event) => {
    acc[event.category] = (acc[event.category] || 0) + 1;
    return acc;
  }, {});
  return { ...data, categoryCounts };
}
