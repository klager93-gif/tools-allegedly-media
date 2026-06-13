/*
Signal Labs Tool File: schedule/adapters/JsonLeaveRequestsAdapter.js
Version: v2.2.0
Purpose: Browser-side JSON adapter for Leave Requests Foundation preview data.
*/
export class JsonLeaveRequestsAdapter {
  constructor(options = {}) {
    this.typesUrl = options.typesUrl || './data/leave-request-types.json';
    this.requestsUrl = options.requestsUrl || './data/leave-requests-preview.json';
  }

  async readJson(url) {
    const response = await fetch(url, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`Unable to read leave request foundation data from ${url}.`);
    }
    return response.json();
  }

  async listLeaveRequests() {
    const [types, requests] = await Promise.all([
      this.readJson(this.typesUrl),
      this.readJson(this.requestsUrl)
    ]);
    return { types, requests };
  }
}
