# Signal Labs Overtime Calculator

# CHANGELOG

---

## Version 0.8.1

**Date:** 2026-06-07  
**Time:** 13:30 UTC

### Theme

Goal Mode

### Changes

- Added Goal Mode section.
- Added gross pay target support.
- Added take-home pay target support.
- Added reverse hour estimation.
- Added estimated overtime hours needed.
- Added estimated shifts needed based on typical shift length.
- Added estimated gross and take-home goal results.
- Added Goal Mode values to saved settings.
- Updated example values to include a goal scenario.
- Updated build labels and cache-busting references for v0.8.1.
- Updated documentation for v0.8.1.

---

## Version 0.8.0.2

**Date:** 2026-06-07  
**Time:** 12:34 UTC

### Theme

Roadmap Cleanup

### Changes

- Cleaned up the completed versions list in the roadmap.
- Removed the duplicate v0.6.4 roadmap entry.
- Updated build labels from v0.8.0.1 to v0.8.0.2.
- Updated cache-busting references for v0.8.0.2.
- Updated README current status for the cleanup release.
- No calculator logic changes.

---

## Version 0.8.0.1

**Date:** 2026-06-06  
**Time:** 15:15 UTC

### Theme

Saved Profile Migration Fix

### Changes

- Fixed saved profile migration from recent v0.7.x releases.
- Added legacy storage fallback support for recent saved settings.
- Migrated restored saved profiles into the new v0.8 storage key.
- Clear Saved Profile now removes current and legacy saved profile keys.
- Updated saved profile messaging.
- Updated cache-busting references for v0.8.0.1.
- Updated documentation for the bug fix release.

---

## Version 0.8.0

**Date:** 2026-06-06  
**Time:** 14:45 UTC

### Theme

Personalized Experience

### Changes

- Added saved layout state.
- Mobile card open and closed states are now remembered.
- Mobile results section open and closed states are now remembered.
- Added welcome-back restoration message.
- Added Clear Saved Profile control.
- Updated manual save messaging to include layout.
- Updated local storage profile version.
- Updated documentation for v0.8.0.

---

## Version 0.7.3.3

**Date:** 2026-06-06  
**Time:** 14:15 UTC

### Theme

Mobile Hero Polish

### Changes

- Centered the hero section on mobile.
- Increased Signal Labs brand visibility on mobile.
- Slightly reduced mobile title size.
- Improved mobile hero spacing.
- Centered and constrained the subtitle on mobile.
- Updated documentation for v0.7.3.3.

---

## Version 0.7.3.2

**Date:** 2026-06-06  
**Time:** 13:45 UTC

### Theme

Mobile Results Refactor

### Changes

- Added mobile collapsible results sections.
- Pay Breakdown remains open by default on mobile.
- Hours Breakdown, Rates, Advanced Pay, Taxes, and Deductions start collapsed on mobile.
- Reduced mobile Results page length.
- Made summary card more compact on mobile.
- Improved footer button layout on mobile.
- Updated documentation for v0.7.3.2.

---

## Version 0.7.3.1

**Date:** 2026-06-06  
**Time:** 13:15 UTC

### Theme

Mobile Layout Refactor

### Changes

- Added mobile collapsible cards for Basic Pay, Advanced Pay, and Take-Home Estimate.
- Advanced Pay and Take-Home Estimate now start collapsed on mobile.
- Basic Pay remains open by default on mobile.
- Added compact mobile results layout.
- Reduced mobile result row height.
- Improved mobile card spacing.
- Added grouped Advanced Pay subsections.
- Improved mobile adjustment button layout.
- Updated documentation for v0.7.3.1.

---

## Version 0.7.3

**Date:** 2026-06-06  
**Time:** 12:45 UTC

### Theme

Advanced Pay Polish

### Changes

- Clarified Additional Double-Time Hours labeling.
- Clarified Additional Double-Time Pay result labeling.
- Improved Advanced Pay helper text.
- Improved currency display-only helper wording.
- Added validation for differential hours greater than total hours.
- Added validation for additional double-time hours greater than total hours.
- Improved saved settings confirmation message.
- Updated documentation for v0.7.3.

---

## Version 0.7.2

**Date:** 2026-06-06  
**Time:** 12:15 UTC

### Theme

Currency Display Options

### Changes

- Added currency selector.
- Added USD display support.
- Added EUR display support.
- Added GBP display support.
- Added CAD display support.
- Added AUD display support.
- Saved selected currency preference.
- Applied selected currency to all money fields.
- Added helper note explaining that currency changes display only.
- Updated documentation for v0.7.2.

---

## Version 0.7.1

**Date:** 2026-06-06  
**Time:** 11:45 UTC

### Theme

Advanced Pay Cleanup

### Changes

- Fixed Reset behavior for advanced pay fields.
- Reset now clears shift differential, differential hours, double-time hours, weekend bonus, holiday bonus, and flat bonus.
- Confirmed Example still loads advanced pay sample values.
- Renamed Other Bonus to Flat Bonus for clearer wording.
- Updated cache-busting references for v0.7.1.
- Updated documentation references for the cleanup release.

