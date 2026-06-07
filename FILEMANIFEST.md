# Signal Labs Signal Labs Home

# FILEMANIFEST

## Current Version

v0.4

## Theme

Release Standards Update

---

# Required Root Files

```text
index.html
README.md
ROADMAP.md
CHANGELOG.md
HOWTO.md
STANDARDS.md
FILEMANIFEST.md
BUILDMANIFEST.md
```

---

# Required Asset Files

```text
assets/global.css
assets/global.js
```

---

# Identity Checks

## Root Must Contain

```text
Signal Labs
Signal Labs Home
assets/global.css
assets/global.js
```

## Shared Assets Must Contain

```text
Shared Asset
Version: v0.4
```

---

# Version String Sanity

Reject malformed versions such as:

```text
version 0.2.2.2.2
version 0.8.3.1.1
version 0.6.2.1.1
```

---

# Notes

This manifest exists to prevent missing files, wrong-folder uploads, and cross-contaminated release packages.


---

# Required Backup & Restore Files

```text
RESTORE.md
backups/README.md
backups/BACKUP-LOG.md
backups/RESTORE-GUIDE.md
```


---

# Required Release Management Files

```text
MASTER-CHANGELOG.md
MASTER-ROADMAP.md
RELEASE-HISTORY.md
```


---

# Release Metadata Files/Checks

Release metadata should be tracked in:

```text
MASTER-CHANGELOG.md
RELEASE-HISTORY.md
STANDARDS.md
```

Every release response should include backup folder name, download ZIP, GitHub title, and GitHub description.
