/**
 * Conteúdo da página especial /hallowparty — evento criado e organizado pelo Luís.
 *
 * Campos `null` / listas vazias aparecem no site como espaços "A definir".
 * Fotos: coloque em /public/images/hallowparty/ e liste em `gallery`.
 */

export type Edition = {
  /** Ex.: "2024" */
  year: string
  /** Nome ou tema da edição, se houver. */
  title?: string
  /** Uma frase sobre o que aquela edição trouxe de novo. */
  note?: string
}

export type EventPhoto = {
  src: string
  alt: string
  /** full = largura total no mosaico */
  size?: 'full' | 'half'
}

export const hallowparty = {
  name: 'Hallowparty',
  role: ['Criador e idealizador', 'Organização e produção'],
  instagram: { handle: '@hallowpartyvda', href: 'https://www.instagram.com/hallowpartyvda/' },

  /** O que é a festa: tema, proposta, público. */
  concept:
    'A proposta é unir a celebração de uma data especial à atmosfera do Halloween, criando uma festa temática que vai muito além de uma simples comemoração: uma noite de música, fantasia, diversão e experiências inesquecíveis.' as
      | string
      | null,

  /** Como a festa surgiu — um ou mais parágrafos. */
  origin: [
    'A Hallowparty nasceu de uma comemoração de aniversário que se transformou em uma das maiores experiências de Halloween de Ipatinga.',
  ] as string[],

  /** Como ela vem se ampliando a cada ano — um ou mais parágrafos. */
  growth: [
    'Com três edições realizadas (2024, 2025 e 2026), a Hallowparty é feita para quem gosta de viver o extraordinário, curte festas temáticas, gosta de se fantasiar e busca momentos únicos ao lado dos amigos. Mais do que uma festa, é uma experiência que cresce a cada ano e já faz parte do calendário de eventos da cidade.',
  ] as string[],

  /** Linha do tempo das edições (da mais antiga para a mais recente). */
  editions: [
    { year: '2024', title: '1ª edição' },
    { year: '2025', title: '2ª edição' },
    { year: '2026', title: '3ª edição' },
  ] as Edition[],

  gallery: [
    { src: '/images/hallowparty/cartaz-2026.jpg', alt: 'Cartaz da Hallowparty 2026 com a chamada "É hoje!!!" e os artistas caracterizados' },
    { src: '/images/hallowparty/pista.jpg', alt: 'Pista lotada da Hallowparty vista do mezanino, com feixes de luz e decoração de Halloween' },
    { src: '/images/hallowparty/show.jpg', alt: 'Show na Hallowparty: artista no palco cantando enquanto o público filma com os celulares' },
  ] as EventPhoto[],
}
