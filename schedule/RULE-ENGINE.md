## v0.16.0 Notification Rules

Notifications must consume facts from the same engine used by schedules, events, benefits, coverage, fairness, bidding, mandation, analytics, and explanations.

### Required rule behavior

- Trigger only from stored facts or rule outcomes.
- Identify the audience before message content is generated.
- Separate employee, supervisor, admin, and audit detail levels.
- Preserve source facts, rule chain, suppression, escalation, delivery, read, and action states.
- Never expose another employee's private details unless policy and role authority allow it.

### Guardrail

Notifications are not decorative popups. They are operational records that must remain traceable, explainable, and auditable.
