import { motion, useMotionValue, useReducedMotion, useSpring, useTransform, type MotionValue } from 'motion/react'
import { useEffect, type ReactNode } from 'react'
import { ArrowButton } from '../components/ui/ArrowButton'
import { FitLine, vhMax } from '../components/ui/FitLine'
import { RotatingBadge } from '../components/ui/RotatingBadge'
import { Tape } from '../components/ui/Tape'
import { profile } from '../data/profile'
import { easeSignature, lineRise, stagger } from '../lib/motion'

const maxDesktop = vhMax(0.24)
const maxMobile = vhMax(0.15)

/** Ponteiro normalizado (-1 → 1) suavizado por mola, para o parallax das formas. */
function usePointer() {
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 60, damping: 18, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 60, damping: 18, mass: 0.6 })

  useEffect(() => {
    if (reduce || !window.matchMedia('(pointer: fine)').matches) return
    const onMove = (e: PointerEvent) => {
      x.set((e.clientX / window.innerWidth) * 2 - 1)
      y.set((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [reduce, x, y])

  return { sx, sy }
}

function Float({
  depth,
  sx,
  sy,
  className,
  delay,
  from,
  children,
}: {
  depth: number
  sx: MotionValue<number>
  sy: MotionValue<number>
  className: string
  delay: number
  from: { x?: number; y?: number; rotate?: number; scale?: number }
  children?: ReactNode
}) {
  const tx = useTransform(sx, (v) => v * depth)
  const ty = useTransform(sy, (v) => v * depth)
  return (
    <motion.div aria-hidden className={`pointer-events-none absolute ${className}`} style={{ x: tx, y: ty }}>
      <motion.div
        className="size-full"
        initial={{ opacity: 0, x: 0, y: 0, rotate: 0, scale: 1, ...from }}
        animate={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
        transition={{ duration: 1.1, delay, ease: easeSignature }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

/** Linha do título com máscara de entrada. */
function Line({ children }: { children: ReactNode }) {
  return (
    <span className="line-mask block">
      <motion.span className="block will-change-transform" variants={lineRise}>
        {children}
      </motion.span>
    </span>
  )
}

const Dot = () => (
  <motion.span
    className="ml-[0.05em] inline-block size-[0.2em] rounded-full bg-coral align-baseline"
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ delay: 1.1, type: 'spring', stiffness: 380, damping: 14 }}
  />
)

const Fora = ({ children }: { children: ReactNode }) => (
  <Tape className="bg-coral text-ink" tilt={-3}>
    {children}
  </Tape>
)

export function Hero() {
  const { sx, sy } = usePointer()

  return (
    <section
      id="inicio"
      aria-label="Apresentação"
      className="on-violet relative isolate overflow-hidden bg-violet pt-20 text-paper md:pt-24"
    >
      {/* formas do cartaz */}
      <Float
        depth={-14}
        sx={sx}
        sy={sy}
        delay={0.2}
        from={{ scale: 0.85 }}
        className="-right-[18vw] top-[8%] size-[62vw] max-h-[58rem] max-w-[58rem] md:-right-[8vw] md:size-[46vw]"
      >
        <div className="size-full rounded-full border border-paper/30" />
      </Float>
      <Float
        depth={22}
        sx={sx}
        sy={sy}
        delay={0.5}
        from={{ y: 80 }}
        className="-bottom-[1px] left-[60%] hidden h-[9vw] w-[18vw] md:block lg:left-[52%]"
      >
        <div className="size-full rounded-t-full bg-ink" />
      </Float>
      <Float
        depth={-30}
        sx={sx}
        sy={sy}
        delay={0.7}
        from={{ rotate: 70, scale: 0.3 }}
        className="left-[40%] top-[15%] hidden size-10 md:block"
      >
        <div className="size-full rotate-12 bg-ink" />
      </Float>

      <div className="shell relative flex min-h-[calc(100svh-5rem)] flex-col pb-8 md:min-h-[calc(100svh-6rem)] md:pb-10">
        {/* linha de metadados */}
        <motion.div
          className="flex items-start justify-between gap-6 border-t border-paper/25 pt-4"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeSignature }}
        >
          <p className="eyebrow flex items-center gap-3 whitespace-nowrap">
            <span className="font-semibold tracking-normal">(01)</span>
            <span>Portfólio · {new Date().getFullYear()}</span>
          </p>
          <p className="eyebrow text-right text-paper/80">
            <span className="text-paper">{profile.name}</span>
            <span className="hidden sm:inline"> — {profile.role}</span>
          </p>
        </motion.div>

        {/* título-cartaz */}
        <div className="relative flex flex-1 flex-col justify-center py-10">
          <motion.h1
            aria-label="Ideias fora do óbvio."
            className="display relative z-10 uppercase"
            variants={stagger(0.1, 0.15)}
            initial="hidden"
            animate="visible"
          >
            {/* mobile: 3 linhas */}
            <span aria-hidden className="block sm:hidden">
              <Line>
                <FitLine max={maxMobile}>Ideias</FitLine>
              </Line>
              <Line>
                <FitLine fill={0.94} max={maxMobile} className="py-[0.08em] pl-[0.04em]">
                  <Fora>Fora do</Fora>
                </FitLine>
              </Line>
              <Line>
                <FitLine fill={0.96} max={maxMobile} className="pt-[0.18em]">
                  Óbvio
                  <Dot />
                </FitLine>
              </Line>
            </span>
            {/* tablet/desktop: 2 linhas justificadas */}
            <span aria-hidden className="hidden sm:block">
              <Line>
                <FitLine max={maxDesktop} className="pb-[0.06em] pt-[0.04em]">
                  Ideias <Fora>fora</Fora>
                </FitLine>
              </Line>
              <Line>
                <FitLine fill={0.97} max={maxDesktop} className="pt-[0.22em]">
                  do óbvio
                  <Dot />
                </FitLine>
              </Line>
            </span>
          </motion.h1>
        </div>

        {/* rodapé do hero */}
        <motion.div
          className="relative z-10 grid items-end gap-6 md:grid-cols-12"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.9, ease: easeSignature }}
        >
          <div className="flex items-end gap-5 md:col-span-7 lg:col-span-6">
            <RotatingBadge
              href="#sobre"
              label="Rolar para a próxima seção"
              text={`${profile.concept.replace('.', '')} · ${profile.monogram} · `}
              className="hidden w-28 shrink-0 rounded-full bg-paper text-ink md:grid lg:w-32"
            />
            <p className="max-w-[32rem] text-[length:var(--text-lead)] leading-snug">{profile.intro}</p>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 md:col-span-5 md:justify-end lg:col-span-5 lg:col-start-8">
            <ArrowButton href="#artistas" variant="paper">
              Ver backstage
            </ArrowButton>
            <a
              href="#sobre"
              className="inline-flex min-h-12 items-center font-medium underline decoration-paper/40 decoration-1 underline-offset-[6px] transition-colors hover:decoration-coral"
            >
              Sobre mim
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
