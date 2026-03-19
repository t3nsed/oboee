import { v } from "convex/values";

import { mutation, query } from "./_generated/server";

const MAINNET_USDC = "0x20c000000000000000000000b9537d11c60e8b50";

export const seedCveDataset = mutation({
  args: {},
  returns: v.object({
    createdRfsIds: v.array(v.id("rfs")),
    reusedRfsIds: v.array(v.id("rfs")),
  }),
  handler: async (ctx) => {
    const definitions = [
      {
        title: "CVE chain: edge exhaustion -> origin desync",
        description:
          "Map mitigations for CVE-2023-44487 (HTTP/2 Rapid Reset) chaining into origin instability.",
        scope:
          "Include load-shedding thresholds, WAF signatures, and observability checkpoints for replay-safe recovery.",
        tags: ["cve-2023-44487", "http2", "dos", "gateway"],
        fundingThresholdBaseUnits: BigInt(9_000),
        minimumContributionBaseUnits: BigInt(1_000),
        currentAmountBaseUnits: BigInt(0),
        status: "open" as const,
      },
      {
        title: "CVE chain: log4shell -> container breakout",
        description:
          "Harden response workflow for CVE-2021-44228 leading to post-exploit runtime abuse like CVE-2024-21626.",
        scope:
          "Provide kill-chain detection points, emergency patch rollout, and container runtime guardrails.",
        tags: ["cve-2021-44228", "cve-2024-21626", "java", "containers"],
        fundingThresholdBaseUnits: BigInt(8_500),
        minimumContributionBaseUnits: BigInt(1_000),
        currentAmountBaseUnits: BigInt(0),
        status: "open" as const,
      },
      {
        title: "CVE chain: xz backdoor supply-chain verification",
        description:
          "Build verification strategy around CVE-2024-3094 to prevent poisoned dependency artifacts in CI/CD.",
        scope:
          "Cover provenance checks, binary reproducibility, staged rollout policy, and rollback controls.",
        tags: ["cve-2024-3094", "supply-chain", "ci-cd", "provenance"],
        fundingThresholdBaseUnits: BigInt(9_000),
        minimumContributionBaseUnits: BigInt(1_000),
        currentAmountBaseUnits: BigInt(0),
        status: "open" as const,
      },
      {
        title: "CVE chain playbook: ingress-to-runtime containment",
        description:
          "Published starter guide connecting ingress abuse, app RCE, and runtime containment controls.",
        scope:
          "MVP-ready markdown with alert routing, patch priorities, and tabletop checklist.",
        tags: ["cve-playbook", "incident-response", "published"],
        fundingThresholdBaseUnits: BigInt(9_000),
        minimumContributionBaseUnits: BigInt(1_000),
        currentAmountBaseUnits: BigInt(9_000),
        status: "published" as const,
      },
    ];

    const existing = await ctx.db.query("rfs").collect();
    const byTitle = new Map(existing.map((row) => [row.title, row]));

    const createdRfsIds: Array<(typeof existing)[number]["_id"]> = [];
    const reusedRfsIds: Array<(typeof existing)[number]["_id"]> = [];

    for (const def of definitions) {
      const found = byTitle.get(def.title);
      if (found) {
        reusedRfsIds.push(found._id);
        continue;
      }

      const rfsId = await ctx.db.insert("rfs", {
        authorUserId: "seed:researcher:redteam",
        claimantUserId: def.status === "published" ? "seed:researcher:redteam" : undefined,
        title: def.title,
        description: def.description,
        scope: def.scope,
        tags: def.tags,
        fundingThresholdBaseUnits: def.fundingThresholdBaseUnits,
        minimumContributionBaseUnits: def.minimumContributionBaseUnits,
        currentAmountBaseUnits: def.currentAmountBaseUnits,
        fundingTokenAddress: MAINNET_USDC,
        status: def.status,
      });

      if (def.status === "published") {
        await ctx.db.insert("skills", {
          rfsId,
          authorUserId: "seed:researcher:redteam",
          contentMarkdown:
            "# Ingress-to-runtime containment\n\n1. Detect edge flood signatures\n2. Isolate vulnerable app nodes\n3. Rotate runtime credentials\n4. Verify container boundary integrity\n",
          summary: "CVE chain containment baseline for MVP testing.",
          tags: def.tags,
          purchasePriceBaseUnits: BigInt(5_000),
          status: "published",
        });
      }

      createdRfsIds.push(rfsId);
    }

    return {
      createdRfsIds,
      reusedRfsIds,
    };
  },
});

export const listSeededRfs = query({
  args: {},
  returns: v.array(
    v.object({
      id: v.id("rfs"),
      title: v.string(),
      status: v.union(
        v.literal("open"),
        v.literal("funded"),
        v.literal("fulfilled"),
        v.literal("published"),
        v.literal("cancelled"),
      ),
      currentAmountBaseUnits: v.int64(),
      fundingThresholdBaseUnits: v.int64(),
    }),
  ),
  handler: async (ctx) => {
    const rows = await ctx.db.query("rfs").order("desc").collect();
    return rows
      .filter((row) => row.authorUserId === "seed:researcher:redteam")
      .map((row) => ({
        id: row._id,
        title: row.title,
        status: row.status,
        currentAmountBaseUnits: row.currentAmountBaseUnits,
        fundingThresholdBaseUnits: row.fundingThresholdBaseUnits,
      }));
  },
});
