# Signal Labs Paycheck Calculator

# HOWTO

---

## Purpose

Use the Paycheck Calculator to estimate before-tax pay, taxes, deductions, adjustments, take-home pay, and effective hourly take-home rate.

---

# How to Use

1. Enter your hourly rate.
2. Enter your hours worked.
3. Choose a pay period.
4. Choose a currency.
5. Add taxes, deductions, and other adjustments if needed.
6. Choose whether each adjustment is a percentage or static amount.
7. Review the estimated paycheck results.
8. Use Copy Results or Print Report if needed.

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

- Paycheck details.
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
- Review Overtime when shared adjustment patterns change.
