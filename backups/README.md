# Signal Labs Backups

## Purpose

This folder documents the recommended backup system for Signal Labs releases.

Actual backup copies may be stored outside the public site, such as on your computer or in a private cloud folder.

---

# Recommended Backup Structure

```text
Signal-Labs-Backups/
  2026-06-07-before-overtime-v0.9.1-timeoff-v0.9.1/
    root/
    overtime/
    timeoff/
    BACKUP-INFO.md
```

---

# Backup Before Uploading

Before uploading any new release ZIP:

1. Copy the current live root files.
2. Copy the current live `/overtime/` folder.
3. Copy the current live `/timeoff/` folder.
4. Save them in a dated backup folder.
5. Upload the new release.
6. Test the live site.

---

# What Not To Do

Do not keep backup copies inside public tool folders like:

```text
/overtime/backup-old/
```

That can become messy and may expose old files publicly.
