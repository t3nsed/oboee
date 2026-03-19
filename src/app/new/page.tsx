import type { Metadata } from "next"
import { NewRfsForm } from "@/components/new-rfs-form"

export const metadata: Metadata = { title: "New request | Oboe" }

export default function NewRequestPage() {
  return (
    <NewRfsForm />
  )
}
