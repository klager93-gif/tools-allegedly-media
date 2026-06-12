# Signal Schedule v1.8.0 — Employee CRUD Foundation

## Summary

Signal Schedule v1.8.0 adds protected employee CRUD route boundaries to the Coolify API while keeping writes disabled by default.

## Added

- Protected employee create route.
- Protected employee update route.
- Protected employee soft-delete route.
- Single employee read route.
- Admin API key guard for write routes.
- `EMPLOYEE_WRITES_ENABLED` safety flag.
- Optional employee CRUD safety SQL indexes.
- Employee CRUD Foundation documentation.

## Preserved

- Coolify + Postgres backend direction.
- Dockerfile deployment path from v1.7.1.
- Existing `/health` and `/employees` routes.
- Existing seeded employee data.
- Repository/service/adapter separation principles.

## Not included

- No login system.
- No role-based auth.
- No frontend employee editor.
- No scheduling engine.
- No real employee data migration.

## Coolify setup notes

Keep writes disabled until intentionally testing CRUD:

```text
EMPLOYEE_WRITES_ENABLED=false
```

For controlled testing only, set:

```text
EMPLOYEE_WRITES_ENABLED=true
ADMIN_API_KEY=<long random key>
```

Then include the key in write requests.
