## v0.16.0 Notifications Foundation

Signal Schedule v0.16.0 adds the Notifications Foundation while preserving the v0.15 Analytics Foundation, v0.14 Bidding and Opportunity Foundation, and v0.14.1 render registry repair.

This release is still browser-only and architecture-first. Notifications are modeled as trigger facts, channels, audience subscriptions, suppression/escalation examples, and audit history rather than live email, SMS, or push delivery.

### Added

- Notification trigger planning for coverage shortages, bid awards, mandate risk, and benefit warnings.
- Channel planning for in-app notices, email, SMS/text, and export/audit logs.
- Audience subscription planning for employees, supervisors, admins, and audit roles.
- Notification audit examples for suppressed duplicates, escalations, and read/acknowledgement states.
- Render registry entries and safe render calls for all notification previews.
- Data-model preview now includes Notifications Foundation object counts.

### Preserved

- v0.15 Analytics Foundation: metrics, report families, trend signals, and forecasts.
- v0.14 Bidding and Opportunity Foundation.
- v0.14.1 registry protections that prevent optional panels from crashing the page.
- Local-only mock data and sample loading workflow.

### Rule

Notifications must be generated from stored facts and rule outcomes, not loose one-off messages. Every notice should explain what happened, who needs to know, what source fact caused it, whether action is required, and what audit trail exists.
