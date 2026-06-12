/*
Signal Labs Tool File: schedule/repositories/AssignmentRepository.js
Version: v1.9.0
Purpose: Repository boundary for assignment templates and employee assignment records.
*/
export class AssignmentRepository {
  constructor(adapter) {
    this.adapter = adapter;
  }

  async listTemplates() {
    return this.adapter.listTemplates();
  }

  async listAssignments() {
    return this.adapter.listAssignments();
  }

  async listAssignmentsByAgency(agencyId) {
    const assignments = await this.listAssignments();
    return assignments.filter(item => !agencyId || item.agencyId === agencyId);
  }

  async listTemplatesByAgency(agencyId) {
    const templates = await this.listTemplates();
    return templates.filter(item => !agencyId || item.agencyId === agencyId);
  }
}
