/*
Signal Labs Tool File: schedule/adapters/JsonAssignmentAdapter.js
Version: v1.9.0
Purpose: Browser-safe JSON adapter for Schedule assignment templates and employee assignment records.
*/
export class JsonAssignmentAdapter {
  constructor(options = {}) {
    this.templatesUrl = options.templatesUrl || 'data/assignment-templates.json';
    this.assignmentsUrl = options.assignmentsUrl || 'data/employee-assignments.json';
    this.sourceName = 'static-json-assignments';
  }

  async listTemplates() {
    const response = await fetch(this.templatesUrl, { cache: 'no-store' });
    if (!response.ok) throw new Error('Unable to load assignment templates.');
    return response.json();
  }

  async listAssignments() {
    const response = await fetch(this.assignmentsUrl, { cache: 'no-store' });
    if (!response.ok) throw new Error('Unable to load employee assignments.');
    return response.json();
  }
}
