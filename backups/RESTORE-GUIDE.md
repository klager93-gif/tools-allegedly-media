# Signal Labs Backup Restore Guide

## Quick Restore

1. Find the latest known-good backup.
2. Upload the backup files to the matching live folders.
3. Confirm live page versions.
4. Test affected tools.
5. Record the restore in the backup log.

---

# Version Verification

After restoring, verify:

- Footer version.
- Build/status card version.
- Report version where applicable.
- README version.
- ROADMAP version.
- FILEMANIFEST version.
- BUILDMANIFEST version.
- CSS cache-busting reference.
- JS cache-busting reference.

---

# Restore Rule

If you are unsure whether only one file is bad, restore the full affected folder.

Full folder replacement is safer than guessing.
