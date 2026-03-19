import type { Metadata } from "next"
import {
  getCurrentUser,
  getUserContributions,
  getUserPurchases,
  getRFSById,
  rfsList,
  skills,
} from "@/lib/mock-data"
import { AsciiBox } from "@/components/ascii-box"
import { RFSRow } from "@/components/rfs-row"

export const metadata: Metadata = { title: "Profile | Oboe" }

export default function ProfilePage() {
  const user = getCurrentUser()
  const myRequests = rfsList.filter((rfs) => rfs.authorId === user.id)
  const myContributions = getUserContributions(user.id)
  const myPurchases = getUserPurchases(user.id)

  return (
    <main className="max-w-3xl mx-auto px-4">
      <div className="mt-8 mb-6">
        <h1 className="text-xl font-medium tracking-tight">{user.name}</h1>
        <p className="font-mono text-sm text-muted-foreground mt-1">
          {user.walletAddress}
        </p>
      </div>

      <div className="mt-6">
        <AsciiBox title="my requests">
          {myRequests.length > 0 ? (
            myRequests.map((rfs) => <RFSRow key={rfs.id} rfs={rfs} />)
          ) : (
            <p className="text-sm text-muted-foreground font-mono italic">
              no requests yet
            </p>
          )}
        </AsciiBox>
      </div>

      <div className="mt-6">
        <AsciiBox title="contributions">
          {myContributions.length > 0 ? (
            myContributions.map((contrib) => {
              const rfs = getRFSById(contrib.rfsId)
              return (
                <div
                  key={contrib.id}
                  className="flex items-center justify-between py-1.5 font-mono text-sm"
                >
                  <span className="truncate">{rfs?.title}</span>
                  <span className="text-muted-foreground ml-4 shrink-0">
                    ${contrib.amount.toFixed(2)}
                  </span>
                </div>
              )
            })
          ) : (
            <p className="text-sm text-muted-foreground font-mono italic">
              no contributions yet
            </p>
          )}
        </AsciiBox>
      </div>

      <div className="mt-6">
        <AsciiBox title="purchased">
          {myPurchases.length > 0 ? (
            myPurchases.map((purchase) => {
              const skill = skills.find((s) => s.id === purchase.skillId)
              return (
                <div
                  key={purchase.id}
                  className="flex items-center justify-between py-1.5 font-mono text-sm"
                >
                  <span className="truncate">{skill?.title}</span>
                  <span className="text-muted-foreground ml-4 shrink-0">
                    ${purchase.amount.toFixed(3)}
                  </span>
                </div>
              )
            })
          ) : (
            <p className="text-sm text-muted-foreground font-mono italic">
              no purchases yet
            </p>
          )}
        </AsciiBox>
      </div>
    </main>
  )
}
