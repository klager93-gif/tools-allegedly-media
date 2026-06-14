/*
Signal Labs Tool File: schedule/repositories/MinimumStaffingRepository.js
Version: v5.1.0
Purpose: Repository boundary for minimum staffing foundation records.
*/
export class MinimumStaffingRepository {
  constructor(adapter) {
    this.adapter = adapter;
  }

  listTemplates() {
    return this.adapter.listTemplates();
  }

  listPreviewRows() {
    return this.adapter.listPreviewRows();
  }
}
