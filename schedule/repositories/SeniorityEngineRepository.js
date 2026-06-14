/*
Signal Labs Tool File: schedule/repositories/SeniorityEngineRepository.js
Version: v3.3.3
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
