# Paycheck Calculator

**v0.9.8 — Footer Sync & Weekly OT Preservation**

Preserves Weekly OT profile support while syncing Paycheck back to the shared Signal Labs header/footer layout. Overtime logic is preserved and footer/header metadata references are updated.

# Paycheck Calculator

## Current Version

**v0.9.3 — Footer Inheritance**

The Paycheck Calculator estimates take-home pay with regular hours, premium hours, paid leave, taxes, deductions, adjustments, and optional target pay planning.

## This Release

- Removes release metadata from the hero/header area.
- Adds the Home-style Signal Labs footer structure.
- Keeps the footer changelog link pointed at `PUBLIC_CHANGELOG.md`.
- Makes no calculator math changes.

## Signal Labs Direction

Tool pages should share global navigation and footer patterns while keeping calculator-specific actions near the tool.


## v0.9.7 — Weekly OT Profiles

Adds automatic overtime splitting for weekly overtime rules, including a short **36/44 Weekly OT** profile for biweekly paychecks where each week is tested separately against a 40-hour threshold.
