# Signal Labs Paycheck Calculator Changelog

## v0.9.0 — Design System Adoption

**Date:** 2026-06-10

### Public Changes

- Adopted the Signal Labs design-system direction for the Paycheck Calculator.
- Added the shared-style Signal Labs navigation bar with Paycheck marked active.
- Refined the local tool action bar to better match the global rounded-toolbar design language.
- Updated modal styling for adjustment popups so they better match the rest of the calculator.
- Added toast-style feedback support for saved settings, loaded examples, copied results, and validation messages.
- Updated visible Paycheck metadata, footer version, and cache-busting references to v0.9.0.

### Technical Notes

- No calculator math changes.
- No payroll logic changes.
- Shared global assets are referenced at the current Home design-system version; no shared asset content changes are included in this package.

---


## v0.8.5 — Tool Action Bar Foundation

**Date:** 2026-06-10

### Changes

- Reworked the action area into a cleaner tool action bar.
- Removed the awkward `⋮ Actions` trigger and action-sheet style dropdown from the main workflow.
- Grouped setup, calculate, and output actions for better desktop and mobile hierarchy.
- Preserved calculator logic and existing action button IDs.

---

This file remains as the legacy combined changelog for developer compatibility. Paycheck also maintains:

- `PUBLIC_CHANGELOG.md` for user-facing changes.
- `ADMIN_CHANGELOG.md` for internal/development-process changes.

Entries are append-only. Do not delete prior history.

---

## v0.8.4 — Result Density Cleanup

**Date:** 2026-06-10

### Changes

- Refined Paycheck v0.8.3 after live visual review.
- Left the metadata block alone for a future global header/footer/navigation project.
- Changed oversized subsection labels such as `+ Add Premium Hours`, `+ Add Paid Leave`, and `+ Add Other Earnings` to quieter headings.
- Tightened pill sizing across premium hours, paid leave, pay rules, taxes, deductions, adjustments, and target controls.
- Reduced empty-state height, result-row height, card padding, and mobile spacing.
- Added initial hidden-state classes to progressive result rows so unused breakdown rows stay hidden before script initialization.
- Updated build labels, footer version, cache-busting references, and documentation to v0.8.4.
- No shared asset content changes.

---

## v0.8.3 — Progressive Details & Compact Density

**Date:** 2026-06-10

### Changes

- Corrected the v0.8.2 result-detail approach after visual review.
- Kept the removed Details accordion, but changed the breakdown so rows only appear when that part of the paycheck has a value.
- Hid zero-value detail rows for premium pay, shift differential pay, benefit / leave pay, other earnings, specialty pay, taxes, deductions, other adjustments, and target planning.
- Kept total paid hours visible only when regular pay or paid hours exist.
- Tightened pill sizing across premium hours, paid leave, pay rules, taxes, deductions, and adjustment controls.
- Reduced empty-state height, result-row height, card padding, and mobile spacing.
- Improved mobile density so the results card and subsection controls require less scrolling.
- Updated build labels, footer version, cache-busting references, and documentation to v0.8.3.
- No shared asset content changes.

---

## v0.8.2 — Inline Result Details

**Date:** 2026-06-10

### Changes

- Removed the hidden results Details accordion.
- Replaced the accordion with visible inline result rows.
- Started Paycheck public/admin changelog split.
- Footer changelog link now points to `PUBLIC_CHANGELOG.md`.
- No shared asset content changes.

---

## Earlier Versions

The previous combined Paycheck changelog contained v0.1 through v0.8.1 history. Preserve existing history when merging this release into GitHub.
