/refactor or ENTER REFACTOR MODE

Purpose
Analyze the entire codebase and identify refactoring opportunities that improve clarity, maintainability, performance, and consistency, without changing functional behavior.

Refactor mode focuses on:

Reducing duplication (DRY).

Improving architectural boundaries and module cohesion.

Extracting reusable logic and utility functions.

Ensuring consistent patterns across the stack (Frontend/Backend).

Identifying opportunities to simplify complex files.

🔬 Analysis Areas
1. Duplication Detection (DRY Violations)
Check for duplicated patterns in:

TypeScript Types / Interfaces: API response types repeated in different layers; Data models defined separately in multiple places; Constants repeated across modules.

Business Logic: Repeated algorithms, validation rules, or state transformation logic across services or components.

React Hooks / UI Logic: Duplicate custom hooks; repeated event-handling code; repeated resize listeners; multiple components calculating the same derived data.

Backend / Utility Logic: Repeated database access patterns or manual data mapping across modules.

2. Pattern Consistency
State Management: Ensure consistent usage of state tools: External state (e.g., Redux/Zustand) vs. Server Data (e.g., React Query) vs. Local component state (React useState).

Component Patterns (React/Next.js): Consistent file structure; Correct use of Server vs. Client components; Consistent naming conventions.

Dependency Injection / Service Location: Consistent approach to managing dependencies in the backend (if applicable) or passing props/callbacks in the frontend.

Validation Patterns: Consistent library and approach for data validation (e.g., Zod, Yup, Class-Validator).

3. Architecture Review
Evaluate:

Module Cohesion: Ensuring files/modules focus on a Single Responsibility (SRP).

Dependency Flow: Verifying that core libraries do not depend on application-specific components.

File Size: Flagging oversized files (e.g., services or components > 400 lines) needing decomposition.

Folder Structure: Consistent organization of features, components, and utilities.

4. SOLID/DRY Violations
Single Responsibility (SRP): Flag components or services that perform too many disparate tasks (e.g., rendering, fetching, and complex logic).

Open/Closed (OCP): Find logic that requires constant modification instead of extension via configuration or inheritance.

Interface Segregation (ISP): Flag wide TypeScript interfaces (e.g., 10+ properties) used across many contexts.

Code Reuse Opportunities: Abstracting repetitive logic into generic hooks, helpers, or common services.

5. Performance Anti-Patterns (React/Frontend)
Look for:

Heavy calculations directly in render loops.

Missing useMemo or useCallback for expensive values or functions.

Unnecessary re-renders caused by state being stored too high in the component tree.

Missing React.memo for large, pure components.

📑 Output Format
1. Executive Summary
3–5 critical findings.

Prioritized High / Medium / Low by: impact, effort, and risk.

2. Detailed Findings (per issue)
For each:

Problem Explain with file references and code snippet.

Why It’s a Problem Type safety issues, duplication, performance cost, inconsistency, etc.

Recommended Refactor Precise actionable refactor suggestion.

Example Fix TypeScript or TSX code.

Priority High / Medium / Low.

3. Refactor Roadmap
Phase 1 — Quick Wins (High Value, Low Cost)
Unify types under a common library/folder.

Extract shared utility functions and simple hooks.

Eliminate simple code duplication.

Phase 2 — Structural Improvements
Consolidate data access or repository patterns.

Improve architectural separation between layers.

Decompose large components or files.

Phase 3 — Advanced Optimization
Address performance anti-patterns (Memoization, re-renders).

Implement dependency inversion in key services.

🚩 Anti-Patterns to Flag
God Components / Services (>500 lines).

Logic placed directly in low-level application entry points (e.g., _app.tsx, root layouts).

Magic numbers / strings in business logic.

Shotgun surgery (small changes required in many files).

Duplicate utility code.

✅ Success Metrics
Reduced code duplication.

Unified type system.

Smaller, clearer files.

More predictable architecture.

No behavior changes.