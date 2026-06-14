# Signal Schedule v2.23.0 — OT Volunteer Board Foundation

Signal Schedule v2.23.0 adds an admin-first OT Volunteer Board foundation for posted overtime opportunities, employee volunteer interest, eligibility preview, award queue review, and open shift connection points.

## Database Migration Required

Yes. Run:

```text
schedule/api/coolify/sql/029_ot_volunteer_board_schema.sql
```

Expected newest migration row:

```text
029 | ot_volunteer_board_foundation
```

## Current Foundation

Signal Schedule currently includes employees, agencies, requests, coverage board, coverage spots, daily board, assignment engine, leave banks, notifications, roles/permissions, approvals, and OT volunteer board preview foundations.

## Next Planned Release

v2.24.0 — Shift Trade UI / workflow connection.
