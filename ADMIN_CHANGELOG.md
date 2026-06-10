# Signal Labs Home Admin Changelog

## v0.8.4 — Hero Control Polish

**Date:** 2026-06-10

### Changes

- Improved the optical centering of the Home hero `Explore Tools` button.
- Converted hero buttons to explicit flex alignment for cleaner text and arrow positioning.
- Added a clearer gap between the primary button label and arrow.
- Simplified the `How It Works` control by removing the info icon from the visible label.
- No calculator logic changes.

---


## v0.8.3 — Homepage Density Pass

**Date:** 2026-06-10

- Built a density pass from user-supplied desktop and mobile screenshots.
- Kept the v0.8.2 visual direction but reduced mobile vertical weight.
- Added responsive footer accordion behavior in `assets/global.js` for Home footer groups.
- Added CSS overrides in `assets/global.css` for mobile card density, hero graphic sizing, two-column Why Signal Labs layout, and collapsible footer groups.
- Added footer placeholder pages to roadmap/TODO tracking.
- No calculator logic changes.


## v0.8.2 — Homepage Redesign

**Date:** 2026-06-10

- Converted the approved homepage mockup direction into actual Home files.
- Removed duplicate Signal Labs text from the nav/hero combination by using an icon-style nav mark.
- Added Home-specific landing page CSS in `assets/global.css`.
- Updated `assets/global.js` so existing static nav markup receives the same mobile toggle behavior as injected nav markup.
- Preserved the shared design-system foundation while making the public Home page look finished instead of demo-like.
- Added footer links for future public/admin/support/legal pages without building those pages yet.

---
## v0.8.1 — Design System Cleanup

**Date:** 2026-06-10

### Changes

- Removed the public-facing Design System Foundation card from the Home page.
- Updated Home visible build metadata to `v0.8.1`.
- Updated Home theme text to `Design System Cleanup`.
- Preserved the shared design-system foundations added in v0.8.0 for future tool adoption.
- Kept shared asset cache-busting references at `v0.8.0` because no shared asset content changed in this release.
- No calculator logic changes.
- No shared asset content changes.

---


## Home v0.8.0 — Signal Labs Design System

**Date:** 2026-06-10

- Added shared design-system foundations after Paycheck action bar review revealed a stronger visual direction for Signal Labs.
- Added reusable styling and script foundations for future metadata-driven headers, footers, action bars, modals, dialogs, and toasts.
- Updated standards to require shared design-system review before shared layout/component releases.
- Added Home public/admin changelog split.
- Kept tool adoption gradual to avoid forcing Paycheck, Overtime, and Time Off into a global migration inside this Home release.
- GitHub remains the primary repository source; current-chat approved decisions were used for design-system direction.

---

## Home v0.7.1 — Version Synchronization

**Date:** 2026-06-10

- Added version synchronization standards after the Home footer/build labels missed the v0.7.0 bump.

---

## Home v0.7.0 — Standards Architecture

**Date:** 2026-06-10

- Split Signal Labs standards into constitution plus domain standards.
- Added workflow verification requirements and release response format rules.
