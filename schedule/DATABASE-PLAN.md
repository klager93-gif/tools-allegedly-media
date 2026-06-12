## v0.14.1 Repair and Opportunity Planning

Future persistence should support bid rounds, bid slots, employee bid submissions, voluntary OT requests, posted OT opportunities, bid awards, award explanations, and audit history. Requests are employee-initiated. Opportunities are management-posted openings. Awards should be calculated from eligibility, seniority, fairness, coverage, rule priority, and documented override reasons.

## v0.13.0 Mandation Planning

Future tables may include:

- mandate_rotation
- mandate_history
- mandate_exceptions
- mandate_skip_reasons
- employee_operational_traits
- operational_trait_rules

Mandation must remain separate from voluntary overtime and benefit usage. A mandate event may affect pay, coverage, mandate count, rotation order, and audit history, but it should not consume vacation minutes.

Operational traits such as gender should only be evaluated through documented coverage, safety, legal, or operational rules.

# Signal Schedule Database Plan

## v0.13.0 Mandation Planning

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
