# Signal Schedule v1.2.1 — Worker Folder Repair

## Purpose

v1.2.1 defines the Cloudflare Pages Functions / Worker API shape without connecting D1, credentials, authentication, CRUD, approvals, or live writes.

The active app still reads browser-safe sample records through the JSON adapter.

## Planned endpoints

```text
GET /schedule/api/health
GET /schedule/api/agencies
GET /schedule/api/employees
```

## Standard success response

```json
{
  "ok": true,
  "data": [],
  "meta": {
    "source": "worker-api",
    "version": "v1.2.1"
  },
  "errors": []
}
```

## Standard error response

```json
{
  "ok": false,
  "data": null,
  "meta": {
    "source": "worker-api",
    "version": "v1.2.1"
  },
  "errors": [
    {
      "code": "example_error",
      "message": "Human-readable explanation."
    }
  ]
}
```

## Rule 24 compliance

The UI must not directly depend on Workers, D1, PHP, MySQL, or any other backend.

```text
UI
↓
Service Layer
↓
Repository Layer
↓
Adapter
↓
JSON today / Worker API later / D1 later
```

## What this release does not do

```text
No D1 binding
No database schema execution
No credentials
No authentication
No CRUD
No live employee writes
No approval workflow
```
