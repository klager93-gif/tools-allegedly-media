## v0.19.0 Rule Engine Audit

The rule engine must remain fact-driven.

Rules should evaluate stored facts such as agency profile, employee eligibility, operational traits, benefit balances, coverage requirements, seniority, fairness snapshots, bids, goals, and exceptions.

Rules should not assume agency type, work week start, pay period start, gender requirements, rank meaning, mandate eligibility, trade eligibility, or overtime eligibility.

Future rule evaluations should store:

- Input facts
- Rule tested
- Result
- Winning rule
- Skipped rules
- Override reason, if any
- Explanation level
- Audit record
