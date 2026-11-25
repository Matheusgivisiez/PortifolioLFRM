import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { motion } from 'motion/react'
import { Link, useParams } from 'react-router'
import { FitLine } from '../components/ui/FitLine'
import { Frame } from '../components/ui/Frame'
import { PendingTag } from '../components/ui/PendingTag'
import { Reveal } from '../components/ui/Reveal'
import { projects, toneStyles } from '../data/projects'
import { profile } from '../data/profile'
import { easeSignature, lineRise, stagger } from '../lib/motion'
import { useDeclarePageTone } from '../lib/pageTone'
import { useDocumentMeta } from '../lib/useDocumentMeta'
import { NotFound } from './NotFound'

export function ProjectPage() {
  const { slug } = useParams()
  const index = projects.findIndex((p) => p.slug === slug)
  const project = projects[index]

  useDeclarePageTone(project?.tone ?? 'paper')
  useDocumentMeta(
    project ? `${project.title} — ${profile.name}` : `Projeto não encontrado — ${profile.name}`,
    project?.summary,
  )

  if (!project) return <NotFound />

  const tone = toneStyles[project.tone]
  const next = projects[(index + 1) % projects.length]
  const nextTone = toneStyles[next.tone]
  const number = String(index + 1).padStart(2, '0')

  const facts = [
    { label: 'Categoria', value: project.category },
    { label: 'Ano', value: project.year },
    { label: 'Papel', value: project.role },
    { label: 'Ferramentas', value: project.tools?.join(', ') },
  ]

  return (
    <article>
      {/* topo do case */}
      <header className={`relative pt-24 md:pt-28 ${tone.bg} ${tone.text}`}>
        <div className="shell pb-12 md:pb-16">
          <div className={`flex items-center justify-between gap-4 border-t pt-4 ${tone.line}`}>
            <Link
              to={{ pathname: '/', hash: '#projetos' }}
              className="group inline-flex min-h-11 items-center gap-2 text-sm font-medium"
            >
              <ArrowLeft
                aria-hidden
                className="size-4 transition-transform duration-500 ease-(--ease-signature) group-hover:-translate-x-1"
              />
              Todos os projetos
            </Link>
            <p className="eyebrow">
              Projeto {number} / {String(projects.length).padStart(2, '0')}
            </p>
          </div>

          {project.placeholder && (
            <p className={`mt-6 inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium ${tone.accent}`}>
              <span aria-hidden className="size-1.5 rounded-full bg-current" />
              Projeto exemplo — estrutura de case pronta para receber o trabalho real
            </p>
          )}

          <motion.h1
            className="display mt-10 max-w-[18ch] text-balance text-[clamp(2.5rem,7.6vw,8rem)] uppercase leading-[1] md:mt-14"
            variants={stagger(0.08, 0.1)}
            initial="hidden"
            animate="visible"
          >
            <span className="line-mask block">
              <motion.span className="block" variants={lineRise}>
                {project.title}
              </motion.span>
            </span>
          </motion.h1>

          <motion.div
            className="mt-10 grid gap-10 md:mt-14 md:grid-cols-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.8, ease: easeSignature }}
          >
            <p className="text-[length:var(--text-lead)] leading-snug md:col-span-5">{project.summary}</p>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-5 md:col-span-6 md:col-start-7">
              {facts.map((f) => (
                <div key={f.label} className={`border-t pt-3 ${tone.line}`}>
                  <dt className="eyebrow opacity-80">{f.label}</dt>
                  <dd className="mt-1.5 font-medium">{f.value ?? <PendingTag />}</dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>

        {/* capa invadindo a próxima área */}
        <div className="shell relative z-10 -mb-[clamp(3rem,10vw,9rem)]">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1, ease: easeSignature }}
          >
            <Frame src={project.cover} alt={project.coverAlt} aspect="aspect-[16/10] md:aspect-[16/8]" eager />
          </motion.div>
        </div>
      </header>

      {/* conteúdo */}
      <div className="shell pt-[calc(clamp(3rem,10vw,9rem)_+_var(--spacing-section)*0.6)]">
        <div className="space-y-16 md:space-y-24">
          {project.sections.map((section, i) => (
            <Reveal key={section.heading} className="grid gap-5 md:grid-cols-12 md:gap-[length:var(--spacing-gutter)]">
              <div className="md:col-span-5">
                <span className="text-sm font-semibold text-violet">{String(i + 1).padStart(2, '0')}</span>
                <h2 className="mt-2 font-display text-[clamp(2rem,4.5vw,4rem)] uppercase leading-[0.9]">
                  {section.heading}
                </h2>
              </div>
              <p className="text-[length:var(--text-lead)] leading-relaxed text-ink md:col-span-6 md:col-start-7 md:pt-2">
                {section.text}
              </p>
            </Reveal>
          ))}
        </div>

        {/* galeria */}
        <div className="mt-20 grid gap-[length:var(--spacing-gutter)] md:mt-32 md:grid-cols-2">
          {project.gallery.map((item, i) => (
            <Reveal key={i} className={item.size === 'full' ? 'md:col-span-2' : ''}>
              <Frame
                src={item.src}
                alt={item.alt}
                caption={item.caption}
                aspect={item.size === 'full' ? 'aspect-[16/10] md:aspect-[16/8]' : 'aspect-[4/5]'}
              />
            </Reveal>
          ))}
        </div>
      </div>

      {/* próximo projeto */}
      <nav aria-label="Próximo projeto" className="mt-[length:var(--spacing-section)]">
        <Link
          to={`/projetos/${next.slug}`}
          className={`group block py-14 md:py-20 ${nextTone.bg} ${nextTone.text}`}
        >
          <div className="shell">
            <div className={`flex items-center justify-between border-b pb-4 ${nextTone.line}`}>
              <span className="eyebrow">Próximo projeto</span>
              <span className={`grid size-12 place-items-center rounded-full transition-transform duration-500 ease-(--ease-signature) group-hover:rotate-45 md:size-16 ${nextTone.accent}`}>
                <ArrowUpRight aria-hidden className="size-6" />
              </span>
            </div>
            <span className="display mt-8 block uppercase transition-transform duration-700 ease-(--ease-signature) group-hover:translate-x-3">
              <FitLine fill={0.9} className="leading-[0.9]">
                {next.title}
              </FitLine>
            </span>
          </div>
        </Link>
      </nav>
    </article>
  )
}
