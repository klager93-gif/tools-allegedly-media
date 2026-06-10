# Signal Labs Restore Guide

## Purpose

Use this guide when a release breaks the live site or a tool folder gets mixed, overwritten, or corrupted.

---

# Emergency Restore Steps

1. Stop uploading new files.
2. Locate the most recent known-good backup.
3. Restore the full affected folder or folders.
4. Confirm cache-busting versions in restored files.
5. Test the live site.
6. Hard refresh or clear cache if needed.
7. Record what happened in the backup log.

---

# Standard Restore Locations

```text
root/* -> site root
overtime/* -> /overtime/
timeoff/* -> /timeoff/
paycheck/* -> /paycheck/
assets/* -> /assets/
```

---

# Version Verification After Restore

Verify:

- Footer version.
- Build/status card version.
- Report version when applicable.
- README version.
- ROADMAP version.
- FILEMANIFEST version.
- BUILDMANIFEST version.
- CSS cache-busting reference when applicable.
- JS cache-busting reference when applicable.

---

# Standards Architecture Restore Check

After restoring Home v0.7.0 or later, verify these standards files exist:

```text
STANDARDS.md
UX_STANDARDS.md
SCRIPT_STANDARDS.md
DOCUMENTATION_STANDARDS.md
VERSIONING_STANDARDS.md
WORKFLOW_STANDARDS.md
```

If one is missing, the standards architecture restore is incomplete.

---

# Tool Checks

## Home

- Home page loads.
- Navigation works.
- Changelog modal works if applicable.
- Roadmap modal works if applicable.
- Footer version is correct.
- Standards files are present.

## Paycheck

- Page says Paycheck Calculator.
- Calculator inputs work.
- Copy Results works.
- Print Report works.
- Footer/report versions are correct.

## Overtime

- Page says Overtime Calculator.
- Calculator inputs work.
- Copy Results works.
- Print Report works.
- Footer/report versions are correct.

## Time Off

- Page says Time Off Planner.
- Category pills work.
- Planned Time Off works.
- Copy Results works.
- Print Report works.
- Footer/report versions are correct.

---

# Important

Storage is cheap. Lost work is expensive.

If a live folder appears cross-contaminated, do not patch one file.

Replace the full affected folder from backup.

---

# Home v0.7.0 Release Metadata

## Source Repository

https://github.com/klager93-gif/tools-allegedly-media

## Previous Version

Home v0.6.2 — Standards v2.0

## Backup Status

External backup completed by user before build; exact backup filename was not provided in chat.

## Package

`home-v0.7.0-standards-architecture.zip`

## GitHub Release Text

Use the GitHub title and summary provided in the chat response that delivered this ZIP.

