type LogoProps = { className?: string; tone?: 'ink' | 'paper' }

/** Assinatura tipográfica LFRM — monograma + ponto coral. */
export function Logo({ className = '', tone = 'ink' }: LogoProps) {
  return (
    <span
      className={`inline-flex items-start font-display text-[1.3rem] leading-none tracking-[-0.02em] ${
        tone === 'ink' ? 'text-ink' : 'text-paper'
      } ${className}`}
    >
      LFRM
      <span aria-hidden className="ml-[0.08em] mt-[0.08em] size-[0.32em] rounded-full bg-coral" />
    </span>
  )
}
