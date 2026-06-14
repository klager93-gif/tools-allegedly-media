# Signal Schedule v2.20.0 How To

After uploading v2.20.0, open `/schedule/daily-board.html` and verify the Daily Schedule Board loads date, agency, shift, role, numbered spot, open coverage, and under-minimum status cards.

## Database Migration Required

Run:

```text
schedule/api/coolify/sql/026_daily_schedule_board_foundation_schema.sql
```

Verify in psql:

```sql
SELECT *
FROM schema_migrations
ORDER BY version;
```

Expected newest row:

```text
026 | daily_schedule_board_foundation
```

## Preview Pages

- `/schedule/daily-board.html`
- `/schedule/coverage-spots.html`
- `/schedule/coverage.html`

## Notes

Daily Board is read-only foundation work. Drag/drop assignment writes, employee portal scheduling writes, and approval-driven live updates are planned later.

## v2.28.0 — Conflict Detection Foundation

Adds Conflict Detection Foundation for generated schedules and assignment drafts. Includes double-assignment, under-minimum, over-maximum, leave overlap, missing qualification, rest-rule, and manual override conflict previews; role-based employee/supervisor/admin visibility panels; read-only API contract/endpoint; and Postgres migration 034.



## v3.6.1 — Schedule Visibility & Privacy Controls

Adds role-based privacy policies controlling supervisor schedule visibility, exact time display, hours-only display, working/off-only display, and leave type visibility by user group.


## v3.9.0 — Schedule File Organization & Release Cleanup

### Purpose
Organizes page-specific support CSS/JS files into `/schedule/pages/` module folders while preserving public `/schedule/*.html` URLs. This is safe for full replacement because all HTML asset references were updated and validated.

### Public URLs preserved
All canonical Schedule pages remain at `/schedule/*.html`. Compatibility pages remain in place.

### Support asset folders added
- `/schedule/pages/calendar/`
- `/schedule/pages/coverage/`
- `/schedule/pages/people/`
- `/schedule/pages/requests/`
- `/schedule/pages/rules/`
- `/schedule/pages/settings/`
- `/schedule/pages/workspace/`

### Legacy root support files removed
- `/schedule/style.css`
- `/schedule/script.js`
- `/schedule/footer.css`
- `/schedule/schedule-nav.css`

### Validation
- HTML asset references checked
- JS syntax checked
- JSON parsed
- Navigation coverage preserved
- ZIP integrity checked
- No database migration required
