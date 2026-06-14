/*
Signal Labs Tool File: schedule/adapters/JsonSeniorityRotationAdapter.js
Version: v5.1.0
Purpose: JSON adapter for Seniority and Rotation preview data.
*/
export class JsonSeniorityRotationAdapter {
  constructor({ previewPath = 'data/seniority-rotation-preview.json' } = {}) {
    this.previewPath = previewPath;
  }

  async readJson(path) {
    const response = await fetch(path, { cache: 'no-store' });
    if (!response.ok) throw new Error(`Unable to load ${path}`);
    return response.json();
  }

  async readSeniorityRotationPreview() {
    return this.readJson(this.previewPath);
  }
}
