

## Completed — Paycheck v0.9.6 Shared Layout Components

- Adopted shared header component.
- Adopted shared footer component.
- Continued design-system migration without calculator logic changes.

# Paycheck Calculator Roadmap

## Completed

### v0.9.3 — Footer Inheritance

- Removed version/theme/status metadata from the Paycheck hero.
- Adopted the Home-style footer layout.
- Pointed footer changelog links to the public changelog.

## Next

- Continue extracting repeated header/footer/action patterns into shared components.
- Continue modal/toast consistency work.
- Bring Overtime and Time Off into the same design-system direction.

---
## Completed

### v0.9.2 — Mobile Menu Fix

- Home-aligned global navigation.
- Home-style footer pattern.
- Readability and spacing polish.

## Next

- Continue design-system migration.
- Move header/footer/action bar into shared global components when the platform is ready.
- Continue modal/toast consistency work.

---

# Signal Labs Paycheck Calculator Roadmap

## Current Version

v0.8.5

## Theme

Tool Action Bar Foundation

---

## Completed

- v0.9.0 — Design System Adoption: aligned Paycheck shell, nav, action bar, modal styling, and feedback with the Signal Labs design system. Versions

| Version | Theme |
|---|---|
| v0.1 | Foundation |
| v0.1.1 | Foundation + Hidden Ad Framework |
| v0.2 | Deductions & Adjustments |
| v0.3 | Hours & Earnings |
| v0.3.1 | Premium Hours & Benefit Hours |
| v0.3.2 | Professional Report Polish |
| v0.3.3 | Shared Action Bar |
| v0.3.4 | Shared Report Format |
| v0.4 | Rates, Multipliers & Rules |
| v0.4.1 | Script Cache-Busting Hotfix |
| v0.5 | Target Pay |
| v0.6 | Pay Profiles |
| v0.7 | Other Earnings |
| v0.7.5 | Specialty Pay |
| v0.7.6 | Layout Compression & Section Flow |
| v0.7.7 | UX Foundation |
| v0.7.8 | Mobile Optimization |
| v0.8 | Progressive Disclosure |
| v0.8.1 | Progressive Disclosure Polish |
| v0.8.2 | Inline Result Details |
| v0.8.3 | Progressive Details & Compact Density |
| v0.8.5 | Tool Action Bar Foundation |

---

## Upcoming Versions

### Paycheck v0.8.5 or v0.9

Potential focus:

- Live mobile verification after v0.8.5 deployment.
- Backfill full Paycheck history into `PUBLIC_CHANGELOG.md` and `ADMIN_CHANGELOG.md` without deleting existing history.
- Review print report formatting against progressive result rows.
- Review Copy Results output against progressive result rows.
- Review saved settings migration after v0.8.5.

### Paycheck v1.0

Potential focus:

- Final validation.
- Documentation cleanup.
- Mobile verification.
- Print Report verification.
- Copy Results verification.
- Production release notes.


## Completed

| Version | Theme |
|---|---|
| v0.8.5 | Tool Action Bar Foundation |

## Future

- Move local tool action bar into a future shared/global layout system.
- Add dynamic global header, footer, nav, and page metadata rendering.

## Future

- Future global header/footer metadata migration.
- Replace local action bar with the finalized shared action-bar component once all tools are ready.
- Continue mobile polish after live visual review.


## Completed in v0.9.7

- Weekly overtime profile support.
- Biweekly paycheck with weekly overtime rule support.
- Functional After 40 / After 80 / Custom overtime threshold controls.

## Upcoming

- List and card density polish for taxes, deductions, other adjustments, and related row components.
