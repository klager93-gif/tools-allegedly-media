# Signal Labs Workflow Standards v2.2

## Purpose

This file defines daily startup, task verification, packaging, and release workflow.

Review this file at the beginning of a work session and before closing or packaging work.

---

# Workflow Rule 1 — Daily Startup Is Mandatory

At the first work session of every day, complete the startup process.

Do not assume memory is current.

Do not assume sources match.

---

# Workflow Rule 2 — Review All Standards

Daily startup must review:

```text
STANDARDS.md
UX_STANDARDS.md
SCRIPT_STANDARDS.md
DOCUMENTATION_STANDARDS.md
VERSIONING_STANDARDS.md
WORKFLOW_STANDARDS.md
```

The constitution is not enough by itself.

---

# Workflow Rule 3 — Check Live Website

Review:

```text
https://tools.allegedly-media.com/
```

Look at:

- Visible versions.
- Active tools.
- Navigation.
- Obvious UI changes.
- Whether Home appears aligned with GitHub.

---

# Workflow Rule 4 — Check GitHub Repository

Review:

```text
https://github.com/klager93-gif/tools-allegedly-media
```

Look at:

- Versions.
- Documentation.
- Manifests.
- Master files.
- Standards files.
- Tool folders.

---

# Workflow Rule 5 — Compare Sources

Daily startup is not complete until one of these outcomes is determined:

```text
Website == GitHub
Website != GitHub
Comparison failed
```

Invalid outcome:

```text
Comparison not performed
```

Comparison must be based on evidence, not assumptions.

---

# Workflow Rule 6 — Apply Source Authority

After comparison, determine the working source using:

```text
1. Standards files in GitHub
2. GitHub repository files
3. Recent user-provided ZIP standards not yet represented in GitHub
4. Current-chat uploaded files
5. Recent conversation context
6. AI memory
```

If confused, clarify.

Otherwise, GitHub wins.

---

# Workflow Rule 7 — Report Startup Status

At startup, report:

- Current versions.
- Working source.
- Verification status.
- Warnings.
- Active project.

Only begin planning or coding after this status is known.

---

# Workflow Rule 8 — Domain-Specific Verification

Before performing specific work, review the relevant standard again.

## Before script work

Review:

```text
SCRIPT_STANDARDS.md
```

Applies to:

- `script.js`
- `assets/global.js`
- calculations
- validation
- dynamic rows
- saved settings
- Copy Results
- Print Report behavior

## Before CSS or UI work

Review:

```text
UX_STANDARDS.md
```

Applies to:

- `style.css`
- `assets/global.css`
- spacing
- cards
- typography
- buttons
- pills
- layout
- mobile behavior

## Before documentation work

Review:

```text
DOCUMENTATION_STANDARDS.md
```

Applies to:

- README
- CHANGELOG
- ROADMAP
- HOWTO
- manifests
- master docs
- release notes

## Before versioning or packaging work

Review:

```text
VERSIONING_STANDARDS.md
```

Applies to:

- versions
- cache busting
- ZIPs
- release history
- backups
- source authority

Principle:

> Review broadly. Verify specifically.

---

# Workflow Rule 9 — Plan Before Build

Before building, identify:

- Active project.
- Files affected.
- Standards affected.
- Dependencies affected.
- Documentation affected.
- Version impact.
- Validation plan.

---

# Workflow Rule 10 — Build Complete Files

Normal development should produce complete replacement files or full affected release packages.

Avoid snippets unless the user explicitly asks for explanation only.

---

# Workflow Rule 11 — Validate Before Packaging

Before ZIP creation:

- Verify file completeness.
- Verify version consistency.
- Verify documentation updates.
- Verify source disclosure.
- Verify manifests.
- Verify no unexpected unrelated files.
- Verify domain-specific standards were followed.

Abort if validation fails.

---

# Workflow Rule 12 — Validate After Packaging

After ZIP creation:

- Open/list ZIP contents.
- Confirm expected files.
- Confirm folder structure.
- Confirm no unexpected files.
- Confirm package name.
- Confirm release notes.
- Confirm checksum manifest when included.

---

# Workflow Rule 13 — Release Response Order

Release responses should include:

