import { useEffect } from 'react'

/** Rola até a seção do hash atual — ou ao topo, se não houver hash. */
export function scrollToCurrentLocation() {
  const hash = window.location.hash
  if (!hash) {
    window.scrollTo({ top: 0, behavior: 'instant' })
    return
  }
  // espera a nova página renderizar antes de procurar a seção
  window.setTimeout(() => {
    document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView({ behavior: 'instant' })
  }, 50)
}

/**
 * Primeira carga: o navegador não encontra a âncora porque a página é
 * montada pelo React, então rolamos manualmente. Trocas de página são
 * tratadas pela transição (ao terminar a saída da página anterior).
 */
export function ScrollManager() {
  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    if (window.location.hash) scrollToCurrentLocation()
  }, [])
  return null
}
