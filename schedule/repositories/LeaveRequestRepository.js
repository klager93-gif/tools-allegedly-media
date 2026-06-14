/*
Signal Labs Tool File: schedule/repositories/LeaveRequestRepository.js
Version: v5.1.0
Purpose: Repository boundary for leave request preview reads before production workflow writes exist.
*/
export class LeaveRequestRepository {
  constructor(adapter) {
    if (!adapter || typeof adapter.listLeaveRequests !== 'function') {
      throw new Error('LeaveRequestRepository requires an adapter with listLeaveRequests().');
    }
    this.adapter = adapter;
  }

  async listLeaveRequests() {
    return this.adapter.listLeaveRequests();
  }
}
