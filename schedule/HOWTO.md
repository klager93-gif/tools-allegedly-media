## v0.99.0 Database Planning HOWTO

Use this release as the blueprint for the PHP/MySQL transition.

## What to review before v1.0

1. `DATABASE-PLANNING.md` for the overall approach.
2. `TABLE-PLAN.md` for first table families.
3. `API-PLAN.md` for future PHP endpoint boundaries.
4. `SECURITY-PLAN.md` before credentials or writes are added.
5. `MIGRATION-PLAN.md` before moving local browser data into MySQL.
6. `AUDIT-LOGGING-PLAN.md` before approvals or schedule-changing actions exist.

## What not to do in v0.99

Do not add PHP credentials, live database connections, CRUD forms, login systems, approval flows, or new dashboard preview panels.

## v1.0 first safe test

The first PHP/MySQL test should be read-only: connect to the database, load one agency row, and display it on a private test page.
