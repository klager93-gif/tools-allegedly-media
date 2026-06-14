/*
Signal Labs
Area: Signal Schedule
File: schedule/services/BenefitLedgerService.js
Version: v5.1.0
Purpose: Service helpers for Benefit Ledger preview calculations
*/
import { getLedger } from '../repositories/BenefitLedgerRepository.js';

export async function getBenefitLedgerDashboard() {
  const data = await getLedger();
  const banks = Array.isArray(data.banks) ? data.banks : [];
  const totals = banks.reduce((acc, bank) => {
    acc.earned += Number(bank.earned || 0);
    acc.used += Number(bank.used || 0);
    acc.pending += Number(bank.pending || 0);
    acc.remaining += Number(bank.remaining || 0);
    return acc;
  }, { earned: 0, used: 0, pending: 0, remaining: 0 });
  return { ...data, totals };
}

export function previewRequestImpact(bank, hours) {
  const before = Number(bank?.remaining || 0);
  const impact = Number(hours || 0);
  return { before, after: before - impact, impact };
}
