# Signal Labs Backups

## Purpose

This folder documents the recommended backup system for Signal Labs releases.

Actual backup copies may be stored outside the public site, such as on your computer or in a private cloud folder.

---

# Required Backup Format

```text
YYYY-MM-DD-before-tool-version-theme
```

Example:

```text
2026-06-08-before-signal-labs-combined-home-v0.5-overtime-v0.9.9-timeoff-v0.9.9-standards-sync-cleanup
```

---

# Recommended Backup Structure

```text
Signal-Labs-Backups/
  2026-06-08-before-signal-labs-combined-home-v0.5-overtime-v0.9.9-timeoff-v0.9.9-standards-sync-cleanup/
    root/
    assets/
    backups/
    overtime/
    timeoff/
    BACKUP-INFO.md
```

---

# What Not To Do

Do not keep backup copies inside public tool folders like:

```text
/overtime/backup-old/
```
