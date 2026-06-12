# Signal Schedule v0.19.1 Architecture Audit

## Purpose

v0.19.1 proves the 0.x foundations are coherent before v1.0 introduces persistence.

## Engine chain

Employee + Agency + Pattern + Event + Benefit Ledger + Rule + Coverage + Fairness + Explanation + Notification + Goal + Audit Record.

## Required outcome

Every important action should eventually answer:

- What happened?
- Why did it happen?
- Why did it not happen?
- What rule won?
- What facts were used?
- Who reviewed or overrode it?

## Architecture status

| Foundation | Status | Notes |
|---|---|---|
| Agency profile | Ready for table design | Includes vocabulary and multi-agency facts. |
| Employee profile | Ready for table design | Includes eligibility, traits, exceptions, seniority, and benefits. |
| Pattern foundation | Ready for table design | Repeating cycles, short days, paid minutes, and break rules. |
| Event foundation | Ready for table design | Leave, training, trades, overtime, mandation, callbacks, overrides. |
| Benefit ledger | Ready for table design | Transactions should be stored, not recalculated from assumptions. |
| Rule engine | Ready for first persistence pass | Rules consume facts and return decisions. |
| Coverage engine | Ready for first persistence pass | Requirements, slots, shortages, and vacancies. |
| Fairness | Ready for first persistence pass | Separate from seniority; must explain weighting. |
| Explainability | Required for all future engines | Employee, supervisor, and audit levels. |
| Mandation | Ready for data modeling | Rotation, counts, skips, exceptions, and audit trail. |
| Bidding/opportunity | Ready for data modeling | Opportunity, bid, award, explanation, notification. |
| Analytics | Documentation-ready | Metrics and trends should come from stored facts. |
| Notifications | Documentation-ready | Triggers, channels, suppression, escalation, history. |
| Goal Mode | Documentation-ready | Optimization goals and tradeoffs. |
| Multi-agency | Ready for table design | Vocabulary changes; engines do not. |

## Audit conclusion

The 0.x phase is ready to transition into v1.0 database foundation as long as database work follows Rule 0 and preserves explainability.
