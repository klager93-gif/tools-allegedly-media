## v0.14.1 Render Registry Repair

Signal Schedule v0.14.1 adds the first visible planning model for bidding and overtime opportunity workflows. It distinguishes employee-initiated voluntary OT requests from management-posted OT opportunities, and models shift bids, vacation bids, awards, eligibility, seniority, fairness, tie breakers, publication, and audit trails as future rule-aware workflows.

## v0.13.0 Mandation Foundation

Signal Schedule v0.13.0 adds the first visible planning model for mandation / forced overtime. Mandation is treated as its own module because it needs rotation lists, eligibility checks, skip reasons, exception handling, mandate counts, audit history, and explanations.

Mandation is not the same as voluntary overtime and it does not consume vacation or benefit time.

This release remains browser-only mock data with no database persistence or true automation.

# Signal Schedule

## v0.13.0 Mandation Foundation

Signal Schedule v0.13.0 adds the first visible explainability model. The goal is to show how the future system can answer why an outcome happened instead of only showing the result.

Current explainability examples include:

- why someone was mandated;
- why someone was skipped;
- why coverage is red;
- why vacation reduces a benefit balance;
- why effective seniority can differ from hire date;
- why an employee is not eligible;
- why a fairness snapshot is uneven.

Core model:

```text
Facts + Rules + History = Explanation
```

The current page remains a browser-only system inspector with mock data. No database, live automation, approval workflow, CRUD workflow, mandation automation, or final schedule generation exists yet.


### v0.14.1 Repair Note

This repair keeps the v0.14 Bidding and Opportunity Foundation intact while fixing the render registry and missing mandation preview functions that could prevent sample employees and add-employee behavior from loading.
