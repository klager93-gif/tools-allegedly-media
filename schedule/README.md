# Signal Schedule

Current Version: v2.18.0

## Current Release — Schedule v2.18.0 — Notification Foundation

Signal Schedule v2.18.0 adds the Notification Foundation. It previews how Schedule events will become in-app, email, SMS/text, and digest notifications without enabling production sends or committing provider credentials.

The foundation includes notification channels, trigger rules, a queued notification preview, role preference defaults, quiet-hours behavior, digest behavior, and backend contract/schema boundaries.

Current migration target: 024 notification_foundation. Run `schedule/api/coolify/sql/024_notification_foundation_schema.sql` after deploying this release if the Postgres database is active.

Production writes and external notification sends remain disabled until protected authentication, provider configuration, and role enforcement are ready.
