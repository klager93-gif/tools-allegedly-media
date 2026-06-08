# Signal Labs Home

Signal Labs is the shared home for simple, useful calculators and planning tools.

---

# Current Version

**v0.6**

## Theme

Shared UX Foundation

---

# Current Tools

## Overtime Calculator

Estimate regular pay, overtime pay, before-tax pay, taxes, deductions, take-home pay, Pay Details, and Target Pay planning.

## Time Off Planner

Estimate future balances for vacation, sick time, personal time, comp time, holidays, planned events, caps, and policy warnings.

## Paycheck Calculator

Estimate gross pay, taxes, deductions, and take-home pay. Includes hidden disabled ad slots for future monetization support.

---

# Shared Assets

## assets/global.css

Provides shared Signal Labs styling, typography, buttons, cards, modals, footer styling, shared navigation styling, responsive foundations, and disabled ad slot behavior.

## assets/global.js

Provides shared navigation injection, active page highlighting, text modal support, changelog/roadmap modal loading, ad slot initialization, and UTC timestamp helpers.

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

# Release Standards

Every release response should include, in order:

1. Backup reminder.
2. Backup folder name.
3. Download ZIP link.
4. GitHub title.
5. GitHub summary.
6. Theme.
7. Version.

Backup folder names must use:

```text
YYYY-MM-DD-before-tool-version-theme
```

Example:

```text
2026-06-08-before-overtime-v0.9.9-pre-1.0-sync-metadata-cleanup
```

---

# Current Status

### Build

v0.6

### Theme

Shared UX Foundation

### Status

Active Development
