/*
Signal Labs
Area: Signal Schedule
File: schedule/services/ShiftTradeService.js
Version: v5.1.0
Purpose: Service logic for Shift Trades & Swap Requests preview
*/
import { getShiftTradePreview } from '../repositories/ShiftTradeRepository.js';

export async function loadShiftTradeBoard() {
  const data = await getShiftTradePreview();
  const requests = Array.isArray(data.requests) ? data.requests : [];
  return {
    ...data,
    requests,
    openRisk: requests.filter((item) => /below minimum/i.test(item.coverageImpact || '')).length,
    pendingReview: requests.filter((item) => /pending/i.test(item.status || '')).length,
    needsAdminAction: requests.filter((item) => /Review|Needs replacement/i.test(item.eligibility || '') || (item.warnings || []).length).length,
  };
}
