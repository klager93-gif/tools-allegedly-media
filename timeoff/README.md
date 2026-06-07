# Signal Labs Time Off Calculator

Estimate future balances for vacation, sick time, personal time, comp time, holidays, and other forms of paid leave.

---

# Purpose

The Signal Labs Time Off Calculator is designed to provide a simple way to estimate how much time off you may have by a future date.

It is intended for planning vacations, checking projected balances, estimating time earned, tracking planned usage, and understanding when a cap, carryover limit, or use-it-or-lose-it policy may matter.

---

# Current Features

## Categories

- Vacation category.
- Sick category.
- Personal category.
- Comp Time category.
- Holiday category.
- Floating Holiday category.
- Custom category.
- Checkbox-based category selection.
- Dynamic input cards for selected categories.

## Category Inputs

Each selected category supports:

- Current balance.
- Earned per period.
- Quick planned usage.
- Average used per period.
- Optional cap.

## Projection

- Target date input.
- Pay period selection.
- Hours-per-day conversion.
- Combined balance projection.
- Combined days projection.
- Combined earned time.
- Combined used time.
- Pay periods until target.

## Multiple Balance Results

- Separate category result cards.
- Category projected balance.
- Category projected days.
- Category current balance.
- Category earned time.
- Category used time.
- Category planned-event usage.
- Category cap status.
- Category hours until cap.

## Planning Mode

- Add multiple planned time-off events.
- Assign each event to a selected category.
- Add event name.
- Add event date.
- Add event hours used.
- Remove individual events.
- Clear all events.
- Show running planned-event impact.
- Warn when a planned event may exceed estimated available balance.

## Input Polish

- Optional reset/carryover date.
- Optional carryover limit.
- Optional use-it-or-lose-it reminder.
- Optional policy notes.
- Cap-loss warnings.
- Planned usage shortfall warnings.
- Average usage higher than accrual warnings.
- At-cap and above-cap warnings.
- Reset-date reminders.
- Carryover-limit reminders.

## Disabled Ad Slot Sync

- Automatic saved profile support.
- Saved selected categories.
- Saved category input values.
- Saved projection settings.
- Saved planned events.
- Saved policy helper values.
- Welcome-back restoration message.
- Clear saved profile control.
- Local storage support.

## Quality of Life

- Shared Signal Labs navigation.
- Disabled ad slot placements.
- Collapsible input cards.
- Collapsible result sections.
- Saved layout state.
- Active navigation highlighting.


- Improved numeric input spinner behavior.
- Added minimum values for invalid negative inputs.

- Example values.
- Reset functionality.
- Changelog popup.
- Roadmap popup.
- Mobile support.
- Label polish.
- Improved desktop spacing.
- Shorter form labels.
- Category-level results.
- Planning event impact.
- Warning panel.
- Saved profiles.

---

# Folder Structure

```text
timeoff/

index.html
Main page and layout.

style.css
Time Off Calculator-specific styling.

script.js
Time Off Calculator logic and event handling.

CHANGELOG.md
Historical record of releases.

ROADMAP.md
Current and future plans.

README.md
General project documentation.
```

---

# Shared Assets

## ../assets/global.css

Provides:

- Theme.
- Typography.
- Buttons.
- Cards.
- Modal styling.
- Footer styling.
- Responsive foundations.

## ../assets/global.js

Provides:

- Modal system.
- Utility functions.
- UTC timestamps.

---

# Development Philosophy

Signal Labs tools are intended to be:

- Useful.
- Fast.
- Mobile-friendly.
- Easy to understand.
- Lightweight.
- Free from unnecessary complexity.

> Useful tools without the noise.

---

# Current Status

### Build

v0.9.3

### Theme

Inline Optional Toggles

### Status

Active Development

---

# Ad Slot Placement

Time Off v0.6.2.1 adds disabled ad slot placements using the Root v0.2.2 global ad slot framework.

No live ads are served.

## Added Slots

```text
timeoff-top
timeoff-inline-results
timeoff-footer
```

All slots are disabled with:

```html
data-ad-status="disabled"
```

They are reserved for future monetization support only.



---

# v0.6.2.1 Disabled Ad Slot Sync

This release keeps Time Off ad slot placement but updates the page to Root v0.2.2.1 so disabled ad slots remain hidden.

No live ads are served.


---

# Developer Files

This tool should maintain:

```text
FILEMANIFEST.md
BUILDMANIFEST.md
```

These files define expected files, identity checks, version checks, and ZIP validation requirements.


---

# v0.8 Share & Export Prep

Adds Copy Results, Print support, planning report copy output, and export summary prep.


---

# v0.9 Professional Reports

Print Report now generates a clean HTML document report with real selectable text and tables instead of printing the full calculator UI.


---

# v0.9.2 Optional Section Toggles

Adds toggles for Planning Mode and Policy Helpers. Disabled sections are hidden from reports and saved locally.


---

# v0.9.3 Inline Optional Toggles

Optional toggles now live inside the header of each optional card instead of in a standalone options card.
