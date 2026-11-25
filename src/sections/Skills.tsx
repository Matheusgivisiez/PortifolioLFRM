import { Hand } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { FitLine } from '../components/ui/FitLine'
import { Reveal } from '../components/ui/Reveal'
import { SectionLabel } from '../components/ui/SectionLabel'
import { profile } from '../data/profile'
import { easeSignature, viewportOnce } from '../lib/motion'

/** Estilos dos adesivos — alternam cor, forma e inclinação para parecer colagem. */
const stickers = [
  { tone: 'bg-ink text-paper', shape: 'rounded-full', tilt: -6, note: 'text-paper/75' },
  { tone: 'bg-paper text-ink', shape: 'rounded-none', tilt: 4, note: 'text-ink-soft' },
  { tone: 'bg-violet text-paper', shape: 'rounded-[2rem]', tilt: -3, note: 'text-paper/80' },
  { tone: 'bg-paper text-violet-deep', shape: 'rounded-full', tilt: 7, note: 'text-ink-soft' },
  { tone: 'bg-ink text-coral', shape: 'rounded-none', tilt: -5, note: 'text-paper/75' },
  { tone: 'bg-violet text-paper', shape: 'rounded-full', tilt: 3, note: 'text-paper/80' },
  { tone: 'bg-paper text-ink', shape: 'rounded-[2rem]', tilt: -8, note: 'text-ink-soft' },
]

/** Pequenos deslocamentos verticais para quebrar o alinhamento da grade. */
const offsets = ['md:translate-y-6', 'md:-translate-y-4', 'md:translate-y-10', 'md:-translate-y-2', 'md:translate-y-4', 'md:-translate-y-8', 'md:translate-y-2']

export function Skills() {
  const board = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  // arrastar só com mouse/trackpad: no toque, o gesto precisa continuar rolando a página
  const [finePointer, setFinePointer] = useState(false)
  useEffect(() => setFinePointer(window.matchMedia('(pointer: fine)').matches), [])
  const canDrag = finePointer && !reduce

  return (
    <section
      id="habilidades"
      aria-labelledby="habilidades-titulo"
      className="relative overflow-hidden bg-coral py-[length:var(--spacing-section)] text-ink"
    >
      <div className="shell">
        <div className="flex items-end justify-between gap-6">
          <SectionLabel index="05">O que eu trago</SectionLabel>
          <Reveal className="hidden max-w-xs text-right text-sm md:block">
            Competências que guiam o meu processo — da primeira ideia à peça final.
          </Reveal>
        </div>
        <Reveal>
          <h2 id="habilidades-titulo" className="display mt-6 uppercase">
            <FitLine>Habilidades</FitLine>
          </h2>
        </Reveal>

        {/* mural de adesivos */}
        <div ref={board} className="relative mt-12 border-t-[3px] border-ink pt-12 md:mt-16 md:pt-16">
          <p className={`eyebrow absolute right-0 top-4 items-center gap-2 ${canDrag ? 'flex' : 'hidden'}`}>
            <Hand aria-hidden className="size-4" />
            Arraste os adesivos
          </p>

          <ul className="flex flex-wrap items-center justify-center gap-x-3 gap-y-5 md:gap-x-5 md:gap-y-8">
            {profile.skills.map((skill, i) => {
              const s = stickers[i % stickers.length]
              return (
                <motion.li
                  key={skill.name}
                  className={`relative ${offsets[i % offsets.length]}`}
                  initial={{ opacity: 0, scale: 0.6, rotate: s.tilt * 3 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: s.tilt }}
                  viewport={viewportOnce}
                  transition={{ delay: i * 0.07, duration: 0.7, ease: easeSignature }}
                >
                  <motion.div
                    drag={canDrag}
                    dragConstraints={board}
                    dragElastic={0.15}
                    dragMomentum={false}
                    whileHover={{ scale: 1.05, rotate: -s.tilt * 0.4 }}
                    whileDrag={{ scale: 1.08, zIndex: 20, cursor: 'grabbing' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className={`relative select-none ${canDrag ? 'cursor-grab touch-none' : ''} px-6 py-5 shadow-[0_14px_30px_-12px_rgb(0_0_0/0.45)] md:px-9 md:py-7 ${s.tone} ${s.shape} ${
                      s.shape === 'rounded-full' ? 'px-8 md:px-12' : ''
                    }`}
                  >
                    <span className="flex items-baseline gap-3">
                      <span className="font-sans text-xs font-semibold opacity-70">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="font-display text-[clamp(1.35rem,3.2vw,2.75rem)] uppercase leading-[0.95]">
                        {skill.name}
                      </span>
                    </span>
                    <span className={`mt-1.5 block max-w-[22ch] pl-7 text-sm leading-snug ${s.note}`}>
                      {skill.note}
                    </span>
                  </motion.div>
                </motion.li>
              )
            })}
          </ul>
        </div>

        {profile.tools.length > 0 && (
          <Reveal className="mt-16 flex flex-wrap items-center gap-3">
            <span className="eyebrow mr-3">Ferramentas</span>
            {profile.tools.map((tool) => (
              <span key={tool} className="rounded-full border-2 border-ink px-4 py-1.5 text-sm font-semibold">
                {tool}
              </span>
            ))}
          </Reveal>
        )}
      </div>
    </section>
  )
}
