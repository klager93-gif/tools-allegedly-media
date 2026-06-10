# Signal Labs Home

Signal Labs is the shared home for simple, useful calculators and planning tools.

---

# Current Version

**v0.7.1**

## Theme

Version Synchronization

---

# Current Tools

## Paycheck Calculator

Estimate paid hours, premium hours, benefit hours, deductions, adjustments, take-home pay, target pay, other earnings, and specialty pay.

## Overtime Calculator

Estimate regular pay, overtime pay, before-tax pay, deductions, take-home pay, target pay, other earnings, and specialty pay.

Status: feature-frozen while Paycheck is the active flagship tool.

## Time Off Planner

Plan vacation, sick time, personal time, comp time, holidays, planned time off, caps, and policy warnings.

---

# Shared Assets

## assets/global.css

Provides shared Signal Labs styling, navigation, action bar support, empty states, report styles, cards, buttons, modals, and responsive foundations.

## assets/global.js

Provides shared navigation, mobile menu behavior, modal utilities, action bar support, and shared helper behavior.

---

# Development Standards

Signal Labs uses a standards architecture.

The master constitution is:

```text
/STANDARDS.md
```

Supporting standards:

```text
/UX_STANDARDS.md
/SCRIPT_STANDARDS.md
/DOCUMENTATION_STANDARDS.md
/VERSIONING_STANDARDS.md
/WORKFLOW_STANDARDS.md
```

Daily startup must review all standards files.

Task-specific work must also review the relevant domain standard.

Before building any files, `WORKFLOW_STANDARDS.md` must be reviewed as the final workflow quality gate.

Principle:

```text
Review broadly. Verify specifically.
```

---

# Required Master Documents

Signal Labs Home maintains:

```text
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
INSTALL.md
```

Every successful release must update master documentation and release history as required by the standards.

---

# Folder Structure

```text
/
  index.html
  README.md
  CHANGELOG.md
  ROADMAP.md
  HOWTO.md
  STANDARDS.md
  UX_STANDARDS.md
  SCRIPT_STANDARDS.md
  DOCUMENTATION_STANDARDS.md
  VERSIONING_STANDARDS.md
  WORKFLOW_STANDARDS.md
  FILEMANIFEST.md
  BUILDMANIFEST.md
  INSTALL.md
  RESTORE.md
  MASTER-CHANGELOG.md
  MASTER-ROADMAP.md
  RELEASE-HISTORY.md
  site.webmanifest

/assets/
  global.css
  global.js

/backups/
  README.md
  BACKUP-LOG.md
  RESTORE-GUIDE.md

/overtime/
  index.html
  style.css
  script.js
  README.md
  CHANGELOG.md
  ROADMAP.md
  HOWTO.md
  FILEMANIFEST.md
  BUILDMANIFEST.md

/timeoff/
  index.html
  style.css
  script.js
  README.md
  CHANGELOG.md
  ROADMAP.md
  HOWTO.md
  FILEMANIFEST.md
  BUILDMANIFEST.md

/paycheck/
  index.html
  style.css
  script.js
  README.md
  CHANGELOG.md
  ROADMAP.md
  HOWTO.md
  FILEMANIFEST.md
  BUILDMANIFEST.md
```

---

# Development Philosophy

Signal Labs tools are intended to be useful, fast, mobile-friendly, easy to understand, lightweight, and free from unnecessary complexity.

> Useful tools without the noise.

---

# Current Status

### Build

v0.7.1

### Theme

Version Synchronization

### Status

Active Development


---

# Release Metadata

- Current Release: Home v0.7.1 — Version Synchronization
- Previous Release: Home v0.7.0 — Standards Architecture
- Source Repository: https://github.com/klager93-gif/tools-allegedly-media
- Backup Status: External backup completed by user before build; exact backup filename was not provided in chat.
- GitHub Release Text: Provided in chat with release package delivery; not stored as a package file.
- Build Manifest: `BUILDMANIFEST.md`
- File Manifest: `FILEMANIFEST.md`

---

## Release Integrity

Home v0.7.1 includes `SHA256SUMS.txt` as an intentional checksum manifest for release integrity verification.


---

## Version Synchronization

Home releases must verify affected page version labels, footer version text, theme labels, documentation references, manifests, and cache-busting decisions before packaging. Footer version text should be corrected when a page version changes, but footer wording and layout should not be changed for churn.
