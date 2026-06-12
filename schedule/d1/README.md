# Signal Schedule v1.3.0 — D1 Files

These files define the first Cloudflare D1 foundation for Signal Schedule.

## Files

- `schema.sql` — first tables: agencies, employees, audit_logs.
- `seed.sql` — pretend multi-agency sample data matching `/schedule/data`.

## Active status

The live app still uses the static JSON adapter.

D1 is planned but not active in this release. No credentials, live writes, CRUD, or authentication are included.

## Rule 24

D1 is only the first backend adapter. UI and business logic must continue to use services, repositories, and adapters so D1 can be replaced later if needed.
