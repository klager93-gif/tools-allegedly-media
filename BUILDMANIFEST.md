# Signal Labs Build Manifest

Schedule release: v4.3.0 — Availability, Preferences, Restrictions + Navigation Exposure
Date: 2026-06-14

This full replacement package preserves non-Schedule tools and updates Schedule plus root documentation references needed for the current Schedule release.

## Signal Schedule v4.0.0 — Beta Foundation & Publishing

Schedule 4.0.0 starts the beta series with publishing, immutable schedule snapshots, post/seat foundations, availability/preferences/restrictions foundations, and migration 040. This release modifies `/schedule/` and root documentation only.

# Build Manifest Update

Signal Schedule v3.7.0 — Scheduling Workspace added. No database migration required.

# Signal Schedule Build Manifest

## Release

Signal Schedule v3.6.1 — Schedule Visibility & Privacy Controls

## Build Type

Feature foundation release with database migration.

## Baseline

v3.5.0 — Dense Tables & Workspace

## Files Added

```text
schedule/visibility.html
schedule/visibility.css
schedule/visibility.js
schedule/data/visibility-privacy-preview.json
schedule/api/contracts/visibility-privacy.read.schema.json
schedule/api/coolify/sql/037_schedule_visibility_privacy_schema.sql
schedule/adapters/JsonVisibilityPrivacyAdapter.js
schedule/repositories/VisibilityPrivacyRepository.js
schedule/services/VisibilityPrivacyService.js
```

## Files Modified

```text
schedule/app-shell.js
schedule/*.html
schedule/api/coolify/server.js
schedule/README.md
schedule/ROADMAP.md
schedule/CHANGELOG.md
schedule/PUBLIC_CHANGELOG.md
schedule/ADMIN_CHANGELOG.md
schedule/MASTER-CHANGELOG.md
schedule/MASTER-ROADMAP.md
schedule/FILEMANIFEST.md
schedule/FILEMANIFEST.generated.txt
schedule/LATEST_RELEASE.md
```

## Database Migration Required

Yes.

```text
schedule/api/coolify/sql/037_schedule_visibility_privacy_schema.sql
```

Expected newest row:

```text
037 | schedule_visibility_privacy
```

## Scope Guard

No Paycheck, Overtime, Time Off, or shared global `/assets/` files were intentionally modified.
