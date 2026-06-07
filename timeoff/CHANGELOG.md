## Version 0.9.7

**Date:** 2026-06-07  
**Theme:** Planner Identity Overhaul

### Changes

- Reframed the tool from Time Off Calculator to Time Off Planner.
- Updated hero language to `Plan and Project Your Time Off`.
- Added clearer subtitle explaining that the tool projects vacation, sick time, PTO, and planned-day impact.
- Added a planner intro card explaining the key questions the tool answers.
- Added planner preset pills for Standard PTO, Vacation + Sick, Public Safety, and Custom.
- Renamed key sections to Your Time-Off Banks, Your Balances, Accrual Rules, Planned Time Off, Policy Rules, and Your Projection.
- Added a plain-English planner summary area.
- Improved empty-state language for planned events.
- Added result explainers where possible.
- Preserved category pills, custom categories, quick hour pills, policy pills, event chips, expandable notes, Print Report, and Copy Results.
- No image-based report generation is used.

---


## Version 0.9.6.2

**Date:** 2026-06-07  
**Theme:** Category Pill Visibility Fix

### Changes

- Fixed Time Off Categories showing both the old checkbox cards and the new pill selector.
- Hid the old checkbox/card category source while preserving it for calculation compatibility.
- Left only the category pill UI visible.
- Preserved proper category labels including Comp Time and Floating Holiday.
- Preserved custom category pills, saved inputs, Print Report, and Copy Results.
- No image-based report generation is used.

---


## Version 0.9.6.1

**Date:** 2026-06-07  
**Theme:** UI Identity Polish

### Changes

- Refined lowercase info icon size, color, spacing, and vertical alignment.
- Replaced the duplicated category UI with a true category pill-only selector.
- Fixed category pill labels for Comp Time and Floating Holiday.
- Improved consistency of Signal Labs pill/toggle styling.
- Preserved saved inputs, Print Report, Copy Results, and optional section behavior.
- No image-based report generation is used.

---


## Version 0.9.6

**Date:** 2026-06-07  
**Theme:** Signal Labs UI Identity

### Changes

- Added Signal Labs info icon system.
- Replaced large category selector layout with category pills.
- Added custom category pill support with an 18-character input limit.
- Added quick hour pills for 4h, 8h, 12h, and Custom.
- Added policy type pills for Standard and Use-It-Or-Lose-It behavior.
- Added expandable policy notes.
- Added planned event chip display support.
- Added compact footer notes.
- Preserved saved inputs, Print Report, Copy Results, and optional section behavior.
- No image-based report generation is used.

---


## Version 0.9.5

**Date:** 2026-06-07  
**Theme:** Compact UI Pass

### Changes

- Rebuilt optional toggle sizing with hard CSS overrides.
- Fixed toggle track and knob proportions so the knob stays inside the colored background.
- Tightened optional card headers.
- Removed duplicate optional title text where present.
- Reduced card, form, button, and result row spacing.
- Preserved collapse behavior, saved inputs, report output, and copy output.
- No image-based report generation is used.

---


## Version 0.9.4.2

**Date:** 2026-06-07  
**Theme:** Toggle Polish & Compact Headers

### Changes

- Removed duplicate `(Optional)` text from optional section titles.
- Kept the smaller `OPTIONAL` badge as the only optional label.
- Tightened optional card header spacing.
- Reduced optional badge and ON/OFF label sizing.
- Fixed toggle track and knob proportions so the knob fits inside the colored background.
- Preserved collapse behavior, saved inputs, and report exclusion behavior.
- No image-based report generation is used.

---


## Version 0.9.4.1

**Date:** 2026-06-07  
**Theme:** Optional Toggle Logic Fix

### Changes

- Fixed optional toggle initialization for users with saved settings.
- Fixed malformed optional section data attributes.
- Fixed ON/OFF label synchronization.
- Fixed collapse class application after page load and after toggle changes.
- Added duplicate-listener protection for optional toggles.
- Preserved saved input values and report exclusion behavior.
- No image-based report generation is used.

---


## Version 0.9.4

**Date:** 2026-06-07  
**Theme:** Collapsible Optional Sections

### Changes

- Added true collapse behavior for disabled optional sections.
- Changed optional toggles to green when on and red when off.
- Added ON/OFF state labels beside optional toggles.
- Disabled optional cards now collapse to header-only while preserving saved inputs.
- Reports and copy output continue to respect disabled optional sections.
- No image-based report generation is used.

---


## Version 0.9.3

**Date:** 2026-06-07  
**Theme:** Inline Optional Toggles

### Changes

- Moved optional toggles into each optional card header.
- Removed the large standalone Optional Sections card.
- Added smaller Optional labels beside each inline toggle.
- Tightened UI spacing through shared Root v0.3 density styles.
- Preserved saved toggle behavior.
- Preserved report exclusion behavior for disabled optional sections.
- No image-based report generation is used.

---

## Version 0.9.2

**Date:** 2026-06-07  
**Theme:** Optional Section Toggles

