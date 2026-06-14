# Latest Schedule Release

Schedule v2.18.0 — Notification Foundation

## Summary

Signal Schedule v2.18.0 adds the Notification Foundation across UI, preview data, service/repository/adapter boundaries, API contract, Coolify read endpoint, and Postgres migration 024.

## Included

- `notifications.html`
- `notifications.css`
- `notifications.js`
- `data/notifications-preview.json`
- `adapters/JsonNotificationAdapter.js`
- `repositories/NotificationRepository.js`
- `services/NotificationService.js`
- `api/contracts/notifications.read.schema.json`
- `api/coolify/sql/024_notification_foundation_schema.sql`
- `/api/notifications` read-only preview route

## Notes

External sends remain disabled. No email, SMS, push, or webhook provider secrets are committed.
