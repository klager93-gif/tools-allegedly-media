/*
Signal Labs Tool File: schedule/repositories/SeniorityEngineRepository.js
Version: v3.6.2
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
