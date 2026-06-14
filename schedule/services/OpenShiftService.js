/*
Signal Labs Tool File: schedule/services/OpenShiftService.js
Version: v5.1.0
Purpose: Open Shifts / Overtime Opportunity Board service helpers.
*/
export class OpenShiftService {
  constructor(repository) {
    this.repository = repository;
  }

  async getOpenShiftPreview() {
    return this.repository.listOpenShiftPreview();
  }

  summarizeCoverage(openShifts = [], votRequests = []) {
    const summary = openShifts.reduce((accumulator, shift) => {
      const status = shift.coverageStatus || 'unknown';
      accumulator.total += 1;
      accumulator.openSlots += Number(shift.slotsAvailable || shift.need || 0);
      accumulator[status] = (accumulator[status] || 0) + 1;
      return accumulator;
    }, { total: 0, openSlots: 0 });

    summary.volunteers = votRequests.length;
    summary.eligibleVolunteers = votRequests.filter(request => request.eligibilityStatus === 'eligible').length;
    return summary;
  }

  filterOpportunities(openShifts = [], filter = 'all') {
    if (filter === 'all') return openShifts;
    return openShifts.filter(shift => shift.coverageStatus === filter || shift.priority?.toLowerCase() === filter);
  }

  getRequestsForShift(votRequests = [], openShiftId) {
    return votRequests.filter(request => request.openShiftId === openShiftId);
  }

  recommendAward(votRequests = []) {
    const eligible = votRequests
      .filter(request => request.eligibilityStatus === 'eligible')
      .sort((a, b) => Number(a.seniorityRank || 999) - Number(b.seniorityRank || 999));

    return eligible[0] || null;
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
