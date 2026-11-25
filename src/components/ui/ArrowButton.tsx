import { ArrowUpRight } from 'lucide-react'
import type { AnchorHTMLAttributes } from 'react'

type ArrowButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: 'violet' | 'ink' | 'paper' | 'ghost'
}

const variants = {
  violet: 'bg-violet text-paper hover:bg-ink',
  ink: 'bg-ink text-paper hover:bg-violet',
  paper: 'bg-paper text-ink hover:bg-coral',
  ghost: 'bg-transparent text-current ring-1 ring-current/30 hover:ring-current',
}

/** Botão principal: pílula com seta que gira e um círculo que cresce no hover. */
export function ArrowButton({ variant = 'violet', className = '', children, ...rest }: ArrowButtonProps) {
  return (
    <a
      className={`group/btn relative inline-flex min-h-12 items-center gap-3 rounded-full py-2 pl-6 pr-2 font-medium transition-colors duration-300 ease-(--ease-signature) active:scale-[0.98] ${variants[variant]} ${className}`}
      {...rest}
    >
      <span className="relative">{children}</span>
      <span
        aria-hidden
        className="grid size-9 place-items-center rounded-full bg-current/15 transition-transform duration-500 ease-(--ease-signature) group-hover/btn:rotate-45"
      >
        <ArrowUpRight className="size-4" strokeWidth={2} />
      </span>
    </a>
  )
}
