# Signal Labs UX Standards v2.2

## Purpose

This file defines user experience, layout, visual, and interaction standards for Signal Labs.

Review this file before performing CSS, layout, visual, component, typography, or interaction work.

---

# UX Rule 1 — Mobile First

Design priority:

```text
1. Mobile web
2. PWA readiness
3. Desktop
4. Native apps later
```

Every tool must be usable on mobile before desktop polish is considered complete.

---

# UX Rule 2 — Consistent Visual Language

Maintain consistency across:

- Fonts.
- Buttons.
- Pills.
- Cards.
- Form controls.
- Result rows.
- Modals.
- Reports.
- Empty states.
- Action bars.
- Navigation.

Do not introduce a new visual pattern when an existing Signal Labs pattern already works.

---

# UX Rule 3 — Spacing Matters

Check spacing before release.

Review:

- Card padding.
- Section gaps.
- Button spacing.
- Label spacing.
- Input spacing.
- Details/summary spacing.
- Mobile vertical rhythm.

No element should feel cramped against another element.

---

# UX Rule 4 — One Interaction Style Per Component

Components should behave consistently.

Examples:

- If pills are used for selection, related options should follow the pill pattern.
- If dynamic rows are used for deductions, similar dynamic inputs should use similar rows.
- If details are shown inline, avoid mixing that same area with conflicting collapsible behavior.

Avoid making users learn multiple interaction styles for the same type of task.

---

# UX Rule 5 — Progressive Disclosure

Use progressive disclosure when it helps reduce clutter.

However, hidden sections must still be discoverable.

A collapsed section should clearly communicate:

- What it does.
- Why it matters.
- Whether anything has been added.
- How to open or edit it.

If users cannot tell something is clickable, redesign it.

---

# UX Rule 6 — Inline Details When Better Than Collapsing

For itemized user-added entries, prefer showing details as they are added.

Examples:

- Deductions.
- Other adjustments.
- Overtime entries.
- Mileage entries.
- Paid leave entries.
- Other earnings.

Avoid hiding important user-created details in a generic box when inline cards or rows would be clearer.

---

# UX Rule 7 — Typography Consistency

Controls should look like they belong to the same system.

Verify:

- Font family.
- Font size.
- Font weight.
- Line height.
- Select dropdowns.
- Inputs.
- Buttons.
- Pills.

Dropdowns should not feel visually unrelated to surrounding controls.

---

# UX Rule 8 — Button and Pill Consistency

Buttons and pills should have consistent:

- Border radius.
- Padding.
- Height.
- Hover/focus behavior.
- Active state.
- Disabled state.

Selection UI should feel intentional, not browser-default unless intentionally designed that way.

---

# UX Rule 9 — Cards and Result Blocks

Cards should:

- Group related content.
- Have clear headings.
- Avoid visual crowding.
- Use consistent padding.
- Preserve readable contrast.
- Avoid unnecessary nesting.

Result blocks should clearly separate input, calculation, summary, and report actions.

---

# UX Rule 10 — Accessibility and Readability

Every release should consider:

- Touch target size.
- Keyboard focus.
- Color contrast.
- Label clarity.
- Form control readability.
- Mobile zoom and overflow.
- Plain-language instructions.

---

# UX Rule 11 — Shared UX Patterns

Shared patterns should be reviewed before changing:

- Action bar.
- Reports.
- Empty states.
- Modals.
- Navigation.
- Pills.
- Cards.
- Copy Results display.

If a pattern is changed in one tool, review whether Paycheck, Overtime, Time Off, or Home should also be updated.

---

# UX Rule 12 — No Visual Regression Packaging

Before packaging UI work, check:

- Mobile layout.
- Desktop layout.
- Overflow.
- Spacing.
- Font consistency.
- Button and pill consistency.
- Empty-state appearance.
- Expanded and collapsed states.
- Print/report appearance when applicable.

---

# Core UX Principle

Make the tool obvious.

A user should understand:

- What the section does.
- What they can click.
- What changed after they clicked.
- What the result means.


---
# UX Rule 13 — Signal Labs Design System

Shared UI components should use the same visual language:

- Rounded dark glass containers.
- Soft borders.
- Compact pill-style controls.
- A clear primary action.
- Secondary actions grouped around the primary action.
- Mobile-first wrapping and stacking.

## Tool Action Bars

Tool action bars should follow this structure when possible:

```text
Setup actions | Primary action | Output actions
```

Examples:

```text
Save Settings · Load Example · Reset | Calculate | Copy Results · Print Report
```

The primary action should be visually strongest. Secondary actions should stay compact.

## Modals and Popups

Popups, modals, confirms, alerts, and prompt-style interactions should share:

- Same dark glass styling.
- Same border radius.
- Same close behavior.
- Same button hierarchy.
- Same spacing rhythm.
- Same mobile treatment.

Do not use inconsistent one-off popup styles when a shared modal/dialog pattern exists.

## Footer/Header Discipline

Global header/footer styling should be consistent across tools, but footer/header content should only change when release identity, navigation, branding, or metadata behavior actually changes.
