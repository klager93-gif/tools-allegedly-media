/*
Signal Labs Tool File: schedule/services/SeniorityEngineService.js
Version: v5.1.0
Purpose: Seniority Engine preview calculations and ordering helpers.
*/
const DATE_FIELDS = {
  overall: 'hireDate',
  classification: 'classificationDate',
  department: 'departmentDate',
  rank: 'rankDate',
  shift: 'shiftDate'
};

function safeDate(value) {
  const time = Date.parse(value || '');
  return Number.isFinite(time) ? time : Number.MAX_SAFE_INTEGER;
}

function safeRank(employee, rankType) {
  return Number(employee?.ranks?.[rankType] || Number.MAX_SAFE_INTEGER);
}

function compareByDateThenBadge(a, b, field) {
  const dateCompare = safeDate(a[field]) - safeDate(b[field]);
  if (dateCompare !== 0) return dateCompare;
  const badgeCompare = String(a.badgeNumber || '').localeCompare(String(b.badgeNumber || ''), undefined, { numeric: true });
  if (badgeCompare !== 0) return badgeCompare;
  return String(a.employeeCode || '').localeCompare(String(b.employeeCode || ''));
}

export class SeniorityEngineService {
  constructor(repository) {
    this.repository = repository;
  }

  async getPreview() {
    return this.repository.getPreview();
  }

  summarize(data) {
    return data?.summary || { employees: 0, activeLists: 0, frozenLists: 0, pendingOverrides: 0 };
  }

  orderEmployees(employees = [], rankType = 'overall', direction = 'highest_seniority_first') {
    const field = DATE_FIELDS[rankType] || DATE_FIELDS.overall;
    const sorted = [...employees].sort((a, b) => {
      const rankCompare = safeRank(a, rankType) - safeRank(b, rankType);
      if (rankCompare !== 0) return rankCompare;
      return compareByDateThenBadge(a, b, field);
    });

    if (direction === 'reverse_seniority_first') {
      return sorted.reverse();
    }

    return sorted;
  }

  filterEmployees(employees = [], filter = 'all') {
    if (filter === 'all') return employees;
    if (filter === 'active') return employees.filter(employee => employee.status === 'active');
    if (filter === 'probationary') return employees.filter(employee => employee.status === 'probationary');
    return employees.filter(employee => String(employee.role || '').toLowerCase() === filter);
  }

  getEmployeeOverride(overrides = [], employeeId, scope) {
    return overrides.find(item => item.employeeId === employeeId && item.scope === scope);
  }
}
