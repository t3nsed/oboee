# Frontend visuals -- static shell with skills.sh aesthetic

## TL;DR

> **Quick Summary**: Build all 5 Oboe pages as static visual shells with hardcoded mock data. Terminal-inspired aesthetic using monospace fonts, ASCII box-drawing characters, and a light color scheme. No backend integration.
> 
> **Deliverables**:
> - Shared layout with sticky header + ASCII nav
> - Landing page with ASCII "OBOE" hero + featured RFSs
> - Browse page with ranked table list + status filters (non-functional)
> - RFS detail page with sidebar funding status
> - New RFS form page (static, no submission)
> - Profile page with mock user data
> - Reusable components: ASCII box, progress bar, status badge
> 
> **Estimated Effort**: Medium
> **Parallel Execution**: YES - 3 waves
> **Critical Path**: Task 1 (foundation) → Task 2 (shared components) → Tasks 3-7 (all pages parallel) → F1-F4 (verification)

---

## Context

### Original Request
Build the frontend visuals for Oboe (crowdfunded agent skills marketplace). Visual-only with static mock data, no backend hookup. Skills.sh aesthetic: monospace, ASCII art, minimal, light color scheme.

### Interview Summary
**Key Discussions**:
- Color scheme: Light (white/off-white bg, black text, gray accents) -- NOT dark like skills.sh
- ASCII intensity: Full -- box-drawing characters for borders/cards, ASCII art logo
- Progress bars: Fraction text + ASCII bar combined ($31/$50 + [████████░░░░░░])
- Browse layout: Ranked table list (skills.sh leaderboard style)
- Detail page: Sidebar layout (description left, funding/CTA right)
- Landing: ASCII hero + tagline left, featured open RFSs right
- Fonts: Add Fira Mono for ASCII art alongside existing Geist/Geist Mono
- Pages: All 5 (/, /browse, /browse/[id], /new, /me)

**Research Findings**:
- skills.sh uses Fira Mono for ASCII art (tracking-[-1px], text-[15px], select-none)
- Layout: sticky header h-14, max-w-6xl container, grid with auto/1fr columns
- Nav: muted-foreground to foreground on hover (150ms transition)
- Pill badges: text-[10px] font-semibold uppercase, ring-1 border, rounded-full
- Surfaces defined by background color differences, not borders/shadows
- Command prompt pattern: `$` in muted, command in foreground, args in muted
- Tailwind 4 uses `@import "tailwindcss"` syntax with `@theme inline` for tokens

### Metis Review
**Identified Gaps** (all addressed):
- Body font-family in globals.css overrides Tailwind → fix in foundation task
- Dark mode classes scattered in existing code → strip in foundation task
- Next.js 16 `params` is a Promise → documented in detail page task
- ASCII logo not defined → create as string constant in foundation task
- Nav items not specified → derived from spec pages
- Mock data quantity/variety not defined → specified per page
- /me page auth state → show mock logged-in user data

---

## Work Objectives

### Core Objective
Build the complete visual shell of all 5 Oboe pages using hardcoded mock data, ASCII box-drawing aesthetics, and monospace typography on a light color scheme.

### Concrete Deliverables
- `src/app/layout.tsx` -- root layout with sticky ASCII header
- `src/app/page.tsx` -- landing with ASCII hero + featured RFSs
- `src/app/browse/page.tsx` -- ranked table list
- `src/app/browse/[id]/page.tsx` -- RFS detail with sidebar
- `src/app/new/page.tsx` -- static RFS creation form
- `src/app/me/page.tsx` -- profile with mock user data
- `src/components/*.tsx` -- shared components (header, ascii-box, progress-bar, status-badge, rfs-row)
- `src/lib/types.ts` -- TypeScript interfaces matching spec data model
- `src/lib/mock-data.ts` -- typed mock entries across all 4 RFS statuses
- `src/app/fonts.ts` -- centralized font exports (Geist, Geist Mono, Fira Mono)

### Definition of Done
- [ ] `next build` exits 0
- [ ] `tsc --noEmit` exits 0
- [ ] All 5 routes return HTTP 200
- [ ] All pages render with Geist/Fira Mono fonts (no Arial fallback visible)
- [ ] ASCII box-drawing characters align correctly (monospace context only)

### Must Have
- Fira Mono loaded via next/font/google for ASCII art elements
- ASCII "OBOE" logo as a `<pre>` block with select-none
- Box-drawing borders (┌─┐│└─┘) on cards/sections
- Status badges for all 4 RFS states (open, funded, fulfilled, published)
- ASCII progress bar + fraction text on every RFS with funding
- Sticky header with nav links (Browse, New RFS, Profile)
- Mock data covering all 4 RFS statuses (minimum 8 entries)
- `next/link` for all internal navigation
- Proper Next.js 16 `params` handling (await Promise) in /browse/[id]

### Must NOT Have (Guardrails)
- No dark mode -- strip all `dark:` classes and `prefers-color-scheme: dark` media queries
- No new npm packages -- everything built with Tailwind + ASCII characters
- No `'use client'` unless the component uses hooks (only expected: usePathname for active nav)
- No form validation, submit handlers, or filter/search logic
- No `useState`, `useEffect`, `useContext` outside of nav active-link detection
- No responsive breakpoint variants -- desktop-only, max-w-6xl centered
- No `error.tsx`, `loading.tsx`, `not-found.tsx` files
- No JSDoc, block comments, or ARIA attributes beyond semantic HTML
- No animations beyond color/opacity transitions on link hover (150ms)
- No touching `src/lib/mpp.ts` or `src/app/api/bid/route.ts`
- No shadcn, radix, headlessui, or any UI component library

---

## Verification Strategy

> **ZERO HUMAN INTERVENTION** -- ALL verification is agent-executed. No exceptions.

### Test Decision
- **Infrastructure exists**: NO
- **Automated tests**: None (static visual pages -- build verification only)
- **Framework**: N/A
- **Verification method**: `next build` + `tsc --noEmit` + `curl` status codes + Playwright screenshots

