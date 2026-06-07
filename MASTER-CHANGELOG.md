# Signal Labs Master Changelog

## Purpose

This file tracks major changes across the entire Signal Labs ecosystem.

Individual tools still maintain their own CHANGELOG.md files. This master changelog gives the big-picture history and the actual chronological release order.

---

## 2026-06-07

### Home v0.4.1 — Master Documentation

- Backfilled MASTER-CHANGELOG.md through Time Off v0.9.6.2.
- Updated MASTER-ROADMAP.md current versions and near-term plans.
- Added Rule 23 — Master Documentation.
- Added MASTER-CHANGELOG.md and MASTER-ROADMAP.md to required build validation.
- Added release checklist requirements for master documentation updates.

---

### Time Off v0.9.6.2 — Category Pill Visibility Fix

- Fixed Categories showing both the old checkbox cards and the new pill selector.
- Hid the legacy checkbox/card source while preserving it for calculation compatibility.
- Left only the category pill UI visible.
- Preserved labels such as Comp Time and Floating Holiday.
- Preserved custom category pills, saved inputs, Print Report, and Copy Results.

---

### Overtime v0.9.6.1 — UI Identity Polish

- Refined lowercase info icon size, color, spacing, and vertical alignment.
- Improved consistency of Signal Labs pill/toggle styling.
- Preserved saved inputs, Print Report, Copy Results, and optional section behavior.

---

### Time Off v0.9.6.1 — UI Identity Polish

- Refined lowercase info icon size, color, spacing, and vertical alignment.
- Replaced the duplicated category UI with a true category pill-only selector.
- Fixed category pill labels for Comp Time and Floating Holiday.
- Preserved saved inputs, Print Report, Copy Results, and optional section behavior.

---

### Overtime v0.9.6 — Signal Labs UI Identity

- Added Signal Labs info icon system.
- Added Automatic / Custom overtime threshold pill controls.
- Moved long overtime threshold and currency explanations into compact footer notes.
- Added info hints for pay period, currency, overtime multiplier, shift differential, and threshold behavior.
- Improved consistency with pill/toggle design language.
- Preserved saved inputs, Print Report, Copy Results, and optional section behavior.

---

### Time Off v0.9.6 — Signal Labs UI Identity

- Added Signal Labs info icon system.
- Replaced large category selector layout with category pills.
- Added custom category pill support with an 18-character input limit.
- Added quick hour pills for 4h, 8h, 12h, and Custom.
- Added policy type pills for Standard and Use-It-Or-Lose-It behavior.
- Added expandable policy notes.
- Added planned event chip display support.
- Added compact footer notes.
- Preserved saved inputs, Print Report, Copy Results, and optional section behavior.

---

### Overtime v0.9.5 — Compact UI Pass

- Rebuilt optional toggle sizing with hard CSS overrides.
- Fixed toggle track and knob proportions so the knob stays inside the colored background.
- Tightened optional card headers.
- Removed duplicate optional title text where present.
- Reduced card, form, button, and result row spacing.
- Preserved collapse behavior, saved inputs, report output, and copy output.

---

### Time Off v0.9.5 — Compact UI Pass

- Rebuilt optional toggle sizing with hard CSS overrides.
- Fixed toggle track and knob proportions so the knob stays inside the colored background.
- Tightened optional card headers.
- Removed duplicate optional title text where present.
- Reduced card, form, button, and result row spacing.
- Preserved collapse behavior, saved inputs, report output, and copy output.

---

### Overtime v0.9.4.2 — Toggle Polish & Compact Headers

- Removed duplicate `(Optional)` text from optional section titles.
- Kept the smaller `OPTIONAL` badge as the only optional label.
- Tightened optional card header spacing.
- Reduced optional badge and ON/OFF label sizing.
- Fixed toggle track and knob proportions so the knob fits inside the colored background.
- Preserved collapse behavior, saved inputs, and report exclusion behavior.

---

### Time Off v0.9.4.2 — Toggle Polish & Compact Headers

- Removed duplicate `(Optional)` text from optional section titles.
- Kept the smaller `OPTIONAL` badge as the only optional label.
- Tightened optional card header spacing.
- Reduced optional badge and ON/OFF label sizing.
- Fixed toggle track and knob proportions so the knob fits inside the colored background.
- Preserved collapse behavior, saved inputs, and report exclusion behavior.

---

### Overtime v0.9.4.1 — Optional Toggle Logic Fix

- Fixed optional toggle initialization for users with saved settings.
- Fixed ON/OFF label synchronization.
- Fixed collapse class application after page load and after toggle changes.
- Added duplicate-listener protection for optional toggles.
- Preserved saved input values and report exclusion behavior.

---

### Time Off v0.9.4.1 — Optional Toggle Logic Fix

- Fixed optional toggle initialization for users with saved settings.
- Fixed malformed optional section data attributes.
- Fixed ON/OFF label synchronization.
- Fixed collapse class application after page load and after toggle changes.
- Added duplicate-listener protection for optional toggles.
- Preserved saved input values and report exclusion behavior.

