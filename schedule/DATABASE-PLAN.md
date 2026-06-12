## v0.17.0 Goal Mode Data Planning

Future database work should preserve Goal Mode as auditable records, not temporary calculations.

Planned entities:

- goal_profiles
- goal_tradeoffs
- goal_recommendations
- goal_audit_events
- goal_override_records

Each recommendation should link to the facts that caused it, including coverage rows, schedule events, benefit ledger entries, voluntary OT requests, posted OT responses, mandate rotation entries, fairness metrics, analytics forecasts, notifications, and rule outcomes.