---

## Version 0.7

**Date:** 2026-06-06  
**Time:** 11:15 UTC

### Theme

Advanced Pay Features

### Changes

- Added Advanced Pay section.
- Added shift differential rate.
- Added differential hours.
- Added double-time hours.
- Added weekend bonus.
- Added holiday bonus.
- Added other bonus.
- Added Advanced Pay results breakdown.
- Added advanced pay values to saved settings.
- Updated example calculation to include advanced pay.
- Updated project documentation for v0.7.

---

## Version 0.6.4.2

**Date:** 2026-06-06  
**Time:** 10:45 UTC

### Theme

Button Layout Polish

### Changes

- Changed the Basic Pay button layout.
- Made Calculate Pay a full-width primary action.
- Moved Save Settings, Example, and Reset into a cleaner secondary row.
- Improved button spacing on desktop and mobile.

---

## Version 0.6.4.1

**Date:** 2026-06-06  
**Time:** 10:30 UTC

### Theme

Button Layout Bug Fix

### Changes

- Fixed Calculate Pay button wrapping after adding Save Settings.
- Improved Basic Pay button row spacing.
- Updated stylesheet cache-busting to load the bug fix.

---

## Version 0.6.4

**Date:** 2026-06-06  
**Time:** 11:00 UTC

### Theme

Custom Modals & Manual Save

### Changes

- Replaced browser prompt boxes with a custom in-page adjustment modal.
- Added custom modal support for taxes.
- Added custom modal support for deductions.
- Added custom modal support for other adjustments.
- Added a visible Save Settings button.
- Preserved automatic saved settings behavior.
- Improved user-facing save confirmation messaging.
- Improved adjustment entry validation.
- Added modal cancel and close controls.
- Added Escape-key support for closing the adjustment modal.
- Updated build labels from `v0.6.3` to `v0.6.4`.
- Updated theme label to Custom Modals & Manual Save.

---

## Version 0.6.3

**Date:** 2026-06-06  
**Time:** 10:00 UTC

### Theme

Stability & Saved Settings

### Changes

- Added automatic saved settings.
- Added local storage support.
- Calculator now remembers values between visits.
- Added support for remembering taxes.
- Added support for remembering deductions.
- Added support for remembering other adjustments.
- Added support for remembering custom overtime settings.
- Added automatic restoration of previous values.
- Improved number formatting.
- Added validation for overtime multiplier values below 1.
- Improved validation messaging.
- Improved mobile spacing and responsiveness.
- Converted project documentation from TXT files to Markdown files.
- Replaced `CHANGELOG.txt` with `CHANGELOG.md`.
- Replaced `ROADMAP.txt` with `ROADMAP.md`.
- Replaced `README.txt` with `README.md`.

---

## Version 0.6.2

**Date:** 2026-06-06  
**Time:** 09:00 UTC

### Theme

Smart Hours

### Changes

- Replaced "Overtime After" input with Pay Period.
- Added Weekly pay period support.
- Added Bi-Weekly pay period support.
- Added Semi-Monthly pay period support.
- Added Monthly pay period support.
- Added Custom pay period support.
- Added automatic overtime thresholds.
- Weekly defaults to 40 hours.
- Bi-Weekly defaults to 80 hours.
- Semi-Monthly defaults to 86.67 hours.
- Monthly defaults to 173.33 hours.
- Added custom overtime threshold override.
- Added threshold helper card.
- Added threshold explanation text.
- Improved example values.
- Prevented accidental 0-hour overtime thresholds.
- Simplified overtime workflow.
- Shifted user thinking from "regular hours vs overtime hours" to "hours worked during a pay period."

---

## Version 0.6.1

### Theme

Dynamic Adjustment UI

### Changes

- Rebuilt the Take-Home Estimate system.
- Replaced fixed tax fields with dynamic tax entries.
- Replaced fixed deduction fields with dynamic deduction entries.
- Added support for other adjustments.
- Added add and remove controls.
- Added tax percentage totals.
- Added deduction totals.
- Added detailed tax breakdown section.
- Added detailed deduction breakdown section.
- Added Clear All Adjustments button.
- Added dynamic rendering system.
- Added support for custom adjustment names.
- Improved layout and organization.
- Reduced visual clutter.

---

## Version 0.6

### Theme

Take-Home Pay

---

## Version 0.5.3

### Theme

Polish & Foundation

---

## Version 0.5.2

### Theme

Shared Signal Labs Assets

---

## Version 0.5.1

### Theme

Project Information & Transparency

---

## Version 0.5

### Theme

Enhanced Results

---

## Version 0.4

### Theme

Quality of Life

---

## Version 0.3

### Theme

Signal Labs Branding

---

## Version 0.2

### Theme

UI Refresh

---

## Version 0.1

### Theme

Initial Prototype
