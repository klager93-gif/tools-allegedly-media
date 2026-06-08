# Signal Labs Development Standards v2.0

## Purpose

These standards define how Signal Labs tools are planned, built, validated, packaged, and released.

This file is the authoritative project copy of the standards. Chat history or AI memory should never be the only place these rules exist.

---

# Rule 0 — Rules First

Before planning, coding, refactoring, documentation, packaging, ZIP creation, or releases, the current Signal Labs Development Standards must be reviewed mentally.

If a proposed action would violate a rule, it must either be prevented or explicitly brought to the user's attention.

---

# Rule 1 — Version Every Release

Every release must include:

- Version number.
- Theme name.
- GitHub title.
- GitHub summary.
- Matching cache-busting references when affected files change.

---

# Rule 2 — Ship Complete Files

Prefer complete files over snippets. When files appear mixed or corrupted, prefer full folder replacement over patching individual files.

---

# Rule 3 — Maintain Required Documentation

Every tool must maintain:

- README.md
- ROADMAP.md
- CHANGELOG.md
- HOWTO.md
- FILEMANIFEST.md
- BUILDMANIFEST.md

Documentation must evolve alongside code.

---

# Rule 4 — Protect Project Integrity

Project integrity takes precedence over convenience. No ZIP is better than a bad ZIP.

---

# Rule 5 — Verify File Identity

Source files should contain identity headers identifying area/tool, file name, version, and purpose.

---

# Rule 6 — Prevent Cross-Contamination

Before packaging, verify each tool contains expected identity strings and does not contain another tool's identity.

---

# Rule 7 — Review Shared Dependencies

Changes to shared assets require reviewing Home, Overtime, Time Off, and future tools.

---

# Rule 8 — Validate Before ZIP

Before packaging, required files must exist, versions must match, identity checks must pass, documentation must exist, and shared dependencies must be reviewed.

Abort packaging if validation fails.

---

# Rule 9 — Validate After ZIP

After packaging, verify ZIP contents, folder structure, expected files, no unexpected files, and documentation completeness.

---

# Rule 10 — Fail Loudly

If validation fails, report what failed, which file failed, why it matters, and what needs to be corrected.

---

# Rule 20 — Change Impact Review

Think about everything a change touches before building.

If a change affects shared assets, naming, reports, saved settings, layout, documentation, cache busting, or release metadata, those related files must be reviewed together.

---

# Rule 23 — Master Documentation

Every release of any Signal Labs tool must update:

- the tool's own CHANGELOG.md
- the tool's own ROADMAP.md when needed
- MASTER-CHANGELOG.md
- MASTER-ROADMAP.md when current versions or plans change

---

# Rule 35 — Backup Philosophy

Storage is cheap. Lost work is expensive.

When uncertain, preserve backups and restore entire affected folders rather than attempting risky partial repairs.

---

# Rule 36 — Backup Title Format

Backup titles are required for every release and must use:

```text
YYYY-MM-DD-before-tool-version-theme
```

The `before-` prefix is mandatory and indicates the state immediately prior to applying the new version.

Example:

```text
2026-06-08-before-overtime-v0.9.9-pre-1.0-sync-metadata-cleanup
```

---

# Version Synchronization Rule

Before and after packaging, verify:

- Header version.
- Footer version.
- Build/status card version.
- Report metadata version.
- README current version.
- ROADMAP current version.
- CHANGELOG newest entry.
- FILEMANIFEST version.
- BUILDMANIFEST version.
- CSS cache-busting reference.
- JS cache-busting reference.

Reject malformed versions such as:

```text
version 0.2.2.2.2
version 0.8.3.1.1
version 0.6.2.1.1
```

---

# Release Metadata Rule

Every release response must include, in order:

1. Backup reminder.
2. Backup folder name.
3. Download ZIP link.
4. GitHub title.
5. GitHub summary.
6. Theme.
7. Version.

---

# Signal Labs Home Naming Rule

The top-level Signal Labs site should be referred to as Signal Labs Home or Home, not Root, in user-facing release names and documentation.

The word `root` may still be used only when referring to the technical website root directory.
