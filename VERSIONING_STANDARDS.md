# Signal Labs Versioning Standards v2.1.1

## Purpose

This file defines standards for versioning, cache busting, packaging, backups, source authority, and release status.

Review this file before versioning, release planning, packaging, ZIP creation, cache-busting updates, or backup instructions.

---

# Versioning Rule 1 — Independent Version Trees

Maintain independent version trees for:

```text
Home
Paycheck
Overtime
Time Off
Future tools
```

Versions do not need to match.

Do not artificially synchronize versions across tools unless the release actually affects multiple tools.

---

# Versioning Rule 2 — Home Replaces Root

Current top-level site releases use:

```text
Home vX.X.X
```

Do not use Root for new release naming.

---

# Versioning Rule 3 — Version Numbers Should Reflect Change

Use version numbers to communicate scope.

General guidance:

- Patch/hotfix: narrow correction.
- Minor: meaningful feature, documentation, or standards release.
- Larger minor jump: larger architecture or ecosystem work.
- Major: breaking or foundational shift.

---

# Versioning Rule 4 — Cache Busting Must Match Changed Assets

When changed files are referenced with version query strings, update them.

Examples:

```text
style.css?v=0.8.1
script.js?v=0.8.1
assets/global.css?v=0.6.2
assets/global.js?v=0.6.2
```

Do not change cache-busting references for unrelated assets unless those assets actually changed.

---

# Versioning Rule 5 — Source Authority

Priority:

```text
1. Standards files in GitHub
2. GitHub repository files
3. Recent user-provided ZIP standards not yet represented in GitHub
4. Current-chat uploaded files
5. Recent conversation context
6. AI memory
```

GitHub normally wins.

Recent ZIPs are temporary exceptions only when newer than GitHub and provided by the user or created in the current chat.

---

# Versioning Rule 6 — Source Disclosure

Every release response must disclose source.

Example:

```text
Source: GitHub repository as of build time, plus current-chat approved Standards Architecture decisions.
```

---

# Versioning Rule 7 — Backup Before Upload

Before uploading a release ZIP, create an external backup.

Backup folder naming format:

```text
YYYY-MM-DD-before-tool-version-theme
```

Example:

```text
2026-06-10-before-home-v0.7.0-standards-architecture
```

Site `/backups/` documentation is not the only backup.

---

# Versioning Rule 8 — Release Status

A release may be:

```text
PLANNED
BUILT
FAILED
SUCCESSFUL
```

Definitions:

- `PLANNED`: discussed but not packaged.
- `BUILT`: ZIP/package created and validated.
- `FAILED`: validation/upload/package failed.
- `SUCCESSFUL`: user uploaded/deployed or confirms successful release.

Only successful releases become official history.

---

# Versioning Rule 9 — Failed Releases Are Not Baselines

If upload fails, ZIP corrupts, or packaging is invalid:

```text
Release status = FAILED
```

The previous successful release remains the source of truth.

---

# Versioning Rule 10 — Packaging Requirements

Before packaging, verify:

- Required files exist.
- Version labels match.
- Documentation is current.
- Source is disclosed.
- Folder structure is correct.
- No unexpected files are included.
- Standards review was performed.

After packaging, verify ZIP contents.

---

# Versioning Rule 11 — ZIP Contents Should Be Clear

Release ZIPs should use clear names.

Example:

```text
Home-v0.7.0-Standards-Architecture.zip
```

When a release only updates docs/standards, package the affected documentation files clearly and do not include unrelated code unless required.

---

# Versioning Rule 12 — Manifests Must Match the Package

`FILEMANIFEST.md` should describe expected project files.

`BUILDMANIFEST.md` should describe the package being released.

If a release package omits unchanged files intentionally, say so.

---

# Versioning Rule 13 — Checksum Manifest

Full replacement release ZIPs should include a checksum manifest when practical.

Preferred filename:

```text
SHA256SUMS.txt
```

Purpose:

- Verify release file integrity.
- Detect accidental file corruption.
- Support backup validation.
- Support comparison between packaged files and extracted files.

The checksum manifest should list package files and their SHA-256 hashes.

The checksum manifest must be treated as an intentional release metadata file, not an unexpected generated file.

If included, document it in:

```text
FILEMANIFEST.md
BUILDMANIFEST.md
WORKFLOW_STANDARDS.md
```

---

# Versioning Rule 14 — Version Synchronization Across Affected Pages

Every release must verify visible and hidden version references for every affected page and file.

Required checks include:

```text
Version badges
Build labels
Theme labels
Footer version text
Footer theme text when present
HTML comments
Meta/version notes
CSS cache-busting query strings
JS cache-busting query strings
README version references
CHANGELOG version references
ROADMAP version references
Manifest version references
Restore/build metadata
```

Home version updates apply to Home pages. Tool version updates apply only to the changed tool unless a shared release intentionally affects multiple tools.

Do not artificially bump unrelated tool versions.

---

# Versioning Rule 15 — Footer Version Updates

Update footer version references when the page, tool, or Home release version changes.

Do not change footer wording, layout, or branding purely for churn.

Footer changes should be limited to:

- Correct version synchronization.
- Correct release identity.
- Explicit footer, layout, navigation, or branding work.

If a page version changes, its footer version must be checked before release.

---

# Versioning Rule 16 — Cache Busting Discipline

Cache-busting query strings must be reviewed during every release.

Update cache-busting references only when the referenced asset changes or when the release explicitly requires a cache reset.

Do not change global asset cache-busting values solely because a Home documentation or standards release occurred.

If cache-busting values are intentionally left unchanged, document that decision in the build manifest.

---

# Core Versioning Principle

The version number is a promise.

The package, documentation, changelog, roadmap, and release notes must all tell the same story.
