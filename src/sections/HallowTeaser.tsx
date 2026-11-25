import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router'
import { FitLine } from '../components/ui/FitLine'
import { Reveal } from '../components/ui/Reveal'
import { Tape } from '../components/ui/Tape'
import { hallowparty } from '../data/hallowparty'

/** Chamada na home para a página especial da Hallowparty. */
export function HallowTeaser() {
  return (
    <section aria-label="Hallowparty" className="on-dark relative bg-ink pb-[length:var(--spacing-section)]">
      <div className="shell">
        <Reveal>
          <Link
            to="/hallowparty"
            aria-label="Hallowparty — conhecer o evento criado e organizado pelo Luís"
            className="on-violet group relative isolate block overflow-hidden bg-violet p-6 text-paper sm:p-10 md:p-14"
          >
            <span
              aria-hidden
              className="absolute -right-24 -top-24 -z-10 size-72 rounded-full bg-ink/25 transition-transform duration-700 ease-(--ease-signature) group-hover:scale-110 md:size-[28rem]"
            />
            <span className="flex flex-wrap items-center justify-between gap-4">
              <span className="eyebrow">Projeto especial · Evento</span>
              <span className="eyebrow hidden text-paper/80 sm:inline">{hallowparty.role.join(' · ')}</span>
            </span>

            <span className="display mt-10 block uppercase md:mt-14">
              <FitLine fill={0.94}>
                Hallow
                <Tape className="ml-[0.08em] bg-coral text-ink" tilt={-3}>
                  party
                </Tape>
              </FitLine>
            </span>

            <span className="mt-8 flex flex-wrap items-end justify-between gap-6">
              <span className="max-w-md text-[length:var(--text-lead)] leading-snug text-paper/85">
                A festa que o Luís criou e organiza — e que cresce a cada edição.
              </span>
              <span className="inline-flex items-center gap-3 font-medium">
                Conhecer a Hallowparty
                <span className="grid size-12 place-items-center rounded-full bg-coral text-ink transition-transform duration-500 ease-(--ease-signature) group-hover:rotate-45">
                  <ArrowUpRight aria-hidden className="size-5" />
                </span>
              </span>
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
