/*
Signal Labs
Area: Signal Schedule
File: schedule/repositories/EmployeeProfileRepository.js
Version: v5.1.0
Purpose: Repository boundary for employee profile self-service data
*/
import { fetchEmployeeProfilePreview } from '../adapters/JsonEmployeeProfileAdapter.js';
export async function listEmployeeProfilePreview() { return fetchEmployeeProfilePreview(); }
