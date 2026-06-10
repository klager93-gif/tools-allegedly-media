# Signal Labs Home File Manifest

## Current Version

v0.7.0

## Theme

Standards Architecture

---

# Required Home Files

```text
index.html
README.md
ROADMAP.md
CHANGELOG.md
HOWTO.md
STANDARDS.md
UX_STANDARDS.md
SCRIPT_STANDARDS.md
DOCUMENTATION_STANDARDS.md
VERSIONING_STANDARDS.md
WORKFLOW_STANDARDS.md
MASTER-CHANGELOG.md
MASTER-ROADMAP.md
RELEASE-HISTORY.md
RESTORE.md
FILEMANIFEST.md
BUILDMANIFEST.md
INSTALL.md
site.webmanifest
SHA256SUMS.txt
```

---

# Required Folders

```text
assets/
backups/
overtime/
timeoff/
paycheck/
```

---

# Standards Architecture Files

```text
STANDARDS.md
UX_STANDARDS.md
SCRIPT_STANDARDS.md
DOCUMENTATION_STANDARDS.md
VERSIONING_STANDARDS.md
WORKFLOW_STANDARDS.md
```

---

# Home v0.7.0 Release Package Files

This release package includes documentation and standards files only.

```text
STANDARDS.md
UX_STANDARDS.md
SCRIPT_STANDARDS.md
DOCUMENTATION_STANDARDS.md
VERSIONING_STANDARDS.md
WORKFLOW_STANDARDS.md
README.md
ROADMAP.md
CHANGELOG.md
HOWTO.md
FILEMANIFEST.md
BUILDMANIFEST.md
RESTORE.md
INSTALL.md
MASTER-CHANGELOG.md
MASTER-ROADMAP.md
RELEASE-HISTORY.md
```

---

# Notes

- No calculator logic files are included.
- No shared asset files are included.
- The legacy root `style.css` file is not required and should not be included.
- Shared assets remain on their current asset version because `global.css` and `global.js` are unchanged.
- `BACKUP.md` records backup status, source, and previous-version protection.

- `SHA256SUMS.txt` is included intentionally as release metadata for file integrity verification.
- `SHA256SUMS.txt` should be regenerated after final file changes and before ZIP packaging.
