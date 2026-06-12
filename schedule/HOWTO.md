## v0.99.1 Cloudflare Architecture Pivot HOWTO

Use this release as the revised blueprint for the Cloudflare-native backend path.

## Read first

1. `CLOUDFLARE-ARCHITECTURE.md` for the target Cloudflare stack.
2. `BACKEND-PORTABILITY.md` for Rule 24.
3. `ROADMAP.md` for the revised v1.x sequence.
4. `SECURITY-PLAN.md` before creating secrets or API endpoints.
5. `MIGRATION-PLAN.md` before moving static data into D1.

## Do not do yet

Do not add live D1 tables, Worker routes, credentials, CRUD forms, login systems, approval flows, or new dashboard preview panels.

## First implementation step

The next release should add a static data layer with sample JSON and service/repository functions. It should not require Cloudflare D1 yet.
