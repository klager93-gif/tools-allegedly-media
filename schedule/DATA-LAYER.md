## v1.3.0 D1 Data Layer Planning

The data layer now has three source concepts: active static JSON, planned Worker API, and planned D1 adapter. UI code must continue to call services/repositories, not D1 directly.

# Signal Schedule v1.0.0 — Cloudflare Data Layer Foundation

This release starts the v1.x data path without adding a live database. The app remains static/browser-only and reads multi-agency sample records from JSON files.

## Files

```text
/schedule/data/agencies.json
/schedule/data/employees.json
```

## Rule 24

The UI must not depend directly on D1, Workers, MySQL, PHP, or any specific backend. Data access moves through service/repository/adapter concepts so the first adapter can be JSON and a later adapter can be Cloudflare D1, MySQL, PostgreSQL, or another backend.

## Multi-agency support

Every employee record includes `agencyId`. This allows multiple pretend agencies to be loaded in one installation and prepares the project for future multi-tenant/customer support.
