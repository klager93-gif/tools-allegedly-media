## Current: v0.99.1 — Cloudflare Architecture Pivot

This release pivots the backend roadmap from PHP/MySQL-first to Cloudflare-native-first while preserving backend portability.

## Next

### v1.0.0 — Cloudflare Data Layer Foundation

Minimum target:

- Add browser-safe sample data files such as `agencies.json` and `employees.json`.
- Add service/repository boundaries.
- Keep UI independent from where data comes from.
- Keep the current static app working.
- No live D1 database yet.
- No live Worker API yet.
- No production writes yet.

### v1.1.0 — Repository / Adapter Layer

- Formalize repository contracts.
- Add adapter boundaries.
- Keep local JSON as the first adapter.
- Prepare for Worker and D1 adapters later.

### v1.2.0 — Worker API Foundation

- Add Cloudflare Worker or Pages Function API boundary.
- Add read-only mock endpoints first.
- Add `/api/health`, `/api/agencies`, and `/api/employees`.

### v1.3.0 — D1 Database Foundation

- Create first D1 schema for agencies, employees, and audit logs.
- Add read-only D1 adapter.
- Keep writes disabled until audit logging is proven.

### v1.4.0+

- Employee CRUD.
- Assignments.
- Events.
- Requests.
- Opportunities.
- Bids and awards.
- Benefit ledger.
- Rules and coverage.
- Notifications.
- Audit logs.

## Guardrails

- Do not build full CRUD before data-layer contracts are stable.
- Do not store secrets in the repository.
- Do not add preview UI just to explain backend concepts.
- Do not allow live writes before audit logging exists.
- Keep D1 behind adapters so MySQL/Postgres migration remains possible.
