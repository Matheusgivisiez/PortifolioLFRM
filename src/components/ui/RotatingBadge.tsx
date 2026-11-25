import { ArrowDown } from 'lucide-react'

type RotatingBadgeProps = { text: string; className?: string; href?: string; label?: string }

/** Selo circular com texto girando — assinatura "Ideias que ganham forma". */
export function RotatingBadge({ text, className = '', href, label }: RotatingBadgeProps) {
  const id = 'badge-circle'
  const content = (
    <>
      <svg viewBox="0 0 200 200" className="spin-slow absolute inset-0 size-full" aria-hidden>
        <defs>
          <path id={id} d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <text className="fill-current font-sans text-[16px] font-semibold uppercase tracking-[0.3em]">
          <textPath href={`#${id}`}>{text}</textPath>
        </text>
      </svg>
      <span className="grid size-[42%] place-items-center rounded-full bg-coral text-ink transition-transform duration-500 ease-(--ease-signature) group-hover:translate-y-1">
        <ArrowDown className="size-1/2" strokeWidth={1.75} aria-hidden />
      </span>
    </>
  )

  const classes = `group relative grid aspect-square place-items-center ${className}`
  return href ? (
    <a href={href} aria-label={label} className={classes}>
      {content}
    </a>
  ) : (
    <div className={classes} aria-hidden>
      {content}
    </div>
  )
}
