/*
Signal Labs Tool File: schedule/services/AssignmentService.js
Version: v1.9.0
Purpose: Service boundary for Schedule assignment foundation data.
*/
export class AssignmentService {
  constructor(repository) {
    this.repository = repository;
  }

  async getAssignmentFoundation(agencyId) {
    const [templates, assignments] = await Promise.all([
      this.repository.listTemplatesByAgency(agencyId),
      this.repository.listAssignmentsByAgency(agencyId)
    ]);

    return {
      agencyId,
      templates,
      assignments,
      summary: {
        templates: templates.length,
        assignments: assignments.length,
        activeAssignments: assignments.filter(item => item.status === 'active').length,
        assignmentTypes: Array.from(new Set(templates.map(item => item.assignmentType))).length
      }
    };
  }
}
