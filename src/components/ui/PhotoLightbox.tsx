import { ArrowLeft, ArrowRight, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef } from 'react'
import { artistPhotos } from '../../data/artists'
import { easeExit, easeSignature } from '../../lib/motion'

/** Foto ampliada: Esc fecha, setas navegam, foco preso no diálogo. */
export function PhotoLightbox({
  index,
  onClose,
  onNavigate,
}: {
  index: number
  onClose: () => void
  onNavigate: (i: number) => void
}) {
  const photo = artistPhotos[index]
  const total = artistPhotos.length
  const closeRef = useRef<HTMLButtonElement>(null)
  const handlers = useRef({ onClose, onNavigate, index })
  handlers.current = { onClose, onNavigate, index }

  useEffect(() => {
    const root = document.documentElement
    root.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      const h = handlers.current
      if (e.key === 'Escape') h.onClose()
      if (e.key === 'ArrowRight') h.onNavigate((h.index + 1) % total)
      if (e.key === 'ArrowLeft') h.onNavigate((h.index - 1 + total) % total)
      if (e.key === 'Tab') e.preventDefault() // poucos controles: mantém o foco no diálogo
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      root.style.overflow = ''
    }
  }, [total])

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`Foto com ${photo.artist ?? 'artista'}`}
      className="fixed inset-0 z-[60] flex flex-col bg-ink/95 text-paper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.3 } }}
      exit={{ opacity: 0, transition: { duration: 0.25, ease: easeExit } }}
    >
      <div className="shell flex h-16 items-center justify-between md:h-20">
        <span className="eyebrow text-paper/70">
          {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          className="grid size-12 place-items-center rounded-full bg-paper text-ink transition-colors hover:bg-coral"
        >
          <X className="size-5" />
        </button>
      </div>

      <div className="relative flex flex-1 items-center justify-center px-4 pb-6" onClick={onClose}>
        <AnimatePresence mode="wait">
          <motion.figure
            key={photo.src}
            className="flex max-h-full flex-col items-center"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.96, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.45, ease: easeSignature } }}
            exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.2, ease: easeExit } }}
          >
            <div className="bg-white p-3 pb-4 shadow-2xl">
              <img
                src={photo.src}
                alt={photo.alt ?? `Luís Felipe Martins com ${photo.artist ?? 'artista'}`}
                className="max-h-[calc(100svh-14rem)] w-auto max-w-[min(90vw,60rem)] object-contain"
              />
              <figcaption className="pt-3 text-center">
                <span className="block font-display text-xl uppercase text-ink md:text-2xl">{photo.artist ?? 'Nome a definir'}</span>
                {photo.context && <span className="mt-1 block text-sm text-ink-soft">{photo.context}</span>}
              </figcaption>
            </div>
          </motion.figure>
        </AnimatePresence>
      </div>

      {total > 1 && (
        <div className="shell flex justify-between pb-6">
          <button
            type="button"
            onClick={() => onNavigate((index - 1 + total) % total)}
            className="inline-flex min-h-12 items-center gap-2 rounded-full px-4 font-medium hover:bg-paper/10"
          >
            <ArrowLeft className="size-5" /> Anterior
          </button>
          <button
            type="button"
            onClick={() => onNavigate((index + 1) % total)}
            className="inline-flex min-h-12 items-center gap-2 rounded-full px-4 font-medium hover:bg-paper/10"
          >
            Próxima <ArrowRight className="size-5" />
          </button>
        </div>
      )}
    </motion.div>
  )
}
