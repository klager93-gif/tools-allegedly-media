/*
Signal Labs
Area: Signal Schedule
File: schedule/services/MandationEngineService.js
Version: v5.1.0
Purpose: Service layer for Mandation Engine Foundation
*/
import { getMandationEnginePreview } from '../repositories/MandationEngineRepository.js';

export async function loadMandationEngine() {
  const data = await getMandationEnginePreview();
  const rotationById = (data.rotation || []).reduce((acc, employee) => {
    acc[employee.employeeId] = employee;
    return acc;
  }, {});
  const evaluationsByShortage = (data.evaluations || []).reduce((acc, item) => {
    acc[item.shortageId] = acc[item.shortageId] || [];
    acc[item.shortageId].push(item);
    return acc;
  }, {});
  const shortages = (data.shortages || []).map((shortage) => ({
    ...shortage,
    selectedEmployee: rotationById[shortage.selectedEmployeeId] || null,
    evaluations: evaluationsByShortage[shortage.id] || []
  }));
  return { ...data, shortages, rotationById, evaluationsByShortage };
}

export function getEmployeeFacingRotation(data) {
  const allowed = new Set(data.employeeView?.allowedFields || []);
  return (data.rotation || []).map((item) => Object.fromEntries(Object.entries(item).filter(([key]) => allowed.has(key))));
}
