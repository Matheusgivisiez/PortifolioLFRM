import { ChevronLeft, ChevronRight, Pause, Play, Video, Volume2, VolumeX } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { FitLine } from '../components/ui/FitLine'
import { Reveal } from '../components/ui/Reveal'
import { SectionLabel } from '../components/ui/SectionLabel'
import { liveVideos, type LiveVideo } from '../data/videos'
import { easeSignature } from '../lib/motion'

/** Duração de cada story de exemplo (sem vídeo). */
const PLACEHOLDER_MS = 6000

type Story = LiveVideo | { src: null; title: string; role?: string; tone: string }

const placeholders: Story[] = [
  { src: null, title: 'Título do trabalho', role: 'Papel a definir', tone: 'from-violet to-ink' },
  { src: null, title: 'Título do trabalho', role: 'Papel a definir', tone: 'from-coral to-violet' },
  { src: null, title: 'Título do trabalho', role: 'Papel a definir', tone: 'from-ink to-violet' },
]

export function LiveStories() {
  const reduce = useReducedMotion()
  const hasVideos = liveVideos.length > 0
  const stories: Story[] = hasVideos ? liveVideos : placeholders
  const total = stories.length

  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [muted, setMuted] = useState(true)
  const [inView, setInView] = useState(false)

  const sectionRef = useRef<HTMLElement>(null)
  // um elemento por story: na transição o vídeo que sai é desmontado depois do que entra,
  // então uma ref única seria apagada e a barra pararia de andar
  const videoEls = useRef<(HTMLVideoElement | null)[]>([])
  const bars = useRef<(HTMLSpanElement | null)[]>([])
  const userStarted = useRef(false)
  const elapsed = useRef(0)

  const story = stories[index]
  // com "reduzir movimento", nada toca sozinho: começa pausado
  const playing = inView && !paused && !(reduce && !userStarted.current)

  const go = useCallback((i: number) => {
    elapsed.current = 0
    setIndex(((i % total) + total) % total)
  }, [total])

  // toca só quando a seção está visível
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // play/pause do vídeo atual
  useEffect(() => {
    const v = videoEls.current[index]
    if (!v) return
    v.muted = muted
    if (playing) v.play().catch(() => {})
    else v.pause()
  }, [playing, muted, index])

  // barra de progresso (vídeo: tempo real · exemplo: temporizador)
  useEffect(() => {
    let raf = 0
    let last = performance.now()
    const tick = (now: number) => {
      const dt = now - last
      last = now
      let p = 0
      if (story.src) {
        const v = videoEls.current[index]
        p = v && v.duration ? v.currentTime / v.duration : 0
      } else {
        if (playing) elapsed.current += dt
        p = elapsed.current / PLACEHOLDER_MS
        if (p >= 1) {
          go(index + 1)
          return
        }
      }
      bars.current.forEach((bar, i) => {
        if (bar) bar.style.transform = `scaleX(${i < index ? 1 : i > index ? 0 : Math.min(p, 1)})`
      })
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [index, playing, story.src, go])

  return (
    <section
      ref={sectionRef}
      id="ao-vivo"
      aria-labelledby="ao-vivo-titulo"
      className="on-dark relative isolate overflow-hidden py-[length:var(--spacing-section)] text-paper"
    >
      {/* brilho de palco */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_75%_40%,rgb(255_117_72/0.18),transparent_55%)]"
      />

      <div className="shell grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-[length:var(--spacing-gutter)]">
        {/* texto + playlist */}
        <div className="lg:col-span-5">
          <SectionLabel index="03" className="text-paper/70">
            Vídeos e eventos
          </SectionLabel>
          <Reveal>
            <h2 id="ao-vivo-titulo" aria-label="Ao vivo" className="display mt-6 flex items-center gap-[0.12em] uppercase">
              <span className="min-w-0 flex-1">
                <FitLine fill={0.86}>Ao vivo</FitLine>
              </span>
            </h2>
          </Reveal>
          <Reveal className="mt-6 flex items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-coral px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-ink">
              <span aria-hidden className="size-2 animate-pulse rounded-full bg-ink" /> Rec
            </span>
            <span className="text-sm text-paper/70">Conteúdo e produção de eventos</span>
          </Reveal>

          {!hasVideos && (
            <Reveal>
              <p className="mt-6 border-l-[3px] border-coral pl-3 text-sm text-paper/80">
                Os stories são espaços reservados para os vídeos dos trabalhos.
              </p>
            </Reveal>
          )}

          {/* playlist (desktop) */}
          <ol className="mt-10 hidden border-t border-paper/15 lg:block">
            {stories.map((s, i) => (
              <li key={i}>
                <button
                  type="button"
                  onClick={() => go(i)}
                  aria-current={i === index ? 'true' : undefined}
                  className={`group flex w-full items-center gap-4 border-b border-paper/15 py-4 text-left transition-colors ${
                    i === index ? 'text-paper' : 'text-paper/50 hover:text-paper'
                  }`}
                >
                  <span className={`text-sm font-semibold ${i === index ? 'text-coral' : ''}`}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-display text-xl uppercase leading-tight">{s.title}</span>
                    {s.role && <span className="block text-sm opacity-80">{s.role}</span>}
                  </span>
                  {i === index && (
                    <motion.span
                      layoutId="story-now"
                      aria-hidden
                      className="size-2.5 rounded-full bg-coral"
                      transition={{ duration: 0.4, ease: easeSignature }}
                    />
                  )}
                </button>
              </li>
            ))}
          </ol>
        </div>

        {/* story */}
        <div className="lg:col-span-6 lg:col-start-7">
          <div className="relative mx-auto aspect-[9/16] w-full max-w-[min(24rem,calc((100svh-8rem)*9/16))] overflow-hidden rounded-[1.75rem] bg-ink shadow-[0_40px_80px_-30px_rgb(0_0_0/0.8)] ring-1 ring-paper/10">
            <AnimatePresence initial={false} mode="popLayout">
              <motion.div
                key={index}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: easeSignature }}
              >
                {story.src ? (
                  <video
                    ref={(el) => {
                      const i = index
                      if (el) videoEls.current[i] = el
                      else if (videoEls.current[i] && !videoEls.current[i]!.isConnected) videoEls.current[i] = null
                    }}
                    src={story.src}
                    poster={'poster' in story ? story.poster : undefined}
                    muted={muted}
                    playsInline
                    preload="metadata"
                    onEnded={() => go(index + 1)}
                    className="size-full object-cover"
                  />
                ) : (
                  <div
                    className={`flex size-full flex-col items-center justify-center gap-3 bg-gradient-to-b ${
                      'tone' in story ? story.tone : ''
                    } text-paper/80`}
                  >
                    <Video aria-hidden className="size-10" strokeWidth={1.5} />
                    <span className="eyebrow">Vídeo em breve</span>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* sombras para leitura */}
            <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/55 to-transparent" />
            <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/75 to-transparent" />

            {/* barras de progresso */}
            <div className="absolute inset-x-3 top-3 flex gap-1.5" aria-hidden>
              {stories.map((_, i) => (
                <span key={i} className="h-[3px] flex-1 overflow-hidden rounded-full bg-paper/30">
                  <span
                    ref={(el) => {
                      bars.current[i] = el
                    }}
                    className="block h-full origin-left scale-x-0 rounded-full bg-paper"
                  />
                </span>
              ))}
            </div>

            {/* topo: selo + controles */}
            <div className="absolute inset-x-3 top-7 flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-coral px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-ink">
                <span aria-hidden className="size-1.5 animate-pulse rounded-full bg-ink" /> Ao vivo
              </span>
              <span className="flex gap-1.5">
                <button
                  type="button"
                  onClick={() => {
                    userStarted.current = true
                    setPaused((p) => !p)
                  }}
                  aria-label={playing ? 'Pausar' : 'Reproduzir'}
                  className="relative z-20 grid size-10 place-items-center rounded-full bg-black/40 backdrop-blur transition-colors hover:bg-black/60"
                >
                  {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
                </button>
                {story.src && (
                  <button
                    type="button"
                    onClick={() => setMuted((m) => !m)}
                    aria-label={muted ? 'Ativar som' : 'Desativar som'}
                    className="relative z-20 grid size-10 place-items-center rounded-full bg-black/40 backdrop-blur transition-colors hover:bg-black/60"
                  >
                    {muted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
                  </button>
                )}
              </span>
            </div>

            {/* toque nas laterais: anterior / próximo */}
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Story anterior"
              className="absolute inset-y-0 left-0 z-10 w-1/3"
            />
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Próximo story"
              className="absolute inset-y-0 right-0 z-10 w-2/3"
            />

            {/* legenda */}
            <div className="pointer-events-none absolute inset-x-5 bottom-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.35, ease: easeSignature }}
                >
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-coral">
                    {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                  </p>
                  <p className="mt-1 font-display text-2xl uppercase leading-[0.95]">{story.title}</p>
                  {story.role && <p className="mt-1.5 text-sm text-paper/85">{story.role}</p>}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* setas (celular e tablet) */}
          <div className="mx-auto mt-5 flex max-w-[24rem] items-center justify-between lg:hidden">
            <button
              type="button"
              onClick={() => go(index - 1)}
              className="inline-flex min-h-11 items-center gap-1 rounded-full px-3 text-sm font-medium hover:bg-paper/10"
            >
              <ChevronLeft className="size-4" /> Anterior
            </button>
            <span className="text-xs text-paper/60">Toque nas laterais do vídeo</span>
            <button
              type="button"
              onClick={() => go(index + 1)}
              className="inline-flex min-h-11 items-center gap-1 rounded-full px-3 text-sm font-medium hover:bg-paper/10"
            >
              Próximo <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

