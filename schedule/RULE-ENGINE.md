## v0.14.1 Repair and Opportunity Rules

Bidding rules should evaluate eligibility, effective seniority, coverage impact, fairness history, fatigue limits, exceptions, tie breakers, and admin overrides before awards are published. Voluntary OT requests and posted OT opportunities should remain auditable and explainable.

## v0.13.0 Mandation Foundation

Mandation rules should evaluate in a clear order:

1. Coverage need exists.
2. Employee is eligible.
3. Exceptions are checked.
4. Fatigue/rest limits are checked.
5. Rotation order is evaluated.
6. Skip/selection reason is recorded.
7. Mandate history and fairness metrics are updated.

Every mandate, skip, and override should be explainable and auditable.

# Signal Schedule Rule Engine

## v0.13.0 Mandation Foundation

The rule engine should eventually produce an outcome and an explanation.

```text
Facts + Rules + History = Outcome + Explanation + Audit Trail
```

Explanation levels should vary by audience:

- Employee-facing: plain-language, privacy-aware reason.
- Supervisor-facing: operational reason with coverage and eligibility context.
- Admin/audit: rule source, override reason, timestamps, linked events, and ledger references.

Current examples cover mandation, coverage, benefit usage, seniority adjustments, eligibility, and fairness snapshots.


### Render Stability Rule

Preview renderers should be registered and called through a guarded render registry. Missing optional panels should create a console warning, not stop sample data, employee cards, or add-employee behavior from loading.
