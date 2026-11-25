import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { FitLine } from '../components/ui/FitLine'
import { PendingTag } from '../components/ui/PendingTag'
import { Reveal } from '../components/ui/Reveal'
import { SectionLabel } from '../components/ui/SectionLabel'
import { Tape } from '../components/ui/Tape'
import { profile } from '../data/profile'

/** Foto em moldura de colagem: inclinada, com fitas e adesivo. */
function Portrait() {
  const { photo } = profile.about
  return (
    <div className="relative mx-auto w-[min(84%,26rem)] md:mx-0 md:w-[min(100%,26rem)]">
      <div className="relative aspect-[4/5] -rotate-3 overflow-hidden bg-violet shadow-[0_30px_60px_-20px_rgb(0_0_0/0.6)]">
        {photo ? (
          <img
            src={photo}
            alt={`Retrato de ${profile.name}`}
            loading="lazy"
            decoding="async"
            className="size-full object-cover"
          />
        ) : (
          <div className="flex size-full flex-col justify-between p-6 text-paper">
            <PendingTag className="self-start">Foto em breve</PendingTag>
            <span aria-hidden className="display select-none text-[clamp(4.5rem,13vw,8.5rem)] leading-[0.8]">
              LF
              <br />RM
            </span>
            <span className="sr-only">Espaço reservado para a foto de {profile.name}</span>
          </div>
        )}
      </div>
      {/* fitas */}
      <span aria-hidden className="absolute -top-3 left-[18%] h-7 w-24 -rotate-6 bg-paper/80" />
      <span aria-hidden className="absolute -bottom-3 right-[14%] h-7 w-24 rotate-[8deg] bg-paper/80" />
      {/* adesivo */}
      <span
        aria-hidden
        className="absolute -right-4 top-[38%] grid size-20 rotate-12 place-items-center rounded-full bg-coral font-display text-2xl text-ink md:-right-8 md:size-28 md:text-3xl"
      >
        Oi!
      </span>
    </div>
  )
}

export function About() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const portraitY = useTransform(scrollYProgress, [0, 1], [50, -50])
  const { about } = profile

  return (
    <section
      ref={ref}
      id="sobre"
      aria-labelledby="sobre-titulo"
      className="on-dark relative overflow-hidden bg-ink py-[length:var(--spacing-section)] text-paper"
    >
      <div className="shell">
        <SectionLabel index="03" className="text-paper/70">
          Sobre mim
        </SectionLabel>

        <Reveal>
          <h2 id="sobre-titulo" className="display mt-6 uppercase" aria-label={about.statement}>
            <FitLine>Ideias que</FitLine>
            <FitLine fill={0.98} className="pt-[0.06em]">
              ganham <Tape className="bg-violet text-paper" tilt={2}>forma.</Tape>
            </FitLine>
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-16 md:mt-24 md:grid-cols-12 md:gap-[length:var(--spacing-gutter)]">
          <motion.div className="md:col-span-5 lg:col-span-4" style={{ y: portraitY }}>
            <Portrait />
          </motion.div>

          <div className="md:col-span-7 lg:col-span-7 lg:col-start-6">
            <div className="space-y-6 text-[length:var(--text-lead)] leading-relaxed text-paper/85">
              {about.paragraphs.map((p, i) => (
                <Reveal key={p} delay={i * 0.08}>
                  <p>{p}</p>
                </Reveal>
              ))}
            </div>

            <Reveal>
              <dl className="mt-14 border-t border-line-inverse">
                {about.facts.map((fact) => (
                  <div
                    key={fact.label}
                    className="grid gap-1 border-b border-line-inverse py-4 sm:grid-cols-[10rem_1fr] sm:items-center sm:gap-6"
                  >
                    <dt className="eyebrow text-coral">{fact.label}</dt>
                    <dd className="text-lg font-medium">{fact.value ?? <PendingTag />}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
