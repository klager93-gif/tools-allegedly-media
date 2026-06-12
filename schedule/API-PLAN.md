# Signal Schedule API Plan

## v1.2.1 Worker Folder Repair

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

D1, authentication, writes, approvals, and CRUD are not active in v1.2.1.

## Rule 25

Tools own their infrastructure. Schedule-specific API/function planning belongs inside `/schedule/` unless the root-level component is intentionally shared by multiple tools.
