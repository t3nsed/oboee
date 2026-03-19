import type { Metadata } from "next"
import {
  getRFSById,
  getContributionsForRFS,
  getSkillForRFS,
  getUserById,
} from "@/lib/mock-data"
import { AsciiBox } from "@/components/ascii-box"
import { ProgressBar } from "@/components/progress-bar"
import { StatusBadge } from "@/components/status-badge"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const rfs = getRFSById(id)
  return { title: rfs ? `${rfs.title} | Oboe` : "Not found | Oboe" }
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const rfs = getRFSById(id)

  if (!rfs) {
    return (
      <div className="py-16 text-center text-muted-foreground font-mono text-sm">
        rfs not found
      </div>
    )
  }

  const author = getUserById(rfs.authorId)
  const contributions = getContributionsForRFS(rfs.id)
  const skill = getSkillForRFS(rfs.id)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 my-8">
      <div>
        <h1 className="text-2xl font-medium tracking-tight">{rfs.title}</h1>
        <div className="mt-2">
          <StatusBadge status={rfs.status} />
        </div>
        <p className="text-sm text-muted-foreground font-mono mt-1">
          by {author?.name}
        </p>

        <AsciiBox title="scope" className="mt-6">
          <p className="text-sm leading-relaxed">{rfs.scope}</p>
          <p className="text-sm leading-relaxed mt-2">{rfs.description}</p>
        </AsciiBox>

        {(rfs.status === "published" || rfs.status === "fulfilled") &&
          skill && (
            <AsciiBox title="skill preview" className="mt-6">
              <p className="text-sm leading-relaxed">
                {skill.content.slice(0, 200)}...
              </p>
              <p className="text-xs text-muted-foreground mt-2 font-mono">
                buy to read full skill
              </p>
            </AsciiBox>
          )}
      </div>

      <div>
        <AsciiBox title="funding">
          <ProgressBar current={rfs.currentAmount} goal={rfs.fundingThreshold} />

          <div className="mt-4 space-y-1 text-sm font-mono text-muted-foreground">
            <p>{contributions.length} backers</p>
            <p>
              created{" "}
              {new Date(rfs.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>

          {rfs.status === "open" && (
            <button type="button" className="w-full bg-gray-900 text-white font-mono text-sm px-4 py-2 rounded-md mt-4">
              fund this request
            </button>
          )}
          {rfs.status === "funded" && (
            <button type="button" className="w-full bg-emerald-700 text-white font-mono text-sm px-4 py-2 rounded-md mt-4">
              claim &amp; write this skill
            </button>
          )}
          {rfs.status === "fulfilled" && (
            <button
              type="button"
              className="w-full bg-gray-200 text-gray-500 font-mono text-sm px-4 py-2 rounded-md cursor-not-allowed mt-4"
              disabled
            >
              under review
            </button>
          )}
          {rfs.status === "published" && (
            <button type="button" className="w-full bg-gray-900 text-white font-mono text-sm px-4 py-2 rounded-md mt-4">
              buy for $0.005
            </button>
          )}

          <div className="mt-4 border-t border-border pt-3">
            <h3 className="text-xs font-mono uppercase text-muted-foreground mb-2">
              backers
            </h3>
            {contributions.slice(0, 3).map((c) => {
              const backer = getUserById(c.userId)
              return (
                <div
                  key={c.id}
                  className="flex justify-between font-mono text-sm"
                >
                  <span>{backer?.name ?? "anon"}</span>
                  <span>${c.amount.toFixed(2)}</span>
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
