/*
Signal Labs
Area: Signal Schedule
File: schedule/services/EmployeeProfileService.js
Version: v5.1.0
Purpose: Service layer for employee profile self-service preview rules
*/
import { listEmployeeProfilePreview } from '../repositories/EmployeeProfileRepository.js';
export async function getEmployeeProfilePreview() {
  const data = await listEmployeeProfilePreview();
  return {
    ...data,
    policy: {
      ...data.policy,
      editableFieldCount: data.fields.filter((field) => field.employeeCanEdit).length
    }
  };
}
