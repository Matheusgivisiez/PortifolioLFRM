import { ArrowUpRight } from 'lucide-react'
import { AnimatePresence, motion, useMotionValue, useSpring, type MotionValue } from 'motion/react'
import { useState } from 'react'
import { Link } from 'react-router'
import { FitLine } from '../components/ui/FitLine'
import { Reveal } from '../components/ui/Reveal'
import { SectionLabel } from '../components/ui/SectionLabel'
import { projects, toneStyles, type Project } from '../data/projects'
import { easeSignature, fadeUp, viewportOnce } from '../lib/motion'

/** Cartaz do projeto. No desktop os cartazes "grudam" e se empilham ao rolar. */
function ProjectPoster({
  project,
  index,
  onHover,
}: {
  project: Project
  index: number
  onHover: (v: boolean) => void
}) {
  const tone = toneStyles[project.tone]
  const number = String(index + 1).padStart(2, '0')
  const flip = index % 2 === 1

  return (
    <motion.li
      className="md:sticky"
      style={{ top: `calc(5.5rem + ${index * 0.9}rem)` }}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      <Link
        to={`/projetos/${project.slug}`}
        onPointerEnter={() => onHover(true)}
        onPointerLeave={() => onHover(false)}
        aria-label={`${project.title} — ${project.category}${project.placeholder ? ' (exemplo)' : ''}. Ver case`}
        className={`group grid overflow-hidden md:h-[min(78svh,46rem)] md:cursor-none md:grid-cols-12 ${tone.bg} ${tone.text}`}
      >
        {/* imagem */}
        <div className={`relative aspect-[4/3] overflow-hidden md:col-span-7 md:aspect-auto ${flip ? 'md:order-2' : ''}`}>
          <img
            src={project.cover}
            alt=""
            loading="lazy"
            decoding="async"
            className="size-full object-cover transition-transform duration-[1.2s] ease-(--ease-signature) group-hover:scale-[1.05]"
          />
          {project.placeholder && (
            <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 bg-paper px-2.5 py-1 text-[0.68rem] font-medium uppercase tracking-[0.14em] text-ink">
              <span aria-hidden className="size-1.5 rounded-full bg-coral" />
              Exemplo
            </span>
          )}
        </div>

        {/* texto */}
        <div className={`flex flex-col justify-between gap-10 p-6 sm:p-8 md:col-span-5 lg:p-10 ${flip ? 'md:order-1' : ''}`}>
          <div className={`flex items-start justify-between gap-4 border-b pb-4 ${tone.line}`}>
            <span className="eyebrow">{project.category}</span>
            <span className="eyebrow">{project.year ?? '—'}</span>
          </div>

          <div>
            <span aria-hidden className="display block text-[clamp(4rem,9vw,8.5rem)] leading-[0.8] opacity-25">
              {number}
            </span>
            <h3 className="mt-4 font-display text-[clamp(1.9rem,3.4vw,3.4rem)] uppercase leading-[0.92]">
              {project.title}
            </h3>
            <p className={`mt-4 max-w-sm ${tone.muted}`}>{project.summary}</p>
          </div>

          <span className="inline-flex items-center gap-3 self-start font-medium">
            <span
              className={`grid size-11 place-items-center rounded-full transition-transform duration-500 ease-(--ease-signature) group-hover:rotate-45 ${tone.accent}`}
            >
              <ArrowUpRight aria-hidden className="size-5" />
            </span>
            Ver case
          </span>
        </div>
      </Link>
    </motion.li>
  )
}

/** Etiqueta que segue o cursor sobre os cartazes (apenas ponteiro fino). */
function CursorLabel({ visible, x, y }: { visible: boolean; x: MotionValue<number>; y: MotionValue<number> }) {
  return (
    <motion.div aria-hidden className="pointer-events-none fixed left-0 top-0 z-40 hidden md:block" style={{ x, y }}>
      <AnimatePresence>
        {visible && (
          <motion.span
            className="-ml-12 -mt-12 grid size-24 rotate-[-8deg] place-items-center rounded-full bg-paper text-center font-display text-sm uppercase leading-tight text-ink shadow-[0_8px_30px_rgb(0_0_0/0.18)]"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: easeSignature }}
          >
            Ver
            <br />
            case
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function Projects() {
  const [hovering, setHovering] = useState(false)
  const mx = useMotionValue(-200)
  const my = useMotionValue(-200)
  const x = useSpring(mx, { stiffness: 420, damping: 36, mass: 0.5 })
  const y = useSpring(my, { stiffness: 420, damping: 36, mass: 0.5 })
  const hasPlaceholders = projects.some((p) => p.placeholder)

  return (
    <section
      id="projetos"
      aria-labelledby="projetos-titulo"
      className="relative py-[length:var(--spacing-section)]"
      onPointerMove={(e) => {
        mx.set(e.clientX)
        my.set(e.clientY)
      }}
    >
      <div className="shell">
        <SectionLabel index="02">Trabalhos selecionados</SectionLabel>
        <Reveal>
          <h2 id="projetos-titulo" className="display relative mt-6 uppercase">
            <FitLine fill={0.78}>Projetos</FitLine>
            <span className="absolute bottom-[8%] right-0 grid size-16 rotate-12 place-items-center rounded-full bg-coral font-display text-xl text-ink sm:size-20 md:size-28 md:text-4xl">
              <span className="sr-only">Total: </span>
              {String(projects.length).padStart(2, '0')}
            </span>
          </h2>
        </Reveal>

        <div className="mt-8 grid gap-6 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <p className="text-[length:var(--text-lead)] leading-snug">
              Identidade visual, campanhas, social media, direção de arte e fotografia — ideias que
              saíram do papel e ganharam forma.
            </p>
          </Reveal>
          {hasPlaceholders && (
            <Reveal className="md:col-span-4 md:col-start-9">
              <p className="border-l-[3px] border-coral pl-3 text-sm">
                Os projetos abaixo são espaços demonstrativos e serão substituídos pelos trabalhos reais.
              </p>
            </Reveal>
          )}
        </div>

        <ul className="mt-14 space-y-6 md:mt-20 md:space-y-10">
          {projects.map((project, i) => (
            <ProjectPoster key={project.slug} project={project} index={i} onHover={setHovering} />
          ))}
        </ul>
      </div>

      <CursorLabel visible={hovering} x={x} y={y} />
    </section>
  )
}
