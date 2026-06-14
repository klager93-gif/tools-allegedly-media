/*
Signal Labs
Area: Signal Schedule
File: schedule/services/DraftPlanningService.js
Version: v5.1.0
Purpose: Service boundary for drag-and-drop draft planning preview workflows.
*/
export class DraftPlanningService {
  constructor(repository) {
    this.repository = repository;
  }

  getDraftPlanningPreview() {
    const data = this.repository.listDraftPlanning();
    return {
      ...data,
      serviceNotes: [
        'Draft changes are staged before publish.',
        'Conflict and coverage checks must run before publish.',
        'Authenticated write routes are intentionally not enabled in this preview foundation.'
      ]
    };
  }
}
