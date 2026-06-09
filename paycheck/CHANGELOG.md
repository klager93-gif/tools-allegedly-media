# Paycheck v0.7.8 — Mobile Optimization

- Reduced the mobile hero further so users reach the calculator faster.
- Made the mobile Estimated Paycheck card a compact summary-first panel.
- Hid detailed result rows on small screens while preserving full desktop results, Copy Results, and Print Report output.
- Tightened mobile cards, section headers, chips, inputs, empty states, and result rows.
- Shortened the mobile sticky action bar by placing secondary actions on one compact row under the primary Calculate Paycheck button.
- Preserved all Paycheck calculations, saved settings, reports, hidden ad slots, and no-live-ad behavior.

---

# Paycheck v0.7.7 — UX Foundation

- Compressed the Paycheck desktop hero, cards, result rows, pills, empty states, and sticky action bar for a more professional dashboard feel.
- Reduced mobile hero size, card spacing, chip size, result rows, and action bar height so users can reach inputs faster.
- Kept the two-column desktop layout and collapsed-section behavior while improving information density.
- Preserved all existing Paycheck calculations, saved settings, Copy Results, Print Report, shared report format, hidden ad slots, and no-live-ad behavior.

---
# Paycheck v0.7.5 — Specialty Pay

- Added a Specialty Pay section for job-specific earnings.
- Added Callback Pay, Court Pay, Certification Pay, Longevity Pay, Education Incentive, Bilingual Pay, Hazard Pay, Shift Bonus, Travel Pay, Uniform Allowance, and Custom specialty pay pills.
- Added dynamic specialty pay rows with smooth empty-state behavior.
- Included specialty pay in Before Taxes (Gross), Copy Results, and Print Report output.
- Updated saved settings to preserve specialty pay entries.
- Preserved Hours & Earnings, Pay Details, Other Earnings, Deductions & Adjustments, Target Pay, saved settings, shared action bar, shared report format, hidden ad slots, and no-live-ad behavior.

---

# Paycheck v0.7 — Other Earnings

- Added an Other Earnings section for non-hourly pay.
- Added Bonus, Commission, Tips, Mileage, Per Diem, and Custom earning pills.
- Added dynamic earning rows with smooth empty state behavior.
- Included other earnings in gross pay, Copy Results, and Print Report output.
- Preserved Hours & Earnings, Pay Details, Deductions & Adjustments, Target Pay, saved settings, shared action bar, shared report format, hidden ad slots, and no-live-ad behavior.

---

# Signal Labs Paycheck Calculator

# CHANGELOG

---

## Version 0.6

**Date:** 2026-06-09  
**Theme:** Pay Profiles

### Changes

- Added Pay Profile presets for Hourly, Salary, Public Safety, Healthcare, Trades, and Custom users.
- Added smart defaults for pay period, overtime rule, shift differential readiness, and premium multipliers.
- Added a profile summary card explaining which profile is active.
- Preserved customizable settings after profile selection.
- Updated saved settings, Copy Results, and Print Report output to include the active Pay Profile.
- Preserved Hours & Earnings, Deductions & Adjustments, Target Pay, shared action bar, shared report format, hidden ad slots, and no-live-ad behavior.

---

## Version 0.5

**Date:** 2026-06-08  
**Theme:** Target Pay

### Changes

- Added Target Pay as a new paycheck planning section.
- Added goal type pills for Take-Home Pay (Net), Gross Pay, and Annual Income.
- Added target amount and optional maximum extra hours inputs.
- Added extra-hours mode pills for Overtime Only, Regular Hours, and Either.
- Added Target Gap, Estimated Extra Hours Needed, and Target Status results.
- Updated Copy Results and Print Report output to include Target Pay details.
- Updated saved settings to preserve Target Pay inputs and selections.
- Preserved Hours & Earnings, Pay Details, Deductions & Adjustments, shared action bar, shared report format, hidden ad slots, and no-live-ad behavior.

---

## Version 0.4.1

**Date:** 2026-06-08  
**Theme:** Script Cache-Busting Hotfix

### Changes

- Fixed Paycheck `index.html` loading the old `script.js?v=0.3.3` cache-busting reference after the v0.4 release.
- Updated Paycheck script reference to `script.js?v=0.4.1`.
- Updated Paycheck build/footer labels and report metadata to v0.4.1.
- Updated Paycheck documentation and manifests for the hotfix.
- No calculation, styling, shared asset, or layout changes.

