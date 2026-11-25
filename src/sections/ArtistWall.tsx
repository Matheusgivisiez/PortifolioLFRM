import { Camera, Hand, Maximize2, RotateCcw } from 'lucide-react'
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useAnimate,
  useTransform,
} from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { FitLine } from '../components/ui/FitLine'
import { PhotoLightbox } from '../components/ui/PhotoLightbox'
import { Reveal } from '../components/ui/Reveal'
import { SectionLabel } from '../components/ui/SectionLabel'
import { Tape } from '../components/ui/Tape'
import { artistPhotos, artistPlaceholderCount, type ArtistPhoto } from '../data/artists'
import { profile } from '../data/profile'
import { viewportOnce } from '../lib/motion'

/** Variações por credencial: cor do cordão/faixa, comprimento do cordão, ritmo do balanço. */
const looks = [
  { strap: '#FF7548', band: 'bg-coral text-ink', back: 'bg-coral text-ink' },
  { strap: '#7547F8', band: 'bg-violet text-paper', back: 'bg-violet text-paper' },
  { strap: '#F5F2EC', band: 'bg-ink text-paper', back: 'bg-paper text-ink' },
  { strap: '#FF7548', band: 'bg-violet text-paper', back: 'bg-ink text-paper' },
]
const straps = [120, 175, 140, 205, 150, 125, 190, 160]

/** Pode arrastar? Só com mouse/trackpad e sem preferência por movimento reduzido. */
function useCanDrag() {
  const reduce = useReducedMotion()
  const [fine, setFine] = useState(false)
  useEffect(() => setFine(window.matchMedia('(pointer: fine)').matches), [])
  return fine && !reduce
}

/** Fator de escala do cordão (menor no celular). */
function useStrapScale() {
  const [scale, setScale] = useState(1)
  useEffect(() => {
    const update = () => setScale(window.innerWidth < 640 ? 0.7 : window.innerWidth < 1024 ? 0.8 : 1)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])
  return scale
}

/** Código de barras decorativo. */
const Barcode = () => (
  <span
    aria-hidden
    className="block h-8 w-full bg-[repeating-linear-gradient(90deg,currentColor_0_2px,transparent_2px_4px,currentColor_4px_5px,transparent_5px_8px,currentColor_8px_11px,transparent_11px_13px)] opacity-80"
  />
)

