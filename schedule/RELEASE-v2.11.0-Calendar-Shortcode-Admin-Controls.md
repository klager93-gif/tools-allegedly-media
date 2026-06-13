# Schedule v2.11.0 — Calendar Shortcode Admin Controls

Adds admin-first calendar shortcode management and database migration tracking guidance.

## Added

- Calendar Shortcode Admin Controls page.
- Shortcode preview data with built-in and custom-ready codes.
- Adapter, repository, and service layer for shortcode admin data.
- API contract for shortcode read models.
- Migration 004 for schema migration tracking.
- Migration 017 for shortcode categories, visibility, audit fields, and edit history.

## Database note

The database is currently verified through `schema_migrations` at 001-003. After this release is uploaded, run migrations 004 through 017 in order.
