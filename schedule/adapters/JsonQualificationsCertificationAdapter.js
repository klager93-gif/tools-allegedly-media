/*
Signal Labs Tool File: schedule/adapters/JsonQualificationsCertificationAdapter.js
Version: v5.1.0
Purpose: JSON adapter for Qualifications & Certification Engine preview data.
*/
export class JsonQualificationsCertificationAdapter {
  constructor(path = './data/qualifications-certifications-preview.json') {
    this.path = path;
  }

  async read() {
    const response = await fetch(this.path, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`Unable to load qualifications and certifications preview (${response.status})`);
    }
    return response.json();
  }
}
