/*
Signal Labs Tool File: schedule/repositories/OpenShiftRepository.js
Version: v2.4.0
Purpose: Repository boundary for Open Shifts / VOT Foundation preview data.
*/
export class OpenShiftRepository {
  constructor(adapter) {
    this.adapter = adapter;
  }

  async listOpenShiftPreview() {
    return this.adapter.readOpenShiftPreview();
  }
}
