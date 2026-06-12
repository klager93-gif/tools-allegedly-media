## v0.18.0 Multi-Agency Foundation

Signal Schedule v0.18.0 adds multi-agency architecture planning while preserving the v0.17.1 UI Debt Audit.

The goal is one scheduling engine that can support police, fire, EMS, corrections, dispatch, security, public works, and custom agencies through configurable facts instead of hard-coded assumptions.

### Core principle

Vocabulary changes. Engines do not.

Examples:

| Generic concept | Police | Fire | Corrections | Dispatch |
|---|---|---|---|---|
| Unit | Squad | Engine / Truck | Pod / Housing Unit | Console |
| Supervisor | Sergeant | Captain | Lieutenant | Lead Dispatcher |
| Assignment | Beat | Apparatus | Post | Channel |
| Qualification | K9 / FTO | Paramedic / Driver | Transport / ERT | NCIC / TAC |

### Rule 0

Store facts, not assumptions. Agency profile, vocabulary, rank structures, qualifications, operational traits, and policy requirements must be stored as data before engines evaluate them.

### Rule 23

This foundation release intentionally avoids new dashboard-style preview panels and new render registry entries. Multi-agency concepts belong in documentation and data-model planning until the UI itself is ready.
