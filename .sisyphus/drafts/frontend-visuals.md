# Draft: Frontend visuals (static, no backend)

## Requirements (confirmed)
- Light color scheme (white/off-white bg, black text, gray accents)
- All 5 pages: Landing (/), Browse (/browse), RFS Detail (/browse/[id]), New RFS (/new), Profile (/me)
- Full ASCII aesthetic: box-drawing characters for borders/cards, ASCII art logo, code-block sections
- Progress visualization: fraction text + ASCII progress bar
- No backend hookup -- static/mock data only
- skills.sh style: monospace, minimal, terminal-like but in a browser

## Technical Decisions
- Geist Mono already loaded via next/font (CSS var --font-geist-mono)
- Tailwind CSS 4 with inline @theme -- no config file needed
- Light/dark mode via CSS custom properties already set up
- No existing components to work around -- clean slate
- Tailwind 4 zinc palette for secondary colors (existing convention)

## Research Findings
- skills.sh uses Fira Mono for ASCII art, Geist Mono for UI monospace, Geist Sans for body/nav
- Layout: sticky header h-14, max-w-6xl container, grid with auto/1fr columns
- Nav: simple text links, muted-foreground to foreground on hover, 150ms transitions
- ASCII art "SKILLS" banner: Fira Mono, tracking-[-1px], text-[15px], select-none
- Color tokens: Geist --ds-gray-* scale (100-1000), gray-alpha for overlays
- skills.sh is dark-only (class="dark" hardcoded) -- we're doing LIGHT instead
- Command prompt pattern: `$` in muted, command in foreground, args in muted
- Pill badges: text-[10px] font-semibold uppercase, ring-1 border, rounded-full
- Surfaces defined by bg color, not borders. Shadows use hairline white ring
- Leaderboard: tabular-nums for rank, font-mono for labels
- We already have Geist + Geist Mono loaded via next/font -- just need Fira Mono for ASCII art

## Open Questions
- (all resolved)

## Design Decisions (Round 2)
- Landing: ASCII 'OBOE' hero + tagline left, featured open RFSs right (skills.sh grid)
- Browse: Table list (skills.sh ranked table style) -- dense, scannable rows
- Detail (/browse/[id]): Sidebar layout -- description left, funding status/progress/CTA right
- Font: Add Fira Mono via next/font/google for ASCII art. Geist Mono for UI, Geist Sans for body.
- QA: Playwright screenshots per page for visual verification

## Scope Boundaries
- INCLUDE: All 5 page shells with mock data, shared layout/nav, ASCII art components
- EXCLUDE: Backend API calls, auth integration, real payment flows, form submissions
