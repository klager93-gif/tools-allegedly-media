# Signal Labs Backup Restore Guide

## Quick Restore

1. Find the latest known-good backup.
2. Upload the backup files to the matching live folders.
3. Confirm the live page versions.
4. Test affected tools.
5. Record the restore in the backup log.

---

# Restore Root

Upload backup root files to the site root.

Expected files include:

```text
index.html
README.md
ROADMAP.md
CHANGELOG.md
HOWTO.md
STANDARDS.md
FILEMANIFEST.md
BUILDMANIFEST.md
RESTORE.md
assets/global.css
assets/global.js
```

---

# Restore Overtime

Upload backup Overtime files to:

```text
/overtime/
```

Expected files include:

```text
index.html
style.css
script.js
README.md
ROADMAP.md
CHANGELOG.md
HOWTO.md
FILEMANIFEST.md
BUILDMANIFEST.md
```

---

# Restore Time Off

Upload backup Time Off files to:

```text
/timeoff/
```

Expected files include:

```text
index.html
style.css
script.js
README.md
ROADMAP.md
CHANGELOG.md
HOWTO.md
FILEMANIFEST.md
BUILDMANIFEST.md
```

---

# Restore Rule

If you are unsure whether only one file is bad, restore the full affected folder.

Full folder replacement is safer than guessing.
