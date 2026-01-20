# /plan - Enter PLAN Mode

## Command
`/plan` or `ENTER PLAN MODE`

## Purpose
Creating detailed technical specifications and implementation plans.

## When to Use
- After selecting an approach in INNOVATE mode
- When you need a comprehensive implementation plan
- Before making significant code changes
- When you want a step-by-step roadmap for implementation

## What It Does
1. **Switches Mode**: Changes RIPER_CURRENT_MODE to "PLAN"
2. **Creates Specifications**: Develops detailed technical plans
3. **Analyzes Scope**: Maps the full extent of required changes
4. **Generates Checklists**: Creates actionable, sequential task lists

## Planning Process
The AI follows a systematic planning approach:

1. **Deep Reflection**: Analyzes the changes needed based on prior research/innovation
2. **Code Analysis**: Maps existing code to understand the full scope of changes
3. **Clarifying Questions**: Asks 4-6 targeted questions to refine the plan
4. **Comprehensive Planning**: Drafts a detailed plan of action
5. **Checklist Creation**: Converts the plan into numbered, sequential steps

## Best Practices
1. **Answer Questions Thoroughly**: Provide detailed responses to clarifying questions
2. **Review Carefully**: Examine the plan thoroughly before approving
3. **Verify Accuracy**: Ensure all file paths and function names are correct
4. **Consider Side Effects**: Think about potential impacts of planned changes
5. **Approve Explicitly**: Give clear approval before moving to EXECUTE mode
6.In PLAN MODE the AI must NOT generate any code.
Only conceptual planning, architecture, steps, diagrams, and explanations are allowed.
No code blocks, no TypeScript, no React components, no pseudo-code.

## Example Prompts
```
"Create a detailed plan for implementing the user notification system."
"Let's develop a step-by-step plan for refactoring the payment processing module."
"Help me plan the implementation of the new feature."
"Plan the database schema changes for the user preferences."
```

## Planning Components
- **Scope Analysis**: What files and components will be affected
- **Dependencies**: What needs to be done first
- **Implementation Steps**: Sequential, actionable tasks
- **Testing Strategy**: How to validate each step
- **Risk Mitigation**: Potential issues and how to handle them

## Plan Structure
Plans typically include:
- **Overview**: High-level summary of the implementation
- **Prerequisites**: What must be in place before starting
- **Step-by-Step Tasks**: Numbered, sequential implementation steps
- **Validation Points**: How to verify each step works correctly
- **Rollback Strategy**: How to undo changes if needed

## Next Steps
After plan approval, typically transition to:
- **EXECUTE Mode** - To implement the approved plan
- **INNOVATE Mode** - If the plan reveals issues requiring alternative approaches
