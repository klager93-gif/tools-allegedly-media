# Signal Schedule Coolify API

Current release: **v2.1.3 — Employee Identity Cleanup**

## Read Routes

- `GET /health`
- `GET /api/health`
- `GET /employees`
- `GET /api/employees`
- `GET /assignments`
- `GET /api/assignments`
- `GET /minimum-staffing`
- `GET /api/minimum-staffing`
- `GET /calendar`
- `GET /api/calendar`

## Write Routes

Employee write routes remain protected and require configured environment settings. Calendar, assignment, and minimum staffing routes are read-only foundation routes in this release.

## v2.1.0 Notes

The Calendar Foundation route returns preview rows and event placeholders from JSON seed data. It does not generate schedules, approve leave, post VOT, or apply mandation rules yet.


## v2.1.3 Notes

Employee identity is now standardized for future database/authentication work:

- `employees.id` remains the hidden system/database key.
- `employees.employee_id` is the admin-entered county/agency employee ID.
- `employees.badge_number` is optional and separate from employee ID.
- Future login accounts belong in `users`, not directly inside employee records.
- Future authentication should accept username or email.
- Future permissions should use separate `roles` and `user_roles` tables.

## v2.2.0 Leave Requests Foundation

Read-only preview route added:

- `GET /leave-requests`
- `GET /api/leave-requests`

These routes read JSON seed data only. Production leave request writes remain disabled until authentication, roles, and database migrations are active.

## v2.2.1 Request Hours Foundation Routes

Read-only planning route added:

- `GET /request-increment-settings`
- `GET /api/request-increment-settings`

Leave request responses now include request increment settings and preview hour fields. No production write routes are active for leave requests.



## v2.3.0 Open Shifts / VOT Foundation Routes

Read-only planning routes:

- `GET /open-shifts`
- `GET /api/open-shifts`
- `GET /request-reasons`
- `GET /api/request-reasons`

These routes return JSON seed data only. No VOT request submission, award, approval, or production write workflow is active yet.
