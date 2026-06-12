# Signal Schedule Coolify API

Current release: **v2.1.0 — Calendar Foundation**

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
