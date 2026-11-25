import { projects } from '../data/projects'
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

/**
 * Cor do topo da página atual. O cabeçalho usa isso para escolher a cor
 * do texto enquanto está sobre o bloco colorido do topo.
 */
export type PageTone = 'violet' | 'ink' | 'coral' | 'paper'

const Ctx = createContext<{ tone: PageTone; setTone: (t: PageTone) => void }>({
  tone: 'paper',
  setTone: () => {},
})

/** Tom inicial pela URL, para o cabeçalho já nascer na cor certa (sem piscar). */
function initialTone(): PageTone {
  const path = window.location.pathname
  if (path === '/') return 'violet'
  if (path === '/hallowparty') return 'ink'
  const slug = path.match(/^\/projetos\/([^/]+)/)?.[1]
  return projects.find((p) => p.slug === slug)?.tone ?? 'violet'
}

export function PageToneProvider({ children }: { children: ReactNode }) {
  const [tone, setTone] = useState<PageTone>(initialTone)
  return <Ctx.Provider value={{ tone, setTone }}>{children}</Ctx.Provider>
}

export const usePageTone = () => useContext(Ctx).tone

/** Declara a cor do topo da página (chamar no componente da página). */
export function useDeclarePageTone(tone: PageTone) {
  const { setTone } = useContext(Ctx)
  useEffect(() => setTone(tone), [tone, setTone])
}
