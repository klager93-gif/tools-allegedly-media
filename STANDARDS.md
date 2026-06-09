# Signal Labs Development Standards v2.0

## Purpose

These standards define how Signal Labs tools are planned, built, validated, documented, packaged, and released.

This file is the authoritative project copy of the standards. Chat history or AI memory should never be the only place these rules exist.

---

# Rule 0 — Rules First

Before planning, coding, refactoring, documentation, packaging, ZIP creation, or releasing, the current Signal Labs Development Standards must be reviewed mentally.

If a proposed action would violate a rule, it must either be prevented or explicitly brought to the user's attention.

Never knowingly proceed with a rule violation without discussing it first.

---

# Rule 1 — Version Every Release

Every release should include:

- Version number.
- Theme name.
- GitHub title.
- GitHub description.
- Matching cache-busting references when changed assets are involved.

Version numbers should reflect the amount of change, not artificial synchronization.

---

# Rule 2 — Ship Complete Files

Prefer complete files over snippets.

Prefer whole-folder replacement over patching when files appear mixed, corrupted, or inconsistent.

## Hotfix Exception

Hotfixes may replace only the affected file or files when the change is narrowly scoped and urgent.

However, every hotfix still requires, at minimum:

- Tool CHANGELOG.md update.
- MASTER-CHANGELOG.md update.
- RELEASE-HISTORY.md update.
- GitHub title.
- GitHub description.
- Backup folder name.
- Source disclosure.

If a hotfix changes visible version labels, cache-busting references, manifests, roadmap direction, or current version status, then affected documentation and manifest files must also be updated.

Feature releases and normal bug releases should still replace the full affected folder or release package.

---

# Rule 3 — Consider the Entire Ecosystem

Never think about one file, folder, or tool in isolation.

Changes may affect:

- Signal Labs Home.
- Shared assets.
- Paycheck.
- Overtime.
- Time Off.
- Future tools.

Bring dependency concerns and side effects to the user's attention.

Think beyond the immediate task.

---

# Rule 4 — Maintain Required Documentation

Every tool should eventually maintain:

- README.md
- ROADMAP.md
- CHANGELOG.md
- HOWTO.md
- FILEMANIFEST.md
- BUILDMANIFEST.md

Signal Labs Home additionally maintains:

- STANDARDS.md
- MASTER-CHANGELOG.md
- MASTER-ROADMAP.md
- RELEASE-HISTORY.md
- RESTORE.md

Documentation evolves alongside code.

## Master Documentation Requirements

MASTER-CHANGELOG.md must be updated for every release without exception.

This applies regardless of where the change occurs:

- Home.
- Shared assets.
- Paycheck.
- Overtime.
- Time Off.
- Future tools.

MASTER-ROADMAP.md must be updated whenever versions, themes, plans, new tools, or priorities change.

RELEASE-HISTORY.md must be updated whenever a release occurs.

No release is complete until tool documentation, master documentation, and release history are updated as required.

## File Responsibilities

| File | Purpose |
|---|---|
| CHANGELOG.md | Detailed tool history |
| ROADMAP.md | Tool future |
| MASTER-CHANGELOG.md | Running ecosystem history |
| MASTER-ROADMAP.md | Ecosystem future |
| RELEASE-HISTORY.md | Chronological release order |

---

# Rule 5 — Protect Project Integrity

Project integrity takes precedence over convenience.

- No ZIP is better than a bad ZIP.
- Preserve working functionality whenever possible.
- Avoid silent breaking changes.
- Favor correctness over speed.

---

# Rule 6 — Verify File Identity

Files should clearly identify:

- Area or tool name.
- File name.
- Version.
- Purpose.

Identity should be easy to verify before packaging.

Prevent cross-contamination between tools.

---

# Rule 7 — Source of Truth Disclosure

When planning, building, validating, or packaging a release, the source used for the work must be disclosed.

Every release response should include:

```text
Source:
```

followed by the actual source used, such as:

- GitHub repository.
- Uploaded files.
- Previous release ZIP.
- Mixed sources.

Never silently switch sources.

