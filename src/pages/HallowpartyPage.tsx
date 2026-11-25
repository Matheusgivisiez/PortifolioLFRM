import { ArrowUpRight } from 'lucide-react'
import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { FitLine, vhMax } from '../components/ui/FitLine'
import { Frame } from '../components/ui/Frame'
import { PendingTag } from '../components/ui/PendingTag'
import { Reveal } from '../components/ui/Reveal'
import { SectionLabel } from '../components/ui/SectionLabel'
import { Tape } from '../components/ui/Tape'
import { hallowparty } from '../data/hallowparty'
import { profile } from '../data/profile'
import { easeSignature, lineRise, stagger } from '../lib/motion'
import { useDeclarePageTone } from '../lib/pageTone'
import { useDocumentMeta } from '../lib/useDocumentMeta'

const titleMax = vhMax(0.3)

/** Bloco de texto com espaço reservado quando ainda não há conteúdo. */
function TextBlock({ paragraphs, hint }: { paragraphs: string[]; hint: string }) {
  if (paragraphs.length === 0) {
    return (
      <div className="border-2 border-dashed border-current/25 p-6 md:p-8">
        <PendingTag>Texto a definir</PendingTag>
        <p className="mt-4 opacity-80">{hint}</p>
      </div>
    )
  }
  return (
    <div className="space-y-5">
      {paragraphs.map((p) => (
        <p key={p}>{p}</p>
      ))}
    </div>
  )
}

function Chapter({
  index,
  title,
  children,
}: {
  index: string
  title: ReactNode
  children: ReactNode
}) {
  return (
    <Reveal className="grid gap-6 md:grid-cols-12 md:gap-[length:var(--spacing-gutter)]">
      <div className="md:col-span-5">
        <span className="text-sm font-semibold text-coral">{index}</span>
        <h2 className="mt-2 font-display text-[clamp(2.25rem,5vw,4.5rem)] uppercase leading-[0.92]">{title}</h2>
      </div>
      <div className="text-[length:var(--text-lead)] leading-relaxed md:col-span-6 md:col-start-7 md:pt-2">
        {children}
      </div>
    </Reveal>
  )
}

