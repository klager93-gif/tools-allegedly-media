/*
Signal Labs
Area: Signal Schedule
File: schedule/services/SchedulePublicationService.js
Version: v5.1.0
Purpose: Service boundary for draft-to-published schedule review, snapshot, rollback, and publication checklist workflows.
*/
export class SchedulePublicationService {
  constructor(repository) {
    this.repository = repository;
  }

  getPublicationPreview() {
    const data = this.repository.listPublicationPreview();
    return {
      ...data,
      serviceNotes: [
        'Publishing turns draft schedule records into immutable employee-facing snapshots.',
        'Publish readiness should require coverage, conflict, visibility, leave, and approval checks.',
        'Write routes remain intentionally disabled until authentication, permissions, and audit controls are enforced.'
      ]
    };
  }
}
