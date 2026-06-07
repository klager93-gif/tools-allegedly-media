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
