import type { Metadata } from "next"
import { AsciiBox } from "@/components/ascii-box"
import { RFSRow } from "@/components/rfs-row"

export const metadata: Metadata = { title: "New request | Oboe" }

const inputStyle =
  "bg-gray-50 border border-gray-200 rounded-md px-3 py-2 font-mono text-sm w-full placeholder:text-gray-400 outline-none focus:border-gray-400"

export default function NewRequestPage() {
  return (
    <section>
      <h1 className="text-xl font-medium tracking-tight mt-8 mb-6">
        new request for skill
      </h1>

      <AsciiBox title="create">
        <form>
          <div className="space-y-5">
            <div className="space-y-1.5">
              <label htmlFor="rfs-title" className="text-xs font-mono uppercase text-muted-foreground">
                title
              </label>
              <input
                id="rfs-title"
                type="text"
                placeholder="e.g. Next.js middleware CSRF hardening"
                className={inputStyle}
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="rfs-description" className="text-xs font-mono uppercase text-muted-foreground">
                description
              </label>
              <textarea
                id="rfs-description"
                placeholder="Describe the security expertise needed..."
                rows={4}
                className={inputStyle}
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="rfs-scope" className="text-xs font-mono uppercase text-muted-foreground">
                scope
              </label>
              <textarea
                id="rfs-scope"
                placeholder="What should the skill file cover? Be specific about frameworks, versions, and attack vectors..."
                rows={4}
                className={inputStyle}
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="rfs-funding" className="text-xs font-mono uppercase text-muted-foreground">
                funding goal
              </label>
              <input
                id="rfs-funding"
                type="text"
                placeholder="$50.00"
                className={`${inputStyle} max-w-xs`}
              />
            </div>
          </div>

          <div className="mt-6">
            <button type="button" className="bg-gray-900 text-white font-mono text-sm px-6 py-2 rounded-md">
              publish request
            </button>
          </div>
        </form>
      </AsciiBox>

      <div className="mt-8">
        <h2 className="text-sm font-mono font-medium tracking-normal text-gray-900 uppercase mb-4">
          preview
        </h2>
        <AsciiBox title="preview">
          <RFSRow
            rfs={{
              id: "preview",
              title: "Next.js middleware CSRF hardening",
              description: "",
              scope: "",
              fundingThreshold: 50,
              currentAmount: 0,
              status: "open",
              authorId: "user-1",
              claimantId: null,
              createdAt: new Date().toISOString(),
            }}
          />
        </AsciiBox>
      </div>
    </section>
  )
}
