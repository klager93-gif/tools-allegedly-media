/*
Signal Labs
Area: Signal Schedule
File: schedule/repositories/MandationEngineRepository.js
Version: v3.3.4
Purpose: Repository boundary for Mandation Engine Foundation
*/
import { fetchMandationEnginePreview } from '../adapters/JsonMandationEngineAdapter.js';

export async function getMandationEnginePreview() {
  return fetchMandationEnginePreview();
}
