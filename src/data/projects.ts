/**
 * Projetos do portfólio — cada um vira uma página própria em /projetos/<slug>.
 *
 * ATENÇÃO: os itens abaixo são ESPAÇOS DEMONSTRATIVOS (placeholder: true).
 * Não representam trabalhos reais. Para publicar um projeto real:
 *   1. coloque as imagens em /public/images/projects/<slug>/ (jpg/webp, ~1600px);
 *   2. preencha título, categoria, ano, resumo, seções e galeria;
 *   3. troque `placeholder` para false.
 */

export type Tone = 'violet' | 'ink' | 'coral'

export type CaseSection = {
  heading: string
  text: string
}

export type GalleryItem = {
  /** Caminho da imagem. `null` mostra um quadro reservado. */
  src: string | null
  alt: string
  caption?: string
  /** full = largura total · half = meia largura (lado a lado no desktop) */
  size: 'full' | 'half'
}

export type Project = {
  slug: string
  title: string
  category: string
  year?: string
  /** Uma frase — aparece no card da home e no topo do case. */
  summary: string
  /** Papel do Luís no projeto (ex.: "Direção de arte e redação"). */
  role?: string
  tools?: string[]
  cover: string
  coverAlt: string
  /** Cor do bloco do projeto na home e no topo do case. */
  tone: Tone
  sections: CaseSection[]
  gallery: GalleryItem[]
  placeholder: boolean
}

/** Estrutura sugerida de case — usada pelos espaços demonstrativos. */
const exampleSections: CaseSection[] = [
  {
    heading: 'Contexto',
    text: 'Espaço para explicar o briefing, o problema ou a oportunidade que deu origem ao projeto — para quem era e o que precisava ser comunicado.',
  },
  {
    heading: 'Ideia',
    text: 'Espaço para apresentar o conceito criativo: a ideia central, de onde ela veio e por que ela responde ao desafio.',
  },
  {
    heading: 'Processo',
    text: 'Espaço para mostrar referências, rascunhos, testes e as decisões tomadas no caminho até a versão final.',
  },
  {
    heading: 'Resultado',
    text: 'Espaço para apresentar as peças finais e o que o projeto entregou. Use apenas resultados reais.',
  },
]

const exampleGallery = (label: string): GalleryItem[] => [
  { src: null, alt: `Imagem principal do projeto de ${label}`, caption: 'Imagem 01 — peça principal', size: 'full' },
  { src: null, alt: `Detalhe do projeto de ${label}`, caption: 'Imagem 02 — detalhe', size: 'half' },
  { src: null, alt: `Aplicação do projeto de ${label}`, caption: 'Imagem 03 — aplicação', size: 'half' },
  { src: null, alt: `Desdobramento do projeto de ${label}`, caption: 'Imagem 04 — desdobramento', size: 'full' },
]

export const projects: Project[] = [
  {
    slug: 'identidade-visual',
    title: 'Sistema de identidade visual',
    category: 'Identidade visual',
    summary: 'Espaço reservado para um projeto de identidade visual.',
    cover: '/images/projects/identidade-visual.svg',
    coverAlt: 'Composição ilustrativa de construção de marca com círculos e grid — imagem de exemplo',
    tone: 'violet',
    sections: exampleSections,
    gallery: exampleGallery('identidade visual'),
    placeholder: true,
  },
  {
    slug: 'campanha-publicitaria',
    title: 'Campanha publicitária',
    category: 'Campanhas',
    summary: 'Espaço reservado para uma campanha publicitária.',
    cover: '/images/projects/campanha.svg',
    coverAlt: 'Cartaz ilustrativo com tipografia e seta em destaque — imagem de exemplo',
    tone: 'coral',
    sections: exampleSections,
    gallery: exampleGallery('campanha publicitária'),
    placeholder: true,
  },
  {
    slug: 'social-media',
    title: 'Grid para social media',
    category: 'Social media',
    summary: 'Espaço reservado para um projeto de social media.',
    cover: '/images/projects/social-media.svg',
    coverAlt: 'Grade ilustrativa de posts com formas geométricas — imagem de exemplo',
    tone: 'ink',
    sections: exampleSections,
    gallery: exampleGallery('social media'),
    placeholder: true,
  },
  {
    slug: 'direcao-de-arte',
    title: 'Ensaio de direção de arte',
    category: 'Direção de arte',
    summary: 'Espaço reservado para um projeto de direção de arte.',
    cover: '/images/projects/direcao-de-arte.svg',
    coverAlt: 'Composição ilustrativa de papéis e formas sobrepostas — imagem de exemplo',
    tone: 'violet',
    sections: exampleSections,
    gallery: exampleGallery('direção de arte'),
    placeholder: true,
  },
  {
    slug: 'fotografia',
    title: 'Série fotográfica',
    category: 'Fotografia',
    summary: 'Espaço reservado para uma série fotográfica.',
    cover: '/images/projects/fotografia.svg',
    coverAlt: 'Folha de contato ilustrativa com molduras e marcas de corte — imagem de exemplo',
    tone: 'coral',
    sections: exampleSections,
    gallery: exampleGallery('fotografia'),
    placeholder: true,
  },
  {
    slug: 'projeto-academico',
    title: 'Projeto acadêmico',
    category: 'Projetos acadêmicos',
    summary: 'Espaço reservado para um projeto acadêmico.',
    cover: '/images/projects/academico.svg',
    coverAlt: 'Páginas editoriais ilustrativas com blocos de texto — imagem de exemplo',
    tone: 'ink',
    sections: exampleSections,
    gallery: exampleGallery('projeto acadêmico'),
    placeholder: true,
  },
]

/** Classes de cor por tom — fundo, texto e detalhes. */
export const toneStyles: Record<Tone, { bg: string; text: string; muted: string; line: string; accent: string }> = {
  violet: { bg: 'bg-violet', text: 'text-paper', muted: 'text-paper/75', line: 'border-paper/25', accent: 'bg-coral text-ink' },
  ink: { bg: 'bg-ink', text: 'text-paper', muted: 'text-paper/70', line: 'border-paper/20', accent: 'bg-violet text-paper' },
  coral: { bg: 'bg-coral', text: 'text-ink', muted: 'text-ink', line: 'border-ink/25', accent: 'bg-ink text-paper' },
}
