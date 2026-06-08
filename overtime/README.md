# Signal Labs Overtime Calculator

Estimate overtime pay, gross earnings, taxes, deductions, and simple take-home pay.

---

# Current Status

### Build

v0.9.7

### Theme

Take-Home Controls Cleanup

### Status

Active Development

---

# Current Features

- Overtime details calculation.
- Smart pay period overtime thresholds.
- Custom overtime threshold override.
- Currency display options.
- Pay Details for shift differential, double time, and bonuses.
- Shift differential.
- Additional double-time hours.
- Bonuses.
- Dynamic taxes.
- Dynamic deductions.
- Other adjustments.
- Deductions & Adjustments for taxes, deductions, and other items.
- Saved settings.
- Saved layout state.
- Mobile collapsible cards.
- Mobile collapsible results.
- Target Pay planning.
- Shared Signal Labs navigation.

---

# Notes

This repair release replaces the broken Overtime v0.8.3.1 files from the previous combined ZIP.


---

# v0.8.3.1 Repair Notes

This repair patch fixes the broken live Overtime layout by forcing a fresh stylesheet/script cache-bust and preserving the calculator-specific layout files.

No Time Off files are included.


---

# v0.8.3.1 Live Folder Resync

This release is a full `/overtime/` folder replacement to correct the live folder mix-up where the Overtime URL displayed Time Off content.

It includes disabled ad slot placement and updates shared assets to Root v0.2.2.1.


---

# Developer Files

This tool should maintain:

```text
FILEMANIFEST.md
BUILDMANIFEST.md
```

These files define expected files, identity checks, version checks, and ZIP validation requirements.


---

# v0.9 Professional Reports

Print Report now generates a clean HTML document report with real selectable text and tables instead of printing the full calculator UI.


---

# v0.9.2 Optional Section Toggles

Adds toggles for Advanced Pay, Take-Home Estimate, and Goal Mode. Disabled sections are hidden from reports and saved locally.


---

# v0.9.3 Inline Optional Toggles

Optional toggles now live inside the header of each optional card instead of in a standalone options card.


---

# v0.9.4 Collapsible Optional Sections

Disabled optional sections now collapse to header-only. Toggle switches are green when on and red when off, with ON/OFF labels for clarity.


---

# v0.9.4.1 Optional Toggle Logic Fix

Fixes optional toggle initialization, ON/OFF labels, and collapse behavior for saved and fresh users.


---

# v0.9.4.2 Toggle Polish & Compact Headers

Removes duplicate optional title text, tightens optional card headers, and fixes toggle knob/track sizing.


---

# v0.9.5 Compact UI Pass

Rebuilds toggle sizing, tightens headers, and reduces card/form/result spacing while preserving existing behavior.


---

# v0.9.6 Signal Labs UI Identity

Adds info icons, Automatic/Custom OT threshold pills, footer notes, and cleaner helper UI while preserving calculation/report behavior.


---

# v0.9.6.1 UI Identity Polish

Refines info icon styling and improves pill UI consistency while preserving existing functionality.


---

# v0.9.7 Modal Suggested Pills Fix

Cleans duplicate Take-Home action buttons and adds suggested tax/deduction/adjustment pills plus Static Amount / Percentage selector support for deductions and other adjustments.


---

# v0.9.8 UX Flow & Plain-English Polish

Renames key sections and results to make the calculator easier to understand:

- Basic Pay is now Overtime Details.
- Take-Home Estimate is now Deductions & Adjustments.
- Advanced Pay is now Pay Details.
- Goal Mode is now Target Pay.
- Results is now Estimated Pay.
- Total Gross Pay is now Before Taxes (Gross).
- Estimated Take-Home Pay is now Take-Home Pay (Net).

The section order now follows the user workflow: Overtime Details, Deductions & Adjustments, Pay Details, Target Pay, and Estimated Pay.
