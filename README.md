# Signal Labs Tools

**Current package:** Schedule v2.1.1 — Full Root Deployment Cleanup

Current Schedule release included in this package:

**Schedule v2.1.0 — Calendar Foundation**

This package adds a separate user-facing Schedule calendar preview page while preserving the existing Schedule foundation index.

## Schedule Pages

- `schedule/index.html` — foundation/admin overview
- `schedule/schedule.html` — user-facing calendar preview

No Paycheck files or unrelated tools are included in this release package.

## Schedule v2.1.2 — Admin Navigation Foundation

Schedule now includes admin-first navigation placeholders for Overview, Calendar, Employees, Assignments, Minimum Staffing, Leave Requests, Open Shifts, Reports, and Settings. Future role-based views should filter this shared interface instead of duplicating separate apps.

## Schedule v2.1.3 — Employee Identity Cleanup

Employee identity is now standardized for future production use. Employee records should use a hidden system key, an admin-entered agency employee ID, and an optional badge number. Future login accounts should live in a separate users table and support login by username or email. Roles should be assigned through separate role tables rather than embedded directly on employee records.
## Schedule v2.2.0

The Schedule tool now includes a preview-only Leave Requests Foundation page at `/schedule/leave.html`.

## v2.2.1 — Request Hours & Admin Override Foundation

Leave Requests now include preview support for full-day vs partial-day time selection, start/end time calculation, request type minimum increments, and admin/scheduler override planning. Employee/self-service requests follow configured increments; admin/scheduler entries may use exact operational times with override notes.

