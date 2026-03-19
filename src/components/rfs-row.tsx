import Link from "next/link"
import type { RFS } from "@/lib/types"
import { StatusBadge } from "./status-badge"

interface RFSRowProps {
  rfs: RFS
  rank?: number
}

export function RFSRow({ rfs, rank }: RFSRowProps) {
  return (
    <Link
      href={`/browse/${rfs.id}`}
      className="flex items-center gap-4 px-3 py-2.5 hover:bg-gray-50 transition-colors duration-150 rounded-md overflow-hidden min-w-0"
    >
      {rank !== undefined && (
        <span className="w-6 text-right font-mono text-sm text-muted-foreground tabular-nums">
          {rank}
        </span>
      )}
      <span className="flex-1 font-medium text-sm truncate min-w-0">{rfs.title}</span>
      <StatusBadge status={rfs.status} />
      <span className="w-28 text-right font-mono text-xs text-muted-foreground shrink-0">
        ${rfs.currentAmount} / ${rfs.fundingThreshold}
      </span>
      <span className="text-xs text-muted-foreground w-24 truncate shrink-0">
        {rfs.authorLabel ?? rfs.authorId.slice(0, 8)}
      </span>
    </Link>
  )
}
