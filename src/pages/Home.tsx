import { Marquee } from '../components/ui/Marquee'
import { profile } from '../data/profile'
import { useDeclarePageTone } from '../lib/pageTone'
import { useDocumentMeta } from '../lib/useDocumentMeta'
import { About } from '../sections/About'
import { Contact } from '../sections/Contact'
import { Hero } from '../sections/Hero'
import { ArtistWall } from '../sections/ArtistWall'
import { HallowTeaser } from '../sections/HallowTeaser'
import { Skills } from '../sections/Skills'

const disciplines = [
  'Identidade visual',
  'Branding',
  'Campanhas',
  'Social media',
  'Direção de arte',
  'Fotografia',
  'Design gráfico',
]

/** Faixas cruzadas entre o hero e os projetos — fita de cartaz. */
function Ribbons() {
  return (
    <div aria-hidden className="relative z-10 -my-6 overflow-hidden py-8 md:-my-10 md:py-12">
      <div className="absolute inset-x-[-5%] top-1/2 -translate-y-1/2 rotate-[1.5deg] bg-ink py-3 md:py-4">
        <Marquee
          items={disciplines}
          className="font-display text-[clamp(1.1rem,2.4vw,2.1rem)] uppercase text-paper/40"
        />
      </div>
      <div className="relative -mx-[5%] -rotate-2 bg-coral py-3 text-ink md:py-4">
        <Marquee items={disciplines} className="font-display text-[clamp(1.1rem,2.4vw,2.1rem)] uppercase" />
      </div>
    </div>
  )
}

export function Home() {
  useDeclarePageTone('violet')
  useDocumentMeta(`${profile.name} — Publicidade e Propaganda | Portfólio`)

  return (
    <>
      <Hero />
      <Ribbons />
      {/* Projetos/cases ficam guardados em sections/Projects.tsx e pages/ProjectPage.tsx para uso futuro */}
      {/* seções escuras seguidas num único fundo carvão: evita frestas claras de 1px
          quando o navegador arredonda alturas (zoom do sistema em 125%, 150%...) */}
      <div className="bg-ink">
        <ArtistWall />
        <HallowTeaser />
        <About />
      </div>
      <Skills />
      <Contact />
    </>
  )
}
