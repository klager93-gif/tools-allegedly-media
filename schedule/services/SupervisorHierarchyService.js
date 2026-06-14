/*
Signal Labs
Area: Signal Schedule
File: schedule/services/SupervisorHierarchyService.js
Version: v5.1.0
Purpose: Service layer for supervisor hierarchy preview logic
*/
import { listSupervisorHierarchyPreview } from '../repositories/SupervisorHierarchyRepository.js';
export async function getSupervisorHierarchyPreview() {
  const data = await listSupervisorHierarchyPreview();
  const scopeTotals = data.supervisors.reduce((acc, supervisor) => {
    supervisor.scope.forEach(item => { acc[item.type] = (acc[item.type] || 0) + 1; });
    return acc;
  }, {});
  return { ...data, scopeTotals };
}
