# Signal Schedule Coolify API

Current version: v2.0.0 — Minimum Staffing Foundation

Read routes:

```text
GET /health
GET /employees
GET /assignments
GET /minimum-staffing
GET /api/health
GET /api/employees
GET /api/assignments
GET /api/minimum-staffing
```

Employee write routes remain protected and require `EMPLOYEE_WRITES_ENABLED=true`, `DATA_MODE=postgres`, `DATABASE_URL`, and `ADMIN_API_KEY`.

Minimum staffing routes are read-only JSON seed routes in v2.0.0.
