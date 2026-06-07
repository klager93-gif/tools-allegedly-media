# Signal Labs Restore Guide

## Purpose

Use this guide when a release breaks the live site or a tool folder gets mixed, overwritten, or corrupted.

---

# Emergency Restore Steps

1. Stop uploading new files.
2. Locate the most recent known-good backup.
3. Restore the affected folder or folders.
4. Confirm cache-busting versions in the restored files.
5. Test the live site.
6. If browser cache is involved, hard refresh or clear cache.
7. Record what happened in the backup log.

---

# Standard Restore Locations

```text
root/*      -> site root
overtime/*  -> /overtime/
timeoff/*   -> /timeoff/
```

---

# What To Verify After Restore

## Root

- Root page loads.
- Navigation works.
- Changelog modal works.
- Roadmap modal works.
- Footer version is correct.

## Overtime

- Page says Overtime Calculator.
- Calculator inputs work.
- Copy Results works.
- Print Report works.
- Footer version is correct.

## Time Off

- Page says Time Off Calculator.
- Category selection works.
- Planning Mode works.
- Copy Results works.
- Print Report works.
- Footer version is correct.

---

# Important

If a live folder appears cross-contaminated, do not patch one file.

Replace the full affected folder from backup.