function Credential({
  photo,
  index,
  canDrag,
  strapScale,
  onEnlarge,
}: {
  photo: ArtistPhoto | null
  index: number
  canDrag: boolean
  strapScale: number
  onEnlarge: () => void
}) {
  const look = looks[index % looks.length]
  const strap = Math.round(straps[index % straps.length] * strapScale)
  const reduce = useReducedMotion()
  const [flipped, setFlipped] = useState(false)
  const [lifted, setLifted] = useState(false)
  const [card, animateCard] = useAnimate()
  // giro 2D (achata → troca a face → abre): evita camadas 3D, que deixam texto e foto borrados no celular
  const flip = async () => {
    if (reduce) return setFlipped((f) => !f)
    await animateCard(card.current, { scaleX: 0 }, { duration: 0.14, ease: [0.55, 0, 1, 0.45] })
    setFlipped((f) => !f)
    await animateCard(card.current, { scaleX: 1 }, { duration: 0.3, ease: [0.22, 1, 0.36, 1] })
  }
  const dragged = useRef(false)
  const number = String(index + 1).padStart(3, '0')
  const name = photo ? (photo.artist ?? 'Nome a definir') : 'Em breve'

  // posição do crachá (arrasto) → cordão e inclinação acompanham
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const swing = useSpring(useTransform(x, [-220, 220], [32, -32]), { stiffness: 120, damping: 7 })
  const lineX = useTransform(x, (v) => v)
  const lineY = useTransform(y, (v) => strap + v)

  return (
    <motion.li
      className="relative flex w-[72vw] max-w-[17rem] shrink-0 snap-center justify-center border-t border-paper/15 px-3 sm:w-auto sm:max-w-none"
      style={{ paddingTop: strap, zIndex: lifted ? 30 : undefined }}
      initial={{ opacity: 0, y: -60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ delay: (index % 4) * 0.1, type: 'spring', stiffness: 90, damping: 9 }}
    >
      {/* ponto de fixação */}
      <span aria-hidden className="absolute left-1/2 top-0 z-10 h-3 w-7 -translate-x-1/2 -translate-y-1/2 rounded-sm bg-paper/70" />

      {/* cordão */}
      <svg aria-hidden className="pointer-events-none absolute left-1/2 top-0 z-0 overflow-visible" width="1" height="1">
        <motion.line x1={0} y1={0} x2={lineX} y2={lineY} stroke={look.strap} strokeWidth={9} strokeLinecap="round" />
        <motion.line x1={0} y1={0} x2={lineX} y2={lineY} stroke="rgb(0 0 0 / 0.25)" strokeWidth={2} strokeDasharray="1 7" />
      </svg>

      <motion.div
        className="relative z-10 w-[min(100%,15rem)]"
        style={{ x, y, rotate: swing, transformOrigin: '50% 0%' }}
        drag={canDrag}
        dragSnapToOrigin
        dragElastic={0.55}
        dragTransition={{ bounceStiffness: 260, bounceDamping: 9 }}
        whileDrag={{ zIndex: 40, cursor: 'grabbing' }}
        onDragStart={() => {
          dragged.current = true
          setLifted(true)
        }}
        onDragTransitionEnd={() => setLifted(false)}
      >
        {/* balanço ambiente */}
        <motion.div
          animate={reduce ? undefined : { rotate: [-1.6, 1.6, -1.6] }}
          transition={{ duration: 3.4 + (index % 3) * 0.7, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '50% 0%' }}
        >
          {/* presilha */}
          <span aria-hidden className="mx-auto block h-5 w-10 rounded-t-md border-[3px] border-b-0 border-paper/80" />

          <button
            type="button"
            onPointerDown={() => (dragged.current = false)}
            onClick={() => {
              if (dragged.current) return
              void flip()
            }}
            aria-pressed={flipped}
            aria-label={`Credencial ${number}: ${name}. ${flipped ? 'Mostrar foto' : 'Virar para ver o artista'}`}
            className={`relative block w-full text-left ${canDrag ? 'cursor-grab' : ''}`}
          >
            <span ref={card} className="relative block">
              {/* frente */}
              <span className={`relative block overflow-hidden rounded-2xl bg-paper text-ink shadow-[0_30px_50px_-20px_rgb(0_0_0/0.7)] ${flipped ? 'invisible' : ''}`}>
                <span className={`flex items-center justify-between px-3 py-2 ${look.band}`}>
                  <span className="font-display text-sm uppercase tracking-wide">Backstage</span>
                  <span className="hidden text-[0.6rem] font-semibold uppercase tracking-[0.18em] sm:inline">All access</span>
                </span>
                <span aria-hidden className="mx-auto mt-2 block h-1.5 w-10 rounded-full bg-ink/15" />
                <span className="mx-3 mt-2 block aspect-[4/5] overflow-hidden rounded-lg bg-paper-deep">
                  {photo ? (
                    <img
                      src={photo.src}
                      alt={photo.alt ?? (photo.artist ? `${profile.name} com ${photo.artist}` : `${profile.name} com artista`)}
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                      style={{ objectPosition: photo.focus ?? '50% 30%' }}
                      className="size-full object-cover"
                    />
                  ) : (
                    <span className="flex size-full flex-col items-center justify-center gap-2 text-ink-soft">
                      <Camera aria-hidden className="size-7" strokeWidth={1.5} />
                      <span className="eyebrow text-[0.62rem]">Foto em breve</span>
                    </span>
                  )}
                </span>
                <span className="flex items-end justify-between gap-2 px-3 pb-3 pt-2.5">
                  <span className="min-w-0">
                    <span className="block text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-ink-soft">
                      {profile.monogram} · Nº {number}
                    </span>
                    <span className="mt-0.5 block truncate font-display text-base uppercase leading-tight">{name}</span>
                  </span>
                  <RotateCcw aria-hidden className="size-4 shrink-0 text-ink-soft" />
                </span>
              </span>

              {/* verso */}
              <span
                className={`absolute inset-0 flex flex-col justify-between overflow-hidden rounded-2xl p-4 shadow-[0_30px_50px_-20px_rgb(0_0_0/0.7)] ${flipped ? '' : 'invisible'} ${look.back}`}
              >
                <span className="flex items-center justify-between">
                  <span className="text-[0.6rem] font-semibold uppercase tracking-[0.18em]">Nº {number}</span>
                  <span className="text-[0.6rem] font-semibold uppercase tracking-[0.18em]">{profile.monogram}</span>
                </span>
                <span>
                  <span aria-hidden className="block font-display text-[3.6rem] leading-[0.85]">VIP</span>
                  <span className="mt-3 block font-display text-xl uppercase leading-tight">{name}</span>
                  {photo?.context && <span className="mt-1 block text-sm opacity-80">{photo.context}</span>}
                </span>
                <span className="block space-y-3">
                  <Barcode />
                </span>
              </span>
            </span>
          </button>

          {photo && (
            <button
              type="button"
              onClick={onEnlarge}
              aria-label={`Ampliar foto com ${name}`}
              className="absolute right-2 top-[3.6rem] z-20 grid size-9 place-items-center rounded-full bg-ink/70 text-paper backdrop-blur transition-colors hover:bg-coral hover:text-ink"
            >
              <Maximize2 aria-hidden className="size-4" />
            </button>
          )}
        </motion.div>
      </motion.div>
    </motion.li>
  )
}

