/*
Signal Labs Tool File: schedule/repositories/VisibilityPrivacyRepository.js
Version: v3.8.0
Purpose: Repository boundary for Schedule Visibility & Privacy Controls preview data.
*/
export class VisibilityPrivacyRepository {
  constructor(adapter) {
    this.adapter = adapter;
  }

  async getPreview() {
    return this.adapter.read();
  }
}
