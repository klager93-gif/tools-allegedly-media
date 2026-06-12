## v1.3.2 API Plan Update

API planning now targets a Coolify-hosted backend first, with Cloudflare D1/Workers remaining a possible adapter path only. Endpoint shapes remain useful, but implementation should wait until the Coolify backend plan is confirmed.

## v1.3.0 D1 API Direction

Worker/Pages Function endpoints should eventually read from the D1 adapter using the repository/service boundary. The active app remains JSON-backed until the D1 deployment is intentionally enabled.

# Signal Schedule API Plan

## v1.3.0 D1 Database Foundation

Planned initial endpoint shapes remain:

```text
GET /schedule/api/health
GET /schedule/api/agencies
GET /schedule/api/employees
```

The mock files now live inside the Schedule tool instead of the repository root:

```text
/schedule/api/mock-functions/health.js
/schedule/api/mock-functions/agencies.js
/schedule/api/mock-functions/employees.js
```

## Response standard

All API responses should use:

```json
{
  "ok": true,
  "data": [],
  "meta": {},
  "errors": []
}
```

## Error standard

```json
{
  "ok": false,
  "data": null,
  "meta": {},
  "errors": [
    { "code": "error_code", "message": "Human-readable message." }
  ]
}
```

## Not active yet

D1, authentication, writes, approvals, and CRUD are not active in v1.3.0.

## Rule 25

Tools own their infrastructure. Schedule-specific API/function planning belongs inside `/schedule/` unless the root-level component is intentionally shared by multiple tools.
