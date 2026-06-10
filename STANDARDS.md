# Signal Labs Development Standards v2.2

## Purpose

These standards define how Signal Labs tools are planned, built, validated, documented, packaged, and released.

`STANDARDS.md` is the master constitution for the project. It defines authority, philosophy, source rules, ecosystem rules, and links to the supporting standards files.

The supporting standards files are authoritative within their domains:

```text
UX_STANDARDS.md
SCRIPT_STANDARDS.md
DOCUMENTATION_STANDARDS.md
VERSIONING_STANDARDS.md
WORKFLOW_STANDARDS.md
```

Chat history and AI memory should never be the only place standards exist.

---

# Rule 0 — Standards First

Before planning, coding, refactoring, documentation, packaging, ZIP creation, or releasing, review the current Signal Labs standards.

At daily startup, review all standards files:

```text
STANDARDS.md
UX_STANDARDS.md
SCRIPT_STANDARDS.md
DOCUMENTATION_STANDARDS.md
VERSIONING_STANDARDS.md
WORKFLOW_STANDARDS.md
```

Before task-specific work, review the domain-specific standards again.

- Before script work, review `SCRIPT_STANDARDS.md`.
- Before CSS, layout, or UI work, review `UX_STANDARDS.md`.
- Before documentation work, review `DOCUMENTATION_STANDARDS.md`.
- Before versioning, cache-busting, packaging, or release work, review `VERSIONING_STANDARDS.md`.
- Before starting or closing a work session, review `WORKFLOW_STANDARDS.md`.

Principle:

> Review broadly. Verify specifically.

If a proposed action would violate a rule, prevent it or explicitly bring it to the user's attention before proceeding.

---

# Rule 1 — GitHub Is the Source of Truth

Repository:

```text
https://github.com/klager93-gif/tools-allegedly-media
```

GitHub is normally authoritative because it is the deployment source for the live website.

If memory, conversation history, or old ZIPs disagree with GitHub, GitHub wins unless a recent user-provided ZIP exception applies.

---

# Rule 2 — Standards Authority Hierarchy

Use the newest authoritative source available.

Priority:

```text
1. Standards files in GitHub
2. GitHub repository files
3. Recent user-provided ZIP standards not yet represented in GitHub
4. Current-chat uploaded files
5. Recent conversation context
6. AI memory
```

## Recent ZIP Standards Exception

Standards from ZIP files may be treated as temporarily authoritative only when all are true:

- The ZIP was provided by the user or created in the current chat.
- The ZIP is recent.
- The ZIP contains standards not yet available in GitHub.
- The ZIP appears newer than GitHub for that specific standards work.

If confused, clarify. Otherwise, GitHub wins.

---

# Rule 3 — Home Terminology

The top-level website project is called:

```text
Home
```

Do not refer to it as Root, Main, or Root Website in current release language unless discussing old history.

---

# Rule 4 — Version Every Release

Every release must include:

- Version number.
- Theme name.
- GitHub title.
- GitHub description.
- Source disclosure.
- Matching cache-busting references when changed assets are involved.

Version numbers should reflect the amount of change, not artificial synchronization.

Independent version trees are maintained for:

```text
Home
Paycheck
Overtime
Time Off
Future tools
```

---

# Rule 5 — Ship Complete Files

Prefer complete files over snippets.

Prefer whole-folder replacement over patching when files appear mixed, corrupted, or inconsistent.

## Hotfix Exception

Hotfixes may replace only affected file or files when the change is narrowly scoped and urgent.

Every hotfix still requires, at minimum:

- Tool `CHANGELOG.md` update.
- `MASTER-CHANGELOG.md` update.
- `RELEASE-HISTORY.md` update.
- GitHub title.
- GitHub description.
- Backup folder name.
- Source disclosure.

If a hotfix changes visible version labels, cache-busting references, manifests, roadmap direction, or current version status, affected documentation and manifest files must also be updated.

Feature releases and normal bug releases should replace the full affected folder or release package.

---

# Rule 6 — Consider the Entire Ecosystem

Never think about one file, folder, or tool in isolation.

Changes may affect:

- Home.
- Shared assets.
- Paycheck.
- Overtime.
- Time Off.
- Future tools.

Bring dependency concerns and side effects to the user's attention.

---

# Rule 7 — Maintain Required Documentation

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

Documentation evolves alongside code.

---

# Rule 8 — Protect Project Integrity

