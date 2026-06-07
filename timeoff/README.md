# Signal Labs Time Off Calculator

Estimate future balances for vacation, sick time, personal time, comp time, holidays, and other forms of paid leave.

---

# Purpose

The Signal Labs Time Off Calculator is designed to provide a simple way to estimate how much time off you may have by a future date.

It is intended for planning vacations, checking projected balances, estimating time earned, tracking planned usage, and understanding when a cap may be reached.

---

# Current Features

## Categories

- Vacation category.
- Sick category.
- Personal category.
- Comp time category.
- Holiday category.
- Floating holiday category.
- Custom category.
- Checkbox-based category selection.
- Dynamic input cards for selected categories.

## Balance Inputs

Each selected category supports:

- Current balance.
- Time earned per pay period.
- Quick planned usage.
- Average usage per pay period.
- Optional cap.

## Projection

- Target date input.
- Pay period selection.
- Hours-per-day conversion.

## Planning Mode

- Multiple planned time-off events.
- Category selection for each event.
- Event name.
- Event date.
- Event hours.
- Planned event list.
- Remove individual planned events.
- Clear all planned events.
- Planned events are included in category and combined usage totals.
- Planned Event Impact results show estimated running balance after events.
- Warnings appear when planned event hours exceed estimated available balance.

## Combined Results

- Combined projected balance.
- Combined projected days.
- Combined earned time.
- Combined used time.
- Pay periods until target.
- Target date result.
- Selected category count.
- Combined cap status.

## Category Results

Each selected category can display:

- Projected balance.
- Projected days.
- Current balance.
- Earned time.
- Used time.
- Planned event usage.
- Cap.
- Hours until cap.
- Cap status.

## Quality of Life

- Example values.
- Reset functionality.
- Changelog popup.
- Roadmap popup.
- Mobile support.
- Label polish.
- Improved desktop spacing.
- Shorter form labels.
- Category-level result cards.
- Planning Mode event list.

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

v0.4

### Theme

Planning Mode

### Status

Active Development
