/*
Signal Labs Tool File: schedule/repositories/AssignmentGeneratorRepository.js
Version: v3.3.4
Purpose: Repository boundary for Assignment Generator preview data.
*/
export class AssignmentGeneratorRepository {
  constructor(adapter) {
    this.adapter = adapter;
  }

  async getPreview() {
    return this.adapter.read();
  }
}
