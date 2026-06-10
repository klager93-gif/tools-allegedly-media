# Signal Labs Documentation Standards v2.2

## Purpose

This file defines documentation requirements for Signal Labs releases.

Review this file before creating, updating, packaging, or releasing documentation.

---

# Documentation Rule 1 — Documentation Is Part of the Release

No release is complete until required documentation is updated.

Documentation evolves alongside code.

---

# Documentation Rule 2 — Required Tool Documents

Every tool should eventually maintain:

```text
README.md
ROADMAP.md
CHANGELOG.md
HOWTO.md
FILEMANIFEST.md
BUILDMANIFEST.md
```

Home additionally maintains:

```text
STANDARDS.md
UX_STANDARDS.md
SCRIPT_STANDARDS.md
DOCUMENTATION_STANDARDS.md
VERSIONING_STANDARDS.md
WORKFLOW_STANDARDS.md
MASTER-CHANGELOG.md
MASTER-ROADMAP.md
RELEASE-HISTORY.md
RESTORE.md
INSTALL.md
```

---

# Documentation Rule 3 — Master Documentation Requirements

`MASTER-CHANGELOG.md` must be updated for every successful release.

This applies to:

- Home.
- Shared assets.
- Paycheck.
- Overtime.
- Time Off.
- Future tools.

`MASTER-ROADMAP.md` must be updated whenever versions, themes, plans, new tools, or priorities change.

`RELEASE-HISTORY.md` must be updated whenever a successful release occurs.

---

# Documentation Rule 4 — File Responsibilities

| File | Purpose |
|---|---|
| README.md | Current overview and status |
| ROADMAP.md | Future direction |
| CHANGELOG.md | Detailed area/tool history |
| HOWTO.md | User and maintainer instructions |
| FILEMANIFEST.md | Expected file inventory |
| BUILDMANIFEST.md | Build scope and validation |
| RESTORE.md | Recovery and rollback guidance |
| MASTER-CHANGELOG.md | Ecosystem history |
| MASTER-ROADMAP.md | Ecosystem future |
| RELEASE-HISTORY.md | Chronological successful release order |
| INSTALL.md | Upload/install instructions |

---

# Documentation Rule 5 — Preserve History

Do not erase old changelog history.

Add new entries above prior entries.

Failed releases should not be recorded as completed successful releases.

---

# Documentation Rule 6 — Release Responses Must Be GitHub-Ready

Every release response should include:

- Backup reminder.
- Backup folder name.
- Download ZIP link.
- GitHub title.
- GitHub summary/description.
- Theme.
- Version.
- Source disclosure.

GitHub title format:

```text
Home vX.X.X — Release Theme
```

or for tools:

```text
Paycheck vX.X.X — Release Theme
Overtime vX.X.X — Release Theme
Time Off vX.X.X — Release Theme
```

---

# Documentation Rule 7 — Source Disclosure Required

Every release response should include:

```text
Source:
```

Examples:

```text
Source: GitHub repository
Source: GitHub repository + current-chat user-approved standards decisions
Source: Uploaded ZIP provided by user
```

---

# Documentation Rule 8 — Documentation Must Match the Build

Versions must match across:

- README.
- ROADMAP.
- CHANGELOG.
- FILEMANIFEST.
- BUILDMANIFEST.
- RESTORE if version-specific.
- INSTALL.
- Footer/build labels if code is included.
- Cache-busting references if assets changed.

---

# Documentation Rule 9 — Manifests Matter

`FILEMANIFEST.md` should describe expected files and folders.

`BUILDMANIFEST.md` should describe:

- Build scope.
- Changed files.
- Unchanged systems.
- Validation checks.
- Source used.

---

# Documentation Rule 10 — HOWTO Must Stay Useful

`HOWTO.md` should explain:

- How to use the tool or Home site.
- How to maintain it.
- How to verify it.
- How standards apply when relevant.

Avoid letting HOWTO become stale after UI changes.

---

# Documentation Rule 11 — Restore Docs Must Stay Practical

`RESTORE.md` should explain:

- Emergency restore steps.
- File/folder mapping.
- Version verification.
- Tool-specific checks.
- Backup expectations.

---

# Documentation Rule 12 — Standards Documentation

`STANDARDS.md` is the master constitution.

The domain standards files are authoritative within their domains:

```text
UX_STANDARDS.md
SCRIPT_STANDARDS.md
DOCUMENTATION_STANDARDS.md
VERSIONING_STANDARDS.md
WORKFLOW_STANDARDS.md
```

When standards change, documentation should reflect the new structure.

---

# Core Documentation Principle

If the code changes but the docs do not, the release is incomplete.

If the standards change but only chat remembers them, the standards are not real yet.
