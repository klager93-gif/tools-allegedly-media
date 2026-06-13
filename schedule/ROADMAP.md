# Signal Schedule Roadmap

## v2.1.1 — Full Root Deployment Cleanup

- Clean full-root replacement package.
- Calendar preview linked from foundation overview.


## Completed

- v1.8.0 — Employee CRUD Foundation
- v1.9.0 — Assignments Foundation
- v2.0.0 — Minimum Staffing Foundation
- v2.1.0 — Calendar Foundation

## Next Recommended

### v2.2.0 — Leave Requests Foundation

Planned focus:

- Leave request data model
- Pending/approved/denied statuses
- Calendar event integration
- Coverage impact preview
- Request review placeholders

## Future Path

- v2.3.0 — Open Shift / VOT Foundation
- v2.4.0 — Mandation Foundation
- v2.5.0 — Schedule Generation Foundation
- v2.6.0 — Publishing & Notifications

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
## Completed

- v2.2.0 — Leave Requests Foundation

## Next Recommended

- v2.3.0 — Open Shifts / VOT Foundation

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