### Changes

- Added toggle switches for Planning Mode and Policy Helpers.
- Disabled optional sections are hidden from the UI.
- Disabled Planning Mode is ignored in calculations and report output.
- Disabled Policy Helpers are excluded from reports and warnings.
- Copy Results and Print Report now respect optional section visibility.
- Toggle state is saved locally.
- No image-based report generation is used.

---


## Version 0.9.1

**Date:** 2026-06-07  
**Time:** 17:35 UTC

### Theme

Professional Reports Print Fix

### Changes

- Fixed Print Report doing nothing on Time Off.
- Added explicit report button initialization.
- Fixed report print window behavior.
- Added safer report field fallbacks for Time Off result values.
- Updated report build labels to v0.9.1.
- No calculator logic changes.
- No image-based report generation is used.

---


## Version 0.9

**Date:** 2026-06-07  
**Time:** 17:15 UTC

### Theme

Professional Reports

### Changes

- Replaced webpage printing with generated professional report printing.
- Added one-page HTML report layout with real text and tables.
- Added Time Off report sections for projection summary, combined totals, cap status, category results, planned events, and warnings.
- Updated Print button label to Print Report.
- Preserved Copy Results support.
- Updated cache-busting references for v0.9.
- Updated documentation and manifests.
- No image-based report generation is used.
- No live ads, ad provider scripts, tracking scripts, or ad requests are included.

---


## Version 0.8

**Date:** 2026-06-07  
**Time:** 16:45 UTC

### Theme

Share & Export Prep

### Changes

- Added Copy Results support.
- Added Print support.
- Added export summary builder for future PDF/CSV support.
- Added Results action buttons.
- Added planning event and warning details to copied summaries.
- Added print CSS to hide navigation, buttons, ad slots, and modals.
- Removed duplicate changelog version entries.
- Updated shared global asset references to Root v0.2.5.
- Updated cache-busting references for v0.8.
- No live ads, ad provider scripts, tracking scripts, or ad requests are included.

---


# Signal Labs Time Off Calculator

# CHANGELOG

---

## Version 0.7

**Date:** 2026-06-07  
**Time:** 16:20 UTC

### Theme

Mobile Layout Refactor

### Changes

- Added collapsible input cards on mobile.
- Added collapsible category input cards on mobile.
- Added collapsible results sections on mobile.
- Added compact mobile result rows.
- Added smaller mobile summary card.
- Added saved layout state for Time Off.
- Updated saved profile storage key with legacy fallback.
- Removed duplicate v0.6.2.1 changelog entry.
- Preserved shared navigation and disabled ad slot support.
- No live ads, ad provider scripts, tracking scripts, or ad requests are included.

---

## Version 0.6.2.1

**Date:** 2026-06-07  
**Theme:** Standards Manifest Adoption

### Changes

- Added file identity headers to Time Off Calculator source files.
- Added FILEMANIFEST.md.
- Added BUILDMANIFEST.md.
- Updated shared global asset references to Root v0.2.3.
- Added version-string sanity checks to build documentation.
- No calculator logic changes.

---

## Version 0.6.2

**Date:** 2026-06-07  
**Time:** 15:40 UTC

### Theme

Tool Ad Slot Placement

### Changes

- Added disabled top ad slot.
- Added disabled inline results ad slot.
- Added disabled footer ad slot.
- Connected Time Off to the Root v0.2.2 global ad slot framework.
- Updated shared global asset references to v0.2.2.
- Updated build labels and cache-busting references for v0.6.2.
- Updated saved profile storage key with legacy fallback.
- Added Time Off ad slot documentation.
- No live ads, ad provider scripts, tracking scripts, or ad requests are included.

---

## Version 0.6.1

**Date:** 2026-06-07  
**Time:** 14:25 UTC

### Theme

Shared Navigation

### Changes

- Updated shared global asset references to Root v0.2.1.
- Added shared Signal Labs navigation support through global.js.
- Added Home, Overtime, and Time Off navigation links through the shared navigation system.
- Added active page highlighting through the shared navigation system.
- Updated build labels and cache-busting references for v0.6.1.
- No Time Off calculation logic changes.

---

## Version 0.6

**Date:** 2026-06-07  
**Time:** 14:05 UTC

### Theme

Saved Profiles

### Changes

- Added automatic saved profiles.
- Added local storage support for Time Off Calculator values.
- Saved selected time-off categories.
- Saved category balances, accrual rates, planned usage, average usage, and caps.
- Saved projection settings.
- Saved Planning Mode events.
- Saved Policy Helper values.
- Saved in-progress planned event fields.
- Added welcome-back restoration message.
- Added Clear Saved Profile control.
- Updated build labels and cache-busting references for v0.6.
- Updated documentation for v0.6.

---

## Version 0.5.1

**Date:** 2026-06-07  
**Time:** 13:30 UTC

### Theme

Input Polish

### Changes

