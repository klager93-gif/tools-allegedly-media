/*
Signal Labs
Area: Signal Schedule
File: schedule/repositories/EmployeeProfileRepository.js
Version: v2.17.1
Purpose: Repository boundary for employee profile self-service data
*/
import { fetchEmployeeProfilePreview } from '../adapters/JsonEmployeeProfileAdapter.js';
export async function listEmployeeProfilePreview() { return fetchEmployeeProfilePreview(); }
