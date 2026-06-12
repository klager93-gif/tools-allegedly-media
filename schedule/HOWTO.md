## v0.18.0 Multi-Agency Foundation HOWTO

Use the Multi-Agency Foundation as an architecture guide, not a live configuration screen yet.

### How to think about agency profiles

1. Choose an agency family: police, fire, EMS, corrections, dispatch, security, public works, or custom.
2. Define vocabulary for the agency: units, supervisors, assignments, ranks, qualifications, and operational traits.
3. Store those terms as facts. Do not branch core engine behavior with agency-specific code.
4. Let the same engines evaluate coverage, fairness, opportunities, mandates, benefits, explanations, analytics, notifications, and goals.

### Example

Police may call a supervisor a Sergeant. Fire may call a supervisor a Captain. Corrections may call a supervisor a Lieutenant. The engine should still evaluate the generic supervisor role and display the agency-specific term only when explaining or rendering output.
