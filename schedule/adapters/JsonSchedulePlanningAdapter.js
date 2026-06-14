/*
Signal Labs
Area: Signal Schedule
File: schedule/adapters/JsonSchedulePlanningAdapter.js
Version: v5.1.0
Purpose: JSON adapter for schedule planning and forecast horizon preview data.
*/
export class JsonSchedulePlanningAdapter {
  constructor(data) {
    this.data = data || {};
  }

  list() {
    return {
      meta: this.data.meta || {},
      summary: this.data.summary || {},
      forecastRuns: this.data.forecastRuns || [],
      forecastIssues: this.data.forecastIssues || [],
      recommendedActions: this.data.recommendedActions || [],
      heatmap: this.data.heatmap || [],
      rules: this.data.rules || []
    };
  }
}
