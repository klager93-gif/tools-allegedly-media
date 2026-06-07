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

## Quality of Life

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

v0.5.1

### Theme

Input Polish

### Status

Active Development
