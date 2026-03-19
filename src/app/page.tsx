import { OBOE_ASCII } from "@/lib/constants"
import { rfsList } from "@/lib/mock-data"
import { RFSRow } from "@/components/rfs-row"
import { AsciiBox } from "@/components/ascii-box"

export default function Home() {
  const openRequests = rfsList.filter(r => r.status === 'open')
  const recentlyPublished = rfsList.filter(r => r.status === 'published').slice(0, 4)

  return (
    <main className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-10 lg:gap-14 my-8">
      <div className="max-w-[390px]">
        <pre className="text-[15px] tracking-[-1px] leading-[125%] text-gray-400 select-none whitespace-pre font-[family-name:var(--font-fira-mono)]">
          {OBOE_ASCII}
        </pre>
        <p className="text-[19px] tracking-tight text-gray-900 font-mono font-medium uppercase mt-4">
          Crowdfunded agent skills
        </p>
        <p className="text-gray-500 text-lg leading-relaxed tracking-tight mt-3">
          Security researchers write deep, specialized skill files. Developers
          crowdfund the work. Agents buy the results for fractions of a cent.
        </p>
        <div className="bg-gray-50 rounded-md px-4 py-3 font-mono text-sm mt-6 flex items-center justify-between">
          <code>
            <span className="text-muted-foreground">$</span>
            <span className="ml-[1ch]">curl oboe.dev/api/skills</span>
          </code>
          <span className="text-xs text-muted-foreground">copy</span>
        </div>
      </div>

      <div>
        <h2 className="text-sm font-mono font-medium tracking-normal text-gray-900 uppercase mb-4">
          open requests
        </h2>
        <AsciiBox title="open">
          {openRequests.map((rfs, i) => (
            <RFSRow key={rfs.id} rfs={rfs} rank={i + 1} />
          ))}
        </AsciiBox>

        <div className="mt-8">
          <h2 className="text-sm font-mono font-medium tracking-normal text-gray-900 uppercase mb-4">
            recently published
          </h2>
          <AsciiBox title="published">
            {recentlyPublished.map((rfs) => (
              <RFSRow key={rfs.id} rfs={rfs} />
            ))}
          </AsciiBox>
        </div>
      </div>
    </main>
  )
}
