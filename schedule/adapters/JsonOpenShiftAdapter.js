/*
Signal Labs Tool File: schedule/adapters/JsonOpenShiftAdapter.js
Version: v5.1.0
Purpose: JSON adapter for Open Shifts / VOT Foundation preview data.
*/
export class JsonOpenShiftAdapter {
  constructor({ openShiftsPath = 'data/open-shifts-preview.json', votRequestsPath = 'data/vot-requests-preview.json', reasonsPath = 'data/request-reasons.json' } = {}) {
    this.openShiftsPath = openShiftsPath;
    this.votRequestsPath = votRequestsPath;
    this.reasonsPath = reasonsPath;
  }

  async readJson(path) {
    const response = await fetch(path, { cache: 'no-store' });
    if (!response.ok) throw new Error(`Unable to load ${path}`);
    return response.json();
  }

  async readOpenShiftPreview() {
    const [openShifts, votRequests, requestReasons] = await Promise.all([
      this.readJson(this.openShiftsPath),
      this.readJson(this.votRequestsPath),
      this.readJson(this.reasonsPath)
    ]);
    return { openShifts, votRequests, requestReasons };
  }
}
