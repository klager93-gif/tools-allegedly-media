/*
Signal Labs
Area: Signal Schedule
File: schedule/services/LeaveBanksService.js
Version: v5.1.0
Purpose: Service layer for Leave Banks Foundation summaries
*/
import { getLeaveBanksPreview } from '../repositories/LeaveBanksRepository.js';

export async function getLeaveBanksDashboard() {
  const data = await getLeaveBanksPreview();
  const totals = (data.employeeBalances || []).reduce((acc, employee) => {
    (employee.banks || []).forEach((bank) => {
      acc.earned += Number(bank.earned || 0);
      acc.used += Number(bank.used || 0);
      acc.pending += Number(bank.pending || 0);
      acc.remaining += Number(bank.remaining || 0);
    });
    return acc;
  }, { earned: 0, used: 0, pending: 0, remaining: 0 });
  return { ...data, totals };
}