export function ArtistWall() {
  const [open, setOpen] = useState<number | null>(null)
  const lastTrigger = useRef<HTMLElement | null>(null)
  const canDrag = useCanDrag()
  const strapScale = useStrapScale()
  const hasPhotos = artistPhotos.length > 0
  const items: (ArtistPhoto | null)[] = hasPhotos
    ? artistPhotos
    : Array.from({ length: artistPlaceholderCount }, () => null)

  return (
    <section
      id="artistas"
      aria-labelledby="artistas-titulo"
      className="on-dark relative isolate overflow-hidden bg-ink py-[length:var(--spacing-section)] text-paper"
    >
      {/* luzes de palco — surgem aos poucos (máscara) para não criar corte com a seção de cima */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[80%] bg-[radial-gradient(ellipse_at_20%_35%,rgb(117_71_248/0.35),transparent_60%),radial-gradient(ellipse_at_85%_40%,rgb(255_117_72/0.22),transparent_55%)] [mask-image:linear-gradient(to_bottom,transparent,black_40%,black_70%,transparent)]"
      />

      <div className="shell">
        <div className="flex items-end justify-between gap-6">
          <SectionLabel index="04" className="text-paper/70">
            Trabalhos
          </SectionLabel>
          {canDrag && (
            <p className="eyebrow hidden items-center gap-2 text-coral md:flex">
              <Hand aria-hidden className="size-4" /> Puxe, solte e vire as credenciais
            </p>
          )}
        </div>

        <Reveal>
          <h2 id="artistas-titulo" aria-label="Backstage" className="display mt-6 uppercase">
            <FitLine fill={0.92}>
              Back
              <Tape className="ml-[0.06em] bg-coral text-ink" tilt={-3}>
                stage
              </Tape>
            </FitLine>
          </h2>
        </Reveal>

        <Reveal className="mt-8 grid gap-6 md:grid-cols-12">
          <div className="space-y-4 md:col-span-6">
            <p className="text-[length:var(--text-lead)] leading-snug text-paper/85">
              Um registro de artistas com quem Luís já teve a oportunidade de trabalhar, fazendo parte de
              grandes experiências nos bastidores, seja no marketing ou na produção dos eventos.
            </p>
            <p className="font-medium text-coral">Toque em uma credencial para conhecer essa trajetória.</p>
          </div>
          {!hasPhotos && (
            <p className="border-l-[3px] border-coral pl-3 text-sm text-paper/80 md:col-span-4 md:col-start-9">
              As credenciais abaixo são espaços reservados para as fotos com artistas.
            </p>
          )}
        </Reveal>

        <p className="eyebrow mt-10 flex items-center gap-2 text-coral sm:hidden">
          <Hand aria-hidden className="size-4" /> Deslize para ver todas
        </p>
        {/* celular: carrossel horizontal com encaixe · tablet/desktop: grade */}
        <ul className="mx-[calc(var(--spacing-gutter)*-1)] mt-4 flex snap-x snap-mandatory overflow-x-auto px-[14vw] pb-12 pt-2 [scrollbar-width:none] sm:mx-0 sm:mt-16 sm:grid sm:grid-cols-3 sm:gap-y-14 sm:overflow-visible sm:px-0 sm:pb-0 sm:pt-0 md:mt-24 lg:grid-cols-4 lg:gap-y-20 [&::-webkit-scrollbar]:hidden">
          {items.map((photo, i) => (
            <Credential
              key={photo?.src ?? i}
              photo={photo}
              index={i}
              canDrag={canDrag}
              strapScale={strapScale}
              onEnlarge={() => {
                lastTrigger.current = document.activeElement as HTMLElement
                setOpen(i)
              }}
            />
          ))}
        </ul>
      </div>

      <AnimatePresence onExitComplete={() => lastTrigger.current?.focus()}>
        {open !== null && <PhotoLightbox key="lightbox" index={open} onNavigate={setOpen} onClose={() => setOpen(null)} />}
      </AnimatePresence>
    </section>
  )
}

