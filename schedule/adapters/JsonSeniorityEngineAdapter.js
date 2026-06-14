/*
Signal Labs Tool File: schedule/adapters/JsonSeniorityEngineAdapter.js
Version: v5.1.0
Purpose: JSON adapter for Seniority Engine preview data.
*/
export class JsonSeniorityEngineAdapter {
  constructor(path = './data/seniority-engine-preview.json') {
    this.path = path;
  }

  async read() {
    const response = await fetch(this.path, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`Unable to load seniority engine preview (${response.status})`);
    }
    return response.json();
  }
}
