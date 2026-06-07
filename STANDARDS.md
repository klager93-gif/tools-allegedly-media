# Signal Labs Development Standards v1.1

## Purpose

These standards define how Signal Labs tools are planned, built, validated, packaged, and released.

This file is the authoritative project copy of the standards. Chat history or AI memory should never be the only place these rules exist.

---

# Rule 0 — Rules First

Before:

- Planning
- Coding
- Refactoring
- Documentation
- Packaging
- ZIP creation
- Releases

The current Signal Labs Development Standards must be reviewed mentally.

If a proposed action would violate a rule, it must either:

1. Be prevented, or
2. Be explicitly brought to the user's attention.

Never knowingly proceed with a rule violation without discussing it first.

---

# Rule 1 — Version Every Release

Every release should include:

- Version number.
- Theme name.
- GitHub title.
- GitHub description.
- Matching cache-busting references.

---

# Rule 2 — Ship Complete Files

Prefer complete files over snippets.

When files appear mixed or corrupted, prefer full folder replacement over patching individual files.

---

# Rule 3 — Maintain Required Documentation

Every tool should maintain:

- README.md
- ROADMAP.md
- CHANGELOG.md
- HOWTO.md
- FILEMANIFEST.md
- BUILDMANIFEST.md

Documentation should evolve alongside the code.

The root project should also maintain:

- STANDARDS.md

---

# Rule 4 — Protect Project Integrity

Project integrity takes precedence over convenience.

No ZIP is better than a bad ZIP.

Avoid silent breaking changes.

Preserve working functionality whenever possible.

---

# Rule 5 — Verify File Identity

Source files should contain identity headers.

Each file should clearly identify:

- Area or tool name.
- File name.
- Version.
- Purpose.

Identity should be easy to verify before packaging.

---

# Rule 6 — Prevent Cross-Contamination

Before packaging, verify that each tool contains its expected identity strings and does not contain another tool's identity.

## Overtime Must Contain

- Overtime Calculator
- document.getElementById("rate")

## Overtime Must Not Contain

- Time Off Calculator
- categoryOptions

## Time Off Must Contain

- Time Off Calculator
- categoryOptions

## Time Off Must Not Contain

- Overtime Calculator
- document.getElementById("rate")

---

# Rule 7 — Review Shared Dependencies

Changes to shared assets require reviewing dependent tools.

Examples:

- assets/global.css
- assets/global.js

Consider effects on:

- Root
- Overtime
- Time Off
- Future tools

Bring dependency concerns to the user's attention.

---

# Rule 8 — Validate Before ZIP

Before packaging:

- Required files exist.
- Versions match.
- Identity checks pass.
- Documentation exists.
- Shared dependencies have been reviewed.

Abort packaging if validation fails.

---

# Rule 9 — Validate After ZIP

After packaging, verify:

- ZIP contents.
- Folder structure.
- Expected files.
- No unexpected files.
- Documentation completeness.

Only then should the ZIP be released.

---

# Rule 10 — Fail Loudly

If validation fails, report:

- What failed.
- Which file failed.
- Why it matters.
- What needs to be corrected.

Never silently continue.

---

# Implementation Notes

The previous expanded rule list remains supporting guidance behind these principles.

These eleven rules are the authoritative core of Signal Labs Development Standards v1.1.


---

# Version String Sanity

This check is part of Rule 8 and Rule 9.

Before and after packaging, verify that version strings are valid and not malformed.

Reject examples:

```text
version 0.2.2.2.2
version 0.8.3.1.1
version 0.6.2.1.1
```

Verify:

- Header version.
- Footer version.
- README current version.
- ROADMAP current version.
- CHANGELOG newest entry.
- CSS cache-busting reference.
- JS cache-busting reference.

If a malformed version string is found, abort packaging and fix it before creating the ZIP.


---

# Shared UX Guidance

Shared user-experience behavior belongs in shared assets when it applies to multiple tools.

Examples:

- Modal behavior.
- Navigation behavior.
- Shared ad slot behavior.

Shared changes must follow Rule 7 and be reviewed against Root, Overtime, Time Off, and future tools.


---

# Versioning Philosophy

Version numbers should reflect the amount of change, not artificial synchronization.

It is acceptable for tools to move at different speeds when the scope of work differs.

Examples:

