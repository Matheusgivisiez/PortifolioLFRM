type SectionLabelProps = { index: string; children: string; className?: string }

/** Numeração editorial de seção: (02) — Projetos */
export function SectionLabel({ index, children, className = '' }: SectionLabelProps) {
  return (
    <p className={`eyebrow flex items-center gap-3 ${className}`}>
      <span className="font-semibold tracking-normal">({index})</span>
      <span aria-hidden className="h-px w-10 bg-current opacity-40" />
      <span>{children}</span>
    </p>
  )
}
