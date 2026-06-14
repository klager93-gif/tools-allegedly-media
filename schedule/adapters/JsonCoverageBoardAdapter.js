/*
Signal Labs Tool File: schedule/adapters/JsonCoverageBoardAdapter.js
Version: v5.1.0
Purpose: JSON adapter for Coverage Board preview data.
*/
export class JsonCoverageBoardAdapter {
  constructor({ coveragePath = 'data/coverage-board-preview.json', openShiftsPath = 'data/open-shifts-preview.json' } = {}) {
    this.coveragePath = coveragePath;
    this.openShiftsPath = openShiftsPath;
  }

  async readJson(path) {
    const response = await fetch(path, { cache: 'no-store' });
    if (!response.ok) throw new Error(`Unable to load ${path}`);
    return response.json();
  }

  async readCoverageBoardPreview() {
    const [coverageRows, openShifts] = await Promise.all([
      this.readJson(this.coveragePath),
      this.readJson(this.openShiftsPath)
    ]);
    return { coverageRows, openShifts };
  }
}
