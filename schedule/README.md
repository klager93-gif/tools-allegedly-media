# Signal Schedule

**Current Version:** v2.3.1 — Version Sync + API File Integrity Fix

Signal Schedule is a staffing and schedule-planning tool being built for dispatch, police, fire, corrections, nursing, and similar shift-based operations.

## Pages

- `schedule/index.html` — foundation/admin overview
- `schedule/schedule.html` — calendar preview
- `schedule/employees.html` — employees foundation placeholder
- `schedule/assignments.html` — assignments foundation placeholder
- `schedule/staffing.html` — minimum staffing foundation
- `schedule/leave.html` — leave request foundation
- `schedule/open-shifts.html` — open shifts / VOT foundation
- `schedule/reports.html` — reports foundation placeholder
- `schedule/settings.html` — settings foundation placeholder

## Current foundations

- Employee read foundation
- Protected employee CRUD API planning
- Assignments foundation
- Minimum staffing foundation
- Calendar foundation
- Leave requests foundation
- Request hours and admin override planning
- Open shifts / VOT foundation
- Admin-controlled request reason planning
- Coolify API skeleton with optional Postgres employee adapter

## v2.3.1 cleanup

- Synchronized Schedule page metadata and visible version text to v2.3.1.
- Updated Schedule script storage key to `signalSchedule.v2.3.1` while preserving migration from older local keys.
- Restored required JSON seed files referenced by the UI and API skeleton.
- Added missing `schedule/api/coolify/db/postgres.js` adapter file.
- Cleaned changelog/readme drift before the next feature release.
- Built release ZIP without `.git`, macOS resource forks, or deployment junk.

## Not production ready yet

- No active schedule generation engine
- No final leave approval workflow
- No final VOT bidding workflow
- No employee portal
- No production auth system
- No live write routes unless intentionally enabled and protected
