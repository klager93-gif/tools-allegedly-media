# Signal Labs Home HOWTO

## Purpose

This file explains how to use and maintain the Signal Labs Home site.

---

# How to Use Signal Labs Home

Open the Home `index.html` page to access the main Signal Labs tool directory.

The Home page currently links to:

- Paycheck Calculator.
- Overtime Calculator.
- Time Off Planner.

Use the navigation bar to move between Home and available tools.

---

# Standards Workflow

Before starting a development session, review all standards files:

```text
STANDARDS.md
UX_STANDARDS.md
SCRIPT_STANDARDS.md
DOCUMENTATION_STANDARDS.md
VERSIONING_STANDARDS.md
WORKFLOW_STANDARDS.md
```

Before task-specific work:

- Review `SCRIPT_STANDARDS.md` before script work.
- Review `UX_STANDARDS.md` before CSS, layout, or UI work.
- Review `DOCUMENTATION_STANDARDS.md` before documentation work.
- Review `VERSIONING_STANDARDS.md` before versioning, cache-busting, release, or packaging work.
- Review `WORKFLOW_STANDARDS.md` before daily startup, packaging, and end-of-work summaries.

Principle:

```text
Review broadly. Verify specifically.
```

---

# Documentation Requirements

Every tool should maintain:

```text
README.md
ROADMAP.md
CHANGELOG.md
HOWTO.md
FILEMANIFEST.md
BUILDMANIFEST.md
```

Home also maintains:

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

---

# Daily Startup

Follow `WORKFLOW_STANDARDS.md`.

Required outcome:

```text
Website == GitHub
Website != GitHub
Comparison failed
```

Invalid outcome:

```text
Comparison not performed
```

---

# Navigation

Shared navigation is handled by:

```text
assets/global.js
```

Before changing navigation behavior, review:

```text
SCRIPT_STANDARDS.md
UX_STANDARDS.md
```

---

# Styling

Shared styling is handled by:

```text
assets/global.css
```

Tool-specific styles stay inside each tool folder.

Before changing shared styling, review:

```text
UX_STANDARDS.md
SCRIPT_STANDARDS.md
```

---

# Restore Verification

After restoring from backup, verify:

- Home page loads.
- Navigation works.
- Footer/build version is correct.
- README version is correct.
- ROADMAP version is correct.
- FILEMANIFEST version is correct.
- BUILDMANIFEST version is correct.
- CSS cache-busting reference is correct when applicable.
- JS cache-busting reference is correct when applicable.

---

# Backup Naming

Backup titles must use:

```text
YYYY-MM-DD-before-tool-version-theme
```

Example:

```text
2026-06-10-before-home-v0.7.1-standards-architecture
```

---

# Release Response Order

Every release response should include:

1. Backup reminder.
2. Backup folder name.
3. Download ZIP link.
4. GitHub title.
5. GitHub summary.
6. Theme.
7. Version.
8. Source.


---

# Version Synchronization Check

Before uploading a Home release, confirm affected pages, footers, visible build labels, theme labels, documentation, manifests, and restore metadata all reflect the release version. Do not change footer wording or layout unless the release explicitly includes footer, layout, navigation, or branding work.
