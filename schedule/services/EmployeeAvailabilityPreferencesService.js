/*
Signal Labs
Area: Signal Schedule
File: schedule/services/EmployeeAvailabilityPreferencesService.js
Version: v5.1.0
Purpose: Service boundary for availability, preference, and restriction checks used by builder, employee portal, and future scheduling engines.
*/
export class EmployeeAvailabilityPreferencesService {
  constructor(repository) {
    this.repository = repository;
  }

  getAvailabilityPreferences() {
    const data = this.repository.listAvailabilityPreferences();
    return {
      ...data,
      serviceNotes: [
        'Availability says when an employee can work.',
        'Preferences say what an employee would rather work when policy allows.',
        'Restrictions warn or block assignments before publishing, overtime awards, or mandation decisions.'
      ]
    };
  }
}
