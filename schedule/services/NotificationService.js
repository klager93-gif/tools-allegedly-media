/*
Signal Labs
Area: Signal Schedule
File: schedule/services/NotificationService.js
Version: v5.1.0
Purpose: Service layer for notification foundation preview logic
*/
import { listNotificationPreview } from '../repositories/NotificationRepository.js';
export async function getNotificationPreview() {
  const data = await listNotificationPreview();
  const highPriorityRules = data.rules.filter(rule => String(rule.priority).toLowerCase() === 'high').length;
  return { ...data, highPriorityRules };
}
