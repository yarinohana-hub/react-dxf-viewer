# /clean-docs - Remove Low-Value Comments & Documentation

## Command
`/clean-docs` or `clean documentation` or `remove useless comments`

## Purpose
Search codebase for comments, docstrings, and documentation that don't provide value and can be deleted or made concise.

## Execution Flow

1. **Search** - Find all comments (`#`), docstrings (`"""`), type comments, TODO/FIXME
2. **Analyze** - Classify by value:
   - **Category A (Delete)**: Obvious comments, redundant type definitions (since TypeScript handles types), outdated/empty TSDoc.
   - **Category B (Shorten)**: Verbose TSDoc, multi-line comments that can be single-line
   - **Category C (Review)**: Complex algorithms, public APIs, TODO/FIXME (requires human confirmation).
3. **Report** - Show findings with file/line locations and suggested actions
4. **Clean** - Preview (default), auto-clean, or interactive mode

## Analysis Criteria

**Delete**: Redundant, obvious, outdated, empty, duplicate, noisy  
**Keep**: Explains "why" not "what", complex algorithms, API contracts, edge cases, performance notes

## Common Patterns

```TypeScript
// ❌ Delete - Obvious or Redundant
const result = a + b; // Add a and b

// ❌ Delete - Empty JSDoc
/**
 *
 */
export function processData(data: Data): Data {
    // ...
}

// ❌ Shorten - Verbose JSDoc (TypeScript already knows the types)
/**
 * This function fetches the user data from the remote API service.
 * @param {number} userId - The unique identifier of the user to fetch.
 * @returns {User | undefined} - The user object or undefined if not found.
 */
export const fetchUser = (userId: number): User | undefined => {
    // ...
}
// ✅ Becomes: /** Fetches user by ID from the remote API service. */

// ✅ Keep - Explains why (Crucial for Geometry/DXF)
// WHY: We use Math.atan2 instead of Math.atan to correctly handle all four quadrants 
// and avoid division by zero when calculating the angle.
const angle = Math.atan2(deltaY, deltaX);
```

## Output Format

```
=== Documentation Cleanup Report ===
Files Analyzed: 42 | Findings: 127
Category A (Delete): 89 | Category B (Shorten): 28 | Category C (Review): 10
Estimated Lines Removed: ~156
```

## Best Practices

- Preview first, preserve API docs, keep "why" comments, remove "what" comments
- Safety: Preview by default, backup before bulk changes, skip public APIs, preserve TODOs

## Related Commands
- `/refactor` - Code structure improvements
- `/fix-all` - Code quality checks

