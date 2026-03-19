import type { Metadata } from "next"
import { fetchQuery } from "convex/nextjs"
import { api } from "../../../../convex/_generated/api"
import type { Id } from "../../../../convex/_generated/dataModel"
import { AsciiBox } from "@/components/ascii-box"
import { ProgressBar } from "@/components/progress-bar"
import { StatusBadge } from "@/components/status-badge"
import { RfsActions } from "@/components/rfs-actions"
import { baseUnitsToNumber } from "@/lib/view-models"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  try {
    const detail = await fetchQuery(api.skills.get, { rfsId: id as Id<"rfs"> })
    return { title: detail.rfs ? `${detail.rfs.title} | Oboe` : "Not found | Oboe" }
  } catch {
    return { title: "Not found | Oboe" }
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const rfsId = id as Id<"rfs">

  let detail: Awaited<ReturnType<typeof fetchQuery<typeof api.skills.get>>>

  try {
    detail = await fetchQuery(api.skills.get, { rfsId })
  } catch {
    return (
      <div className="py-16 text-center text-muted-foreground font-mono text-sm">
        rfs not found
      </div>
    )
  }

  const contributions = await fetchQuery(api.rfs.listContributions, { rfsId })
  const rfs = detail.rfs

  if (!rfs) {
    return (
      <div className="py-16 text-center text-muted-foreground font-mono text-sm">
        rfs not found
      </div>
    )
  }

  const skill = detail.skill
  const currentAmount = baseUnitsToNumber(rfs.currentAmountBaseUnits)
  const fundingThreshold = baseUnitsToNumber(rfs.fundingThresholdBaseUnits)
  const displayStatus = rfs.status === "cancelled" ? "fulfilled" : rfs.status

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 my-8 max-w-4xl">
      <div>
        <h1 className="text-2xl font-medium tracking-tight break-words">{rfs.title}</h1>
        <div className="mt-2">
          <StatusBadge status={displayStatus} />
        </div>
        <p className="text-sm text-muted-foreground font-mono mt-1">
          by {rfs.authorUserId.slice(0, 8)}...
        </p>

        <AsciiBox title="scope" className="mt-6">
          <p className="text-sm leading-relaxed break-words">{rfs.scope}</p>
          <p className="text-sm leading-relaxed mt-2 break-words">{rfs.description}</p>
        </AsciiBox>

        {(rfs.status === "published" || rfs.status === "fulfilled") &&
          skill && (
            <AsciiBox title="skill preview" className="mt-6">
              <p className="text-sm leading-relaxed break-words">
                {skill.contentMarkdown.slice(0, 200)}...
              </p>
              <p className="text-xs text-muted-foreground mt-2 font-mono">
                buy to read full skill
              </p>
            </AsciiBox>
          )}
      </div>

      <div>
        <AsciiBox title="funding">
          <ProgressBar current={currentAmount} goal={fundingThreshold} />

          <div className="mt-4 space-y-1 text-sm font-mono text-muted-foreground">
            <p>{contributions.length} backers</p>
            <p>
              created{" "}
              {new Date(rfs._creationTime).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>

          <RfsActions
            rfsId={rfs._id}
            status={displayStatus}
            canFund={detail.canFund}
            canClaim={detail.canClaim}
            canBuy={detail.canBuy}
            skillId={skill?._id}
            hasSkill={Boolean(skill)}
          />

          <div className="mt-4 border-t border-border pt-3">
            <h3 className="text-xs font-mono uppercase text-muted-foreground mb-2">
              backers
            </h3>
            {contributions.slice(0, 3).map((c) => {
              return (
                <div
                  key={c.id}
                  className="flex justify-between font-mono text-sm"
                >
                  <span className="truncate">{c.backerUserId.slice(0, 8)}...</span>
                  <span>${baseUnitsToNumber(c.amountBaseUnits).toFixed(2)}</span>
                </div>
              )
            })}
            {contributions.length === 0 && (
              <p className="text-xs text-muted-foreground font-mono">
                no backers yet
              </p>
            )}
          </div>
        </AsciiBox>
      </div>
    </div>
  )
}
