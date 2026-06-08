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
root/*      -> site root
overtime/*  -> /overtime/
timeoff/*   -> /timeoff/
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
- CSS cache-busting reference.
- JS cache-busting reference.

---

# Tool Checks

## Home

- Home page loads.
- Navigation works.
- Changelog modal works.
- Roadmap modal works.
- Footer version is correct.

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

If a live folder appears cross-contaminated, do not patch one file. Replace the full affected folder from backup.
