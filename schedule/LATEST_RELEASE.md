# Signal Schedule Latest Release

## v3.6.0 — Schedule Visibility & Privacy Controls

Adds Schedule Visibility & Privacy Controls for role-based schedule detail, supervisor schedule visibility, leave/off-status display, sensitive leave hiding, read-only preview data, API contract/endpoint, service boundaries, and Postgres migration 037.

## Database Migration Required

Yes.

Run:

```text
schedule/api/coolify/sql/037_schedule_visibility_privacy_schema.sql
```

Expected newest row:

```text
037 | schedule_visibility_privacy
```
