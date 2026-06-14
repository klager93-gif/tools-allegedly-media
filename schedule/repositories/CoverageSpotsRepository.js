/*
Signal Labs
Area: Signal Schedule
File: schedule/repositories/CoverageSpotsRepository.js
Version: v3.3.4
Purpose: Repository boundary for coverage spots foundation data
*/
import { fetchCoverageSpotsPreview } from '../adapters/JsonCoverageSpotsAdapter.js';
export async function listCoverageSpotsPreview() { return fetchCoverageSpotsPreview(); }
