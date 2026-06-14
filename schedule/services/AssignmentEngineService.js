/*
Signal Labs
Area: Signal Schedule
File: schedule/services/AssignmentEngineService.js
Version: v5.1.0
Purpose: Assignment Engine read-model calculations
*/
import { listAssignmentEnginePreview } from '../repositories/AssignmentEngineRepository.js';

function countBy(items, key) {
  return items.reduce((acc, item) => {
    const value = item[key] || 'unknown';
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {});
}

function groupRecords(records) {
  return records.reduce((groups, record) => {
    const key = `${record.date}|${record.agency}|${record.shift}|${record.role}`;
    if (!groups[key]) {
      groups[key] = {
        date: record.date,
        agency: record.agency,
        shift: record.shift,
        time: record.time,
        role: record.role,
        records: []
      };
    }
    groups[key].records.push(record);
    return groups;
  }, {});
}

export async function getAssignmentEnginePreview() {
  const data = await listAssignmentEnginePreview();
  const statusCounts = countBy(data.records, 'status');
  const sourceCounts = countBy(data.records, 'source');
  const grouped = Object.values(groupRecords(data.records));
  return { ...data, statusCounts, sourceCounts, grouped };
}
