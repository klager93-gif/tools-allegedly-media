/*
Signal Labs Tool File: schedule/services/VisibilityPrivacyService.js
Version: v5.1.0
Purpose: Schedule Visibility & Privacy Controls preview service and policy helpers.
*/
export class VisibilityPrivacyService {
  constructor(repository) {
    this.repository = repository;
  }

  async getPreview() {
    return this.repository.getPreview();
  }

  resolveScheduleVisibility(rules = [], subjectGroup, targetGroup) {
    return rules.find((rule) => rule.subjectGroup === subjectGroup && (rule.targetGroup === targetGroup || rule.targetGroup === 'All')) || null;
  }

  resolveLeaveVisibility(rules = [], leaveType, viewerGroup = 'employee') {
    const rule = rules.find((item) => item.leaveType === leaveType);
    if (!rule) return 'hidden';
    const key = viewerGroup === 'admin' ? 'adminView' : viewerGroup === 'supervisor' ? 'supervisorView' : 'employeeView';
    return rule[key] || 'hidden';
  }

  isSensitiveLeaveHidden(rule = {}, viewerGroup = 'employee') {
    if (!rule.sensitive) return false;
    const key = viewerGroup === 'admin' ? 'adminView' : viewerGroup === 'supervisor' ? 'supervisorView' : 'employeeView';
    return ['hidden', 'off_only'].includes(rule[key]);
  }
}
