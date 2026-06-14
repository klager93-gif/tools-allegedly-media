/*
Signal Labs
Area: Signal Schedule
File: schedule/repositories/MandationEngineRepository.js
Version: v5.1.0
Purpose: Repository boundary for Mandation Engine Foundation
*/
import { fetchMandationEnginePreview } from '../adapters/JsonMandationEngineAdapter.js';

export async function getMandationEnginePreview() {
  return fetchMandationEnginePreview();
}
