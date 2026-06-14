/*
Signal Labs
Area: Signal Schedule
File: schedule/adapters/JsonBenefitLedgerAdapter.js
Version: v5.1.0
Purpose: JSON adapter for Benefit Ledger preview data
*/
export async function getBenefitLedgerPreview() {
  const response = await fetch('./data/benefit-ledger-preview.json', { cache: 'no-store' });
  if (!response.ok) {
    throw new Error('Unable to load Benefit Ledger preview data.');
  }
  return response.json();
}
