/*
Signal Labs Tool File: schedule/repositories/SeniorityEngineRepository.js
Version: v3.9.0
Purpose: Repository boundary for Seniority Engine preview data.
*/
export class SeniorityEngineRepository {
  constructor(adapter) {
    this.adapter = adapter;
  }

  async getPreview() {
    return this.adapter.read();
  }
}
