# Paycheck Admin Changelog

## v0.9.9 — Report & Metadata Cleanup

- Rebased the footer/header component state onto the v0.9.7 Weekly OT package.
- Corrected stale Paycheck metadata references left from documentation drift.
- Cleaned duplicate README, roadmap, and changelog sections after backup-install recovery.
- Preserved shared component files and Weekly OT script logic.
- No calculator math changes were intentionally added.

## v0.9.7 — Weekly OT Profiles

- Added weekly overtime split logic for biweekly profiles where each week is evaluated independently.
- Added the 36/44 Weekly OT profile.

## v0.9.6 — Shared Layout Components

- Replaced local header/footer markup with shared component mount points.
- Uses `/assets/components/header.js` and `/assets/components/footer.js`.
- Keeps Paycheck-specific version metadata in body data attributes for footer display.

## v0.9.3 — Footer Inheritance

- Continued Paycheck design-system migration after v0.9.2.
- Removed hero release metadata per design decision.
- Preserved release metadata in page data attributes, footer/status areas, and changelogs.
- Adopted local Home-style footer markup pending shared extraction.
- No calculator math changes.

## v0.9.2 — Mobile Menu Fix

- Fixed missing mobile-open CSS for navigation.
- Strengthened the local navigation fallback.
- Corrected stale script constants from earlier design-system work.
- No calculator math changes.

## v0.9.0 — Design System Adoption

- Began Paycheck migration into the Signal Labs design-system architecture.
- Kept calculator logic intact while aligning shell, navigation, action bar, modal, and toast behavior.

## v0.8.5 — Tool Action Bar Foundation

- Started the local Paycheck implementation of the future shared/global tool action bar pattern.
- Preserved existing button IDs so current JavaScript event bindings continue to work.

## v0.8.4 — Result Density Cleanup

- Added initial hidden classes for progressive result rows.
- Added compact density overrides for desktop and mobile.
- Kept calculation behavior unchanged.

## v0.8.3 — Progressive Details & Compact Density

- Added progressive result-row visibility using `data-result-row` attributes.
- Added compact density overrides.
- Kept shared asset content unchanged.
