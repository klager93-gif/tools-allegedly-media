/*
Signal Labs Tool File: schedule/repositories/CalendarRepository.js
Version: v5.1.0
Purpose: Repository boundary for calendar preview reads before the production scheduling engine exists.
*/
export class CalendarRepository {
  constructor(adapter) {
    if (!adapter || typeof adapter.listCalendarPreview !== 'function') {
      throw new Error('CalendarRepository requires an adapter with listCalendarPreview().');
    }
    this.adapter = adapter;
  }

  async listCalendarPreview() {
    return this.adapter.listCalendarPreview();
  }
}
