# /memorize - Improve Rules & Commands

## Command
`/memorize`

## Purpose
Improve rules and commands based on user feedback, following the focused improvement principle: improve only what's relevant, leave it better than you found it, without bloating.

## When to Use
- When you discover a pattern that should be documented
- When existing rules or commands need clarification
- When you want to capture a lesson learned
- When documentation is missing important context
- When rules conflict or are outdated
- After completing work in any RIPER mode and noticing documentation gaps

## What It Does
1. **Analyzes Request**: Understands what needs to be improved
2. **Identifies Targets**: Finds relevant rules and commands to update
3. **Improves Focused**: Updates only what's needed, no bloat
4. **Validates**: Ensures changes improve clarity and usefulness

## Memorization Process

### 1. Understand the Change
- What pattern or knowledge needs to be captured?
- What problem does this solve?
- What context is missing from current docs?

### 2. Find Relevant Files
Search through:
- `.cursor/rules/*.mdc` - Core framework rules
- `.cursor/commands/*.md` - Command documentation

Identify files that:
- Already cover this topic (update existing)
- Should cover this topic (extend scope)
- Conflict with this change (reconcile)

### 3. Apply Focused Improvement Principle
**Improve, Don't Bloat**:
- ✅ Add missing critical information
- ✅ Clarify ambiguous sections
- ✅ Remove outdated content
- ✅ Fix inconsistencies
- ✅ Consolidate redundancy
- ❌ Don't add tangential information
- ❌ Don't duplicate existing content
- ❌ Don't create new files unnecessarily
- ❌ Don't over-explain simple concepts

### 4. Maintain Structure
**For Rules (`.mdc` files)**:
```markdown
---
title: "Rule Title"
description: "Brief description"
category: "core|reference|workflow"
alwaysApply: true|false
version: "1.0"
lastUpdated: "YYYY-MM-DD"
relatedDocs:
  - related-rule.mdc
---

# Rule Title

## Navigation
- **Related**: [Related Rule](./related-rule.mdc)
- **See Also**: [Reference](./reference.mdc)

[Content organized in clear sections]
```

**For Commands (`.md` files)**:
```markdown
# /command - Command Title

## Command
`/command` or `ENTER COMMAND MODE`

## Purpose
One-line description of what this command does.

## When to Use
- Specific use case 1
- Specific use case 2

## What It Does
1. Step 1
2. Step 2

[Additional sections as needed]
```

### 5. Update Metadata
- Increment version if significant change
- Update `lastUpdated` date
- Add/update `relatedDocs` if relevant
- Keep `description` concise and accurate

## Improvement Patterns

### Pattern: Add Missing Context
```markdown
# Before
Use async functions for I/O operations.

# After
Use async functions for I/O operations.
**Why**: Async I/O prevents blocking the event loop, improving performance for concurrent operations.
```

### Pattern: Clarify Ambiguity
```markdown
# Before
Don't use mocks in tests.

# After
Don't mock DXF entities in tests. Use real entities for better integration testing.
**Exception**: Mock external services (APIs, databases) in unit tests.
```

### Pattern: Remove Outdated Content
```markdown
# Before
Run tests with `npm test` or `jest`.

# After
Run tests with `npm test`.
```

### Pattern: Consolidate Redundancy
```markdown
# Before (scattered across multiple sections)
- Use absolute imports
- Don't use relative imports
- Always import from package root

# After (single clear statement)
Use absolute imports only. Relative imports are forbidden.
```

### Pattern: Add Examples
```markdown
# Before
Use structured logging.

# After
Use structured logging with context objects:
```typescript
// ✅ CORRECT
logger.info("User login", { userId: user.id, method: "oauth" });

// ❌ FORBIDDEN
logger.info(`User ${user.id} logged in via oauth`);
```
```

## Best Practices

### 1. Be Specific
- ❌ "Update documentation about testing"
- ✅ "Add example of async test fixture to testing-standards.mdc"

### 2. Preserve Intent
- Don't change the meaning of existing rules
- If you disagree with a rule, discuss with user first
- Clarify, don't contradict

### 3. Stay Focused
- Update only files relevant to the change
- Don't "fix" unrelated issues
- One logical change per memorization

### 4. Maintain Consistency
- Follow existing formatting patterns
- Use consistent terminology (see glossary.mdc)
- Match the tone of existing docs

### 5. Test Understanding
Before updating, verify:
- [ ] I understand the current documentation
- [ ] I understand what needs to change
- [ ] I know which files to update
- [ ] I can explain why this improves things

## Example Prompts

```
"/memorize - Add pattern for testing async Streamlit callbacks"
"/memorize - Clarify when to use module-level helpers vs asyncio.run()"
"/memorize - Document the new project structure convention"
"/memorize - Fix inconsistency between import-standards and type-annotations"
"/memorize - Add example of parametrized fixtures to refactor-test command"
```

## Output Format

### 1. Analysis Summary
- What needs to be improved
- Why this change is needed
- Which files will be updated

### 2. Proposed Changes
For each file:
- Current relevant section (if exists)
- Proposed update with explanation
- How this follows focused improvement principle

### 3. Updated Files
- Show complete updated files
- Highlight key changes
- Confirm metadata updates

### 4. Validation
- [ ] Change is focused and relevant
- [ ] No bloat or tangential content
- [ ] Existing structure maintained
- [ ] Metadata updated appropriately
- [ ] Cross-references updated if needed
- [ ] Terminology consistent with glossary

## Usage with RIPER Workflow

Use `/memorize` when you notice documentation gaps during development:

**During RESEARCH**:
- Discovered pattern → `/memorize - Document pattern in relevant rule`
- Found missing context → `/memorize - Add context to command docs`

**During EXECUTE**:
- Implemented workaround → `/memorize - Document workaround pattern`
- Hit undocumented edge case → `/memorize - Add edge case to rules`

**During REVIEW**:
- Found documentation gap → `/memorize - Fill documentation gap`
- Noticed inconsistency → `/memorize - Fix inconsistency`

**During INNOVATE**:
- New approach validated → `/memorize - Document new pattern`
- Lesson learned → `/memorize - Capture lesson in rules`

## Anti-Patterns to Avoid

❌ **Creating New Files Unnecessarily**
- Don't create new rule files for minor additions
- Extend existing files instead

❌ **Over-Explaining**
- Don't add verbose explanations for simple concepts
- Trust the reader's intelligence

❌ **Duplicating Content**
- Don't repeat information from other files
- Use cross-references instead

❌ **Scope Creep**
- Don't fix unrelated issues
- Stay focused on the requested change

❌ **Breaking Consistency**
- Don't introduce new formatting styles
- Follow existing patterns

## Checklist

- [ ] Identified all relevant files to update
- [ ] Understood current documentation state
- [ ] Proposed changes are focused and clear
- [ ] No bloat or unnecessary content added
- [ ] Existing structure and style maintained
- [ ] Metadata updated (version, lastUpdated, relatedDocs)
- [ ] Cross-references updated if needed
- [ ] Terminology consistent with glossary
- [ ] Examples are clear and correct
- [ ] Changes improve clarity without over-explaining

## Next Steps

After memorization:
- Continue with your original development task
- Documentation improvements are committed separately
- Apply newly documented patterns in future work

