# Signal Schedule Migration Plan — v0.99.1

## Current state

The app remains browser-only with local/static data.

## Next state

v1.0 should introduce a static JSON data layer and service/repository boundaries.

## Cloudflare path

1. Static JSON adapter.
2. Repository contracts.
3. Worker/Pages Function read-only API.
4. D1 schema and read-only D1 adapter.
5. Audit logging.
6. Controlled writes.
7. CRUD and approvals.

## Portability path

If the app later moves to MySQL/Postgres/PHP or another backend, replace the adapter, not the UI or scheduling engines.
