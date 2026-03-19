"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const navLinks = [
  { href: "/browse", label: "browse" },
  { href: "/new", label: "new rfs" },
  { href: "/me", label: "profile" },
]

export function Header() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border">
      <div className="h-14 max-w-6xl mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="font-mono font-medium text-lg tracking-tight lowercase">
          oboe
        </Link>
        <nav className="flex items-center gap-6">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm font-mono transition-colors duration-150 ${
                pathname.startsWith(href)
                  ? "text-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
