# Paycheck Admin Changelog

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
