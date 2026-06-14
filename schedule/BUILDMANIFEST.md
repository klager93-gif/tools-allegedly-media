## Signal Schedule v4.0.0 — Beta Foundation & Publishing

Starts the Schedule 4.x beta series with a publishing workspace, read-only publication preview endpoint, migration 040, immutable published version/snapshot/event table foundations, post/seat foundations, and employee availability/preference/restriction foundations.

Database migration required: `schedule/api/coolify/sql/040_schedule_beta_publishing_foundation_schema.sql`.

# Signal Schedule Build Manifest

Version: v4.0.0 — Drag-and-Drop + Draft Engine

## Release summary

Adds draft planning foundations with staged move queue, conflict previews, publish checklist, API contract, API endpoint, and migration 038.

## Validation

- JS syntax checked
- JSON parsed
- HTML asset references checked
- Navigation coverage audit performed
- ZIP integrity checked

## Database migration

Required: `schedule/api/coolify/sql/038_drag_drop_draft_planning_schema.sql`


## v4.0.0 — Schedule File Organization & Release Cleanup

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
