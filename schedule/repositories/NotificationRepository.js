/*
Signal Labs
Area: Signal Schedule
File: schedule/repositories/NotificationRepository.js
Version: v3.3.4
Purpose: Repository boundary for notification foundation data
*/
import { fetchNotificationPreview } from '../adapters/JsonNotificationAdapter.js';
export async function listNotificationPreview() { return fetchNotificationPreview(); }
