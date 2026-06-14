/*
Signal Labs
Area: Signal Schedule
File: schedule/adapters/JsonEmployeeAvailabilityPreferencesAdapter.js
Version: v5.1.0
Purpose: JSON adapter for employee availability, preferences, restrictions, and View As group filter preview data.
*/
export class JsonEmployeeAvailabilityPreferencesAdapter {
  constructor(data) {
    this.data = data || {};
  }

  list() {
    return {
      version: this.data.version || 'v5.1.0',
      meta: this.data.meta || {},
      summary: this.data.summary || {},
      employees: this.data.employees || [],
      availability: this.data.availability || [],
      preferences: this.data.preferences || [],
      restrictions: this.data.restrictions || [],
      viewGroups: this.data.viewGroups || [],
      builderIntegration: this.data.builderIntegration || []
    };
  }
}
