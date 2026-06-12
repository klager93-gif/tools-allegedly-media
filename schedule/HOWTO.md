# How To Use Signal Schedule v2.1.0

## Open the Foundation Overview

Use:

```text
schedule/index.html
```

This page remains the foundation/admin overview.

## Open the Calendar Preview

Use:

```text
schedule/schedule.html
```

The calendar page shows a read-only June 2026 preview.

## Read the Calendar

- Green/covered rows meet minimum staffing.
- Short rows show open slots.
- Event placeholders show future leave, training, and open-shift impacts.
- Click a day to view coverage details.

## Current Limitation

The page is read-only. It does not generate, publish, or save schedules yet.

## Schedule v2.1.2 — Admin Navigation Foundation

Schedule now includes admin-first navigation placeholders for Overview, Calendar, Employees, Assignments, Minimum Staffing, Leave Requests, Open Shifts, Reports, and Settings. Future role-based views should filter this shared interface instead of duplicating separate apps.

## Schedule v2.1.3 — Employee Identity Cleanup

Employee identity is now standardized for future production use. Employee records should use a hidden system key, an admin-entered agency employee ID, and an optional badge number. Future login accounts should live in a separate users table and support login by username or email. Roles should be assigned through separate role tables rather than embedded directly on employee records.
