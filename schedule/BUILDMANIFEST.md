# Build Manifest

## Release Title

Schedule v2.16.1 — Release File Cleanup & Latest Release

## ZIP Filename

signal-schedule-v2.16.1-release-file-cleanup-latest-release.zip

## Replace Scope

Full root replacement.

## Database

No new SQL migration required. Current database target remains `022 roles_permissions`.

## Deleted During Cleanup

- `schedule/RELEASE-v*.md` historical per-version release files
- macOS metadata/resource fork files (`._*`)
- `.DS_Store`
- `.git/`
- `__MACOSX/`
