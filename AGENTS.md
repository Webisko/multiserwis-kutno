# Agent Instructions (Webisko/multiserwis-kutno)

This repository is a **Vite + React + TypeScript** web app.
- Build tool: `vite`
- Scripts: `npm run dev | build | preview`
- Deployment target for GitHub Pages: **`docs/`** (Vite `build.outDir = 'docs'`)
- GitHub Pages base path in production: **`/multiserwis-kutno/`** (Vite `base` set accordingly)
- Environment variable used in build: `GEMINI_API_KEY` (see README and `vite.config.ts`)

---

## The 3-Layer Architecture

### Layer 1: Directive (What to do)
- SOPs written in Markdown live in `directives/` (if the folder exists; if not, propose it but do not create/migrate without asking).
- Directives define:
  - Goals & non-goals
  - Inputs (URLs, user stories, acceptance criteria)
  - Commands to run (npm scripts, checks)
  - Output artifacts (PR, updated docs, screenshots)
  - Edge cases & rollback plan

### Layer 2: Orchestration (Decision making)
- You are the router. Inspect the repository, propose a minimal plan, ask for clarification when needed.
- Never “re-architect” the repo unless explicitly asked.

### Layer 3: Execution (Doing the work)
- Deterministic execution is done using:
  - existing **npm scripts** (`npm install`, `npm run dev`, `npm run build`, `npm run preview`)
  - TypeScript config (`tsconfig.json`)
  - Vite config (`vite.config.ts`)
  - Any existing repo tooling (linters/tests/CI) if present
- Prefer existing tooling over creating new scripts/tools.
- Only add new scripts/tools if necessary and after asking first.

---

## Safety Rails (Non‑Negotiable)

1. **No risky changes without confirmation**
   - If a change affects any of: authentication, payments, checkout flows, admin capabilities, user data, pricing, legal/consent/cookies, or security posture — stop and ask for explicit confirmation before implementing.

2. **Small, reversible steps**
   - Prefer small commits and changes that can be reverted easily.
   - Avoid “big bang” refactors.

3. **Protect GitHub Pages deployment**
   - Do not change `vite.config.ts` values `base` or `build.outDir` lightly.
   - Assume production is served under `/multiserwis-kutno/` on GitHub Pages.
   - Ensure asset paths and routing keep working under that base path.

4. **Never commit secrets**
   - Do not commit `.env`, `.env.local`, API keys, tokens, credentials.
   - If you need env vars, document them and rely on local setup or GitHub Secrets.

5. **Verification required**
   - UI changes: provide a manual QA checklist.
   - Build/deploy changes: must pass `npm run build`.
   - If uncertain, propose a verification step rather than guessing.

---

## Operating Principles

### 1) Check the repo first
Identify:
- entry points (`index.html`, `index.tsx`, `App.tsx`)
- shared constants/types (`constants.ts`, `types.ts`)
- component structure (`components/`)
- deploy assumptions (`vite.config.ts`, `docs/`)

### 2) Prefer existing tooling
Use:
- `npm run dev` for local iteration
- `npm run build` to validate production build
- `npm run preview` to validate built output

### 3) Keep project conventions
Match existing patterns (structure, naming, component style). Avoid introducing new architectures without agreement.

### 4) Communicate clearly
For each task:
- Plan (short)
- Risks
- Exact commands to run
- Acceptance criteria and how to verify

---

## Self‑Annealing Loop (When something breaks)

1. Read the error message and stack trace carefully
2. Diagnose root cause (dev vs build-time)
3. Apply the smallest possible fix
4. Re-test (at minimum: `npm run build`)
5. Document what was learned

If retries consume paid tokens/credits or incur external costs, ask before retrying.

---

## Repo-Specific Guardrails (Webisko/multiserwis-kutno)

### GitHub Pages constraints
- Production base path is `/multiserwis-kutno/`.
- Build output is `docs/`.
- Avoid hardcoded absolute URLs like `/assets/...` unless base-aware.
- If adding client-side routing, confirm the desired approach for GitHub Pages (fallback/404 handling) before implementing.

### Environment variables
- `GEMINI_API_KEY` is injected in `vite.config.ts`.
- Do not print keys in logs.
- Do not store keys in the repo.
- If a feature requires the key at runtime client-side, call out security implications and confirm.

---

## Updating Directives (Policy)
- Do **not** create, overwrite, or reorganize directives without asking first.
- If you discovered a new constraint, propose an update and wait for approval.