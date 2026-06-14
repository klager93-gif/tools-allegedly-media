/*
Signal Labs
Area: Signal Schedule
File: schedule/services/DailyBoardService.js
Version: v5.1.0
Purpose: Service calculations for Daily Schedule Board preview
*/
import { listDailyBoardPreview } from '../repositories/DailyBoardRepository.js';

function calculateRoleStatus(group) {
  const filled = group.spots.filter(spot => spot.status === 'filled').length;
  const open = group.spots.length - filled;
  const underMinimum = Math.max(group.required - filled, 0);
  const overMaximum = Math.max(filled - group.maximum, 0);
  let status = 'meets-minimum';
  if (underMinimum > 0) status = 'under-minimum';
  if (overMaximum > 0) status = 'over-maximum';
  return { ...group, filled, open, underMinimum, overMaximum, status };
}

export async function getDailyBoardPreview() {
  const data = await listDailyBoardPreview();
  const days = data.days.map(day => ({
    ...day,
    agencies: day.agencies.map(agency => ({
      ...agency,
      shifts: agency.shifts.map(shift => ({
        ...shift,
        coverage: shift.coverage.map(calculateRoleStatus)
      }))
    }))
  }));
  return { ...data, days };
}
