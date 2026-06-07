# Signal Labs Root Site

# HOWTO

---

## Purpose

This file explains how to use and maintain the Signal Labs root site.

---

# How to Use the Root Site

Open the root `index.html` page to access the main Signal Labs tool directory.

The root page currently links to:

- Overtime Calculator.
- Time Off Calculator.

Use the navigation bar to move between the home page and available tools.

---

# How Navigation Works

Shared navigation is handled by:

```text
assets/global.js
```

The script automatically injects navigation into each page that loads it.

It detects the current page path and highlights:

- Home
- Overtime
- Time Off

---

# How Styling Works

Shared styling is handled by:

```text
assets/global.css
```

This file controls:

- Base theme.
- Typography.
- Cards.
- Buttons.
- Modals.
- Footer styles.
- Shared navigation.

Tool-specific styles should stay inside each tool folder:

```text
/overtime/style.css
/timeoff/style.css
```

---

# How Documentation Works

The root site should maintain:

- README.md
- ROADMAP.md
- CHANGELOG.md
- HOWTO.md

Each tool should eventually maintain the same set of files.

---

# How to Add a New Tool

1. Create a new folder for the tool.
2. Add the tool files.
3. Link `../assets/global.css`.
4. Link `../assets/global.js`.
5. Add the tool link to `assets/global.js`.
6. Add the tool card to root `index.html`.
7. Update README.md.
8. Update ROADMAP.md.
9. Update CHANGELOG.md.
10. Add or update HOWTO.md.

---

# Maintenance Rules

- Keep version labels current.
- Update cache-busting query strings when shared assets change.
- Do not break existing calculator pages when changing shared assets.
- If global assets change, review every tool that loads them.
- Keep folder structure predictable.
- Prefer complete file replacements over snippets.

---

# How to Use Ad Slots

Root v0.2.2 supports future ad placements without enabling live ads.

## Disabled Slot

Use this for reserved future placement. It will not display.

```html
<div
  class="ad-slot ad-slot-top is-disabled"
  data-ad-slot="tool-top"
  data-ad-status="disabled"
  aria-hidden="true">
  <span class="ad-placeholder">Ad slot reserved</span>
</div>
```

## Placeholder Slot

Use this only for layout testing. It displays a non-live placeholder.

```html
<div
  class="ad-slot ad-slot-inline is-placeholder"
  data-ad-slot="tool-inline"
  data-ad-status="placeholder">
  <span class="ad-placeholder">Ad slot reserved</span>
</div>
```

## Rules

- Do not add live ad provider scripts yet.
- Do not add AdSense code until the site is ready.
- Keep ad styling in `assets/global.css`.
- Keep ad initialization in `assets/global.js`.
- Add actual slot placement inside individual tools only after the global framework is installed.



---

# Disabled Ad Slot Behavior

Disabled ad slots should not display visible text, borders, spacing, or reserved height.

Use:

```html
data-ad-status="disabled"
```

for any slot that should exist in code but stay hidden from users.

Use:

```html
data-ad-status="placeholder"
```

only when intentionally testing layout.


---

# Development Standards

Before planning, coding, packaging, or releasing, review:

```text
/STANDARDS.md
```

The standards define required documentation, versioning, file identity, validation, and ZIP safety rules.


---

# Build Manifests

The root project now includes:

```text
FILEMANIFEST.md
BUILDMANIFEST.md
```

Use these files to confirm expected files, folder structure, identity strings, and build checks before packaging.


---

# Version String Sanity

Before packaging a release, check for malformed version strings.

Reject examples:

```text
version 0.2.2.2.2
version 0.8.3.1.1
version 0.6.2.1.1
```

If found, stop and fix the file before creating a ZIP.


---

# v0.2.4 Modal UX Polish

Shared text modals can be closed by:

- Clicking the X button.
- Pressing Escape.
- Clicking outside the modal box.

Clicking inside the modal box does not close the modal.


---

# Versioning Guidance

Version numbers should reflect the amount of change, not artificial synchronization.

Do not force tools to share the same version number unless the release scope justifies it.


---

# v0.2.6 Backup & Recovery System

Before uploading any new release:

1. Back up the current live files.
2. Upload the release.
3. Test the live site.
4. Restore from backup if needed.

See:

```text
RESTORE.md
backups/README.md
backups/BACKUP-LOG.md
backups/RESTORE-GUIDE.md
```


---

# v0.2.7 Release Management System

Use the master release files to understand the full project history:

```text
MASTER-CHANGELOG.md
MASTER-ROADMAP.md
RELEASE-HISTORY.md
```

These files track changes across Root, Overtime, Time Off, and future tools.
