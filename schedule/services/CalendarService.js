/*
Signal Labs Tool File: schedule/services/CalendarService.js
Version: v5.1.0
Purpose: Calendar Foundation service for grouping schedule preview rows by date and coverage status.
*/
export class CalendarService {
  constructor(repository) {
    if (!repository || typeof repository.listCalendarPreview !== 'function') {
      throw new Error('CalendarService requires a repository with listCalendarPreview().');
    }
    this.repository = repository;
  }

  async getCalendarPreview() {
    const data = await this.repository.listCalendarPreview();
    const preview = Array.isArray(data.preview) ? data.preview : [];
    const events = Array.isArray(data.events) ? data.events : [];
    return {
      preview,
      events,
      days: this.groupByDate(preview, events),
      summary: this.buildSummary(preview, events)
    };
  }

  groupByDate(preview, events) {
    const dayMap = new Map();
    preview.forEach((row) => {
      if (!dayMap.has(row.date)) dayMap.set(row.date, { date: row.date, label: row.label || row.date, rows: [], events: [] });
      dayMap.get(row.date).rows.push(row);
    });
    events.forEach((event) => {
      if (!dayMap.has(event.date)) dayMap.set(event.date, { date: event.date, label: event.date, rows: [], events: [] });
      dayMap.get(event.date).events.push(event);
    });
    return Array.from(dayMap.values()).sort((a, b) => a.date.localeCompare(b.date));
  }

  buildSummary(preview, events) {
    const shortRows = preview.filter((row) => row.coverageStatus === 'short');
    const coveredRows = preview.filter((row) => row.coverageStatus === 'covered');
    const openSlots = preview.reduce((total, row) => total + Number(row.openSlots || 0), 0);
    return {
      calendarRows: preview.length,
      eventRows: events.length,
      coveredRows: coveredRows.length,
      shortRows: shortRows.length,
      openSlots
    };
  }
}
