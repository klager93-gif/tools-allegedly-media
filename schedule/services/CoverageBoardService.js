/*
Signal Labs Tool File: schedule/services/CoverageBoardService.js
Version: v5.1.0
Purpose: Coverage Board summary, filtering, and open-shift linkage helpers.
*/
export class CoverageBoardService {
  constructor(repository) {
    this.repository = repository;
  }

  async getCoverageBoardPreview() {
    return this.repository.listCoverageBoardPreview();
  }

  summarize(rows = []) {
    return rows.reduce((summary, row) => {
      const status = row.status || 'unknown';
      summary.total += 1;
      summary.openSlots += Number(row.openSlots || 0);
      summary.targetOpenSlots += Number(row.targetOpenSlots || 0);
      summary[status] = (summary[status] || 0) + 1;
      if (status === 'below-minimum') summary.belowMinimum += 1;
      return summary;
    }, { total: 0, openSlots: 0, targetOpenSlots: 0, belowMinimum: 0 });
  }

  filterRows(rows = [], filter = 'all') {
    if (filter === 'all') return rows;
    if (filter === 'open') return rows.filter(row => Number(row.openSlots || 0) > 0);
    return rows.filter(row => row.status === filter || row.risk === filter);
  }

  groupByDate(rows = []) {
    return rows.reduce((groups, row) => {
      const key = row.date || 'Unscheduled';
      if (!groups[key]) groups[key] = [];
      groups[key].push(row);
      return groups;
    }, {});
  }

  findLinkedOpenShift(openShifts = [], coverageRow = {}) {
    if (!coverageRow.linkedOpenShiftId) return null;
    return openShifts.find(shift => shift.id === coverageRow.linkedOpenShiftId) || null;
  }
}
