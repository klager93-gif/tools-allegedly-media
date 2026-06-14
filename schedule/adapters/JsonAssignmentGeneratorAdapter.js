/*
Signal Labs Tool File: schedule/adapters/JsonAssignmentGeneratorAdapter.js
Version: v5.1.0
Purpose: JSON adapter for Assignment Generator preview data.
*/
export class JsonAssignmentGeneratorAdapter {
  constructor(path = './data/assignment-generator-preview.json') {
    this.path = path;
  }

  async read() {
    const response = await fetch(this.path, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`Unable to load assignment generator preview (${response.status})`);
    }
    return response.json();
  }
}
