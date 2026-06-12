# Signal Schedule Entity Map

## Core entities

- Agency
- Agency Profile
- Vocabulary Term
- Rank
- Qualification
- Employee
- Employee Assignment
- Shift Definition
- Pattern
- Pattern Cycle Day
- Schedule Event
- Request
- Opportunity
- Bid
- Award
- Benefit Ledger Entry
- Coverage Requirement
- Coverage Slot
- Rule
- Rule Evaluation
- Fairness Snapshot
- Explanation
- Notification Trigger
- Notification Message
- Goal
- Audit Record

## Relationship examples

- Agency -> Agency Profile -> Vocabulary Term
- Employee -> Assignment -> Pattern -> Schedule Event
- Request -> Rule Evaluation -> Approval or Denial -> Explanation -> Audit Record
- Opportunity -> Bid -> Award -> Explanation -> Notification -> Audit Record
- Coverage Requirement -> Coverage Slot -> Shortage -> Mandation or Opportunity
- Goal -> Rule Weighting -> Recommendation -> Explanation -> Audit Record

## Database warning

Do not collapse these entities too early. A simple table today can create hidden assumptions later.
