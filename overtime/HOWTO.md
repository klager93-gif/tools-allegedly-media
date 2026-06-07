# Signal Labs Overtime Calculator

# HOWTO

---

## Purpose

The Overtime Calculator estimates regular pay, overtime pay, advanced pay, taxes, deductions, take-home pay, and income goals.

---

# How to Use

1. Enter your hourly rate.
2. Enter total hours worked.
3. Choose your pay period.
4. Confirm or override the overtime threshold.
5. Add optional advanced pay items.
6. Add optional taxes, deductions, or other adjustments.
7. Use Goal Mode if you want to estimate hours needed for a target amount.
8. Review the Results panel.

---

# Maintenance Notes

- Keep shared navigation controlled by `/assets/global.js`.
- Keep shared ad framework controlled by `/assets/global.css` and `/assets/global.js`.
- Keep calculator-specific layout in `/overtime/style.css`.
- Keep calculator logic in `/overtime/script.js`.
- Update README, ROADMAP, CHANGELOG, and HOWTO with every meaningful release.


---

# v0.8.3.1 Live Folder Resync Note

If `/overtime/` ever displays Time Off content, replace the full `/overtime/` folder with this release package.

Do not patch only one file when the live folder contents appear mixed.


---

# Developer Manifests

Before packaging this tool, review:

```text
FILEMANIFEST.md
BUILDMANIFEST.md
```

These files help prevent missing files, wrong-folder uploads, cross-contamination, and malformed version strings.


---

# v0.8.5 Share & Export Prep

Use **Copy Results** to copy a text summary. Use **Print** to open the browser print dialog.


---

# v0.9 Professional Reports

Use **Print Report** to generate a clean printable HTML report. The report prints as real text and tables, not as an image.


---

# v0.9.1 Professional Reports Print Fix

If the print report opens a blank tab or does not print, make sure browser popups are allowed for this site and try again.


---

# v0.9.2 Optional Section Toggles

Use Optional Sections to turn Advanced Pay, Take-Home Estimate, and Goal Mode on or off without deleting your saved input values.


---

# v0.9.3 Inline Optional Toggles

Use the small Optional switches in each card header to enable or disable optional features without deleting saved inputs.


---

# v0.9.4 Collapsible Optional Sections

Use the green/red optional toggles in card headers. Green means on and expanded. Red means off and collapsed. Turning a section off does not delete saved inputs.


---

# v0.9.4.1 Optional Toggle Logic Fix

If a toggle is red/OFF, the optional card collapses to header-only. Green/ON means the section is expanded and included.


---

# v0.9.4.2 Toggle Polish & Compact Headers

Optional cards use the small OPTIONAL badge only. The ON/OFF switch is compact and fits correctly inside the colored track.


---

# v0.9.5 Compact UI Pass

The interface is more compact. Optional toggles remain green/on and red/off, and disabled sections collapse without deleting saved inputs.


---

# v0.9.6 Signal Labs UI Identity

Use Automatic/Custom pills for overtime threshold behavior. Hover or focus info icons for short explanations. Footer notes replace long helper paragraphs.


---

# v0.9.6.1 UI Identity Polish

Info icons are smaller and better aligned. Pill controls are cleaner and more consistent.
