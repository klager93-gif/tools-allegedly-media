/*
Signal Labs
Area: Signal Schedule
File: schedule/repositories/BenefitLedgerRepository.js
Version: v3.3.3
Purpose: Repository boundary for benefit balances, impacts, adjustments, and shortcodes
*/
import { getBenefitLedgerPreview } from '../adapters/JsonBenefitLedgerAdapter.js';

export async function getLedger() {
  return getBenefitLedgerPreview();
}
