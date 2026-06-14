/*
Signal Labs
Area: Signal Schedule
File: schedule/services/RolesPermissionsService.js
Version: v5.1.0
Purpose: Service layer for roles and permissions preview logic
*/
import { listRolesPermissionsPreview } from '../repositories/RolesPermissionsRepository.js';
export async function getRolesPermissionsPreview() {
  const data = await listRolesPermissionsPreview();
  const actionCount = data.permissionMatrix.length + data.fieldRules.length + data.approvalRules.length;
  return { ...data, actionCount };
}
