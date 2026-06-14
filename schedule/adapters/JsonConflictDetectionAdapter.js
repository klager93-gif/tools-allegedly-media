/*
Signal Labs Tool File: schedule/adapters/JsonConflictDetectionAdapter.js
Version: v4.2.0
Purpose: JSON adapter for Conflict Detection preview data.
*/
export class JsonConflictDetectionAdapter {
  constructor(path = './data/conflict-detection-preview.json') {
    this.path = path;
  }

  async read() {
    const response = await fetch(this.path, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`Unable to load conflict detection preview (${response.status})`);
    }
    return response.json();
  }
}
