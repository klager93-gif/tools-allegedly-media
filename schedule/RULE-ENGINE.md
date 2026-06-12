## v0.18.0 Multi-Agency Rule Planning

Rules should evaluate generic facts and display agency-specific language only at the explanation/output layer.

### Examples

- Coverage may require one supervisor. Police output may call that person a Sergeant; fire output may call that person a Captain.
- A qualification may be required for a slot. Police may call it K9 or FTO; fire may call it Paramedic or Driver; dispatch may call it NCIC or TAC.
- Operational traits such as gender, restrictions, language, or certifications should only be evaluated when a documented rule requires them.

### Guardrail

Multi-agency support must not weaken Rule 0. Store facts, not assumptions.
