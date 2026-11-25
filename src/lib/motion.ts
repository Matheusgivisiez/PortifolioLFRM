/**
 * Identidade de movimento LFRM
 * - Curva assinatura: easeSignature (desaceleração longa, sem overshoot)
 * - Paleta de durações: quick / base / slow
 * - Entrada padrão: sobe de baixo (máscara ou 24px) + opacidade
 */
import type { Transition, Variants } from 'motion/react'

export const easeSignature = [0.22, 1, 0.36, 1] as const
export const easeExit = [0.55, 0, 1, 0.45] as const

export const duration = {
  quick: 0.18,
  base: 0.6,
  slow: 1.0,
} as const

export const transitionBase: Transition = { duration: duration.base, ease: easeSignature }

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeSignature } },
}

/** Linha de texto que sobe por trás de uma máscara (overflow hidden no pai). */
export const lineRise: Variants = {
  hidden: { y: '108%' },
  visible: { y: '0%', transition: { duration: 0.95, ease: easeSignature } },
}

export const stagger = (step = 0.08, delay = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: step, delayChildren: delay } },
})

export const viewportOnce = { once: true, margin: '0px 0px -12% 0px' } as const
