/*
Signal Labs Tool File: schedule/adapters/JsonVisibilityPrivacyAdapter.js
Version: v5.1.0
Purpose: JSON adapter for Schedule Visibility & Privacy Controls preview data.
*/
export class JsonVisibilityPrivacyAdapter {
  constructor(path = './data/visibility-privacy-preview.json') {
    this.path = path;
  }

  async read() {
    const response = await fetch(this.path, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`Unable to load visibility and privacy preview (${response.status})`);
    }
    return response.json();
  }
}
