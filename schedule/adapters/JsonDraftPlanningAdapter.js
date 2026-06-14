/*
Signal Labs
Area: Signal Schedule
File: schedule/adapters/JsonDraftPlanningAdapter.js
Version: v5.1.0
Purpose: JSON adapter for draft planning preview data.
*/
export class JsonDraftPlanningAdapter {
  constructor(data) {
    this.data = data || {};
  }

  list() {
    return {
      meta: this.data.meta || {},
      summary: this.data.summary || {},
      draftRuns: this.data.draftRuns || [],
      moveQueue: this.data.moveQueue || [],
      publishChecklist: this.data.publishChecklist || [],
      rules: this.data.rules || []
    };
  }
}
