# /review - Enter REVIEW Mode

## Command
`/review` or `ENTER REVIEW MODE`

## Purpose
Validating implementation against the plan and ensuring quality standards.

## When to Use
- After completing implementation in EXECUTE mode
- When you want to verify changes match the approved plan
- Before committing or merging changes
- When conducting quality assurance on completed work

## What It Does
1. **Switches Mode**: Changes RIPER_CURRENT_MODE to "REVIEW"
2. **Validates Implementation**: Compares actual changes against the approved plan
3. **Quality Checks**: Ensures code standards and best practices are met
4. **Documents Deviations**: Records any differences from the original plan

## Review Process
The AI conducts a systematic review:

1. **Plan Comparison**: Compares implementation against approved plan
2. **Checklist Validation**: Verifies all planned steps were completed
3. **Quality Assessment**: Checks code standards, testing, and documentation
4. **Deviation Analysis**: Identifies and evaluates any plan deviations
5. **Completion Validation**: Confirms objectives were met

## Review Categories
- **Functional Review**: Does the implementation work as planned?
- **Quality Review**: Does the code meet repository standards?
- **Completeness Review**: Were all planned steps implemented?
- **Deviation Review**: Are any deviations acceptable and documented?

## Best Practices
1. **Be Thorough**: Review all aspects of the implementation
2. **Check Deviations**: Pay attention to any deviation flags
3. **Validate Quality**: Ensure code standards are maintained
4. **Document Findings**: Record review results and any issues

## Example Prompts
```
"Let's review the implementation against our plan."
"Validate the changes we just made."
"Review steps 1-5 to ensure they match the plan."
"Conduct a quality review of the user notification system implementation."
```

## Review Outputs
- **Compliance Report**: How well implementation matches the plan
- **Quality Assessment**: Code standards and best practices evaluation
- **Deviation Summary**: Any differences from plan with rationale
- **Completion Status**: What was accomplished vs. what was planned
- **Recommendations**: Suggestions for improvements or next steps

## Deviation Types
- **Acceptable Deviations**: Improvements or optimizations that maintain plan intent
- **Required Deviations**: Changes needed due to unforeseen technical constraints
- **Problematic Deviations**: Changes that may compromise the plan's objectives

## Review Checklist
- [ ] All planned steps were implemented
- [ ] Implementation matches plan specifications
- [ ] Code follows repository standards
- [ ] Tests are included and passing
- [ ] Documentation is updated
- [ ] No unintended side effects introduced
- [ ] Deviations are documented and justified

## Next Steps
After review completion, typically:
- **Return to Development**: If review passes, work is complete
- **PLAN Mode** - If issues found that require additional work
- **EXECUTE Mode** - If minor fixes needed to address review findings