---

### Overtime v0.9.4 — Collapsible Optional Sections

- Added true collapse behavior for disabled optional sections.
- Changed optional toggles to green when on and red when off.
- Added ON/OFF state labels beside optional toggles.
- Disabled optional cards collapse to header-only while preserving saved inputs.
- Reports and copy output continue to respect disabled optional sections.

---

### Time Off v0.9.4 — Collapsible Optional Sections

- Added true collapse behavior for disabled optional sections.
- Changed optional toggles to green when on and red when off.
- Added ON/OFF state labels beside optional toggles.
- Disabled optional cards collapse to header-only while preserving saved inputs.
- Reports and copy output continue to respect disabled optional sections.

---

### Home v0.4 — Release Standards Update

- Officially renamed top-level release terminology from Root to Signal Labs Home.
- Updated footer/site label to `Signal Labs · Home · v0.4`.
- Added release metadata rules to STANDARDS.md.
- Added backup folder naming rules to STANDARDS.md.
- Added release package order rules to STANDARDS.md.
- Added restore compatibility rules to STANDARDS.md.
- Updated build validation checks for release responses.
- Updated master release documentation.
- Updated cache-busting references to v0.4.

---

### Overtime v0.9.3 — Inline Optional Toggles

- Moved optional toggles into optional card headers.
- Removed standalone Optional Sections card.
- Preserved report exclusion behavior.

---

### Time Off v0.9.3 — Inline Optional Toggles

- Moved optional toggles into optional card headers.
- Removed standalone Optional Sections card.
- Preserved report exclusion behavior.

---

### Home v0.3 — UI Density Refactor

- Added shared compact spacing rules.
- Reduced vertical height of cards, forms, and result rows.
- Prepared the tools for inline optional toggles.

---

### Home v0.2.7 — Release Management System

- Added MASTER-CHANGELOG.md.
- Added MASTER-ROADMAP.md.
- Added RELEASE-HISTORY.md.
- Added release-management rules to STANDARDS.md.
- Updated root documentation and manifests.

---

### Home v0.2.6 — Backup & Recovery System

- Added RESTORE.md.
- Added backups/README.md.
- Added backups/BACKUP-LOG.md.
- Added backups/RESTORE-GUIDE.md.
- Formalized backup and restore procedures.

---

### Overtime v0.9.1 — Professional Reports Print Fix

- Fixed Print Report blank-window behavior.
- Improved print report window handling.
- Preserved reports as real HTML text and tables.

---

### Time Off v0.9.1 — Professional Reports Print Fix

- Fixed Print Report button behavior.
- Added safer report-field fallbacks.
- Preserved reports as real HTML text and tables.

---

### Overtime v0.9 — Professional Reports

- Replaced webpage printing with professional report generation.
- Added results-only HTML reports.
- Added report sections for inputs, hours, rates, pay, and Goal Mode.

---

### Time Off v0.9 — Professional Reports

- Replaced webpage printing with professional report generation.
- Added results-only HTML reports.
- Added report sections for projection, totals, categories, planned events, and warnings.

---

### Home v0.2.5 — Versioning Guidance

- Added versioning philosophy to STANDARDS.md.
- Clarified that version numbers should reflect scope of change, not artificial synchronization.

---

### Overtime v0.8.5 — Share & Export Prep

- Added Copy Results.
- Added Print support.
- Added export summary prep.
- Cleaned duplicate changelog entries.

---

### Time Off v0.8 — Share & Export Prep

- Added Copy Results.
- Added Print support.
- Added planning report copy output.
- Added export summary prep.

---

### Home v0.2.4 — Modal UX Polish

- Added click-outside-to-close behavior for shared modals.
- Added Escape key close support.
- Preserved close button behavior.

---

### Time Off v0.7 — Mobile Layout Refactor

- Added collapsible input cards.
- Added collapsible results sections.
- Added compact mobile result rows.
- Added saved layout state.

---

### Home v0.2.3 — Standards Manifest Adoption

- Added file identity headers.
- Added FILEMANIFEST.md and BUILDMANIFEST.md.
- Added version-string sanity checks.

---

### Home v0.2.2.2 — Standards Preservation

- Added STANDARDS.md.
- Added root FILEMANIFEST.md.
- Added root BUILDMANIFEST.md.

---

### Home v0.2.2.1 — Disabled Ad Slot Fix

- Fixed disabled ad slots showing placeholder text.

---

### Home v0.2.2 — Ad Slot Framework

- Added global disabled ad slot framework.
- Added placeholder ad slot support.
- No live ads included.

---

### Overtime v0.8.3.1 — Live Folder Resync

- Restored Overtime-specific files after live folder mix-up.
- Preserved disabled ad slots.

---

### Time Off v0.6.2.1 — Disabled Ad Slot Sync

- Fixed disabled ad slot placeholder visibility.
- Updated shared asset references.

---

## Notes

This file is intended for high-level ecosystem tracking.

For detailed tool-specific changes, see each tool's CHANGELOG.md.
