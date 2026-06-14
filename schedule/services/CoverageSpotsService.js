/*
Signal Labs
Area: Signal Schedule
File: schedule/services/CoverageSpotsService.js
Version: v5.1.0
Purpose: Service layer for coverage spot status calculations
*/
import { listCoverageSpotsPreview } from '../repositories/CoverageSpotsRepository.js';
export async function getCoverageSpotsPreview() {
  const data = await listCoverageSpotsPreview();
  const days = data.days.map(day => ({
    ...day,
    shifts: day.shifts.map(shift => {
      const filled = shift.spots.filter(spot => spot.status === 'filled').length;
      const open = shift.spots.length - filled;
      return { ...shift, filled, open, underMinimum: Math.max(shift.required - filled, 0), overMaximum: Math.max(filled - shift.maximum, 0) };
    })
  }));
  return { ...data, days };
}
