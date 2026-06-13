/*
Signal Labs Tool File: schedule/services/OpenShiftService.js
Version: v2.3.0
Purpose: Open Shifts / VOT Foundation service helpers.
*/
export class OpenShiftService {
  constructor(repository) {
    this.repository = repository;
  }

  async getOpenShiftPreview() {
    return this.repository.listOpenShiftPreview();
  }

  summarizeCoverage(openShifts = []) {
    return openShifts.reduce((summary, shift) => {
      const status = shift.coverageStatus || 'unknown';
      summary.total += 1;
      summary[status] = (summary[status] || 0) + 1;
      return summary;
    }, { total: 0 });
  }

  calculateShiftHours(startTime, endTime) {
    if (!startTime || !endTime) return 0;
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);
    const start = startHour * 60 + startMinute;
    let end = endHour * 60 + endMinute;
    if (end <= start) end += 24 * 60;
    return Math.round(((end - start) / 60) * 100) / 100;
  }
}
