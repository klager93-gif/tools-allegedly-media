/*
Signal Labs Tool File: schedule/services/LeaveRequestService.js
Version: v5.1.0
Purpose: Leave Requests service with Request Hours Foundation summary logic.
*/
import { RequestHoursService } from './RequestHoursService.js';

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
    const incrementSettings = Array.isArray(data.incrementSettings) ? data.incrementSettings : [];
    return {
      types,
      requests,
      incrementSettings,
      byStatus: this.groupBy(requests, 'status'),
      byImpact: this.groupBy(requests, 'staffingImpact'),
      summary: this.buildSummary(requests)
    };
  }

  calculateHours(options) {
    return RequestHoursService.calculateRequestHours(options);
  }

  validateIncrement(options) {
    return RequestHoursService.validateIncrement(options);
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
      shortImpact: requests.filter((request) => request.staffingImpact === 'short').length,
      overrideCount: requests.filter((request) => request.incrementOverrideUsed === true).length,
      totalHours: Math.round(requests.reduce((sum, request) => sum + Number(request.calculatedHours ?? request.hours ?? 0), 0) * 100) / 100
    };
  }
}
