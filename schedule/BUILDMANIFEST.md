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


## v3.6.2 Navigation Coverage Audit Hotfix

Schedule navigation was audited so canonical pages are linked and redirect-only compatibility pages stay out of primary nav. No database migration required.
