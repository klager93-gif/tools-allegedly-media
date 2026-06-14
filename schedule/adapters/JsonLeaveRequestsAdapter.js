/*
Signal Labs Tool File: schedule/adapters/JsonLeaveRequestsAdapter.js
Version: v5.1.0
Purpose: JSON adapter for Leave Requests and Request Hours Foundation preview data.
*/
export class JsonLeaveRequestsAdapter {
  constructor(options = {}) {
    this.typesUrl = options.typesUrl || './data/leave-request-types.json';
    this.requestsUrl = options.requestsUrl || './data/leave-requests-preview.json';
    this.incrementSettingsUrl = options.incrementSettingsUrl || './data/request-increment-settings.json';
  }

  async readJson(url) {
    const response = await fetch(url, { cache: 'no-store' });
    if (!response.ok) throw new Error(`Unable to load ${url}`);
    return response.json();
  }

  async listLeaveRequests() {
    const [types, requests, incrementSettings] = await Promise.all([
      this.readJson(this.typesUrl),
      this.readJson(this.requestsUrl),
      this.readJson(this.incrementSettingsUrl)
    ]);
    return { types, requests, incrementSettings };
  }
}
