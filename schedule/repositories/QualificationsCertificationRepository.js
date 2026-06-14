/*
Signal Labs Tool File: schedule/repositories/QualificationsCertificationRepository.js
Version: v3.8.1
Purpose: Repository boundary for Qualifications & Certification Engine preview data.
*/
export class QualificationsCertificationRepository {
  constructor(adapter) {
    this.adapter = adapter;
  }

  async getPreview() {
    return this.adapter.read();
  }
}
