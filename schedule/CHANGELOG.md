
## v5.1.0 — Request & Approval Engine

- Added central `requests.html` Request & Approval Engine hub.
- Added request queues for time off, trades, VOT, training, profile changes, and open-shift interest.
- Added migration `046_request_approval_engine_schema.sql`.
- Added request case, decision, event, comment, and schedule-impact foundations.
- Added copy helpers for request IDs, API endpoints, and migration filenames.

# v5.1.0 — Employee Experience & Data Tools

- Added Data Tools page for templates, imports, exports, and profile-management readiness.
- Added migration 045 for schedule templates, import jobs, export jobs, employee profile extras, and notification preferences.
- Added read-only Employee Experience & Data Tools preview API/contract.
- Updated employee dashboard language around My Schedule, My Requests, My Availability, My Profile, Notifications, and My Overtime.
- Added Data Tools navigation under Settings and Me/Employees.
- Reinforced Admin = Employee + More as a role-inheritance rule.

SQL migration required: `schedule/api/coolify/sql/045_employee_experience_data_tools_schema.sql`.

# v4.7.0 — Schedule History & Snapshot Engine

- Renamed the user-facing legacy saved-schedule list concept to Schedule History.
- Replaced `legacy saved-schedule page` with `history.html` and updated navigation/dashboard links.
- Added the product principle: One Agency / One Living Schedule / Many Snapshots.
- Updated snapshot wording for restore, publish, copy, and inspector actions.
- Added Schedule History & Snapshot Engine documentation.
- No SQL migration required; existing migration 044 storage remains in use.

# Signal Schedule Changelog

## v4.7.0 — Employee Portal Navigation Hotfix

- Fixed employee portal subfolder navigation so admin links resolve back to `/schedule/` instead of `/schedule/employee/`.
- Added Schedule History to the Scheduling/Calendar navigation group.
- Fixed employee portal active navigation detection for nested employee pages.
- Cleaned up View As group labels so raw internal values like `shiftGroup` no longer display to users.
- Added hotfix validation for nested Schedule navigation targets.

No SQL migration required.

## v4.7.0 — Publish Schedule Foundation + Copy Helpers
- Added protected publish route: `POST /api/saved-schedules/:id/publish`.
- Added Schedule History UI Publish action with protected `ADMIN_API_KEY` prompt.
- Added published status handling using `status = published` and `published_at = now()`.
- Added copy buttons for schedule IDs, agency IDs, API endpoints, publish endpoints, and validation JSON.
- Added `PUBLISHING-FOUNDATION.md`.
- No database migration required; v4.7.0 uses migration 044 from v4.4.0.

## v4.4.0 — Saved Schedule CRUD Foundation
- Added protected Postgres-backed snapshot CRUD foundation with `/api/saved-schedules` routes.
- Added migration 044 for `schedule_saved_schedules`.
- Added snapshot write contract.

## v5.1.0 — Staffing Engine

- Added Staffing Engine hub.
- Cleaned confusing navigation labels.
- Added coverage/vacancy, candidate, OT/callback/mandation, fairness, explainability, and integrity-check foundations.
- Added migration 047.

