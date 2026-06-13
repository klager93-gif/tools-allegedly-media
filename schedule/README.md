# Signal Schedule

**Current Version:** v2.1.1 — Calendar Foundation Cleanup

Signal Schedule is a staffing and schedule-planning tool being built for dispatch, police, fire, corrections, and similar shift-based operations.

## Pages

- `schedule/index.html` — foundation/admin overview page
- `schedule/schedule.html` — user-facing calendar preview page

## Current Foundations

- Employee foundation
- Employee CRUD foundation
- Assignments foundation
- Minimum staffing foundation
- Calendar foundation

## v2.1.0 Adds

- Month-style calendar preview
- Coverage status indicators
- Day detail panel
- Event placeholders
- Open shift placeholders
- Calendar data/service/repository boundaries
- Calendar API contract and read-only API route planning

## Not Production Ready Yet

- No active schedule generation engine
- No leave approval workflow
- No VOT bidding workflow
- No employee portal
- No production auth system

## v2.1.1 Cleanup

- Full-root replacement package cleanup.
- `schedule/index.html` preserved for `/schedule/`.
- `schedule/schedule.html` preserved for the user-facing calendar preview.
- Added Calendar Preview link from the foundation overview.

## Schedule v2.1.2 — Admin Navigation Foundation

Schedule now includes admin-first navigation placeholders for Overview, Calendar, Employees, Assignments, Minimum Staffing, Leave Requests, Open Shifts, Reports, and Settings. Future role-based views should filter this shared interface instead of duplicating separate apps.

## Schedule v2.1.3 — Employee Identity Cleanup

Employee identity is now standardized for future production use. Employee records should use a hidden system key, an admin-entered agency employee ID, and an optional badge number. Future login accounts should live in a separate users table and support login by username or email. Roles should be assigned through separate role tables rather than embedded directly on employee records.
## v2.2.0 — Leave Requests Foundation

Schedule now includes a preview-only Leave Requests module for admin-first workflow design. It shows intake fields, request statuses, staffing impact placeholders, and review actions without enabling production writes.

## v2.2.1 — Request Hours & Admin Override Foundation

Leave Requests now include preview support for full-day vs partial-day time selection, start/end time calculation, request type minimum increments, and admin/scheduler override planning. Employee/self-service requests follow configured increments; admin/scheduler entries may use exact operational times with override notes.

