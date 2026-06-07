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

- Added toggle switches for Advanced Pay, Take-Home Estimate, and Goal Mode.
- Disabled optional sections are hidden from the UI.
- Disabled optional sections are ignored or excluded from results where applicable.
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

- Fixed Print Report opening a blank window in some browsers.
- Removed `noopener,noreferrer` from the report print window call because it can return a null window reference while still opening a blank tab.
- Improved print report window timing.
- Confirmed Print Report event binding.
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
- Added Overtime report sections for input summary, hours breakdown, rates, pay breakdown, and Goal Mode.
- Updated Print button label to Print Report.
- Preserved Copy Results support.
- Updated cache-busting references for v0.9.
- Updated documentation and manifests.
- No image-based report generation is used.
- No live ads, ad provider scripts, tracking scripts, or ad requests are included.

---


## Version 0.8.5

**Date:** 2026-06-07  
**Time:** 16:45 UTC

### Theme

Share & Export Prep

### Changes

- Added Copy Results support.
- Added Print support.
- Added export summary builder for future PDF/CSV support.
- Added Results action buttons.
- Added print CSS to hide navigation, buttons, ad slots, and modals.
- Removed duplicate changelog version entries.
- Updated shared global asset references to Root v0.2.5.
- Updated cache-busting references for v0.8.5.
- No live ads, ad provider scripts, tracking scripts, or ad requests are included.

---


# Signal Labs Overtime Calculator

# CHANGELOG

---

## Version 0.8.3.1

**Date:** 2026-06-07  
**Theme:** Standards Manifest Adoption

### Changes

- Added file identity headers to Overtime Calculator source files.
- Added FILEMANIFEST.md.
- Added BUILDMANIFEST.md.
- Updated shared global asset references to Root v0.2.3.
- Added version-string sanity checks to build documentation.
- No calculator logic changes.

---

## Version 0.8.2.1

**Date:** 2026-06-07  
**Time:** 15:05 UTC

### Theme

Layout Repair Patch

### Changes

- Repaired the broken live Overtime layout after the shared navigation update.
- Bumped Overtime stylesheet cache-busting from v0.8.2 to v0.8.2.1.
- Bumped Overtime script cache-busting from v0.8.2 to v0.8.2.1.
- Added a small layout guard to ensure calculator-specific layout styles apply after shared global styles.
- Preserved shared navigation references to Root v0.2.1.
- Preserved Goal Mode, advanced pay, saved settings, and adjustment behavior.
- Overtime-only patch. No Time Off files included.

---

## Version 0.8.2

**Date:** 2026-06-07  
**Time:** 14:45 UTC

### Theme

Shared Navigation Repair

### Changes

- Rebuilt Overtime v0.8.2 with a full working stylesheet.
- Rebuilt Overtime v0.8.2 with full calculator script support.
- Fixed broken Overtime layout caused by the previous placeholder stylesheet.
- Updated shared global asset references to Root v0.2.1.
- Added shared Signal Labs navigation support through global.js.
- Updated build labels and cache-busting references for v0.8.2.
- Preserved Goal Mode, saved settings, advanced pay, adjustments, and mobile collapse behavior.

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
