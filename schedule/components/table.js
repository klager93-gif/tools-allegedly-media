/*
Signal Labs
Area: Signal Schedule
File: schedule/components/table.js
Version: v3.9.0
Purpose: Reusable dense table metadata helpers.
*/
export const tableComponentVersion = "v3.9.0";
export function tableColumn(key, label, options = {}) { return { key, label, ...options }; }
