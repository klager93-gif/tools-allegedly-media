/*
Signal Labs Tool File: schedule/services/AssignmentGeneratorService.js
Version: v5.1.0
Purpose: Assignment Generator preview service and draft grouping helpers.
*/
export class AssignmentGeneratorService {
  constructor(repository) {
    this.repository = repository;
  }

  async getPreview() {
    return this.repository.getPreview();
  }

  groupDraftsByRun(drafts = []) {
    return drafts.reduce((groups, draft) => {
      const key = draft.runId || 'unassigned-run';
      if (!groups[key]) groups[key] = [];
      groups[key].push(draft);
      return groups;
    }, {});
  }

  getStatusCounts(drafts = []) {
    return drafts.reduce((counts, draft) => {
      const key = draft.status || 'unknown';
      counts[key] = (counts[key] || 0) + 1;
      return counts;
    }, {});
  }

  getOpenDrafts(drafts = []) {
    return drafts.filter((draft) => draft.status === 'open' || draft.coverageImpact === 'under minimum');
  }
}
