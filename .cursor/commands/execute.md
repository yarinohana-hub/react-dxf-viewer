# /execute — ENTER EXECUTE MODE

## Command
/execute  
ENTER EXECUTE MODE  

## Purpose
Strict, controlled implementation of an **already approved** PLAN.

EXECUTE mode is responsible for:
- Writing and modifying code
- Updating tests and docs
- Applying repository standards  
**ONLY** according to the approved plan from PLAN mode.

---

## Mode Behavior

When `/execute` is invoked:

- Set: `RIPER_CURRENT_MODE = "EXECUTE"`
- Use **only** the last approved PLAN as the source of truth
- Do **not** change architecture, design, or requirements
- Do **not** create a new plan in this mode

---

## Hard Guardrails (CRITICAL)

1. **Plan Required**
   - EXECUTE mode MUST NOT run without a clearly approved PLAN.
   - If no plan exists or the plan is ambiguous → STOP and ask to return to `/plan`.

2. **No Planning in EXECUTE**
   - Do **not** brainstorm, explore options, or redesign.
   - If planning is needed → ask explicitly:
     > "We must return to PLAN mode to adjust the plan before continuing EXECUTE."

3. **Scope-Locked**
   - Only implement tasks explicitly listed in the PLAN’s checklist.
   - Do not add new steps, new features, or new refactors that are not in the PLAN.


4. **Step Logging**
   - After completing each planned step, output:
     - `[EXECUTE] Step X completed: <description>`  
   - This is required to track progress and allow you (the user) to verify.

5. **Stop on Ambiguity**
   - If a step is unclear, missing details, or conflicts with existing code:
     - STOP.
     - Ask to go back to `/plan` to clarify or update the plan.

---

## Next.js / React / TypeScript Constraints

EXECUTE MUST respect the following frontend rules:

1. **App Router + Components**
   - Use Next.js 16 App Router patterns.
   - Components are **Server Components by default**.
   - Only add `"use client"` when:
     - Using React state/hooks
     - Handling events (click/mouse/keyboard)
     - Integrating DXF Viewer or browser-only APIs

2. **Feature-First Architecture**
   - New feature-level code belongs under:
     - `src/features/<feature-name>/components/`
     - `src/features/<feature-name>/hooks/`
     - `src/features/<feature-name>/api/`
     - `src/features/<feature-name>/stores/`
   - Global UI:
     - `src/components/ui/` (shadcn/ui only)
   - Do NOT create `src/components/features/`.

4. **State Management**
   - Server data → **TanStack Query**.
   - Client-side shared state → **LiveStore** (or future store defined in rules).
   - Local component state → React `useState`/`useReducer`.
   - Do NOT introduce new Contexts for server data.

5. **TypeScript Strict**
   - No `any` unless explicitly justified in comments.
   - All exported functions/components must have explicit return types.
   - Fix TS errors created by changes before considering a step “done”.

---

## NestJS / Backend Constraints

When steps involve backend implementation, EXECUTE must:

1. Follow NestJS patterns:
   - Controllers in `*.controller.ts`
   - Services in `*.service.ts`
   - DTOs in `dto/` folders
   - Modules wired with `@Module` imports/exports

2. Contract Safety:
   - Keep frontend/backed contracts consistent.
   - If an API schema changes, ensure:
     - DTOs updated
     - Swagger decorators updated (if used)
     - Type definitions on frontend updated

3. No “stealth” DB changes:
   - Do not modify entity fields or database behavior without explicit PLAN steps.
   - Migrations (if used) must be planned and listed as steps.

---

## Execution Flow

In EXECUTE mode, the AI must:

1. **Load the Plan**
   - Read the latest approved PLAN.
   - Identify:
     - Steps list
     - Files to touch
     - Systems: frontend, backend, geometry, DXF

2. **Confirm Scope**
   - Restate:
     - “In EXECUTE I will implement steps X–Y: …”
   - Do not add new steps.

3. **Implement Step-by-Step**
   For each step:
   - Modify only the files relevant to that step.
   - Keep changes as small and focused as possible.
   - Run through mental checklist:
     - Types ok?
     - Architecture respected?
     - Next.js rules respected?
     - DXF/Rebar invariants preserved?

4. **Best Practices**
    1. **Plan First**: Only enter EXECUTE mode after a plan is approved
    2. **Follow Exactly**: Implement the plan as specified, don't improvise
    3. **Track Progress**: Monitor completion against the checklist
    4. **Handle Issues**: If problems arise requiring plan changes, return to PLAN mode

5. **Log Completion**
   - After each step:
     - `[EXECUTE] Step N completed: <summary>`

6. **Validate**
   - Where relevant:
     - Mention how to run `pnpm lint`, `pnpm test`, `pnpm build` (or project equivalents).
     - Highlight potential integration points to test manually (e.g., hover on rebar, context menu, etc.).

---

## Deviation & Error Handling

If during EXECUTE:

- A step is impossible as written  
- A deeper issue is revealed (e.g., DXF geometry inconsistency, missing backend field)  
- The required changes exceed the current plan scope  

Then the AI must:

1. STOP making further changes.
2. Clearly state:
   - What blocked the step.
   - Why the current plan is insufficient.
3. Ask to return to `/plan`:
   - “We must switch back to PLAN mode to adjust the plan for this issue.”

---

## Quality Assurance During EXECUTE

While implementing, the AI must:

- Maintain strict TypeScript types.
- Keep components reasonably small and readable.
- Avoid over-abstraction unless the plan explicitly calls for it.
- Avoid modifying highly coupled geometry logic unless the PLAN explicitly targeted it.

---

## After EXECUTE

When all relevant steps are implemented:

- Summarize:
  - Files changed
  - Steps completed
  - Any follow-up items
- Suggest transition to:
  - `/review` mode — to verify that implementation matches the PLAN
  - `/plan` mode — if new work was discovered
