# Signal Labs Paycheck Calculator Changelog

This file remains as the legacy combined changelog for developer compatibility. Paycheck also maintains:

- `PUBLIC_CHANGELOG.md` for user-facing changes.
- `ADMIN_CHANGELOG.md` for internal/development-process changes.

Entries are append-only. Do not delete prior history.

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
