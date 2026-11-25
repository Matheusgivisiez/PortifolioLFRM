import type { AnchorHTMLAttributes } from 'react'
import { Link, useLocation } from 'react-router'

type SectionLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  section: string
  /** Se definido, navega para esta página em vez de rolar até uma seção. */
  route?: string
}

/**
 * Link para uma seção da home. Na própria home usa âncora nativa
 * (rolagem suave); em outras páginas navega para "/#secao".
 */
export function SectionLink({ section, route, children, ...rest }: SectionLinkProps) {
  const { pathname } = useLocation()
  if (route) {
    return (
      <Link to={route} {...rest}>
        {children}
      </Link>
    )
  }
  if (pathname === '/') {
    return (
      <a href={`#${section}`} {...rest}>
        {children}
      </a>
    )
  }
  return (
    <Link to={{ pathname: '/', hash: `#${section}` }} {...rest}>
      {children}
    </Link>
  )
}
