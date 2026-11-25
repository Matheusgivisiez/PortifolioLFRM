type PendingTagProps = { children?: string; className?: string }

/** Selo para conteúdo que ainda depende do proprietário do portfólio. */
export function PendingTag({ children = 'A definir', className = '' }: PendingTagProps) {
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-dashed border-current/40 px-2.5 py-0.5 text-[0.7rem] font-medium uppercase tracking-[0.12em] opacity-80 ${className}`}
    >
      <span aria-hidden className="size-1.5 rounded-full bg-coral" />
      {children}
    </span>
  )
}
