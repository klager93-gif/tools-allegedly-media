## v0.15.0 Analytics Rules

Analytics must consume facts from the same engine used by schedules, events, benefits, coverage, fairness, bidding, mandation, and explanations.

### Rules

- Do not calculate report totals from display text.
- Do not silently mix voluntary OT, posted OT awards, and mandation.
- Do not overwrite benefit balances; explain balances through ledger entries.
- Coverage analytics must use agency-defined requirements.
- Fairness analytics must distinguish opportunity, acceptance, award, denial, skip, and mandate.
- Forecasts must list the facts driving the risk.
- Employee, supervisor, and admin/audit report explanations may expose different levels of detail.

### Guardrail

Analytics should not become decorative charts. They must remain traceable, explainable, and auditable.
