/*
Signal Labs Tool File: schedule/services/RequestHoursService.js
Version: v5.1.0
Purpose: Shared preview service for leave/VOT request hour calculation and admin override rules.
*/
export class RequestHoursService {
  static parseTimeToMinutes(value) {
    const input = String(value || '').trim();
    const match = input.match(/^(\d{1,2}):(\d{2})$/);
    if (!match) return null;
    const hours = Number(match[1]);
    const minutes = Number(match[2]);
    if (!Number.isInteger(hours) || !Number.isInteger(minutes)) return null;
    if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) return null;
    return (hours * 60) + minutes;
  }

  static calculatePartialHours(startTime, endTime) {
    const start = RequestHoursService.parseTimeToMinutes(startTime);
    const end = RequestHoursService.parseTimeToMinutes(endTime);
    if (start === null || end === null || end <= start) return 0;
    return Math.round(((end - start) / 60) * 100) / 100;
  }

  static isAlignedToIncrement(startTime, endTime, incrementMinutes) {
    const start = RequestHoursService.parseTimeToMinutes(startTime);
    const end = RequestHoursService.parseTimeToMinutes(endTime);
    const increment = Number(incrementMinutes || 0);
    if (!increment || start === null || end === null || end <= start) return false;
    return start % increment === 0 && end % increment === 0 && (end - start) % increment === 0;
  }

  static calculateRequestHours({ fullDay = false, scheduledShiftHours = 8, startTime = '13:00', endTime = '17:00' } = {}) {
    if (fullDay) return Number(scheduledShiftHours || 0);
    return RequestHoursService.calculatePartialHours(startTime, endTime);
  }

  static validateIncrement({ role = 'employee', startTime, endTime, incrementMinutes, adminOverride = false } = {}) {
    const isPrivilegedOverride = ['admin', 'scheduler'].includes(String(role).toLowerCase()) && adminOverride;
    if (isPrivilegedOverride) {
      return {
        valid: true,
        overrideUsed: true,
        message: 'Admin/scheduler override active. Exact start/end times are allowed even when they do not match the configured increment.'
      };
    }

    const valid = RequestHoursService.isAlignedToIncrement(startTime, endTime, incrementMinutes);
    return {
      valid,
      overrideUsed: false,
      message: valid
        ? `Request matches the configured ${incrementMinutes}-minute increment.`
        : `Employee/self-service requests must match the configured ${incrementMinutes}-minute increment.`
    };
  }
}
