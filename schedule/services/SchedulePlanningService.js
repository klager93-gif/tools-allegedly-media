/*
Signal Labs
Area: Signal Schedule
File: schedule/services/SchedulePlanningService.js
Version: v5.1.0
Purpose: Service boundary for schedule planning, forecast horizon, and pre-publish risk preview workflows.
*/
export class SchedulePlanningService {
  constructor(repository) {
    this.repository = repository;
  }

  getPlanningForecastPreview() {
    const data = this.repository.listPlanningForecast();
    return {
      ...data,
      serviceNotes: [
        'Forecasts project patterns and known schedule inputs through a selected date horizon.',
        'Forecast output should feed draft planning, conflict detection, overtime posting, mandation, and approval queues.',
        'Authenticated generation and publishing writes are intentionally not enabled in this preview foundation.'
      ]
    };
  }
}
