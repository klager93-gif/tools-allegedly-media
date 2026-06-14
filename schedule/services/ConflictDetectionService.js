/*
Signal Labs Tool File: schedule/services/ConflictDetectionService.js
Version: v5.1.0
Purpose: Conflict Detection preview service and grouping helpers.
*/
export class ConflictDetectionService {
  constructor(repository) {
    this.repository = repository;
  }

  async getPreview() {
    return this.repository.getPreview();
  }

  groupBySeverity(conflicts = []) {
    return conflicts.reduce((groups, conflict) => {
      const key = conflict.severity || 'unknown';
      if (!groups[key]) groups[key] = [];
      groups[key].push(conflict);
      return groups;
    }, {});
  }

  getStatusCounts(conflicts = []) {
    return conflicts.reduce((counts, conflict) => {
      const key = conflict.status || 'unknown';
      counts[key] = (counts[key] || 0) + 1;
      return counts;
    }, {});
  }

  visibleForRole(conflict, role = 'employee') {
    const rank = { employee: 1, supervisor: 2, admin: 3 };
    const required = rank[conflict.visibility || 'employee'] || 1;
    return (rank[role] || 1) >= required;
  }
}
