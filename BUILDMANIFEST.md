# Signal Labs Home Build Manifest

## Release

Home v0.7.1 — Version Synchronization

## Version

v0.7.1

## Previous Version

Home v0.7.0 — Standards Architecture

## Build Date

2026-06-10

## Build Type

Full replacement Home synchronization and standards refinement release.

## Source Repository

https://github.com/klager93-gif/tools-allegedly-media

## Source Baseline

GitHub main branch was checked and `index.html` still showed Home v0.6.2 labels and footer while the v0.7.0 standards package had already been prepared. This v0.7.1 release corrects that mismatch.

## Backup Record

External backup should be completed before upload. Recommended backup folder: `2026-06-10-before-home-v0.7.1-version-synchronization`.

## Package Name

`home-v0.7.1-version-synchronization.zip`

---

# Build Scope

This release updates Home page version references and standards validation rules.

No calculator logic changes.

No shared asset content changes.

Cache-busting references for `assets/global.css` and `assets/global.js` remain `v=0.6.1` because the referenced shared asset files were not changed.

---

# Files Updated

```text
index.html
STANDARDS.md
VERSIONING_STANDARDS.md
WORKFLOW_STANDARDS.md
README.md
ROADMAP.md
CHANGELOG.md
HOWTO.md
FILEMANIFEST.md
BUILDMANIFEST.md
RESTORE.md
INSTALL.md
MASTER-CHANGELOG.md
MASTER-ROADMAP.md
RELEASE-HISTORY.md
BACKUP.md
SHA256SUMS.txt
```

---

# Version Synchronization Validation

- `index.html` file comment updated to v0.7.1.
- Home visible build label updated to v0.7.1.
- Home visible theme label updated to Version Synchronization.
- Home footer updated to `Signal Labs · Home · v0.7.1`.
- Footer wording/layout otherwise unchanged.
- Shared asset cache-busting reviewed and intentionally left unchanged because shared asset files were not changed.
- Documentation version references updated.
- Standards updated with affected-page version sweep requirements.
- Checksum manifest regenerated after final file changes.

---

# GitHub Release

GitHub title and summary are provided in the release chat response, not packaged as a file.
