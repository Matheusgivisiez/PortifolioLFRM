import { Asterisk } from 'lucide-react'

type MarqueeProps = { items: string[]; className?: string }

/** Faixa tipográfica contínua. Pausa no hover; para com prefers-reduced-motion. */
export function Marquee({ items, className = '' }: MarqueeProps) {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((item) => (
        <li key={item} className="flex items-center">
          <span className="px-6 md:px-10">{item}</span>
          <Asterisk aria-hidden className="size-[0.7em] text-coral" strokeWidth={2.5} />
        </li>
      ))}
    </ul>
  )

  return (
    <div className={`group overflow-hidden ${className}`}>
      <div className="marquee-track flex w-max group-hover:[animation-play-state:paused]">
        {row(false)}
        {row(true)}
      </div>
    </div>
  )
}
