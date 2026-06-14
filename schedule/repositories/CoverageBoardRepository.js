/*
Signal Labs Tool File: schedule/repositories/CoverageBoardRepository.js
Version: v5.1.0
Purpose: Repository boundary for Coverage Board preview data.
*/
export class CoverageBoardRepository {
  constructor(adapter) {
    this.adapter = adapter;
  }

  async listCoverageBoardPreview() {
    return this.adapter.readCoverageBoardPreview();
  }
}