If the source changes during development, disclose the change, explain why, and identify the new source.

AI memory may assist planning and continuity, but it is never an authoritative project source.

---

# Rule 8 — Source Preference

Use the newest authoritative source available.

Priority:

```text
1. Uploaded files
2. GitHub repository (normally authoritative)
3. Recent release ZIPs containing uncommitted work
4. Older release ZIPs
5. Conversation snippets
6. AI memory
```

Normal workflow:

```text
GitHub
↓
Build
↓
Deploy
↓
GitHub
↓
Build
```

GitHub should normally be preferred because it is the deployment source for the live website.

ZIPs are temporary exceptions only when they contain work newer than GitHub, are needed for recovery, or are needed to reproduce a prior release.

---

# Rule 9 — Daily Startup Procedure

This procedure is mandatory at the first work session of every day.

Never assume memory is current.

Never assume sources match.

## Step 1 — Check Live Website

Review:

```text
https://tools.allegedly-media.com/
```

Look at visible versions, active tools, navigation, and obvious UI changes.

## Step 2 — Check GitHub Repository

Review:

```text
https://github.com/klager93-gif/tools-allegedly-media
```

Look at versions, documentation, manifests, and master files.

## Step 3 — Compare Sources

This step is mandatory.

The Daily Startup Procedure is not complete until one of the following outcomes has been determined:

```text
Website == GitHub
```

```text
Website ≠ GitHub
```

```text
Comparison failed
```

Comparison must be based on evidence, not assumptions.

The invalid outcome is:

```text
Comparison not performed
```

unless the comparison itself failed.

Looking at the website and repository without comparing them does not satisfy Rule 9.

## Step 4 — Apply Rule 8

Determine the working source of truth using the Source Preference rule.

## Step 5 — Report

Provide:

- Current versions.
- Source.
- Verification status.
- Warnings.

## Step 6 — Begin Planning

Only begin planning or coding after Steps 1 through 5 are complete.

Assumptions are not verification.

---

# Rule 10 — Preserve Shared Systems

Systems intended to span multiple tools should remain consistent.

Examples include:

- Reports.
- Action bars.
- Pills.
- Empty states.
- Modals.
- Copy Results format.
- Report headers.
- Shared section numbering.
- Hidden ad framework.

When a feature pattern is reused across multiple tools, changes to that pattern should be reviewed for every tool that uses it.

Tools do not need to be identical, but common patterns should remain visually and behaviorally consistent unless there is a clear reason to diverge.

Improvements made to one tool should be evaluated for other tools that use the same pattern.

---

# Rule 11 — Review Shared Dependencies

Changes to shared dependencies require reviewing dependent tools.

Examples:

- assets/global.css
- assets/global.js

Review effects on:

- Signal Labs Home.
- Paycheck.
- Overtime.
- Time Off.
- Future tools.

---

# Rule 12 — Validate Before Packaging

Before packaging, verify:

- Required files exist.
- Versions match.
- Documentation is current.
- Identity checks pass.
- Source has been disclosed.
- Dependencies have been reviewed.
- Shared systems have been considered.

Abort packaging if validation fails.

Malformed version strings should be corrected before release.

---

# Rule 13 — Validate After Packaging

After packaging, verify:

- ZIP contents.
- Folder structure.
- Expected files.
- No unexpected files.
- Documentation completeness.

Only then should the ZIP be released.

---

# Rule 14 — Fail Loudly

If validation fails, report:

- What failed.
- Which file failed.
- Why it matters.
- What needs to be corrected.

Never silently continue.

---

# Rule 15 — Trust Successful Releases

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

Never assume a failed package became the new baseline.

---

# Rule 16 — Successful Releases Become History

Only successful releases should update historical release records.

Successful releases may update:

- CHANGELOG.md.
- MASTER-CHANGELOG.md.
- RELEASE-HISTORY.md.

Failed releases should not appear as completed release history.

---

# Core Philosophy

Protect Project Integrity.

Think first.

Build second.

Package last.

Consider the entire ecosystem.

Ship complete files.

Fail loudly.

Storage is cheap.

Lost work is expensive.
