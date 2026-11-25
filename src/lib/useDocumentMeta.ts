import { useEffect } from 'react'

const defaultDescription =
  document.querySelector('meta[name="description"]')?.getAttribute('content') ?? ''

/** Atualiza <title> e meta description por página (SEO no client). */
export function useDocumentMeta(title: string, description?: string) {
  useEffect(() => {
    document.title = title
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', description ?? defaultDescription)
  }, [title, description])
}
