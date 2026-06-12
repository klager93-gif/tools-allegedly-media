## v0.16.0 Notifications Data Planning

Future persistence should eventually support notification-related tables or models such as:

- notification_triggers
- notification_channels
- notification_subscriptions
- notification_events
- notification_delivery_log
- notification_read_receipts
- notification_suppression_log
- notification_escalation_log

Each notification should link back to the source fact that caused it, such as a coverage shortage, schedule change, leave request, bid award, mandate event, benefit warning, analytics forecast, or override.
