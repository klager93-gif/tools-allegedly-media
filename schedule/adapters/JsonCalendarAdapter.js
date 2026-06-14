/*
Signal Labs Tool File: schedule/adapters/JsonCalendarAdapter.js
Version: v5.1.0
Purpose: Browser-side JSON adapter for Calendar Foundation preview data.
*/
export class JsonCalendarAdapter {
  constructor(options = {}) {
    this.previewUrl = options.previewUrl || './data/calendar-preview.json';
    this.eventsUrl = options.eventsUrl || './data/calendar-events-preview.json';
  }

  async readJson(url) {
    const response = await fetch(url, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`Unable to read calendar foundation data from ${url}.`);
    }
    return response.json();
  }

  async listCalendarPreview() {
    const [preview, events] = await Promise.all([
      this.readJson(this.previewUrl),
      this.readJson(this.eventsUrl)
    ]);
    return { preview, events };
  }
}
