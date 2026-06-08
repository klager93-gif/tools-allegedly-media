# Signal Labs Paycheck Calculator

# HOWTO

---

## Purpose

Use the Paycheck Calculator to estimate work hours, paid leave hours, before-tax pay, taxes, deductions, adjustments, take-home pay, and effective hourly take-home rate.

---

# How to Use

1. Enter Regular Hours, Overtime Hours, and Double Time Hours if they apply.
2. Use the Benefit / Paid Leave pills to add vacation, sick, personal, holiday, comp time, or other paid leave hours.
3. Enter your hourly rate.
4. Choose your pay period and currency.
5. Choose overtime and double time multipliers.
6. Add taxes, deductions, and other adjustments if needed.
7. Review the estimated paycheck results.
8. Use Copy Results or Print Report if needed.

---

# Hours & Earnings

Regular, overtime, and double time hours are always visible.

Benefit / paid leave hours are added only when selected by the pills.

If no benefit time is entered, the calculator shows a soft empty state instead of unused input fields.

Benefit and paid leave hours are currently estimated at the regular hourly rate.

---

# Pay Details

Pay Details controls how entered hours are paid.

Current options include:

- Hourly rate.
- Pay period.
- Currency.
- Overtime multiplier.
- Double time multiplier.
- Custom overtime multiplier.
- Custom double time multiplier.

---

# Deductions & Adjustments

Use Add Tax for estimated taxes.

Use Add Deduction for recurring paycheck deductions such as retirement, insurance, union dues, or benefits.

Use Add Other Adjustment for other amounts that reduce the estimate.

Percentage entries are calculated from before-tax gross pay.

Static amount entries subtract the entered amount directly.

---

# Saved Settings

The calculator saves values locally on the user's device.

Saved values include:

- Hours & Earnings.
- Benefit / paid leave hours.
- Pay Details.
- Taxes.
- Deductions.
- Other adjustments.
- Currency.
- Pay period.

---

# Ad Slots

Paycheck includes disabled ad slots for future monetization support.

No live ads are served.

## Slots

```text
paycheck-top
paycheck-results
paycheck-footer
```

All slots use:

```html
data-ad-status="disabled"
```

---

# Maintenance Notes

- Keep shared navigation controlled by `/assets/global.js`.
- Keep shared ad framework controlled by `/assets/global.css` and `/assets/global.js`.
- Keep Paycheck-specific layout in `/paycheck/style.css`.
- Keep Paycheck logic in `/paycheck/script.js`.
- Review Overtime only for critical shared pattern conflicts while Paycheck is the active parent tool.
