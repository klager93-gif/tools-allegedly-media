
## Paycheck v0.9.6 — Shared Layout Components

**Date:** 2026-06-10

### Internal Notes

- Replaced local header/footer markup with shared component mount points.
- Uses `/assets/components/header.js` and `/assets/components/footer.js`.
- Keeps Paycheck-specific version metadata in body data attributes for footer display.

---

# Paycheck Calculator Admin Changelog

## v0.9.3 — Footer Inheritance

**Date:** 2026-06-10

- Continued Paycheck design-system migration after v0.9.2.
- Removed hero release metadata per design decision: tool heroes describe tools, not releases.
- Preserved release metadata in page data attributes, footer/status areas, and changelogs.
- Adopted local Home-style footer markup pending future shared footer component extraction.
- No calculator math changes.

---
## v0.9.2 — Mobile Menu Fix

**Date:** 2026-06-10

- Fixed missing mobile-open CSS for the Home-aligned `.paycheck-global-nav` implementation.
- Strengthened the local navigation fallback to toggle both the links and nav container state.
- Corrected stale script constants from v0.9.0 / Design System Adoption to v0.9.2 / Mobile Menu Fix.
- No calculator math changes.
- No shared asset content changes.


## v0.9.2 — Mobile Menu Fix

**Date:** 2026-06-10

- Migrated Paycheck toward the Home global header/footer component pattern.
- Kept the implementation local to Paycheck while future global component extraction remains planned.
- Updated package metadata, build references, and cache-busting.
- No calculator math changes.

---

# Paycheck Admin Changelog

## v0.9.0 — Design System Adoption

**Date:** 2026-06-10

- Began Paycheck migration into the Signal Labs design-system architecture.
- Kept tool-specific calculator logic intact while aligning shell, navigation, action bar, modal, and toast behavior with the new global direction.
- Added local fallback handling for the Signal Labs navigation toggle so Paycheck remains usable while the global component system continues to mature.
- Preserved the future path for global header/footer/action-bar replacement without forcing a site-wide migration in this release.

---


## v0.8.5 — Tool Action Bar Foundation

**Date:** 2026-06-10

### Internal Notes

- Starts the local Paycheck implementation of the future shared/global tool action bar pattern.
- Keeps the action system local for now so a future Home/global release can extract it into a reusable site-wide component.
- Removes the visible mobile action dropdown pattern because it created duplicated controls and poor text spacing.
- Preserves existing button IDs so current JavaScript event bindings continue to work.
- Updates version labels, cache-busting references, documentation, manifests, and checksums to v0.8.5.

---

Internal Paycheck development notes. This file is for technical, workflow, standards, packaging, and process history. Entries are append-only.

---

## v0.8.4 — Result Density Cleanup

**Date:** 2026-06-10

### Internal / Development Notes

- Built as a follow-up to v0.8.3 after live visual review showed remaining density and hierarchy issues.
- Left the metadata block unchanged because metadata/header/footer work is planned for a later Home/global layout release.
- Added initial `is-hidden` classes to progressive result rows in `index.html` so hidden rows are not visible before `script.js` initializes.
- Added additional compact density overrides in `style.css` for desktop and mobile.
- Reduced subsection heading prominence without changing calculation behavior.
- Updated documentation, manifests, public/admin changelogs, backup notes, and master changelog.
- Kept shared asset content unchanged.
- Regenerated checksum manifest for the v0.8.4 release package.

---

## v0.8.3 — Progressive Details & Compact Density

**Date:** 2026-06-10

### Internal / Development Notes

- Bumped from v0.8.2 to v0.8.3 because the v0.8.2 package had already been built and visually reviewed as not meeting the intended UX.
- Corrected the interpretation of the Details-box request: rows should not simply all expand; result rows should only appear when meaningful values exist.
- Added progressive result-row visibility in `script.js` using `data-result-row` attributes.
- Added compact density overrides in `style.css` for desktop and mobile.
- Updated documentation, manifests, public/admin changelogs, backup notes, and master changelog.
- Kept shared asset content unchanged.
- Regenerated checksum manifest for the v0.8.3 release package.

---

## v0.8.2 — Inline Result Details

**Date:** 2026-06-10

### Internal / Development Notes

- Implemented the user-requested cleanup from the v0.8.1 screenshot review.
- Removed the result `details` disclosure pattern from the right-side Estimated Paycheck card.
- Added the first Paycheck-specific public/admin changelog split.
- Updated footer changelog behavior so the public-facing changelog is the linked changelog.
- Preserved the internal/admin changelog for development-process notes.
- Kept shared asset content unchanged.
