import { ImageIcon } from 'lucide-react'

type FrameProps = {
  src: string | null
  alt: string
  caption?: string
  className?: string
  /** classes de proporção, ex.: aspect-[16/9] */
  aspect?: string
  eager?: boolean
}

/**
 * Imagem de projeto. Sem `src`, mostra um quadro reservado claramente
 * identificado, pronto para ser substituído pela imagem real.
 */
export function Frame({ src, alt, caption, className = '', aspect = 'aspect-[16/10]', eager = false }: FrameProps) {
  return (
    <figure className={className}>
      <div className={`relative overflow-hidden bg-paper-deep ${aspect}`}>
        {src ? (
          <img
            src={src}
            alt={alt}
            loading={eager ? 'eager' : 'lazy'}
            decoding="async"
            className="size-full object-cover"
          />
        ) : (
          <div
            role="img"
            aria-label={`Espaço reservado: ${alt}`}
            className="flex size-full flex-col items-center justify-center gap-3 border-2 border-dashed border-ink/20 text-ink-soft"
          >
            <ImageIcon aria-hidden className="size-8" strokeWidth={1.5} />
            <span className="eyebrow">Imagem a adicionar</span>
          </div>
        )}
      </div>
      {caption && <figcaption className="mt-3 text-sm text-ink-soft">{caption}</figcaption>}
    </figure>
  )
}
