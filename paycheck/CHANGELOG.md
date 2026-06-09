# Signal Labs Paycheck Calculator

# CHANGELOG

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
