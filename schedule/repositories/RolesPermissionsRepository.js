/*
Signal Labs
Area: Signal Schedule
File: schedule/repositories/RolesPermissionsRepository.js
Version: v2.19.0
Purpose: Repository boundary for roles and permissions data
*/
import { fetchRolesPermissionsPreview } from '../adapters/JsonRolesPermissionsAdapter.js';
export async function listRolesPermissionsPreview() { return fetchRolesPermissionsPreview(); }
