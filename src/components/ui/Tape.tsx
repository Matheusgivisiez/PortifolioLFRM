import type { ReactNode } from 'react'

type TapeProps = {
  children: ReactNode
  className?: string
  /** rotação em graus */
  tilt?: number
}

/** Faixa de cor inclinada — como uma fita colada sobre o cartaz. */
export function Tape({ children, className = 'bg-coral text-ink', tilt = -3 }: TapeProps) {
  return (
    <span
      className={`inline-block px-[0.12em] pb-[0.02em] pt-[0.08em] leading-[0.9] ${className}`}
      style={{ transform: `rotate(${tilt}deg)` }}
    >
      {children}
    </span>
  )
}
