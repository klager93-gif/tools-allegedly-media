# Signal Labs Build Manifest

## Coordinated Recovery Release

Package purpose:

- Restore documentation integrity after backup-install drift.
- Preserve Paycheck v0.9.9 behavior.
- Preserve Signal Schedule v1.3.3 behavior.
- Repair Rule 26 asset validation failures.
- Restore root documentation to Signal Labs ecosystem scope.

## Included Version Scopes

| Area | Version / Scope |
|---|---|
| Home / Root | Documentation and asset-reference recovery |
| Paycheck | v0.9.9 — Report & Metadata Cleanup |
| Signal Schedule | v1.3.3 — Coolify Backend Setup Guide |
| Pay Planner | v0.1.x incubator asset restoration |

## Explicit Non-Scope

- No Paycheck calculator math changes
- No Schedule v1.4 backend adapter selection implementation
- No Employee CRUD
- No authentication
- No live API deployment
- No production database writes
- No credentials

## Rule 26 Validation

Before release, validate that referenced CSS, JavaScript, image, icon, manifest, and local page references resolve to actual files.
