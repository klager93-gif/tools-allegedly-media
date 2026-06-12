## v0.17.0 Goal Mode Rules

Goal Mode must consume facts from the existing engines. It should not invent reasons or silently prefer one outcome.

Required explanation chain:

1. Selected goal.
2. Source facts.
3. Hard rules checked first.
4. Tradeoffs considered.
5. Winning goal.
6. Losing goal, if any.
7. Recommendation.
8. Human override or no-safe-action result, if applicable.

Goal Mode is not automation for automation's sake. Sometimes the correct answer is to stop and escalate to a supervisor.
