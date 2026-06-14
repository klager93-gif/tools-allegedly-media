# Signal Schedule v2.20.0 — Daily Schedule Board Foundation

## Summary

Adds the Daily Schedule Board foundation so coverage spots can be viewed as a supervisor-friendly day board grouped by date, agency, shift, role, and numbered spot.

## Database Migration Required

Yes. Run:

```text
schedule/api/coolify/sql/026_daily_schedule_board_foundation_schema.sql
```

Expected newest migration:

```text
026 | daily_schedule_board_foundation
```

## Notes

This release remains read-only preview functionality. It does not enable drag/drop assignments, employee portal scheduling writes, or live scheduling mutations.
