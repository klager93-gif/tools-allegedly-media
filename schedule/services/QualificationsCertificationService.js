/*
Signal Labs Tool File: schedule/services/QualificationsCertificationService.js
Version: v5.1.0
Purpose: Qualifications & Certification Engine preview service and role visibility helpers.
*/
export class QualificationsCertificationService {
  constructor(repository) {
    this.repository = repository;
  }

  async getPreview() {
    return this.repository.getPreview();
  }

  visibleForRole(item, role = 'employee') {
    const rank = { employee: 1, supervisor: 2, admin: 3 };
    const required = rank[item.visibility || 'employee'] || 1;
    return (rank[role] || 1) >= required;
  }

  groupByStatus(records = []) {
    return records.reduce((groups, record) => {
      const key = record.status || 'unknown';
      if (!groups[key]) groups[key] = [];
      groups[key].push(record);
      return groups;
    }, {});
  }

  getExpiringSoon(records = [], days = 90) {
    return records.filter((record) => Number(record.daysUntilExpiration) >= 0 && Number(record.daysUntilExpiration) <= days);
  }
}
