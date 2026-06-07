# Signal Labs Time Off Calculator

# HOWTO

---

## Purpose

The Time Off Calculator estimates vacation, sick time, personal time, comp time, holiday, floating holiday, and custom time-off balances.

It supports category-level projections, planning events, policy helpers, warnings, and saved profiles.

---

# How to Use

1. Choose the time-off categories you want to calculate.
2. Choose a target date.
3. Choose the pay period.
4. Add optional hours-per-day conversion.
5. Enter balance, accrual, planned usage, average usage, and cap values for each selected category.
6. Add planned events if needed.
7. Add optional policy helper information.
8. Review combined totals, category results, planned event impact, and warnings.

---

# Saved Profiles

The calculator saves values locally on the user's device.

Saved values include:

- Selected categories.
- Category input values.
- Projection settings.
- Planning Mode events.
- Policy Helper values.
- In-progress planning event fields.

---

# Ad Slots

Time Off v0.6.2 includes disabled ad slot placements.

No live ads are served.

## Slots

```text
timeoff-top
timeoff-inline-results
timeoff-footer
```

## Current Status

All slots use:

```html
data-ad-status="disabled"
```

The Root v0.2.2 global ad framework controls the styling and initialization.

Do not add live ad provider scripts until a future ad-provider release.

---

# Maintenance Notes

- Keep shared navigation controlled by `/assets/global.js`.
- Keep shared ad framework controlled by `/assets/global.css` and `/assets/global.js`.
- Keep Time Off-specific layout in `/timeoff/style.css`.
- Keep Time Off logic in `/timeoff/script.js`.
- Update README, ROADMAP, CHANGELOG, and HOWTO with every meaningful release.


---

# v0.6.2.1 Disabled Ad Slot Sync Note

Disabled ad slots should not show visible placeholder text.

If placeholder text appears, confirm Root v0.2.2.1 global assets are installed and this Time Off patch is uploaded.


---

# Developer Manifests

Before packaging this tool, review:

```text
FILEMANIFEST.md
BUILDMANIFEST.md
```

These files help prevent missing files, wrong-folder uploads, cross-contamination, and malformed version strings.


---

# v0.7 Mobile Layout Refactor

On mobile, input cards and result sections can be collapsed to reduce page length.

The calculator saves layout state locally with the saved profile.


---

# v0.8 Share & Export Prep

Use **Copy Results** to copy a text summary. Use **Print** to open the browser print dialog.


---

# v0.9 Professional Reports

Use **Print Report** to generate a clean printable HTML report. The report prints as real text and tables, not as an image.


---

# v0.9.1 Professional Reports Print Fix

If the print report does not open, make sure browser popups are allowed for this site and try again.


---

# v0.9.2 Optional Section Toggles

Use Optional Sections to turn Planning Mode and Policy Helpers on or off without deleting your saved input values.


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
