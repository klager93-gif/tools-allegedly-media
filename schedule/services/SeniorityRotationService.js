/*
Signal Labs Tool File: schedule/services/SeniorityRotationService.js
Version: v5.1.0
Purpose: Seniority, equalization, callback, mandate, and skip-reason helpers.
*/
export class SeniorityRotationService {
  constructor(repository) {
    this.repository = repository;
  }

  async getSeniorityRotationPreview() {
    return this.repository.listSeniorityRotationPreview();
  }

  summarize(rows = []) {
    return rows.reduce((summary, row) => {
      summary.total += 1;
      if (row.status === 'eligible') summary.eligible += 1;
      if (row.status === 'skipped') summary.skipped += 1;
      if (row.status === 'mandate') summary.mandate += 1;
      summary.equalizedOtHours += Number(row.equalizedOtHours || 0);
      return summary;
    }, { total: 0, eligible: 0, skipped: 0, mandate: 0, equalizedOtHours: 0 });
  }

  filterRows(rows = [], filter = 'all') {
    if (filter === 'all') return rows;
    if (filter === 'callback') return rows.filter(row => row.listType === 'callback');
    if (filter === 'mandate') return rows.filter(row => row.listType === 'mandate' || row.status === 'mandate');
    return rows.filter(row => row.status === filter);
  }

  sortRows(rows = [], rule = 'Lowest equalized OT first') {
    const copy = rows.slice();
    if (rule === 'Highest seniority first') return copy.sort((a, b) => String(a.seniorityDate).localeCompare(String(b.seniorityDate)));
    if (rule === 'Reverse seniority mandate') return copy.sort((a, b) => String(b.seniorityDate).localeCompare(String(a.seniorityDate)));
    if (rule === 'Rotating wheel') return copy.sort((a, b) => Number(a.rank || 0) - Number(b.rank || 0));
    return copy.sort((a, b) => Number(a.equalizedOtHours || 0) - Number(b.equalizedOtHours || 0));
  }

  eligibleForQualification(rows = [], qualification = '') {
    return rows.filter(row => (row.qualifications || []).includes(qualification) && row.status !== 'skipped');
  }
}
