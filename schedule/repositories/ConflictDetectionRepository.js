/*
Signal Labs Tool File: schedule/repositories/ConflictDetectionRepository.js
Version: v3.5.0
Purpose: Repository boundary for Conflict Detection preview data.
*/
export class ConflictDetectionRepository {
  constructor(adapter) {
    this.adapter = adapter;
  }

  async getPreview() {
    return this.adapter.read();
  }
}
