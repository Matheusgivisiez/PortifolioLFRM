import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'

type FitLineProps = {
  children: ReactNode
  className?: string
  /** Fração da largura do container que a linha deve ocupar (1 = largura total). */
  fill?: number
  /** Tamanho máximo em px (ex.: limitar pela altura da tela). */
  max?: number | (() => number)
}

/**
 * Linha de título "estilo pôster": calcula o font-size para que o texto
 * ocupe exatamente a largura disponível. Recalcula ao redimensionar e
 * quando as fontes terminam de carregar.
 */
export function FitLine({ children, className = '', fill = 1, max = Infinity }: FitLineProps) {
  const outer = useRef<HTMLSpanElement>(null)
  const inner = useRef<HTMLSpanElement>(null)
  const [size, setSize] = useState<number | null>(null)

  useLayoutEffect(() => {
    const o = outer.current
    const i = inner.current
    if (!o || !i) return
    let lastWidth = -1

    const measure = (force = false) => {
      const width = o.clientWidth
      if (!width || (!force && width === lastWidth)) return
      lastWidth = width
      i.style.fontSize = '100px'
      const natural = i.getBoundingClientRect().width
      i.style.fontSize = ''
      if (!natural) return
      const limit = typeof max === 'function' ? max() : max
      setSize(Math.min(limit, (100 * width * fill) / natural))
    }

    measure(true)
    document.fonts?.ready.then(() => measure(true))
    const ro = new ResizeObserver(() => measure())
    ro.observe(o)
    return () => ro.disconnect()
  }, [fill, max])

  return (
    // o font-size fica no elemento externo: classes em "em" (padding, margens) escalam com a linha
    <span ref={outer} className={`block w-full ${className}`} style={{ fontSize: size ? `${size}px` : undefined }}>
      <span ref={inner} className="inline-block whitespace-nowrap">
        {children}
      </span>
    </span>
  )
}

/** Limite de tamanho relativo à altura da janela (para não estourar a primeira dobra). */
export const vhMax = (fraction: number) => () => window.innerHeight * fraction
