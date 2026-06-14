/*
Signal Labs Tool File: schedule/services/MinimumStaffingService.js
Version: v5.1.0
Purpose: Service boundary for minimum staffing calculations and future validation.
*/
export class MinimumStaffingService {
  constructor(repository) {
    this.repository = repository;
  }

  async listTemplates({ agencyId = '' } = {}) {
    const templates = await this.repository.listTemplates();
    return templates.filter(item => !agencyId || item.agencyId === agencyId);
  }

  async listPreviewRows({ agencyId = '' } = {}) {
    const rows = await this.repository.listPreviewRows();
    return rows.filter(item => !agencyId || item.agencyId === agencyId);
  }

  summarize(rows = []) {
    const belowMinimum = rows.filter(row => row.status === 'below-minimum').length;
    const minimumMet = rows.filter(row => row.status === 'minimum-met').length;
    const openSlots = rows.reduce((sum, row) => sum + Number(row.openSlots || 0), 0);
    return { total: rows.length, minimumMet, belowMinimum, openSlots };
  }
}
