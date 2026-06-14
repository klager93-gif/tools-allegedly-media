/*
Signal Labs Tool File: schedule/adapters/JsonMinimumStaffingAdapter.js
Version: v5.1.0
Purpose: Static JSON adapter for minimum staffing foundation data.
*/
export class JsonMinimumStaffingAdapter {
  constructor({ templates = [], preview = [] } = {}) {
    this.templates = Array.isArray(templates) ? templates : [];
    this.preview = Array.isArray(preview) ? preview : [];
  }

  listTemplates() {
    return Promise.resolve(this.templates.slice());
  }

  listPreviewRows() {
    return Promise.resolve(this.preview.slice());
  }
}
