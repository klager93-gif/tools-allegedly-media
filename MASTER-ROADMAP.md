## Current

- Schedule v2.14.0 — Employee Timeline & Audit Trail is complete.

## Next

- Schedule v2.14.0 — Employee Timeline & Audit Trail.
- Schedule v2.17.0 — Supervisors & Organizational Hierarchy.
- Schedule v2.17.0 — Roles & Permissions Engine.

## Schedule v2.12.0 — Calendar Views + Schedule Footer

- Adds user-facing week and day calendar views.
- Adds Schedule-specific footer across /schedule/ pages.
- Adds Calendar View foundation files and fixes overview version drift.

# Current: Schedule v2.11.0 — Calendar Shortcode Admin Controls

Next: Schedule v2.12.0 — Calendar Views

Database note: after v2.11 is uploaded, run Schedule migrations 004 through 017 in order.

# Signal Labs Master Roadmap

## 2026-06-12 — Schedule v2.1.1

- Cleaned full-root deployment package and preserved Schedule index/calendar routing.


## Schedule

Completed:

- v1.8.0 — Employee CRUD Foundation
- v1.9.0 — Assignments Foundation
- v2.0.0 — Minimum Staffing Foundation
- v2.1.0 — Calendar Foundation

Next:

- v2.2.0 — Leave Requests Foundation
- v2.3.0 — Open Shift / VOT Foundation
- v2.4.0 — Mandation Foundation
- v2.5.0 — Schedule Generation Foundation

## Schedule v2.1.2 — Admin Navigation Foundation

Schedule now includes admin-first navigation placeholders for Overview, Calendar, Employees, Assignments, Minimum Staffing, Leave Requests, Open Shifts, Reports, and Settings. Future role-based views should filter this shared interface instead of duplicating separate apps.

## v2.1.3 — Employee Identity Cleanup

Completed identity cleanup before leave, open shifts, authentication, and role-based views:

- Hidden system IDs remain internal.
- Agency employee IDs are admin-entered.
- Badge numbers are optional and separate.
- Future login users stay separate from employees.
- Username or email may be used for login.
- Roles remain separate from employee records.

Next: **v2.2.0 — Leave Requests Foundation**.
## Schedule Current

- v2.2.0 — Leave Requests Foundation complete.

## Schedule Next

- v2.3.0 — Open Shifts / VOT Foundation.

## v2.2.1 — Request Hours & Admin Override Foundation

Leave Requests now include preview support for full-day vs partial-day time selection, start/end time calculation, request type minimum increments, and admin/scheduler override planning. Employee/self-service requests follow configured increments; admin/scheduler entries may use exact operational times with override notes.

## Completed: v2.3.0 — Open Shifts / VOT Foundation

Open Shifts and voluntary overtime now have a preview page, seed data, request reason planning, API boundaries, and future schema planning.

## Next Recommended: v2.4.0 — Supervisor Review Foundation

Planned focus:
- Pending leave/VOT review dashboard
- Approve/deny placeholders
- Staffing impact summaries
- Supervisor notes
- Request history preview
