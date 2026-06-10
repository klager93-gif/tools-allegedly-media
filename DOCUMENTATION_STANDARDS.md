# Documentation Standards

## Changelog Architecture

Signal Labs uses three changelog layers.

### Master Changelog

`MASTER-CHANGELOG.md` is the permanent append-only chronology for the entire Signal Labs platform.

It includes releases and major changes across:

- Home
- Paycheck
- Overtime
- Time Off
- Future tools

Entries must remain in the literal order releases happen. Do not delete, summarize, archive, or replace history.

### Public Changelog

Each project/tool should maintain `PUBLIC_CHANGELOG.md`.

Public changelogs include all changes that affect the user experience, including:

- features
- bug fixes
- UI changes
- behavior changes
- discovered user-facing issues and fixes

Footer changelog links should point to public changelogs.

### Admin Changelog

Each project/tool should maintain `ADMIN_CHANGELOG.md`.

Admin changelogs include internal/development notes, including:

- AI-assisted workflow notes
- standards changes
- packaging decisions
- implementation details
- build process notes

## Deprecated Files

Do not maintain duplicate regular changelogs once public/admin changelogs exist.

Deprecated:

- `CHANGELOG.md`
- `RELEASE-HISTORY.md`

For Paycheck and future tools, deprecated:

- `tool/CHANGELOG.md`

## Required Release Documentation

Each release should update:

- relevant `PUBLIC_CHANGELOG.md`
- relevant `ADMIN_CHANGELOG.md`
- root `MASTER-CHANGELOG.md`
- `README.md`
- `ROADMAP.md`
- `HOWTO.md`
- `FILEMANIFEST.md`
- `BUILDMANIFEST.md`
- `RESTORE.md`
- `BACKUP.md`
- `SHA256SUMS.txt`

## Principle

History is cheap. Lost history is expensive.
