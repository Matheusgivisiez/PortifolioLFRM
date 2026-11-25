import { ArrowUp } from 'lucide-react'
import { profile } from '../../data/profile'
import { Logo } from '../ui/Logo'

export function Footer() {
  return (
    <footer className="on-dark border-t border-paper/10 bg-ink text-paper">
      <div className="shell flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <Logo tone="paper" />
          <span className="text-sm text-paper/60">{profile.concept}</span>
        </div>
        <div className="flex items-center justify-between gap-8 text-sm text-paper/60 md:justify-end">
          <p>
            © {new Date().getFullYear()} {profile.name}
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0 })}
            className="group inline-flex min-h-11 items-center gap-2 font-medium text-paper transition-colors hover:text-coral"
          >
            Voltar ao topo
            <ArrowUp
              aria-hidden
              className="size-4 transition-transform duration-500 ease-(--ease-signature) group-hover:-translate-y-1"
            />
          </button>
        </div>
      </div>
    </footer>
  )
}
