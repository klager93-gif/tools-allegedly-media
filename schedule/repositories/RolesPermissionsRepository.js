/*
Signal Labs
Area: Signal Schedule
File: schedule/repositories/RolesPermissionsRepository.js
Version: v5.1.0
Purpose: Repository boundary for roles and permissions data
*/
import { fetchRolesPermissionsPreview } from '../adapters/JsonRolesPermissionsAdapter.js';
export async function listRolesPermissionsPreview() { return fetchRolesPermissionsPreview(); }