### QA Policy
Every task MUST include agent-executed QA scenarios.
Evidence saved to `.sisyphus/evidence/task-{N}-{scenario-slug}.{ext}`.

- **Pages**: Use Bash (curl) to verify HTTP 200 status codes
- **Visual**: Use Playwright to screenshot each page for visual verification
- **Build**: Use Bash to run `next build` and `tsc --noEmit`

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Foundation -- must complete first):
├── Task 1: Boilerplate cleanup + fonts + types + mock data + globals [quick]
├── Task 2: Shared components (header, ascii-box, progress-bar, status-badge, rfs-row) [visual-engineering]

Wave 2 (All pages in parallel -- after Wave 1):
├── Task 3: Landing page (/) [visual-engineering]
├── Task 4: Browse page (/browse) [visual-engineering]
├── Task 5: RFS detail page (/browse/[id]) [visual-engineering]
├── Task 6: New RFS form (/new) [visual-engineering]
├── Task 7: Profile page (/me) [visual-engineering]

Wave FINAL (After ALL tasks):
├── Task F1: Plan compliance audit (oracle)
├── Task F2: Code quality review (unspecified-high)
├── Task F3: Real manual QA (unspecified-high + playwright)
├── Task F4: Scope fidelity check (deep)
-> Present results -> Get explicit user okay
```

### Dependency Matrix

| Task | Depends On | Blocks |
|------|-----------|--------|
| 1 | — | 2, 3, 4, 5, 6, 7 |
| 2 | 1 | 3, 4, 5, 6, 7 |
| 3 | 1, 2 | F1-F4 |
| 4 | 1, 2 | F1-F4 |
| 5 | 1, 2 | F1-F4 |
| 6 | 1, 2 | F1-F4 |
| 7 | 1, 2 | F1-F4 |

### Agent Dispatch Summary

- **Wave 1**: 2 tasks -- T1 → `quick`, T2 → `visual-engineering`
- **Wave 2**: 5 tasks -- T3-T7 → `visual-engineering`
- **FINAL**: 4 tasks -- F1 → `oracle`, F2 → `unspecified-high`, F3 → `unspecified-high`, F4 → `deep`

---

## TODOs

- [ ] 1. Foundation: clean boilerplate, set up fonts, types, mock data, globals

  **What to do**:
  - Strip all Vercel/Next.js boilerplate from `src/app/page.tsx` (logos, template links). Replace with empty `<main>` placeholder.
  - Remove dark mode: delete the `@media (prefers-color-scheme: dark)` block from `src/app/globals.css`. Remove all `dark:` class variants from `src/app/page.tsx` and `src/app/layout.tsx`.
  - Fix font override: the `body` rule in `globals.css` sets `font-family: Arial, Helvetica, sans-serif` which overrides Tailwind's font-sans. Change it to `font-family: var(--font-geist-sans), sans-serif` or remove it entirely.
  - Create `src/app/fonts.ts`: export all three font instances (Geist, Geist_Mono from `next/font/google`, Fira_Mono from `next/font/google` with `weight: ['400', '700']`). Each gets a CSS variable: `--font-geist-sans`, `--font-geist-mono`, `--font-fira-mono`. Update `layout.tsx` to import from this file instead of inline definitions.
  - Add `--font-fira-mono` to the `@theme inline` block in `globals.css` as `--font-fira: var(--font-fira-mono)`.
  - Update metadata in `layout.tsx`: title to `"Oboe"`, description to `"Crowdfunded agent skills marketplace"`.
  - Adjust `globals.css` color tokens to light scheme: `--background: #ffffff`, `--foreground: #171717`. Add muted tokens: `--muted: #f5f5f5`, `--muted-foreground: #737373`, `--border: #e5e5e5`. Map these in `@theme inline`.
  - Create `src/lib/types.ts` with TypeScript interfaces matching the spec data model:
    - `User` -- id, name, walletAddress
    - `RFS` -- id, title, description, scope, fundingThreshold, currentAmount, status ('open' | 'funded' | 'fulfilled' | 'published'), authorId, claimantId (nullable), createdAt
    - `Contribution` -- id, userId, rfsId, amount, createdAt
    - `Skill` -- id, rfsId, content (string), metadata
    - `Purchase` -- id, userId, skillId, amount, createdAt
  - Create `src/lib/mock-data.ts` with typed mock entries:
    - 10+ RFS items across all 4 statuses (at least 2 open, 2 funded, 2 fulfilled, 4 published)
    - Realistic security-focused titles: "Next.js middleware CSRF hardening", "GraphQL batching attack prevention", "BetterAuth session fixation defense", etc.
    - Funding amounts in dollars (e.g., $31/$50, $0/$75, $120/$120)
    - 3 mock users (one "current user" for /me page)
    - 5+ mock contributions linking users to RFSs
    - 4+ mock skills linked to published RFSs
  - Define the ASCII "OBOE" logo as a named export `OBOE_ASCII` in `src/lib/constants.ts`. Use block characters (███) style matching skills.sh. Keep it ~6 lines tall, select-none.
  - Leave `src/lib/mpp.ts` and `src/app/api/bid/route.ts` completely untouched.
  - Delete unused public assets: `file.svg`, `globe.svg`, `window.svg`. Keep `favicon.ico`. Optionally keep `next.svg`/`vercel.svg` if layout references them, otherwise delete.

  **Must NOT do**:
  - Do not install any npm packages
  - Do not add 'use client' to any file
  - Do not create any page content beyond an empty placeholder in page.tsx
  - Do not touch mpp.ts or api/bid/route.ts

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: File cleanup, config changes, type definitions -- no complex logic or visuals.
  - **Skills**: []
    - No specialized skills needed for boilerplate cleanup and type definitions.

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 1 (sequential -- must complete before Task 2)
  - **Blocks**: Tasks 2, 3, 4, 5, 6, 7
  - **Blocked By**: None

  **References**:

  **Pattern References**:
  - `src/app/layout.tsx:5-12` -- existing Geist/Geist_Mono font variable pattern. Fira_Mono must follow identical pattern.
  - `src/app/globals.css:1-18` -- existing `@theme inline` block where font variables and color tokens are registered for Tailwind 4.

  **API/Type References**:
  - `docs/spec.md:93-107` -- data model section defining User, RFS, Contribution, Skill, Purchase. Types must match these exactly.

  **External References**:
  - `next/font/google` Fira_Mono: must specify `weight: ['400', '700']` as Fira Mono is not a variable font. Use `variable: '--font-fira-mono'` and `subsets: ['latin']`.
  - skills.sh ASCII art style: block characters (███╗, ╔══, etc.) at tracking-[-1px], ~6 lines tall. Reference: `https://skills.sh` hero section.

  **WHY Each Reference Matters**:
  - layout.tsx font pattern: Fira Mono must be added identically (CSS variable on html element) or it won't be available in Tailwind.
  - globals.css @theme inline: new font variable and color tokens must be registered here for Tailwind utility classes to work.
  - spec.md data model: types.ts interfaces must match the spec 1:1 so future backend integration requires zero type changes.

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Build passes after cleanup
    Tool: Bash
    Preconditions: All file changes applied
    Steps:
      1. Run `npx next build` from project root
      2. Check exit code
    Expected Result: Exit code 0, no build errors
    Failure Indicators: Non-zero exit code, "Module not found", type errors
    Evidence: .sisyphus/evidence/task-1-build-pass.txt

  Scenario: Type definitions compile
    Tool: Bash
    Preconditions: types.ts and mock-data.ts created
    Steps:
      1. Run `npx tsc --noEmit`
      2. Check exit code
    Expected Result: Exit code 0, no type errors
    Failure Indicators: Type mismatch errors between mock-data.ts and types.ts
    Evidence: .sisyphus/evidence/task-1-typecheck.txt

  Scenario: Landing page still serves
    Tool: Bash
    Preconditions: Dev server running (`npm run dev`)
    Steps:
      1. Run `curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/`
      2. Check response code
    Expected Result: HTTP 200
    Failure Indicators: 404 or 500
    Evidence: .sisyphus/evidence/task-1-landing-200.txt

  Scenario: No dark mode classes remain
    Tool: Bash (grep)
    Preconditions: Cleanup complete
    Steps:
      1. Run `grep -r "dark:" src/app/ --include="*.tsx" --include="*.css" -l`
      2. Run `grep -r "prefers-color-scheme" src/app/ --include="*.css" -l`
    Expected Result: No matches (empty output)
    Failure Indicators: Any file listed means dark mode was not fully stripped
    Evidence: .sisyphus/evidence/task-1-no-dark-mode.txt

  Scenario: Mock data has all 4 RFS statuses
    Tool: Bash (grep)
    Preconditions: mock-data.ts created
    Steps:
      1. Run `grep -c "'open'" src/lib/mock-data.ts`
      2. Run `grep -c "'funded'" src/lib/mock-data.ts`
      3. Run `grep -c "'fulfilled'" src/lib/mock-data.ts`
      4. Run `grep -c "'published'" src/lib/mock-data.ts`
    Expected Result: Each returns >= 2
    Failure Indicators: Any status returns 0
    Evidence: .sisyphus/evidence/task-1-mock-statuses.txt
  ```

  **Commit**: YES
  - Message: `chore(scaffold): clean boilerplate, add fonts + types + mock data`
  - Files: `src/app/globals.css`, `src/app/layout.tsx`, `src/app/fonts.ts`, `src/app/page.tsx`, `src/lib/types.ts`, `src/lib/mock-data.ts`, `src/lib/constants.ts`
  - Pre-commit: `npx next build && npx tsc --noEmit`

- [ ] 2. Shared components: header, ascii-box, progress-bar, status-badge, rfs-row

  **What to do**:
  - Create `src/components/header.tsx`: sticky nav bar (`sticky top-0 z-50 bg-white`), height h-14, max-w-6xl centered. Left: "OBOE" text logo (font-mono, font-medium, text-lg, tracking-tight). Right: nav links -- "Browse" → `/browse`, "New RFS" → `/new`, "Profile" → `/me`. Links use `text-sm text-gray-500 hover:text-gray-900 transition-colors duration-150`. Active link detection via `usePathname()` -- this is the ONE component that needs `'use client'`. Active link gets `text-gray-900 font-medium`.
  - Create `src/components/ascii-box.tsx`: a Server Component that wraps children in ASCII box-drawing borders. Props: `title?: string`, `children: React.ReactNode`, `className?: string`. Renders:
    ```
    ┌─ Title ──────────────────────┐
    │ children content here        │
    └──────────────────────────────┘
    ```
    Uses Geist Mono (`font-mono`). The box is a visual wrapper -- children render inside a div with padding, the border chars are decorative `<pre>` elements above/below. Width adapts to container (not fixed-width ASCII -- use CSS borders styled to look like box-drawing with actual ┌┐└┘│─ characters at corners/edges only).
  - Create `src/components/progress-bar.tsx`: Server Component. Props: `current: number`, `goal: number`, `className?: string`. Renders fraction text and ASCII bar:
    ```
    $31.00 / $50.00
    [████████████░░░░░░░░] 62%
    ```
    Bar width: 20 characters. Filled blocks: █ (U+2588). Empty blocks: ░ (U+2591). Percentage calculated and displayed. Uses font-mono. Handles edge cases: 0% shows all ░, 100% shows all █.
  - Create `src/components/status-badge.tsx`: Server Component. Props: `status: RFS['status']`. Renders a pill badge styled per status:
    - `open`: gray text + gray ring (`text-gray-600 ring-1 ring-gray-300`)
    - `funded`: green-tinted (`text-green-700 ring-1 ring-green-300 bg-green-50`)
    - `fulfilled`: blue-tinted (`text-blue-700 ring-1 ring-blue-300 bg-blue-50`)
    - `published`: black text on light bg (`text-gray-900 ring-1 ring-gray-400 bg-gray-100`)
    All: `text-[10px] font-mono font-semibold uppercase leading-none px-1.5 py-0.5 rounded-full`
  - Create `src/components/rfs-row.tsx`: Server Component. Props: `rfs: RFS`, `rank?: number`. Renders a single table row for browse page and a compact card for landing featured list. Shows: rank number (tabular-nums, font-mono, muted), title (font-medium, truncate at 80 chars with …), status badge, progress bar (compact -- just `$31/$50` text, no full bar), author name. Row has `hover:bg-gray-50 transition-colors` on the wrapping Link.
  - Update `src/app/layout.tsx`: replace boilerplate nav with `<Header />` import. Wrap children in `<main className="min-h-screen max-w-6xl mx-auto px-4">`.

  **Must NOT do**:
  - No `'use client'` on anything except header.tsx (for usePathname)
  - No useState/useEffect in any component
  - No onClick handlers, form logic, or interactivity
  - No icon libraries or SVG icons -- text and ASCII only
  - No responsive variants beyond preventing overflow

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: UI components requiring precise typography, spacing, and ASCII character alignment.
  - **Skills**: [`frontend-design`]
    - `frontend-design`: guides distinctive visual execution -- needed for the ASCII box-drawing aesthetic to look intentional, not broken.

  **Parallelization**:
  - **Can Run In Parallel**: NO (depends on Task 1's types and fonts)
  - **Parallel Group**: Wave 1 (after Task 1)
  - **Blocks**: Tasks 3, 4, 5, 6, 7
  - **Blocked By**: Task 1

  **References**:

  **Pattern References**:
  - `src/lib/types.ts` (created in Task 1) -- RFS type interface, specifically the `status` union type for status-badge props.
  - `src/lib/mock-data.ts` (created in Task 1) -- mock RFS entries for testing component rendering.
  - `src/app/fonts.ts` (created in Task 1) -- font CSS variable names for applying Fira Mono and Geist Mono.
  - `src/lib/constants.ts` (created in Task 1) -- OBOE_ASCII logo constant, referenced in header or landing.

  **External References**:
  - skills.sh nav pattern: `<a class="text-sm text-muted-foreground hover:text-foreground transition-colors">`. Adapt for light theme: `text-gray-500 hover:text-gray-900`.
  - skills.sh pill badge: `text-[10px] font-semibold uppercase leading-none px-1.5 py-0.5 rounded-full ring-1`. Reference for status-badge sizing.
  - skills.sh leaderboard row: rank number uses `font-mono text-sm text-muted-foreground tabular-nums`. Adapt for rfs-row rank display.
  - Box-drawing characters reference: ┌ (U+250C), ─ (U+2500), ┐ (U+2510), │ (U+2502), └ (U+2514), ┘ (U+2518). Must render inside font-mono context only.

  **WHY Each Reference Matters**:
  - types.ts: Status badge needs the exact status union type for type-safe props.
  - mock-data.ts: Components should be tested by rendering with actual mock data during dev.
  - skills.sh patterns: The specific Tailwind classes (text-[10px], tabular-nums, ring-1) produce the correct visual weight for this aesthetic.
  - Box-drawing chars: These characters misalign outside monospace context -- knowing the unicode codepoints prevents using lookalikes that render differently.

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Build passes with all components
    Tool: Bash
    Preconditions: All component files created
    Steps:
      1. Run `npx next build`
      2. Run `npx tsc --noEmit`
    Expected Result: Both exit code 0
    Failure Indicators: Import errors, type mismatches, JSX errors
    Evidence: .sisyphus/evidence/task-2-build-pass.txt

  Scenario: Header renders with nav links
    Tool: Bash (curl)
    Preconditions: Dev server running, layout.tsx updated with Header
    Steps:
      1. Run `curl -s http://localhost:3000/ | grep -o 'href="/browse"'`
      2. Run `curl -s http://localhost:3000/ | grep -o 'href="/new"'`
      3. Run `curl -s http://localhost:3000/ | grep -o 'href="/me"'`
    Expected Result: All three hrefs found in HTML output
    Failure Indicators: Missing href means nav link not rendered
    Evidence: .sisyphus/evidence/task-2-header-links.txt

  Scenario: Only header.tsx uses 'use client'
    Tool: Bash (grep)
    Preconditions: All components created
    Steps:
      1. Run `grep -rl "use client" src/components/`
    Expected Result: Only `src/components/header.tsx` listed
    Failure Indicators: Any other component file listed
    Evidence: .sisyphus/evidence/task-2-client-check.txt

  Scenario: ASCII box-drawing chars present
    Tool: Bash (grep)
    Preconditions: ascii-box.tsx created
    Steps:
      1. Run `grep -c '┌\|┐\|└\|┘\|│\|─' src/components/ascii-box.tsx`
    Expected Result: Count >= 6 (at least one of each character)
    Failure Indicators: Count 0 means box-drawing chars not used
    Evidence: .sisyphus/evidence/task-2-ascii-chars.txt
  ```

  **Commit**: YES
  - Message: `feat(components): add shared ASCII components (header, ascii-box, progress-bar, status-badge, rfs-row)`
  - Files: `src/components/header.tsx`, `src/components/ascii-box.tsx`, `src/components/progress-bar.tsx`, `src/components/status-badge.tsx`, `src/components/rfs-row.tsx`, `src/app/layout.tsx`
  - Pre-commit: `npx next build && npx tsc --noEmit`

- [ ] 3. Landing page (/)

  **What to do**:
  - Replace placeholder `src/app/page.tsx` with the landing page layout.
  - Grid layout: `grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-10 lg:gap-14` (same as skills.sh).
  - **Left column** (auto width, max-w-[390px]):
    - ASCII "OBOE" logo using `OBOE_ASCII` constant from `src/lib/constants.ts`. Render as `<pre>` with `font-[family-name:var(--font-fira-mono)] text-[15px] tracking-[-1px] leading-[125%] text-gray-400 select-none whitespace-pre`.
    - Tagline below logo: "The crowdfunded agent skills marketplace" -- `text-[19px] tracking-tight text-gray-900 font-mono font-medium uppercase`.
    - Description paragraph: 2-3 sentences from the spec's pitch. `text-gray-500 text-xl leading-tight tracking-tight`.
    - Command box (non-functional, decorative): `bg-gray-50 rounded-md px-4 py-3 font-mono text-sm`. Show: `$ curl https://oboe.dev/api/skills` with `$` in muted and URL in foreground. Include a copy icon (use the text character ⎘ or just the word "copy" in muted text).
  - **Right column** (1fr):
    - Section label: "Featured requests" -- `text-sm font-mono font-medium tracking-normal text-gray-900 uppercase mb-4`.
    - List of 4-5 open RFSs from mock data using `<RfsRow>` component. Wrap in an ASCII box using `<AsciiBox title="open">`.
    - Below: "Recently published" section with 3-4 published skills from mock data, same row format.
  - All internal links use `next/link`.
  - No `'use client'` -- this is a Server Component.

  **Must NOT do**:
  - No animations on the ASCII art (skills.sh has an animated reveal -- skip it)
  - No 'use client', useState, or useEffect
  - No responsive variants beyond the grid switching to single column

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Hero layout with ASCII art typography requires precise visual composition.
  - **Skills**: [`frontend-design`]
    - `frontend-design`: needed for bold aesthetic execution of the ASCII hero section.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 4, 5, 6, 7)
  - **Blocks**: F1-F4
  - **Blocked By**: Tasks 1, 2

  **References**:

  **Pattern References**:
  - `src/lib/constants.ts` (Task 1) -- `OBOE_ASCII` export, the literal ASCII art string.
  - `src/lib/mock-data.ts` (Task 1) -- filter by `status === 'open'` for featured, `status === 'published'` for recent.
  - `src/components/rfs-row.tsx` (Task 2) -- use for listing RFS entries.
  - `src/components/ascii-box.tsx` (Task 2) -- wrap the featured list.

  **External References**:
  - skills.sh landing grid: `grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-10 lg:gap-14`. The left column is `auto` (shrinks to content), right is `1fr` (fills remaining).
  - skills.sh command box: `bg-(--ds-gray-100)/80 border-none rounded-md px-4 py-3 font-mono text-sm`. Adapt for light: `bg-gray-50`.
  - skills.sh `$` prompt pattern: `<span class="text-muted-foreground">$</span><span class="ml-[1ch]">command</span>`.

  **WHY Each Reference Matters**:
  - constants.ts: Single source of truth for the ASCII logo -- don't recreate it per page.
  - skills.sh grid: The `auto_1fr` split is what makes the layout feel like a terminal man page (narrow left column, wide right).
  - `$` prompt pattern: The muted `$` + foreground command is the terminal signature visual.

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Landing page renders at HTTP 200
    Tool: Bash (curl)
    Preconditions: Dev server running
    Steps:
      1. Run `curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/`
    Expected Result: 200
    Evidence: .sisyphus/evidence/task-3-landing-200.txt

  Scenario: ASCII logo present in HTML
    Tool: Bash (curl + grep)
    Preconditions: Dev server running
    Steps:
      1. Run `curl -s http://localhost:3000/ | grep -c '███'`
    Expected Result: Count >= 1 (ASCII block characters present)
    Failure Indicators: Count 0 means logo not rendering
    Evidence: .sisyphus/evidence/task-3-ascii-logo.txt

  Scenario: Featured RFSs section exists
    Tool: Bash (curl + grep)
    Preconditions: Dev server running
    Steps:
      1. Run `curl -s http://localhost:3000/ | grep -ic 'featured\|open'`
    Expected Result: Count >= 2
    Evidence: .sisyphus/evidence/task-3-featured-rfs.txt

  Scenario: Build passes
    Tool: Bash
    Steps:
      1. Run `npx next build`
    Expected Result: Exit code 0
    Evidence: .sisyphus/evidence/task-3-build.txt
  ```

  **Commit**: YES
  - Message: `feat(landing): add ASCII hero landing page with featured RFSs`
  - Files: `src/app/page.tsx`
  - Pre-commit: `npx next build`

- [ ] 4. Browse page (/browse)

  **What to do**:
  - Create `src/app/browse/page.tsx`. Export metadata: `title: "Browse | Oboe"`.
  - **Filter bar** (top, non-functional): Row of status pills/tabs: "All", "Open", "Funded", "Published". Style: `font-mono text-sm`. "All" appears active (darker text, underline or bg-gray-100). Others are muted. Include a search input (text input with placeholder "Search skills and requests..." styled `bg-gray-50 border border-gray-200 rounded-md px-3 py-2 font-mono text-sm placeholder:text-gray-400 w-full max-w-sm`). None of these are functional -- static appearance only.
  - **Table header**: Row with columns: "#", "Title", "Status", "Funded", "Author". `text-xs font-mono uppercase text-gray-500 border-b border-gray-200 pb-2 mb-2`.
  - **Table body**: Render all mock RFS entries (10+) as `<RfsRow>` components with rank numbers. Each row is a `next/link` to `/browse/{rfs.id}`. Sort mock data: open RFSs first (by funding progress desc), then funded, then published.
  - **Column layout**: Rank (w-8, tabular-nums), Title (flex-1, truncate), Status (w-24, badge), Funded (w-32, compact progress "$31/$50"), Author (w-28, text-gray-500).
  - Wrap the entire table in semantic `<section>` with a heading.
  - No `'use client'` -- Server Component.

  **Must NOT do**:
  - No filter/search functionality (static UI elements only)
  - No useState for active tab state
  - No sorting logic -- data order is hardcoded in mock-data.ts
  - No pagination
  - No 'use client'

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Table layout with precise column alignment and monospace typography.
  - **Skills**: [`frontend-design`]
    - `frontend-design`: needed for the dense leaderboard table to feel clean rather than cramped.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 3, 5, 6, 7)
  - **Blocks**: F1-F4
  - **Blocked By**: Tasks 1, 2

  **References**:

  **Pattern References**:
  - `src/components/rfs-row.tsx` (Task 2) -- the row component for each entry.
  - `src/components/status-badge.tsx` (Task 2) -- status pill per row.
  - `src/lib/mock-data.ts` (Task 1) -- full mock data array to render.

  **External References**:
  - skills.sh leaderboard: ranked table with `tabular-nums` for rank, `font-mono text-sm` for metadata. Dense rows with minimal vertical padding.
  - skills.sh search input: non-functional search appears as `bg-gray-100/80 rounded-md font-mono text-sm` on the page.

  **WHY Each Reference Matters**:
  - rfs-row.tsx: Consistent row rendering between landing featured list and full browse table.
  - skills.sh leaderboard: The dense, scannable row height and monospace rank numbers are the signature browse UX.

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Browse page at HTTP 200
    Tool: Bash (curl)
    Steps:
      1. Run `curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/browse`
    Expected Result: 200
    Evidence: .sisyphus/evidence/task-4-browse-200.txt

  Scenario: All mock RFS entries rendered
    Tool: Bash (curl + grep)
    Steps:
      1. Run `curl -s http://localhost:3000/browse | grep -c 'href="/browse/'`
    Expected Result: Count >= 8 (at least 8 linked RFS rows)
    Failure Indicators: Count < 8 means not all mock entries rendered
    Evidence: .sisyphus/evidence/task-4-rfs-count.txt

  Scenario: Status badges present for all states
    Tool: Bash (curl + grep)
    Steps:
      1. Run `curl -s http://localhost:3000/browse | grep -ic 'open\|funded\|fulfilled\|published'`
    Expected Result: Count >= 4 (all statuses represented)
    Evidence: .sisyphus/evidence/task-4-statuses.txt

  Scenario: Build passes
    Tool: Bash
    Steps:
      1. Run `npx next build`
    Expected Result: Exit code 0
    Evidence: .sisyphus/evidence/task-4-build.txt
  ```

  **Commit**: YES
  - Message: `feat(browse): add RFS browse table page with status filters`
  - Files: `src/app/browse/page.tsx`
  - Pre-commit: `npx next build`

- [ ] 5. RFS detail page (/browse/[id])

  **What to do**:
  - Create `src/app/browse/[id]/page.tsx`. Export `generateMetadata` that returns `title: "{rfs.title} | Oboe"`.
  - **CRITICAL Next.js 16**: `params` is a Promise. The page function signature must be:
    ```tsx
    export default async function Page({ params }: { params: Promise<{ id: string }> }) {
      const { id } = await params
      // ...
    }
    ```
  - Look up RFS from mock data by id. If not found, show a simple "RFS not found" text (no not-found.tsx).
  - **Two-column sidebar layout**: `grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8`.
  - **Left column** (main content):
    - Title: `text-2xl font-medium tracking-tight text-gray-900`.
    - Status badge below title.
    - "Scope" section wrapped in `<AsciiBox title="scope">`: the RFS description/scope text from mock data.
    - If published: "Skill preview" section (truncated skill content, first 200 chars with "..." and a muted "Buy to read full skill" note).
  - **Right sidebar** (300px):
    - Wrapped in `<AsciiBox title="funding">`.
    - `<ProgressBar>` component showing current/goal.
    - Stats: "N backers", "Created {date}".
    - CTA button depending on status:
      - `open`: "Fund this request" button -- `bg-gray-900 text-white font-mono text-sm px-4 py-2 rounded-md w-full`.
      - `funded`: "Claim & write this skill" button -- same style, green-tinted bg.
      - `fulfilled`: "Under review" -- disabled/muted button.
      - `published`: "Buy for $0.005" button -- same style.
    - All buttons are static -- no onClick handlers.
    - Below CTA: list of top 3 backers (name + amount) from mock contributions.
  - No `'use client'` -- async Server Component.

  **Must NOT do**:
  - No onClick handlers on buttons
  - No 'use client'
  - No not-found.tsx (inline fallback only)
  - Do NOT use `({ params: { id } })` destructuring -- params is a Promise in Next.js 16

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Two-column layout with sidebar, multiple visual states, ASCII box wrapping.
  - **Skills**: [`frontend-design`]
    - `frontend-design`: needed for sidebar layout balance and CTA button styling per state.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 3, 4, 6, 7)
  - **Blocks**: F1-F4
  - **Blocked By**: Tasks 1, 2

  **References**:

  **Pattern References**:
  - `src/lib/mock-data.ts` (Task 1) -- look up RFS by id, get related contributions for backer list.
  - `src/components/ascii-box.tsx` (Task 2) -- wraps scope section and funding sidebar.
  - `src/components/progress-bar.tsx` (Task 2) -- full progress display (fraction + ASCII bar).
  - `src/components/status-badge.tsx` (Task 2) -- status pill next to title.

  **External References**:
  - Next.js 16 dynamic routes: `params` is `Promise<{ id: string }>`, must be awaited. See `node_modules/next/dist/docs/` for current API.

  **WHY Each Reference Matters**:
  - Mock data lookup by id: the detail page must handle both existing and non-existing ids gracefully.
  - ASCII box: wrapping scope + funding sections in box-drawing borders gives the page its terminal-document feel.
  - Next.js 16 params: getting this wrong causes a runtime error. The Promise pattern is a breaking change from Next.js 14/15.

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Detail page renders for valid id
    Tool: Bash (curl)
    Steps:
      1. Run `curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/browse/1`
    Expected Result: 200
    Evidence: .sisyphus/evidence/task-5-detail-200.txt

  Scenario: Detail page handles missing id
    Tool: Bash (curl)
    Steps:
      1. Run `curl -s http://localhost:3000/browse/99999 | grep -ic 'not found'`
    Expected Result: Count >= 1
    Evidence: .sisyphus/evidence/task-5-not-found.txt

  Scenario: Funding sidebar present
    Tool: Bash (curl + grep)
    Steps:
      1. Run `curl -s http://localhost:3000/browse/1 | grep -ic 'fund\|backer'`
    Expected Result: Count >= 2
    Evidence: .sisyphus/evidence/task-5-funding-sidebar.txt

  Scenario: Build passes
    Tool: Bash
    Steps:
      1. Run `npx next build`
    Expected Result: Exit code 0
    Evidence: .sisyphus/evidence/task-5-build.txt
  ```

  **Commit**: YES
  - Message: `feat(detail): add RFS detail page with funding sidebar`
  - Files: `src/app/browse/[id]/page.tsx`
  - Pre-commit: `npx next build`

- [ ] 6. New RFS form page (/new)

  **What to do**:
  - Create `src/app/new/page.tsx`. Export metadata: `title: "New request | Oboe"`.
  - Page heading: "New request for skill" -- `text-2xl font-medium tracking-tight`.
  - Static form wrapped in `<AsciiBox title="create">`. Fields:
    - **Title**: `<input type="text" placeholder="e.g. Next.js middleware CSRF hardening" />`. Styled: `bg-gray-50 border border-gray-200 rounded-md px-3 py-2 font-mono text-sm w-full placeholder:text-gray-400`.
    - **Description**: `<textarea placeholder="Describe the security expertise needed..." rows={6} />`. Same styling as input.
    - **Scope**: `<textarea placeholder="What should the skill file cover? Be specific..." rows={4} />`. Same styling.
    - **Funding goal**: `<input type="text" placeholder="$50.00" />`. Styled same, max-w-xs.
  - **Submit button**: "Publish request" -- `bg-gray-900 text-white font-mono text-sm px-6 py-2 rounded-md`. Static, does nothing.
  - Below the form: a "Preview" section showing what the RFS would look like as a browse row. Use a hardcoded example RFS rendered with `<RfsRow>` inside `<AsciiBox title="preview">`.
  - All form elements are static HTML. No form submission, no validation, no onChange handlers.
  - No `'use client'` -- static Server Component (form elements don't need client interactivity for visual shell).

  **Must NOT do**:
  - No form validation or error states
  - No onChange, onSubmit, or any event handlers
  - No 'use client' (form is decorative)
  - No character counters or helper text
  - No file upload fields

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Form layout with input styling matching the monospace aesthetic.
  - **Skills**: [`frontend-design`]
    - `frontend-design`: form inputs need to feel like terminal input fields, not generic HTML forms.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 3, 4, 5, 7)
  - **Blocks**: F1-F4
  - **Blocked By**: Tasks 1, 2

  **References**:

  **Pattern References**:
  - `src/components/ascii-box.tsx` (Task 2) -- wraps the form and preview sections.
  - `src/components/rfs-row.tsx` (Task 2) -- used in the preview section.

  **External References**:
  - skills.sh input style: `bg-gray-100/80 rounded-md font-mono text-sm`. Adapt for light: `bg-gray-50 border border-gray-200`.

  **WHY Each Reference Matters**:
  - ASCII box: wrapping the form in box-drawing borders maintains the terminal-document aesthetic.
  - Input styling: monospace font in inputs makes them feel like terminal prompts, not web forms.

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: New RFS page at HTTP 200
    Tool: Bash (curl)
    Steps:
      1. Run `curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/new`
    Expected Result: 200
    Evidence: .sisyphus/evidence/task-6-new-200.txt

  Scenario: Form inputs present
    Tool: Bash (curl + grep)
    Steps:
      1. Run `curl -s http://localhost:3000/new | grep -c '<input\|<textarea'`
    Expected Result: Count >= 4 (title + description + scope + funding goal)
    Evidence: .sisyphus/evidence/task-6-form-inputs.txt

  Scenario: No client directive
    Tool: Bash (grep)
    Steps:
      1. Run `grep -c "use client" src/app/new/page.tsx`
    Expected Result: 0
    Evidence: .sisyphus/evidence/task-6-no-client.txt

  Scenario: Build passes
    Tool: Bash
    Steps:
      1. Run `npx next build`
    Expected Result: Exit code 0
    Evidence: .sisyphus/evidence/task-6-build.txt
  ```

  **Commit**: YES
  - Message: `feat(new): add static RFS creation form page`
  - Files: `src/app/new/page.tsx`
  - Pre-commit: `npx next build`

- [ ] 7. Profile page (/me)

  **What to do**:
  - Create `src/app/me/page.tsx`. Export metadata: `title: "Profile | Oboe"`.
  - Shows mock data for a "logged-in" user (use the first mock user as "current user").
  - **User header**: Name (`text-xl font-medium`), wallet address truncated (`0x742d...fE00` in `font-mono text-sm text-gray-500`).
  - **Three sections**, each wrapped in `<AsciiBox>`:
    1. **"My requests"** (`title="my requests"`): List of RFSs authored by the current user from mock data. Render with `<RfsRow>`. If none, show italic muted text "No requests yet."
    2. **"My contributions"** (`title="contributions"`): List showing RFS title + amount contributed. Pull from mock contributions where userId matches. Format: `"Next.js middleware CSRF hardening — $15.00"` per line, font-mono text-sm.
    3. **"Purchased skills"** (`title="purchased"`): List of published skills the user has purchased from mock data. Show skill title + "via {rfs title}". If none, show "No purchases yet."
  - No sign-in/sign-out button. The page always shows the mock user. No auth logic.
  - No `'use client'`.

  **Must NOT do**:
  - No auth integration or sign-in UI
  - No 'use client'
  - No editable profile fields
  - No wallet connection logic

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Profile layout with multiple data sections and ASCII box wrapping.
  - **Skills**: [`frontend-design`]
    - `frontend-design`: three distinct content sections need clear visual hierarchy within the ASCII aesthetic.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 3, 4, 5, 6)
  - **Blocks**: F1-F4
  - **Blocked By**: Tasks 1, 2

  **References**:

  **Pattern References**:
  - `src/lib/mock-data.ts` (Task 1) -- filter RFSs by authorId, contributions by userId, purchases by userId.
  - `src/lib/types.ts` (Task 1) -- User, RFS, Contribution, Purchase types.
  - `src/components/ascii-box.tsx` (Task 2) -- wraps each section.
  - `src/components/rfs-row.tsx` (Task 2) -- renders RFS entries in "my requests" section.

  **WHY Each Reference Matters**:
  - Mock data filtering: the profile page is the only page that filters by user -- the mock data must have enough entries linked to the "current user" to look populated.
  - ASCII box per section: separates the three data areas visually using box-drawing borders.

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Profile page at HTTP 200
    Tool: Bash (curl)
    Steps:
      1. Run `curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/me`
    Expected Result: 200
    Evidence: .sisyphus/evidence/task-7-me-200.txt

  Scenario: User wallet address displayed
    Tool: Bash (curl + grep)
    Steps:
      1. Run `curl -s http://localhost:3000/me | grep -c '0x'`
    Expected Result: Count >= 1 (wallet address rendered)
    Evidence: .sisyphus/evidence/task-7-wallet.txt

  Scenario: Three content sections present
    Tool: Bash (curl + grep)
    Steps:
      1. Run `curl -s http://localhost:3000/me | grep -ic 'request\|contribution\|purchased'`
    Expected Result: Count >= 3
    Evidence: .sisyphus/evidence/task-7-sections.txt

  Scenario: Build passes
    Tool: Bash
    Steps:
      1. Run `npx next build`
    Expected Result: Exit code 0
    Evidence: .sisyphus/evidence/task-7-build.txt
  ```

  **Commit**: YES
  - Message: `feat(profile): add profile page with mock user data`
  - Files: `src/app/me/page.tsx`
  - Pre-commit: `npx next build`

---

## Final Verification Wave

> 4 review agents run in PARALLEL. ALL must APPROVE. Present consolidated results to user and get explicit "okay" before completing.

- [ ] F1. **Plan Compliance Audit** -- `oracle`
  Read the plan end-to-end. For each "Must Have": verify implementation exists (read file, curl endpoint). For each "Must NOT Have": search codebase for forbidden patterns (dark: classes, 'use client' without hooks, new packages in package.json). Check evidence files exist in .sisyphus/evidence/. Compare deliverables against plan.
  Output: `Must Have [N/N] | Must NOT Have [N/N] | Tasks [N/N] | VERDICT: APPROVE/REJECT`

- [ ] F2. **Code Quality Review** -- `unspecified-high`
  Run `tsc --noEmit` + `next lint`. Review all changed files for: `as any`, empty catches, console.log, commented-out code, unused imports. Check for AI slop: excessive comments, over-abstraction, generic variable names. Verify no `useState`/`useEffect` outside nav component. Verify all internal links use `next/link`.
  Output: `Build [PASS/FAIL] | Lint [PASS/FAIL] | Files [N clean/N issues] | VERDICT`

- [ ] F3. **Real Manual QA** -- `unspecified-high` (+ `playwright` skill)
  Start dev server. Screenshot all 5 pages. Verify: ASCII logo renders with monospace alignment, box-drawing characters connect properly, progress bars display correctly, status badges show for all 4 states, nav links work between all pages, no Arial/system font fallback visible, light color scheme throughout.
  Output: `Pages [5/5 render] | ASCII [aligned/broken] | Navigation [N/N links work] | VERDICT`

- [ ] F4. **Scope Fidelity Check** -- `deep`
  For each task: read "What to do", read actual files. Verify 1:1 -- everything in spec was built, nothing beyond spec was built. Check: no dark mode classes, no new npm packages, no 'use client' abuse, no form handlers, no filter logic. Flag any unaccounted files.
  Output: `Tasks [N/N compliant] | Scope [CLEAN/N issues] | VERDICT`

---

## Commit Strategy

| After Task | Message | Files |
|-----------|---------|-------|
| 1 | `chore(scaffold): clean boilerplate, add fonts + types + mock data` | globals.css, layout.tsx, fonts.ts, types.ts, mock-data.ts, page.tsx |
| 2 | `feat(components): add shared ASCII components` | components/*.tsx |
| 3 | `feat(landing): add ASCII hero landing page` | app/page.tsx |
| 4 | `feat(browse): add RFS browse table page` | app/browse/page.tsx |
| 5 | `feat(detail): add RFS detail page with sidebar` | app/browse/[id]/page.tsx |
| 6 | `feat(new): add static RFS creation form` | app/new/page.tsx |
| 7 | `feat(profile): add profile page with mock data` | app/me/page.tsx |

---

## Success Criteria

### Verification Commands
```bash
next build              # Expected: exits 0
tsc --noEmit            # Expected: exits 0
npx next lint           # Expected: no errors
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/          # Expected: 200
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/browse     # Expected: 200
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/browse/1   # Expected: 200
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/new        # Expected: 200
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/me         # Expected: 200
```

### Final Checklist
- [ ] All "Must Have" items present
- [ ] All "Must NOT Have" items absent
- [ ] All 5 pages render at HTTP 200
- [ ] Build + typecheck + lint all pass
- [ ] ASCII art aligned, box-drawing chars connected
- [ ] All 4 RFS statuses represented in mock data and visually distinct
