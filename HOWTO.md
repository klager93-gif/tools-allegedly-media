# Signal Labs Home

# HOWTO

---

## Purpose

This file explains how to use and maintain the Signal Labs Home site.

---

# How to Use the Signal Labs Home

Open the root `index.html` page to access the main Signal Labs tool directory.

The root page currently links to:

- Overtime Calculator.
- Time Off
- Paycheck Planner.

Use the navigation bar to move between Home and available tools.

---

# Documentation Requirements

Every tool must maintain:

```text
README.md
ROADMAP.md
CHANGELOG.md
HOWTO.md
FILEMANIFEST.md
BUILDMANIFEST.md
```

The Home folder also maintains:

```text
STANDARDS.md
MASTER-CHANGELOG.md
MASTER-ROADMAP.md
RELEASE-HISTORY.md
RESTORE.md
INSTALL.md
```

---

# Restore Verification

After restoring from backup, verify:

- Footer version.
- Build/status card version.
- Report version when the tool has reports.
- README version.
- ROADMAP version.
- FILEMANIFEST version.
- BUILDMANIFEST version.
- CSS cache-busting reference.
- JS cache-busting reference.

---

# Backup Naming

Backup titles must use:

```text
YYYY-MM-DD-before-tool-version-theme
```

Example:

```text
2026-06-08-before-overtime-v0.9.9-pre-1.0-sync-metadata-cleanup
```

---

# Release Response Order

Every release response must include, in order:

1. Backup reminder.
2. Backup folder name.
3. Download ZIP link.
4. GitHub title.
5. GitHub summary.
6. Theme.
7. Version.

---

# Navigation

Shared navigation is handled by:

```text
assets/global.js
```

Future Home v0.6 work will refresh the navigation with desktop pill styling and mobile hamburger/collapsible behavior.

---

# Styling

Shared styling is handled by:

```text
assets/global.css
```

Tool-specific styles stay inside each tool folder.

---

# Development Standards

Before planning, coding, packaging, or releasing, review:

```text
/STANDARDS.md
```


---

# Home v0.6 Shared Report System

Home v0.6 adds Paycheck Calculator to the ecosystem and updates shared navigation. Desktop navigation uses pill-style links. Mobile navigation uses a Menu button that expands or collapses tool links.
