# Paycheck Public Changelog

## v0.9.9 — Report & Metadata Cleanup

- Preserved the 36/44 Weekly OT profile and weekly overtime calculation behavior.
- Synced Paycheck footer/header metadata to the current shared layout system.
- Updated visible Paycheck version/theme references to v0.9.9 where applicable.
- Cleaned documentation after backup-install drift.
- No calculator math changes were intentionally added.

## v0.9.7 — Weekly OT Profiles

- Added automatic overtime splitting for weekly overtime rules.
- Added 36/44 Weekly OT profile support for biweekly paychecks where each week is tested separately against a 40-hour threshold.

## v0.9.6 — Shared Layout Components

- Updated Paycheck to use shared Signal Labs header and footer components.
- Footer links now match the Home public pages.
- Reduced local duplicated layout markup.

## v0.9.3 — Footer Inheritance

- Removed release metadata from the hero/header area.
- Added the Home-style Signal Labs footer structure.
- Kept footer changelog links pointed at the public changelog.
- Made no calculator math changes.

## v0.9.2 — Mobile Menu Fix

- Fixed missing mobile-open behavior for the Home-aligned navigation implementation.
- Strengthened local navigation fallback behavior.
- Made no calculator math changes.

## v0.9.0 — Design System Adoption

- Began migration into the Signal Labs design-system direction.
- Aligned shell, navigation, action bar, modal styling, and feedback patterns.

## v0.8.5 — Tool Action Bar Foundation

- Added local Paycheck implementation of the future shared tool action bar pattern.
- Preserved existing button IDs and calculator behavior.

## v0.8.4 — Result Density Cleanup

- Reduced result-card spacing and improved readability.
- Kept calculation behavior unchanged.

## v0.8.3 — Progressive Details & Compact Density

- Hid empty or zero-value detail rows from the Estimated Paycheck card.
- Made result details appear progressively only when meaningful values exist.