Project integrity takes precedence over convenience.

- No ZIP is better than a bad ZIP.
- Preserve working functionality whenever possible.
- Avoid silent breaking changes.
- Favor correctness over speed.
- Failed releases are not releases.
- Successful releases become history.
- Storage is cheap. Lost work is expensive.

---

# Rule 9 — Verify File Identity

Files should clearly identify:

- Area or tool name.
- File name.
- Version.
- Purpose.

Identity should be easy to verify before packaging.

Prevent cross-contamination between tools.

---

# Rule 10 — Source Disclosure

When planning, building, validating, or packaging a release, disclose the source used.

Examples:

```text
Source: GitHub repository
Source: Uploaded files
Source: Recent user-provided ZIP
Source: Mixed source: GitHub + current-chat standards package
```

Never silently switch sources.

AI memory may assist planning and continuity, but it is never an authoritative project source.

---

# Rule 11 — Preserve Shared Systems

Systems intended to span multiple tools should remain consistent.

Examples:

- Reports.
- Action bars.
- Pills.
- Empty states.
- Modals.
- Copy Results format.
- Report headers.
- Shared section numbering.
- Hidden ad framework.
- Navigation.

When a feature pattern is reused across multiple tools, changes to that pattern should be reviewed for every tool that uses it.

---

# Rule 12 — Review Shared Dependencies

Changes to shared dependencies require reviewing dependent tools.

Examples:

```text
assets/global.css
assets/global.js
assets/
site.webmanifest
```

Review effects on:

- Home.
- Paycheck.
- Overtime.
- Time Off.
- Future tools.

---

# Rule 13 — Validate Before Packaging

Before packaging, verify:

- Required files exist.
- Versions match.
- Documentation is current.
- Identity checks pass.
- Source has been disclosed.
- Dependencies have been reviewed.
- Shared systems have been considered.
- Standards files have been reviewed.
- Domain-specific standards have been reviewed for the type of work performed.

Abort packaging if validation fails.

---

# Rule 14 — Validate After Packaging

After packaging, verify:

- ZIP contents.
- Folder structure.
- Expected files.
- No unexpected files.
- Documentation completeness.
- Version consistency.
- Release notes.

Only then should the ZIP be released.

---

# Rule 15 — Fail Loudly

If validation fails, report:

- What failed.
- Which file failed.
- Why it matters.
- What needs to be corrected.

Never silently continue.

---

# Rule 16 — Clarify Rather Than Guess

If sources disagree or intent is unclear:

- State the conflict.
- Ask for clarification when needed.
- Do not silently invent standards.
- Do not reconstruct authoritative rules from memory when GitHub contains the official version.

---

# Rule 17 — Trust Successful Releases

Failed releases are not releases.

Examples:

- Red box upload failures.
- Corrupt ZIPs.
- Invalid packages.
- Partial uploads.

If validation or upload fails:

```text
Release status = FAILED
```

The previous successful release remains the source of truth.

---

# Rule 18 — Successful Releases Become History

Only successful releases should update historical release records.

Successful releases may update:

- `CHANGELOG.md`
- `MASTER-CHANGELOG.md`
- `RELEASE-HISTORY.md`

Failed releases should not appear as completed release history.

---

# Core Philosophy

Protect project integrity.

Think first. Build second. Package last.

Review broadly. Verify specifically.

GitHub is truth.

Home is Home.

Ship complete files.

Fail loudly.

Storage is cheap. Lost work is expensive.

---

# Constitution Note — Version Synchronization

Every release must verify visible and hidden version references across affected pages and documentation. Footer version updates are required when a page or tool version changes, but footer wording/layout should not be changed without an explicit footer, navigation, branding, or layout reason.


---
# Rule 19 — Shared Design System

Signal Labs shared UI patterns should be treated as reusable systems, not one-off page decorations.

The shared design system includes:

```text
Global header
Global navigation
Global footer
Tool action bars
Cards
Buttons
Pills
Empty states
Modals / dialogs
Toasts / notifications
Metadata display
```

Shared design changes should be reviewed against Home, Paycheck, Overtime, Time Off, and future tools before release.

Do not force every tool to adopt a new shared component immediately. Introduce global components safely, then migrate tools in future appropriate releases.


## Public Release Surface

Public pages should not expose internal demo content, design-system test cards, or architecture notes unless intentionally approved as user-facing content.
