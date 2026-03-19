import type { Metadata } from "next"
import { rfsList } from "@/lib/mock-data"
import { RFSRow } from "@/components/rfs-row"

export const metadata: Metadata = { title: "Browse | Oboe" }

const statusOrder = ["open", "funded", "fulfilled", "published"] as const

const sortedRfs = [...rfsList].sort((a, b) => {
  const aIdx = statusOrder.indexOf(a.status)
  const bIdx = statusOrder.indexOf(b.status)
  if (aIdx !== bIdx) return aIdx - bIdx
  if (a.status === "open" && b.status === "open") {
    const aRatio = a.currentAmount / a.fundingThreshold
    const bRatio = b.currentAmount / b.fundingThreshold
    return bRatio - aRatio
  }
  return 0
})

const pills = [
  { label: "all", active: true },
  { label: "open", active: false },
  { label: "funded", active: false },
  { label: "published", active: false },
]

export default function BrowsePage() {
  return (
    <section>
      <h1 className="text-xl font-medium tracking-tight mb-6 mt-8">Browse</h1>

      <div className="flex items-center gap-3 mb-6 flex-wrap">
        {pills.map((pill) => (
          <span
            key={pill.label}
            className={
              pill.active
                ? "font-mono text-xs px-2.5 py-1 rounded-full bg-gray-900 text-white"
                : "font-mono text-xs px-2.5 py-1 rounded-full text-muted-foreground ring-1 ring-gray-200 hover:ring-gray-300"
            }
          >
            {pill.label}
          </span>
        ))}
        <input
          type="text"
          placeholder="search skills and requests..."
          className="bg-gray-50 border border-gray-200 rounded-md px-3 py-1.5 font-mono text-sm placeholder:text-gray-400 w-full max-w-sm"
          readOnly
        />
      </div>

      <div className="flex items-center gap-4 px-3 py-2 text-xs font-mono uppercase text-muted-foreground border-b border-gray-200 mb-1">
        <span className="w-6 text-right">#</span>
        <span className="flex-1">title</span>
        <span className="w-20">status</span>
        <span className="w-28 text-right">funded</span>
        <span className="w-24">author</span>
      </div>

      {sortedRfs.map((rfs, i) => (
        <RFSRow key={rfs.id} rfs={rfs} rank={i + 1} />
      ))}
    </section>
  )
}
