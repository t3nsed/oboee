# Oboe -- crowdfunded agent skills marketplace

## What this is

AI coding agents are bad at security. They'll `as any` their way through type errors, skip input validation, and hardcode secrets if it makes the build pass. More prompting helps, but you're fighting the model's instinct to reach "it works" as fast as possible.

Generic skill files (like the ones on skills.sh) improve things, but they stay shallow. A 200-line markdown file about "auth best practices" isn't going to teach an agent how to harden a GraphQL subscription layer against batching attacks. That kind of knowledge lives in the heads of security researchers who have no reason to write it up for free.

Oboe fixes the incentive problem. Security researchers set a price for their time. Developers crowdfund that price. Once the threshold is met, the researcher writes a deep, specialized skill file. Everyone who contributed gets access on the platform. Everyone else can buy it later for a fraction of a cent via MPP micropayments.

## How it works

### The funding loop

1. A security researcher signs up (BetterAuth) and proposes a skill -- title, scope, price threshold.
2. Developers browse open proposals and back the ones they care about. Contributions go toward the threshold.
3. When the threshold is met, the researcher gets notified and writes the skill.
4. Oboe reviews and publishes it.

### Access tiers

- **Backers** (contributed >= minimum amount): immediate access on Oboe, no extra charge.
- **Everyone else**: search the catalog, buy any published skill for sub-$0.01 via MPP micropayment (HTTP 402 flow).

### Payment rails

All payments go through the Machine Payments Protocol. MPP uses HTTP 402 challenges with Tempo stablecoins (pathUSD/USDC). The `mppx` SDK handles the full cycle -- challenge, sign, verify -- on both server and client. Agents pay the same way humans do: an HTTP request, a 402 response, a signed payment, a retry. No API keys, no subscriptions.

## Why MPP

The whole point of MPP is sub-cent transactions without the overhead of traditional payment processors. Stripe takes 30 cents minimum per transaction. That kills any model where a skill file costs $0.005. MPP on Tempo settles in milliseconds for near-zero fees. It also means agents can buy skills autonomously during execution -- no human in the loop.

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router) |
| Auth | BetterAuth |
| Payments | mppx 0.4.7 (Tempo stablecoins) |
| Frontend | React 19, Tailwind CSS 4 |
| Language | TypeScript 5 |

## Entities

**Researcher** -- signs up, proposes skills, writes them once funded. Has a wallet address for payouts.

**Backer** -- signs up, browses proposals, contributes funds toward a skill's threshold.

**Skill proposal** -- title, description, scope, funding threshold, current amount, status (open / funded / published).

**Skill file** -- the actual markdown/structured content delivered after a researcher fulfills a funded proposal.

**Purchase** -- a sub-$0.01 MPP transaction from a non-backer to access a published skill.

## Routes (planned)

```
/                       Landing page
/skills                 Browse published skills + open proposals
/skills/[id]            Skill detail (fund if open, buy if published)
/dashboard              Researcher dashboard (proposals, payouts)
/api/auth/*             BetterAuth endpoints
/api/skills             CRUD for proposals
/api/skills/[id]/fund   MPP-gated funding endpoint
/api/skills/[id]/buy    MPP-gated purchase endpoint (sub-$0.01)
```

## What "deep skill" means here

A generic skill file says "validate user input." A deep skill file walks an agent through:

- Which validation library to use for this specific framework version.
- What the actual attack surface looks like (with examples).
- Where the framework's own defenses fall short and what to do about it.
- Code patterns the agent should generate, and patterns it should refuse to generate.
- How to verify the fix actually works (not just "write tests").

The researcher's domain expertise is the product. The skill file is the delivery format.

## Non-goals (for the hackathon)

- Dispute resolution or refund logic.
- Researcher reputation/rating system.
- Skill versioning or updates.
- Mobile-optimized UI.
- Production deployment (testnet only).
