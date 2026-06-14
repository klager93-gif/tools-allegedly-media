/*
Signal Labs
Area: Signal Schedule
File: schedule/repositories/ShiftTradeRepository.js
Version: v5.1.0
Purpose: Repository layer for Shift Trades & Swap Requests
*/
import { readShiftTrades } from '../adapters/JsonShiftTradeAdapter.js';

export async function getShiftTradePreview() {
  return readShiftTrades();
}
