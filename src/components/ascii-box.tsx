interface AsciiBoxProps {
  title?: string
  children: React.ReactNode
  className?: string
}

export function AsciiBox({ title, children, className }: AsciiBoxProps) {
  return (
    <div className={`font-mono text-sm ${className ?? ""}`}>
      <div className="text-border select-none overflow-hidden whitespace-nowrap">
        {title ? (
          <>
            ┌─ <span className="text-muted-foreground">{title}</span>{" "}
            {"─".repeat(60)}┐
          </>
        ) : (
          <>┌{"─".repeat(66)}┐</>
        )}
      </div>
      <div className="border-l border-r border-border px-4 py-3">{children}</div>
      <div className="text-border select-none overflow-hidden whitespace-nowrap">
        └{"─".repeat(66)}┘
      </div>
    </div>
  )
}