---

## Version 0.4

**Date:** 2026-06-08  
**Theme:** Rates, Multipliers & Rules

### Changes

- Added expanded Pay Details configuration for hourly rate, pay period, shift differential, overtime rule, and premium multipliers.
- Replaced the pay period dropdown with Signal Labs pill controls.
- Added shift differential support with None, Flat Hourly, and Percentage options.
- Added overtime rule pills for After 40, After 80, and Custom threshold labeling.
- Added default premium multiplier controls for Overtime, Double Time, and Holiday Premium hours.
- Updated gross pay, estimated pay, Copy Results, and Print Report output to include shift differential and pay rule details.
- Preserved Hours & Earnings, Deductions & Adjustments, saved settings, shared action bar, shared report format, hidden ad slots, and no-live-ad behavior.

---

## Version 0.3.3

**Date:** 2026-06-08  
**Theme:** Rates, Multipliers & Rules

### Changes

- Moved main tool actions into the shared Signal Labs action bar.
- Updated shared global asset references to v0.6.
- Preserved existing calculations, saved settings, Copy Results, Print Report, and hidden ad slots.

---

## Version 0.3.4

**Date:** 2026-06-08
**Theme:** Rates, Multipliers & Rules

### Changes

- Updated Paycheck printed report to match the shared Signal Labs report format used by Overtime and Time Off.
- Standardized report header, brand mark, metadata, section tables, notes, and footer.
- Preserved Hours & Earnings, Premium Hours, Benefit Hours, Deductions & Adjustments, saved settings, Copy Results, and hidden ad slots.

---


# Signal Labs Paycheck Calculator

# CHANGELOG

---

## Version 0.3.2

**Date:** 2026-06-08  
**Theme:** Professional Report Polish

### Changes

- Replaced the plain text print output with a polished professional HTML report.
- Added report header metadata for generated time, build, theme, and pay period.
- Added summary cards for Before Taxes (Gross), Total Paid Hours, Total Reductions, and Take-Home Pay (Net).
- Added structured report tables for Hours & Earnings, Deductions & Adjustments, and Estimated Pay.
- Kept the report as real selectable HTML text and tables, not an image.
- Preserved Copy Results, saved settings, hidden ad slots, and no-live-ad behavior.

---

## Version 0.3.1

**Date:** 2026-06-08  
**Theme:** Premium Hours & Benefit Hours

### Changes

- Rebuilt Hours & Earnings into Regular Hours, Premium Hours, and Benefit / Paid Leave Hours.
- Converted Overtime and Double Time from permanent inputs into pill-driven premium hour categories.
- Added Holiday Premium, On-Call, Standby, and Custom premium hour support.
- Added Vacation, Sick, Holiday, Personal, Comp Time, Bereavement, and Custom benefit-hour support.
- Added smooth empty-state cards when no premium or benefit hours are selected.
- Added dynamic premium hour rows with per-row multipliers.
- Updated gross pay, Copy Results, and Print Report output for the new structure.
- Preserved Deductions & Adjustments, saved settings, hidden ad slots, and no-live-ad behavior.

---

## Version 0.3

**Date:** 2026-06-08  
**Theme:** Hours & Earnings

### Changes

- Rebuilt the first input section as Hours & Earnings.
- Added separate Regular Hours, Overtime Hours, and Double Time Hours inputs.
- Added Benefit / Paid Leave hour pills and dynamic rows.
- Added Pay Details section.

---

## Version 0.2

**Date:** 2026-06-08  
**Theme:** Deductions & Adjustments

### Changes

- Added itemized taxes, deductions, and other paycheck adjustments.
- Added Add Tax, Add Deduction, and Add Other Adjustment modals.
- Added suggested pills and Static Amount / Percentage selector support.

---

## Version 0.1.1

**Date:** 2026-06-08  
**Theme:** Foundation + Hidden Ad Framework

### Changes

- Added disabled hidden ad slots.
- Preserved no-live-ad behavior.

---

## Version 0.1

**Date:** 2026-06-08  
**Theme:** Foundation

### Changes

- Added initial Paycheck Calculator prototype.
