/*
Signal Labs Tool File: schedule/repositories/SeniorityRotationRepository.js
Version: v4.4.0
Purpose: Repository boundary for Seniority and Rotation preview data.
*/
export class SeniorityRotationRepository {
  constructor(adapter) {
    this.adapter = adapter;
  }

  async listSeniorityRotationPreview() {
    return this.adapter.readSeniorityRotationPreview();
  }
}
