import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { SignInForm } from "@/components/sign-in-form"
import { isAuthenticated } from "@/lib/auth-server"

export const metadata: Metadata = { title: "Sign In | Oboe" }

export default async function SignInPage() {
  if (await isAuthenticated()) {
    redirect("/me")
  }

  return (
    <main className="max-w-xl mx-auto px-4 py-8">
      <h1 className="text-xl font-medium tracking-tight mb-6">sign in</h1>
      <p className="text-sm text-muted-foreground font-mono mb-5">
        use email or passkey. social and popup auth are disabled.
      </p>
      <SignInForm />
    </main>
  )
}
