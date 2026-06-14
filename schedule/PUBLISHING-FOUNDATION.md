# Signal Schedule v5.1.0 — Publishing Foundation

v5.1.0 adds the first protected publish action for snapshots.

## What this release does

- Keeps migration 044 as the database foundation.
- Adds a protected publish endpoint for snapshots.
- Adds Publish action wiring on the Schedule History page.
- Adds reusable copy buttons for IDs and JSON/detail blocks on Schedule History.
- Marks published schedules with `status = published` and `published_at = now()`.

## Protected endpoint

```text
POST /api/saved-schedules/:id/publish
```

Required header:

```text
x-admin-api-key: ADMIN_API_KEY
```

Required environment:

```text
DATA_MODE=postgres
DATABASE_URL=...
SCHEDULE_WRITES_ENABLED=true
ADMIN_API_KEY=...
```

## Notes

This is not the final immutable publication ledger. It is the first publish-state foundation so the UI and API can prove draft-to-published flow before version history, rollback, employee notifications, and published snapshots are added.