- Changed Hours Per Day spinner increments from 0.01 hours to 1 hour.
- Changed Planning Mode Hours Used spinner increments from 0.01 hours to 1 hour.
- Changed Carryover Limit spinner increments from 0.01 hours to 1 hour.
- Changed Quick Planned Usage spinner increments to 1 hour.
- Added minimum values to numeric inputs where negative values do not make sense.
- Updated Carryover Limit placeholder from 80 to 40 for a simpler default example.
- Updated version labels and cache-busting references for v0.5.1.
- Updated documentation for v0.5.1.

---

## Version 0.5

**Date:** 2026-06-07  
**Time:** 13:15 UTC

### Theme

Warnings & Policy Helpers

### Changes

- Added Policy Helpers section.
- Added optional reset/carryover date field.
- Added optional carryover limit field.
- Added use-it-or-lose-it policy reminder checkbox.
- Added optional policy notes field.
- Added Warnings & Policy Notes results panel.
- Added category-level cap-loss warnings.
- Added planned usage shortfall warnings.
- Added high average usage warnings when usage exceeds accrual.
- Added at-cap and above-cap warnings.
- Added reset-date reminder logic.
- Added carryover-limit reminder logic.
- Added policy reminder messaging.
- Updated example values to demonstrate policy helpers.
- Updated version labels and cache-busting references for v0.5.
- Updated documentation for v0.5.

---

## Version 0.4

**Date:** 2026-06-07  
**Time:** 13:05 UTC

### Theme

Planning Mode

### Changes

- Added Planning Mode section.
- Added planned event category selector.
- Added planned event name input.
- Added planned event date input.
- Added planned event hours input.
- Added Add Planned Event control.
- Added Clear Events control.
- Added planned event list with remove controls.
- Added planned event usage into category projections.
- Added planned event usage into combined totals.
- Added Planned Event Impact results section.
- Added running balance impact after planned events.
- Added warning language when planned events exceed estimated available balance.
- Updated example values with planned events.
- Updated documentation for v0.4.

---

## Version 0.3

**Date:** 2026-06-07  
**Time:** 12:55 UTC

### Theme

Multiple Balance Results

### Changes

- Added category-level result cards.
- Added separate projected balance per selected category.
- Added separate projected days per selected category.
- Added separate current balance, earned, used, cap, and hours-until-cap results per category.
- Added category-specific cap status.
- Preserved combined total balance, days, earned, and used results.
- Improved category results styling.
- Updated documentation for v0.3.

---

## Version 0.2

**Date:** 2026-06-07  
**Time:** 12:42 UTC

### Theme

Categories

### Changes

- Added category selection.
- Added Vacation category.
- Added Sick category.
- Added Personal category.
- Added Comp Time category.
- Added Holiday category.
- Added Floating Holiday category.
- Added Custom category.
- Added dynamic category input cards.
- Added category-specific balance, accrual, usage, average usage, and cap inputs.
- Updated combined results to use selected categories.
- Updated documentation for v0.2.

---

## Version 0.1.3

**Date:** 2026-06-06  
**Time:** 16:30 UTC

### Theme

Label Cleanup

### Changes

- Shortened the first card labels.
- Changed Current Time Off Balance to Current Balance.
- Changed Time Earned Per Pay Period to Earned Per Period.
- Changed Balance Cap to Cap.
- Improved optional label spacing.
- Improved form label wrapping.
- Updated documentation for v0.1.3.

---

## Version 0.1.2

**Date:** 2026-06-06  
**Time:** 16:15 UTC

### Theme

Label & Layout Polish

### Changes

- Finished the Time Off Calculator rebrand across visible labels.
- Replaced remaining PTO wording in the main interface.
- Changed Calculate PTO to Calculate Time Off.
- Updated result labels to use Time Off wording.
- Improved long optional label wrapping.
- Improved desktop layout spacing.
- Updated documentation for v0.1.2.

---

## Version 0.1.1

**Date:** 2026-06-06  
**Time:** 15:45 UTC

### Theme

Rebrand

### Changes

- Renamed PTO Calculator to Time Off Calculator.
- Updated page title and branding.
- Updated meta descriptions.
- Updated footer wording.
- Updated documentation.
- Prepared the project for future vacation, sick, personal, comp time, holiday, and custom time-off categories.

---

## Version 0.1

**Date:** 2026-06-06  
**Time:** 15:30 UTC

### Theme

Initial Prototype

### Changes

- Added PTO Calculator initial prototype.
- Added current PTO balance input.
- Added PTO earned per pay period input.
- Added pay period selector.
- Added optional PTO cap input.
- Added target date projection.
- Added planned PTO usage input.
- Added average PTO usage per pay period input.
- Added optional hours-per-day conversion.
- Added projected PTO balance result.
- Added projected PTO days result.
- Added PTO earned result.
- Added PTO used result.
- Added pay periods until target result.
- Added estimated PTO cap date.
- Added cap status messaging.
- Added example values.
- Added reset functionality.
- Added changelog popup.
- Added roadmap popup.