export function HallowpartyPage() {
  useDeclarePageTone('ink')
  useDocumentMeta(
    `Hallowparty — ${profile.name}`,
    `Hallowparty: evento criado e organizado por ${profile.name}.`,
  )
  const hp = hallowparty

  return (
    <article className="on-dark bg-ink text-paper">
      {/* topo */}
      <header className="relative isolate overflow-hidden pt-24 md:pt-28">
        {/* formas */}
        <motion.span
          aria-hidden
          className="absolute -right-[12vw] top-[10%] -z-10 size-[55vw] max-h-[44rem] max-w-[44rem] rounded-full bg-violet"
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: easeSignature }}
        />
        <motion.span
          aria-hidden
          className="absolute bottom-0 left-[8%] -z-10 h-[10vw] w-[20vw] rounded-t-full bg-coral"
          initial={{ y: 80 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.4, duration: 1, ease: easeSignature }}
        />

        <div className="shell flex min-h-[calc(100svh-6rem)] flex-col pb-12">
          <div className="flex items-start justify-between gap-6 border-t border-paper/20 pt-4">
            <p className="eyebrow">Evento · Criação e organização</p>
            <p className="eyebrow text-right text-paper/70">{profile.name}</p>
          </div>

          <motion.h1
            aria-label={hp.name}
            className="display relative mt-auto pt-14 uppercase"
            variants={stagger(0.12, 0.1)}
            initial="hidden"
            animate="visible"
          >
            <span className="line-mask block">
              <motion.span className="block" variants={lineRise}>
                <FitLine max={titleMax}>Hallow</FitLine>
              </motion.span>
            </span>
            <span className="line-mask block">
              <motion.span className="block" variants={lineRise}>
                <FitLine fill={0.86} max={titleMax} className="pl-[0.04em] pt-[0.04em]">
                  <Tape className="bg-coral text-ink" tilt={-3}>
                    Party
                  </Tape>
                </FitLine>
              </motion.span>
            </span>
          </motion.h1>

          <motion.div
            className="mt-10 grid items-end gap-8 md:mt-14 md:grid-cols-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8, ease: easeSignature }}
          >
            <div className="md:col-span-7">
              <p className="eyebrow text-paper/70">Papel do Luís</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {hp.role.map((r) => (
                  <li key={r} className="rounded-full bg-paper px-4 py-2 text-sm font-semibold text-ink">
                    {r}
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-5 md:justify-self-end">
              <a
                href={hp.instagram.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-12 items-center gap-3 rounded-full bg-coral py-2 pl-6 pr-2 font-medium text-ink transition-colors hover:bg-paper"
              >
                {hp.instagram.handle}
                <span className="grid size-9 place-items-center rounded-full bg-ink text-paper transition-transform duration-500 ease-(--ease-signature) group-hover:rotate-45">
                  <ArrowUpRight aria-hidden className="size-4" />
                </span>
              </a>
            </div>
          </motion.div>
        </div>
      </header>

      {/* capítulos */}
      <div className="bg-paper py-[length:var(--spacing-section)] text-ink">
        <div className="shell space-y-20 md:space-y-28">
          <Chapter index="01" title="O conceito">
            <TextBlock
              paragraphs={hp.concept ? [hp.concept] : []}
              hint="O que é a Hallowparty: o tema, a proposta e para quem ela é feita."
            />
          </Chapter>
          <Chapter index="02" title="Como surgiu">
            <TextBlock
              paragraphs={hp.origin}
              hint="A história da primeira edição: de onde veio a ideia e como ela saiu do papel."
            />
          </Chapter>
          <Chapter
            index="03"
            title={
              <>
                Cada ano <span className="text-violet">maior</span>
              </>
            }
          >
            <TextBlock
              paragraphs={hp.growth}
              hint="Como a festa vem se ampliando a cada edição: estrutura, atrações, público e novidades."
            />
          </Chapter>
        </div>
      </div>

      {/* edições */}
      <section aria-labelledby="edicoes-titulo" className="on-violet bg-violet py-[length:var(--spacing-section)]">
        <div className="shell">
          <SectionLabel index="04" className="text-paper/80">
            Linha do tempo
          </SectionLabel>
          <Reveal>
            <h2 id="edicoes-titulo" className="display mt-6 uppercase">
              <FitLine fill={0.7}>Edições</FitLine>
            </h2>
          </Reveal>

          <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {(hp.editions.length ? hp.editions : [null, null, null]).map((ed, i) => (
              <Reveal key={ed?.year ?? i} delay={i * 0.06}>
                <li
                  className={`flex h-full flex-col justify-between gap-10 p-6 md:p-8 ${
                    ed ? (i % 2 ? 'bg-ink text-paper' : 'bg-paper text-ink') : 'border-2 border-dashed border-paper/40'
                  }`}
                  style={{ transform: `rotate(${[-1.5, 1, -0.5][i % 3]}deg)` }}
                >
                  <span className="font-display text-[clamp(3rem,7vw,6rem)] leading-none">
                    {ed ? ed.year : '20__'}
                  </span>
                  <span>
                    {ed ? (
                      <>
                        {ed.title && <span className="block font-display text-xl uppercase">{ed.title}</span>}
                        {ed.note && <span className="mt-2 block opacity-80">{ed.note}</span>}
                      </>
                    ) : (
                      <PendingTag>Edição a definir</PendingTag>
                    )}
                  </span>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* galeria */}
      <section aria-labelledby="galeria-titulo" className="bg-paper py-[length:var(--spacing-section)] text-ink">
        <div className="shell">
          <SectionLabel index="05">Registros</SectionLabel>
          <Reveal>
            <h2 id="galeria-titulo" className="display mt-6 uppercase">
              <FitLine fill={0.66}>Galeria</FitLine>
            </h2>
          </Reveal>
          {/* fotos verticais em 3 colunas com alturas desencontradas; size 'full' ocupa a linha toda */}
          <div className="mt-12 grid gap-[length:var(--spacing-gutter)] sm:grid-cols-2 md:grid-cols-3 md:items-start">
            {(hp.gallery.length
              ? hp.gallery
              : ([
                  { src: null, alt: 'Foto do evento', size: 'half' },
                  { src: null, alt: 'Foto do evento', size: 'half' },
                  { src: null, alt: 'Foto do evento', size: 'half' },
                ] as const)
            ).map((photo, i) => (
              <Reveal
                key={i}
                delay={(i % 3) * 0.08}
                className={
                  photo.size === 'full'
                    ? 'sm:col-span-2 md:col-span-3'
                    : ['', 'md:mt-20', 'md:mt-8'][i % 3]
                }
              >
                <Frame
                  src={photo.src}
                  alt={photo.alt}
                  aspect={photo.size === 'full' ? 'aspect-[16/10] md:aspect-[16/8]' : 'aspect-[3/4]'}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* chamada final */}
      <a
        href={hp.instagram.href}
        target="_blank"
        rel="noopener noreferrer"
        className="group block bg-coral py-14 text-ink md:py-20"
      >
        <span className="shell block">
          <span className="flex items-center justify-between border-b border-ink/25 pb-4">
            <span className="eyebrow">Siga a festa no Instagram</span>
            <span className="grid size-12 place-items-center rounded-full bg-ink text-paper transition-transform duration-500 ease-(--ease-signature) group-hover:rotate-45 md:size-16">
              <ArrowUpRight aria-hidden className="size-6" />
            </span>
          </span>
          <span className="display mt-8 block uppercase transition-transform duration-700 ease-(--ease-signature) group-hover:translate-x-3">
            <FitLine fill={0.9}>{hp.instagram.handle}</FitLine>
          </span>
        </span>
      </a>
    </article>
  )
}
