/*
Signal Labs
Area: Signal Schedule
File: schedule/adapters/JsonSchedulePublicationAdapter.js
Version: v5.1.0
Purpose: JSON adapter for schedule publishing, versions, snapshots, checklist, and publication event preview data.
*/
export class JsonSchedulePublicationAdapter {
  constructor(data) {
    this.data = data || {};
  }

  list() {
    return {
      meta: this.data.meta || {},
      summary: this.data.summary || {},
      versions: this.data.versions || [],
      checklist: this.data.checklist || [],
      snapshots: this.data.snapshots || [],
      events: this.data.events || [],
      rules: this.data.rules || []
    };
  }
}
