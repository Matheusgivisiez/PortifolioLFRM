/**
 * Conteúdo pessoal do portfólio.
 * Tudo que estiver como `null` ou marcado como pendente ainda depende de
 * informação do Luís Felipe — o site esconde ou sinaliza esses campos.
 */

export type ContactChannel = {
  id: 'email' | 'instagram' | 'tiktok' | 'linkedin' | 'whatsapp'
  label: string
  /** Texto exibido (ex.: "@luisfelipe"). `null` = ainda não informado. */
  value: string | null
  /** Link final (mailto:, https://...). `null` = ainda não informado. */
  href: string | null
}

export const profile = {
  name: 'Luís Felipe Martins',
  shortName: 'Luís Felipe',
  monogram: 'LFRM',
  role: 'Estudante de Publicidade e Propaganda',
  concept: 'Ideias que ganham forma.',
  headline: ['Ideias', 'fora do', 'óbvio'],
  intro:
    'Oi, eu sou Luís Felipe Martins. Estudante de Publicidade e Propaganda, apaixonado por criatividade, comunicação e por transformar ideias em projetos.',

  about: {
    statement: 'Ideias que ganham forma.',
    paragraphs: [
      'Sou apaixonado por comunicação e pelo universo dos eventos. Gosto de estar envolvido em projetos, acompanhar cada etapa e fazer parte do processo de transformar ideias em experiências que marcam pessoas.',
      'Sou estudante de Publicidade e Propaganda e acredito que cada trabalho é uma oportunidade de aprender, criar e enxergar novas possibilidades. Levo comigo a vontade de fazer acontecer e o compromisso de sempre entregar o meu melhor em tudo aquilo que me proponho a fazer.',
      'Mais do que participar de projetos, gosto de viver cada experiência, contribuir com ideias e deixar um pouco de mim em tudo o que faço.',
    ],
    facts: [
      { label: 'Nome', value: 'Luís Felipe Martins' },
      { label: 'Formação', value: 'Publicidade e Propaganda — em andamento' },
      { label: 'Instituição', value: 'Unileste' },
      { label: 'Cidade', value: 'Ipatinga, Brasil' },
      { label: 'Interesses', value: 'Criatividade, comunicação, design e branding' },
    ] as { label: string; value: string | null }[],
    /** Caminho da foto (ex.: '/images/luis-felipe.jpg'). `null` mostra o placeholder. */
    photo: '/images/luis-felipe.jpg' as string | null,
  },

  skills: [
    { name: 'Criatividade', note: 'Procurar o caminho que ainda não foi tentado.' },
    { name: 'Comunicação', note: 'Transformar intenção em mensagem clara.' },
    { name: 'Direção de arte', note: 'Pensar imagem, ritmo e composição juntos.' },
    { name: 'Design gráfico', note: 'Tipografia, grid e cor a serviço da ideia.' },
    { name: 'Branding', note: 'Construir personalidade e consistência de marca.' },
    { name: 'Produção de conteúdo', note: 'Formatos pensados para cada plataforma.' },
    { name: 'Estratégia publicitária', note: 'Entender público antes de criar a peça.' },
  ],

  /**
   * Ferramentas (Photoshop, Illustrator, Figma...) só aparecem no site depois
   * de confirmadas pelo Luís Felipe. Lista vazia = bloco oculto.
   */
  tools: [] as string[],

  contact: {
    headline: 'Vamos criar algo?',
    text: 'Boas ideias começam com boas conversas. Se você tem um projeto, uma oportunidade ou simplesmente quer trocar ideias, vamos conversar.',
    channels: [
      { id: 'email', label: 'E-mail', value: null, href: null },
      { id: 'instagram', label: 'Instagram', value: '@luismrtins', href: 'https://www.instagram.com/luismrtins/' },
      { id: 'tiktok', label: 'TikTok', value: '@luaisoss', href: 'https://www.tiktok.com/@luaisoss' },
      { id: 'linkedin', label: 'LinkedIn', value: null, href: null },
      { id: 'whatsapp', label: 'WhatsApp', value: null, href: null },
    ] as ContactChannel[],
  },
}

/** Itens do menu. Com `route`, o item leva a uma página própria em vez de uma seção da home. */
export const navItems: { id: string; label: string; route?: string }[] = [
  { id: 'artistas', label: 'Backstage' },
  { id: 'ao-vivo', label: 'Ao vivo' },
  { id: 'hallowparty', label: 'Hallowparty', route: '/hallowparty' },
  { id: 'sobre', label: 'Sobre' },
  { id: 'habilidades', label: 'Habilidades' },
  { id: 'contato', label: 'Contato' },
]
