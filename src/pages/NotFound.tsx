import { FitLine } from '../components/ui/FitLine'
import { Tape } from '../components/ui/Tape'
import { profile } from '../data/profile'
import { useDeclarePageTone } from '../lib/pageTone'
import { useDocumentMeta } from '../lib/useDocumentMeta'
import { Link } from 'react-router'

export function NotFound() {
  useDeclarePageTone('violet')
  useDocumentMeta(`Página não encontrada — ${profile.name}`)

  return (
    <section className="on-violet flex min-h-svh flex-col justify-center bg-violet pt-24 text-paper">
      <div className="shell pb-16">
        <p className="eyebrow">Erro 404</p>
        <h1 className="display mt-6 uppercase" aria-label="Essa ideia ainda não ganhou forma.">
          <FitLine fill={0.7}>Essa ideia</FitLine>
          <FitLine className="pt-[0.06em]">
            ainda não <Tape>existe</Tape>
          </FitLine>
        </h1>
        <Link
          to="/"
          className="mt-10 inline-flex min-h-12 items-center rounded-full bg-paper px-6 font-medium text-ink transition-colors hover:bg-coral"
        >
          Voltar para o início
        </Link>
      </div>
    </section>
  )
}