```text
Overtime 0.8.5
Time Off 0.8
Overtime 0.9
Time Off 0.9
```

The release train should remain understandable, but version numbers should not be forced into symmetry when that creates misleading version history.


---

# Backup & Recovery Rule

Before uploading any release ZIP:

1. Create a backup of the current live version.
2. Store it in a dated backup folder.
3. Upload the new release.
4. Verify the live site.
5. Restore from backup if problems are discovered.

Recommended backup folder format:

```text
Signal-Labs-Backups/
YYYY-MM-DD-before-release-name/
  root/
  overtime/
  timeoff/
  BACKUP-INFO.md
```

---

# Release Backup Reminder Rule

Whenever a new ZIP is presented, the release response should include a backup reminder.

Required reminder:

```text
Back up the current live version before uploading this release.
```

---

# Root Restore Documentation Rule

Root releases should maintain:

```text
RESTORE.md
backups/README.md
backups/BACKUP-LOG.md
backups/RESTORE-GUIDE.md
```

These files document backup and restore procedures so recovery instructions are not lost if chat history or AI memory is unavailable.


---

# Release Management Rule

The root project should maintain ecosystem-wide release management files.

Required files:

```text
MASTER-CHANGELOG.md
MASTER-ROADMAP.md
RELEASE-HISTORY.md
```

These files track project-wide history across Root, Overtime, Time Off, and future tools.

---

# Master Changelog Rule

`MASTER-CHANGELOG.md` should summarize major releases across the full Signal Labs ecosystem.

It should answer:

- What changed?
- Which project changed?
- Which version introduced the change?
- When did it happen?

---

# Master Roadmap Rule

`MASTER-ROADMAP.md` should show the full project roadmap across all tools.

It should include:

- Root roadmap.
- Overtime roadmap.
- Time Off roadmap.
- Future tools.
- Production-release targets.

---

# Release History Rule

`RELEASE-HISTORY.md` should track actual release order.

It should answer:

- What was released before this?
- What release introduced a feature?
- Which release should be backed up before installing the next one?


---

# UI Density Guidance

Signal Labs tools should balance clarity with compactness. Desktop layouts should avoid unnecessary vertical height. Mobile layouts should remain readable and tap-friendly.

When changing shared density styles, review Root, Overtime, Time Off, and future tools.

---

# Release Metadata Rule

Every release response must include the following information in this order:

1. Backup reminder.
2. Backup folder name.
3. Download ZIP link.
4. GitHub title.
5. GitHub description.

This keeps backups, release packages, and GitHub records synchronized.

---

# Backup Folder Naming Rule

Backup folders should use ISO-style dates and include all affected versions.

Example:

```text
2026-06-07-before-home-v0.4-overtime-v0.9.3-timeoff-v0.9.3
```

Benefits:

- Chronological sorting.
- Easier restore operations.
- Matches RELEASE-HISTORY.md.
- Matches MASTER-CHANGELOG.md.

---

# Backup Reminder Rule

Every release response must begin with:

```text
⚠️ Backup reminder: create a backup of the current live version before uploading.
```

followed immediately by the backup folder name.

---

# Release Package Order Rule

Release information must always be presented in this order:

1. Backup reminder.
2. Backup folder name.
3. Download link.
4. GitHub title.
5. GitHub description.

Do not vary this order.

---

# Restore Compatibility Rule

Backup folder names should correspond to entries in:

```text
RELEASE-HISTORY.md
MASTER-CHANGELOG.md
```

This makes restore operations possible without relying on chat history.


---

# Signal Labs Home Naming Rule

The top-level Signal Labs site should be referred to as `Signal Labs Home` or `Home`, not `Root`, in user-facing release names and documentation.

The word `root` may still be used only when referring to the technical website root directory.

---

# Rule 23 — Master Documentation

Signal Labs Home must maintain these project-wide documentation files:

```text
MASTER-CHANGELOG.md
MASTER-ROADMAP.md
```

Every release of any Signal Labs tool must update:

- the tool's own CHANGELOG.md
- the tool's own ROADMAP.md when needed
- MASTER-CHANGELOG.md
- MASTER-ROADMAP.md when current versions or plans change

The master changelog records chronological history across the full Signal Labs ecosystem.

The master roadmap records current versions and future plans across the full Signal Labs ecosystem.
