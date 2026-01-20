Command
/fix-all or fix all or run quality checks and fix

Purpose
Execute all quality scripts (format, lint, check, test) and automatically fix fixable errors and warnings.

When to Use
Before committing changes

After making code modifications

Before creating a pull request

Execution Flow
1. Initial Run
Bash

# Assuming package.json scripts for quality checks (e.g., 'pnpm quality')
npm run quality || yarn quality || pnpm quality
2. Auto-Fix Issues
Format: npm run format:fix (using Prettier)

Lint: npm run lint:fix (using ESLint)

Imports: Fix order, remove unused imports (handled by ESLint/IDE or dedicated tool)

Type Hints: Ensure consistency, use correct TypeScript syntax.

Dependencies: Run npm install or pnpm install

3. Verification
Bash

# Rerun quality checks to verify all issues resolved
npm run quality || yarn quality || pnpm quality
Fix Priority
Critical: Syntax errors, TypeScript errors (tsc), test failures

High: ESLint violations, Prettier format issues, missing type annotations

Low: Warnings, style suggestions

Common Fix Patterns (TypeScript/Next.js)
TypeScript

// Relative → Absolute Imports (using path aliases in tsconfig.json)
import { MyComponent } from '../../components/MyComponent'; // ❌
import { MyComponent } from '@/components/MyComponent'; // ✅

// Missing Type Annotations
const process = (data) => { ... }; // ❌
const process = (data: Record<string, number>): string[] => { ... }; // ✅

// Unused Variables/Imports
import { unused } from './file'; // ❌ (Fixed by ESLint/ts-check)

// React Hooks Dependencies
useEffect(() => { /* logic */ }, []); // ❌ (Missing dependencies)
useEffect(() => { /* logic */ }, [dependency1, dependency2]); // ✅
Output Examples
Success: All checks pass → Ready to commit

Fixed: Auto-fixed format/lint/type issues → Verification passed

Partial: Some issues fixed, manual review needed for:

Complex type inference (e.g., recursive types)

Test logic failures

Architectural issues (e.g., Server/Client violations)

Best Practices
Run before every commit

Review auto-fixes for correctness

Iterate on complex issues (fix → /fix-all → repeat)

Fix root cause, not just symptoms

Limitations
Cannot auto-fix: Complex type inference, business logic errors, architectural issues (e.g., incorrect use of "use client"), and test logic failures.

Related Commands
/execute - Implement planned changes

/review - Validate implementation

/git-ship - Commit and push

/harden - Progressive quality hardening with automated PR