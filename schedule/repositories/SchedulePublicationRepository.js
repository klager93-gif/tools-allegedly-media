/*
Signal Labs
Area: Signal Schedule
File: schedule/repositories/SchedulePublicationRepository.js
Version: v4.0.0
Purpose: Repository boundary for schedule publishing and immutable schedule snapshot preview data.
*/
export class SchedulePublicationRepository {
  constructor(adapter) {
    this.adapter = adapter;
  }

  listPublicationPreview() {
    return this.adapter.list();
  }
}