1. Backup reminder.
2. Backup folder name.
3. Download ZIP link.
4. GitHub title.
5. GitHub summary.
6. Theme.
7. Version.
8. Source.

---

# Workflow Rule 14 — End-of-Work Check

Before stopping work, summarize:

- What changed.
- What files were created or updated.
- What remains planned.
- Whether release is planned, built, failed, or successful.
- Any GitHub upload notes.


---

# Workflow Rule 15 — Workflow Standards Before Any File Build

Before building, rebuilding, editing, replacing, packaging, or exporting any file, review:

```text
WORKFLOW_STANDARDS.md
```

This applies to:

- HTML files.
- CSS files.
- JavaScript files.
- Markdown files.
- Documentation packages.
- ZIP releases.
- Full affected release packages.
- Any user-downloadable artifact.

Purpose:

- Confirm the release response format.
- Confirm backup/source metadata requirements.
- Confirm validation requirements.
- Confirm GitHub title and summary must be provided in chat, not only inside files.
- Confirm correct standards files are reviewed before domain-specific work.

---

# Workflow Rule 16 — Release Response Format

Every release or downloadable build response must look like a release.

A release response must include, in chat:

1. Backup reminder.
2. Backup folder name.
3. Download ZIP or download file link.
4. GitHub title when the build is a release.
5. GitHub summary when the build is a release.
6. Source information.
7. Validation results.
8. Files added.
9. Files updated.
10. Build metadata.

GitHub release title and summary must be provided in the chat response.

Do not rely on a packaged file alone to provide the GitHub title or summary.

Principle:

> Every release should look like a release.

---

# Workflow Rule 17 — Checksum Manifest Validation

When a release package includes:

```text
SHA256SUMS.txt
```

validate that it is intentional and documented.

Required checks:

- `SHA256SUMS.txt` is listed in `FILEMANIFEST.md`.
- `SHA256SUMS.txt` is listed in `BUILDMANIFEST.md`.
- Release validation states that the checksum manifest is present.
- The checksum manifest is regenerated after final file changes.

Do not include checksum files silently.

---

# Workflow Rule 18 — Affected Page Version Sweep

Before packaging any release, perform a version sweep on every affected page and documentation file.

For each affected page, check:

```text
Top file comment/version note
Visible build label
Visible theme label
Footer version
Footer release identity
Linked CSS cache-busting value
Linked JS cache-busting value
```

For each affected documentation file, check:

```text
Current version
Release theme
Changelog entry
Roadmap status
Build metadata
Restore metadata
Manifest package list
```

If any affected page still shows the previous release version, validation fails.

---

# Workflow Rule 19 — Footer Change Discipline

Footers must be checked during release validation.

Footer version text must match the page or tool release when that page or tool changed.

Do not change footer wording, styling, links, or layout unless the release explicitly includes footer, navigation, layout, or branding work.

A version correction is allowed. Cosmetic footer churn is not.

---

# Core Workflow Principle

Start by syncing.

Work by standards.

Package only after validation.

End with a clear release state.


---
# Workflow Rule 15 — Shared Design System Releases

Before building a release that modifies shared layout, header, footer, nav, action bars, modals, or shared visual components:

1. Review `UX_STANDARDS.md`.
2. Review `SCRIPT_STANDARDS.md`.
3. Review `VERSIONING_STANDARDS.md`.
4. Identify which tools may be affected.
5. State whether tools are being migrated now or only prepared for future migration.
6. Validate that optional global components do not duplicate existing local components.

## Required Design System Validation

```text
Global navigation checked.
Global footer behavior checked.
Action bar pattern checked.
Modal/dialog pattern checked.
Mobile behavior checked.
Existing tool pages considered.
Cache-busting updated for changed shared assets.
```

Principle:

> Shared components should make future releases easier, not surprise existing tools.


## Public Page Review

Before releasing Home or any public tool page, verify that internal planning, demo, test, and architecture notes are not exposed as public content unless intentionally approved for users.


## Public Pages Rule — Added in Home v0.9.0

Public-facing long-form content should be served as real pages, not as markdown downloads or modal popups. This applies to changelog, roadmap, how-to, support, about, privacy, terms, and status content. Use modals only for short tool interactions such as confirmations, warnings, save/copy feedback, and focused dialogs.
