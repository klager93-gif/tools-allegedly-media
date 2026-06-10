# Signal Labs Master Changelog

## 2026-06-10 — Home v0.9.0 — Public Pages Architecture

- Built public HTML pages for changelog, roadmap, how-to, support, about, privacy, terms, and status.
- Updated footer links to route to pages instead of downloading markdown files or opening popups.
- Removed developer-only public footer links from Home.
- Updated shared global JS/CSS for public page routing and styling.



## 2026-06-10 — Home v0.8.5 + Paycheck v0.9.5 — Documentation & File Cleanup

- Cleaned up duplicate changelog/release-history files across Home and Paycheck.
- Preserved the intended changelog hierarchy: root `MASTER-CHANGELOG.md` for all Signal Labs releases, plus per-project `PUBLIC_CHANGELOG.md` and `ADMIN_CHANGELOG.md` files.
- Deprecated root `CHANGELOG.md`, root `RELEASE-HISTORY.md`, and `paycheck/CHANGELOG.md`.
- Updated documentation, manifests, standards, and shared changelog defaults to avoid maintaining three parallel changelogs.
- No calculator math changes.


## 2026-06-10 — Paycheck v0.9.4 — Typography & Breathing Room

- Removed version/theme/status metadata from the Paycheck hero.
- Improved readability of Paycheck section descriptions, empty states, notes, and helper text.
- Added breathing room to the Paycheck action bar.
- No calculator math changes.

## 2026-06-10 — Home v0.8.4 — Hero Control Polish

- Improved Home hero button optical alignment and arrow spacing.
- Simplified the How It Works hero control label.
- No calculator logic changes.


## 2026-06-10 — Home v0.8.3 — Homepage Density Pass

- Refined the v0.8.2 Home redesign after visual QA using desktop and mobile screenshots.
- Reduced oversized mobile page elements, tightened card spacing, and decreased hero graphic size.
- Added mobile footer accordions for Resources, Support, and About link groups.
- Added footer placeholder pages to Home roadmap/TODO tracking.
- No calculator logic changes.


## 2026-06-10 — Home v0.8.2 — Homepage Redesign

- Rebuilt the public Signal Labs Home page using the approved dark dashboard direction.
- Added refreshed hero, navigation, tool cards, Why Signal Labs section, and full footer structure.
- Updated shared global CSS/JS for Home visual layout and existing-nav mobile toggle support.
- No calculator logic changes.

---
## 2026-06-10 — Home v0.8.1 — Design System Cleanup

- Removed the public-facing Design System Foundation card from Home after live review.
- Updated Home visible build and theme metadata to v0.8.1 / Design System Cleanup.
- Preserved v0.8.0 shared design-system foundations for future gradual adoption.
- Confirmed no calculator logic changes and no shared asset content changes.

---


## Home v0.8.0 — Signal Labs Design System

**Date:** 2026-06-10

- Introduced shared Signal Labs design-system foundations.
- Updated global styles and global script utilities.
- Added reusable patterns for navigation, footer, action bars, modals/dialogs, toasts, cards, buttons, pills, and empty states.
- Added Home public/admin changelog split.
- Updated standards to cover shared design-system releases.
- No calculator logic changes.
- Tool migration is planned for future tool-specific releases.

---

## Home v0.7.1 — Version Synchronization

**Date:** 2026-06-10

- Corrected Home page visible version references to v0.7.1.
- Corrected Home footer version.
- Added release standards requiring affected page version sweeps.
- Added footer change discipline: update version references when needed, but avoid cosmetic footer churn.
- No calculator logic changes.
- No shared asset content changes.

---

## Home v0.7.0 — Standards Architecture

**Date:** 2026-06-10

- Introduced the Signal Labs standards architecture.
- Converted `STANDARDS.md` into the project constitution/master index.
- Added dedicated supporting standards files:
  - `UX_STANDARDS.md`
  - `SCRIPT_STANDARDS.md`
  - `DOCUMENTATION_STANDARDS.md`
  - `VERSIONING_STANDARDS.md`
  - `WORKFLOW_STANDARDS.md`
- Added daily startup requirement to review all standards files.
- Added domain-specific verification before script, CSS/UI, documentation, and versioning/release work.
- Formalized the principle: `Review broadly. Verify specifically.`
- Added requirement to review `WORKFLOW_STANDARDS.md` before building any files.
- Reinforced GitHub as the authoritative source of truth.
- No calculator logic changes.
- No shared asset changes.

---

## 2026-06-08 — Earlier Signal Labs Releases

See existing project history for earlier Home, Paycheck, Overtime, and Time Off release notes.

---

## Notes

`MASTER-CHANGELOG.md` is intended to become the complete append-only chronology of Signal Labs changes across all tools, in the order releases occur.
