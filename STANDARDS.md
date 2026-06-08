# Signal Labs Development Standards v2.0

## Purpose

These standards define how Signal Labs tools are planned, built, validated, documented, packaged, and released.

This file is the authoritative project copy of the standards. Chat history or AI memory should never be the only place these rules exist.

---

# Rule 0 — Rules First

Before planning, coding, refactoring, documentation, packaging, ZIP creation, or releases, the current Signal Labs Development Standards must be reviewed mentally.

If a proposed action would violate a rule, it must either be prevented or explicitly brought to the user's attention.

Never knowingly proceed with a rule violation without discussing it first.

---

# Rule 1 — Protect Project Integrity

Project integrity takes precedence over convenience.

- No ZIP is better than a bad ZIP.
- Preserve working functionality whenever possible.
- Avoid silent breaking changes.
- Favor correctness over speed.

---

# Rule 2 — Think First

Think first.

Build second.

Package last.

If uncertain:

- Stop.
- Discuss.
- Never silently assume.

---

# Rule 3 — Consider the Entire Ecosystem

Never think about one file, folder, or tool in isolation.

Changes may affect Signal Labs Home, shared assets, Overtime, Time Off, Paycheck, and future tools.

Bring dependency concerns and side effects to the user's attention.

---

# Rule 4 — Ship Complete Files

Prefer whole files over snippets and whole folders over patches.

When files appear mixed, corrupted, or inconsistent, replace folders rather than patch individual files.

---

# Rule 5 — Fail Loudly

If validation fails:

- Report what failed.
- Report which file failed.
- Explain why it matters.
- Explain what must be corrected.

Never silently continue.

---

# Rule 6 — Maintain Documentation

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

### MASTER-CHANGELOG.md

Must be updated for every release without exception.

This applies regardless of where the change occurs: Home, shared assets, Overtime, Time Off, Paycheck, or future tools.

No release is complete until the master changelog is updated.

Purpose: high-level running history of the entire Signal Labs ecosystem.

If more detail is needed, refer to the tool's own CHANGELOG.md.

### MASTER-ROADMAP.md

Must be updated whenever versions, themes, plans, tools, or priorities change.

Purpose: authoritative ecosystem future.

### RELEASE-HISTORY.md

Must be updated whenever a release occurs.

Purpose: chronological release order.

Failure to update master documentation is a rule violation.

No release is complete until tool documentation, master documentation, and release history are updated.

| File | Purpose |
|---|---|
| CHANGELOG.md | Detailed tool history |
| ROADMAP.md | Tool future |
| MASTER-CHANGELOG.md | Running ecosystem history |
| MASTER-ROADMAP.md | Ecosystem future |
| RELEASE-HISTORY.md | Chronological release order |

---

# Rule 7 — Version Every Release

Every release should include:

- Version number.
- Theme name.
- GitHub title.
- GitHub description.
- Matching cache-busting references.

Version numbers should reflect the amount of change, not artificial synchronization.

---

# Rule 8 — Validate Before and After Packaging

Before packaging:

- Verify required files exist.
- Verify versions match.
- Verify documentation is current.
- Verify identity checks pass.
- Verify dependencies have been reviewed.

After packaging:

- Verify ZIP contents.
- Verify folder structure.
- Verify expected files.
- Verify no unexpected files exist.

Abort packaging if validation fails.

Malformed version strings should be corrected before release.

---

# Rule 9 — Preserve Identity

Files should clearly identify area/tool name, file name, version, and purpose.

Identity should be easy to verify before packaging.

Prevent cross-contamination between tools.

---

# Rule 10 — Backup and Restore

Before uploading any release:

1. Create a backup.
2. Upload the release.
3. Verify the live site.
4. Restore from backup if problems are discovered.

Use backup names such as:

```text
YYYY-MM-DD-before-tool-version-theme
```

Storage is cheap.

Lost work is expensive.

Recovery should never depend on chat history or memory.

---

# Rule 11 — Release Metadata Order

Release responses should always present information in this order:

1. Backup reminder.
2. Backup folder name.
3. Download link.
4. GitHub title.
5. GitHub description.

This order should not vary.

---

# Rule 12 — Preserve Shared Systems

Systems intended to span multiple tools should remain consistent.

Examples include navigation, themes, settings, ad framework, shared assets, and modal behavior.

Changes to shared systems should be reviewed against the entire ecosystem.

---

# Rule 13 — Remove Carefully

Before deleting files, features, or systems:

- Verify nothing depends on them.
- Verify no references remain.
- Discuss uncertain cases.

Removing dead code is good. Removing live code accidentally is not.

---

# Rule 14 — Build Foundations

Favor scalable solutions over throwaway solutions.

Consider future tools, shared code, mobile apps, themes, branding, and long-term maintenance.

Build foundations, not temporary fixes.

---

# Rule 15 — Use Common Sense

The standards exist to protect the project, not replace judgment.

If something feels wrong, rushed, incomplete, or inconsistent, stop and discuss it.

Common sense should always prevail over blindly following a checklist.

---

# Core Philosophy

Protect Project Integrity.

Think First.

Consider the Entire Ecosystem.

Ship Complete Files.

Fail Loudly.

Storage is cheap.

Lost work is expensive.

Think first.

Build second.

Package last.
