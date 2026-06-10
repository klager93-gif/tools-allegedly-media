# Paycheck Calculator Public Changelog

## v0.9.1 — Header Alignment

**Date:** 2026-06-10

- Updated the Paycheck header and navigation to better match the Signal Labs Home design.
- Added the richer Signal Labs footer layout to the Paycheck page.
- Improved page spacing and readability while keeping calculator behavior the same.

---

# Paycheck Public Changelog

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

- Reworked the Paycheck action area into a cleaner tool action bar.
- Removed the awkward `⋮ Actions` button and mobile action sheet from the visible workflow.
- Kept primary action focus on `Calculate Paycheck`.
- Grouped setup actions (`Save Settings`, `Load Example`, `Reset`) separately from output actions (`Copy Results`, `Print Report`).
- Improved mobile action layout so the primary calculate action appears first and secondary actions stack cleanly.
- No calculator logic changes.
- No shared asset content changes.

---

User-facing Paycheck Calculator changes. Entries are append-only and should never be deleted, collapsed, or replaced.

---

## v0.8.4 — Result Density Cleanup

**Date:** 2026-06-10

### User-Facing Changes

- Made the Paycheck page feel lighter and less bulky after visual review.
- Made Premium Hours, Paid Leave, and Other Earnings section headings quieter.
- Made pills smaller and easier to scan on desktop and mobile.
- Reduced empty-state height and result-row spacing.
- Kept the result metadata block unchanged for now.
- Updated Paycheck version display to v0.8.4.

---

## v0.8.3 — Progressive Details & Compact Density

**Date:** 2026-06-10

### User-Facing Changes

- Fixed the results breakdown so empty or zero-value rows no longer clutter the Estimated Paycheck card.
- Result details now appear progressively only when that part of the estimate has a value.
- Made premium, paid leave, tax, deduction, and adjustment pills smaller and easier to scan.
- Reduced oversized spacing in empty states, result rows, cards, and mobile layouts.
- Improved mobile usability by reducing unnecessary vertical scrolling.
- Updated Paycheck version display to v0.8.3.

---

## v0.8.2 — Inline Result Details

**Date:** 2026-06-10

### User-Facing Changes

- Removed the hidden Details box from the Estimated Paycheck results area.
- Made paycheck result details visible as individual rows instead of hiding them behind a click.
- Kept Gross Pay and Take-Home Pay visually emphasized.
- Updated Paycheck version display to v0.8.2.

---

## Earlier Versions

Earlier Paycheck history should be backfilled from the existing `CHANGELOG.md` during a future documentation cleanup release. Do not delete existing history.
