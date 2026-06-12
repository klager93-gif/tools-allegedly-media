# Schedule v2.1.3 — Employee Identity Cleanup

**Backup Title:** `2026-06-12 Full Root Backup Before v2.1.3`

## Summary

Schedule v2.1.3 adds Employee Identity Cleanup documentation and future database planning.

## Added

- Employee identity model rule
- Separation of hidden system IDs and agency-entered employee IDs
- Optional badge number standard
- Future users table planning
- Future roles and user_roles planning
- Username-or-email login rule
- Future SQL planning migration

## Not Added

- No live login system
- No password storage
- No authentication middleware
- No role enforcement
- No production database migration automatically applied

## Deployment

This is safe for static/full-root deployment. If a live database is already connected, review the SQL planning file before applying any schema changes.
