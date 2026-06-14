/*
Signal Labs
Area: Signal Schedule
File: schedule/repositories/EmployeeTimelineRepository.js
Version: v5.1.0
Purpose: Repository boundary for employee timeline and audit trail data
*/
import { fetchEmployeeTimelinePreview } from '../adapters/JsonEmployeeTimelineAdapter.js';
export async function listEmployeeTimelinePreview() { return fetchEmployeeTimelinePreview(); }
