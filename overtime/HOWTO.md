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

# Saved Profiles

The calculator saves values locally on the user's device.

Saved values include:

- Basic pay settings.
- Advanced pay values.
- Taxes.
- Deductions.
- Other adjustments.
- Goal Mode values.
- Mobile layout state.

Use **Clear Saved Profile** to remove saved local data.

---

# Ad Slots

Overtime v0.8.3 includes disabled ad slot placements.

No live ads are served.

## Slots

```text
overtime-top
overtime-inline-results
overtime-footer
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
- Keep calculator-specific layout in `/overtime/style.css`.
- Keep calculator logic in `/overtime/script.js`.
- Update README, ROADMAP, CHANGELOG, and HOWTO with every meaningful release.
