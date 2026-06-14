/*
Signal Labs
Area: Signal Schedule
File: schedule/repositories/SchedulePlanningRepository.js
Version: v3.9.0
Purpose: Repository boundary for schedule planning and forecast horizon data.
*/
export class SchedulePlanningRepository {
  constructor(adapter) {
    this.adapter = adapter;
  }

  listPlanningForecast() {
    return this.adapter.list();
  }
}
