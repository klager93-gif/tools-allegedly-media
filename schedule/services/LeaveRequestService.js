/*
Signal Labs Tool File: schedule/services/LeaveRequestService.js
Version: v2.2.0
Purpose: Leave Requests Foundation service for grouping preview requests by status and impact.
*/
export class LeaveRequestService {
  constructor(repository) {
    if (!repository || typeof repository.listLeaveRequests !== 'function') {
      throw new Error('LeaveRequestService requires a repository with listLeaveRequests().');
    }
    this.repository = repository;
  }

  async getLeaveRequestsPreview() {
    const data = await this.repository.listLeaveRequests();
    const types = Array.isArray(data.types) ? data.types : [];
    const requests = Array.isArray(data.requests) ? data.requests : [];
    return {
      types,
      requests,
      byStatus: this.groupBy(requests, 'status'),
      byImpact: this.groupBy(requests, 'staffingImpact'),
      summary: this.buildSummary(requests)
    };
  }

  groupBy(rows, key) {
    return rows.reduce((groups, row) => {
      const value = row[key] || 'unknown';
      if (!groups[value]) groups[value] = [];
      groups[value].push(row);
      return groups;
    }, {});
  }

  buildSummary(requests) {
    return {
      total: requests.length,
      pending: requests.filter((request) => request.status === 'pending').length,
      approved: requests.filter((request) => request.status === 'approved').length,
      denied: requests.filter((request) => request.status === 'denied').length,
      reviewRequired: requests.filter((request) => String(request.staffingImpact || '').includes('review')).length,
      shortImpact: requests.filter((request) => request.staffingImpact === 'short').length
    };
  }
}
