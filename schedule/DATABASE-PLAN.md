# Signal Schedule Database Plan

## v0.12.0 Explainability Planning

Future persistence should include explanation/audit concepts that can connect an outcome back to facts, rules, events, and history.

Potential future tables:

- explanation_events
- rule_evaluations
- audit_log
- seniority_ledger
- mandate_history
- benefit_ledger
- coverage_evaluations

Explanations should not replace underlying facts. They should reference facts and rules so users can understand how an outcome was reached.
