/**
 * Fotos do Luís com artistas — aparecem no mural de polaroids da home.
 *
 * Para adicionar: coloque o arquivo em /public/images/artistas/ e inclua um item:
 *   { src: '/images/artistas/nome-do-arquivo.jpg', artist: 'Nome do artista', context: 'Show / evento, ano' }
 *
 * Enquanto a lista estiver vazia, o mural mostra polaroids reservadas.
 */

export type ArtistPhoto = {
  src: string
  /** Nome do artista — escrito na credencial. `null` = ainda não informado. */
  artist: string | null
  /** Opcional: onde/quando a foto foi tirada. */
  context?: string
  /** Opcional: descrição da imagem para leitores de tela. */
  alt?: string
  /** Opcional: ponto de foco do recorte (CSS object-position). Padrão: '50% 30%'. */
  focus?: string
}

export const artistPhotos: ArtistPhoto[] = [
  { src: '/images/artistas/artista-09.jpg', artist: 'Boca Rosa', context: 'Entrevistando', focus: '50% 45%' },
  { src: '/images/artistas/artista-02.jpg', artist: 'Jorge & Mateus', context: 'Show Agência 1' },
  { src: '/images/artistas/artista-05.jpg', artist: 'Filipe Ret', context: 'Copa Med' },
  { src: '/images/artistas/artista-01.jpg', artist: 'GP da ZL', context: 'JUV' },
  { src: '/images/artistas/artista-03.jpg', artist: 'MC PH', context: 'JUV' },
  { src: '/images/artistas/artista-04.jpg', artist: 'MC Pedrinho', context: 'JUV' },
  { src: '/images/artistas/artista-06.jpg', artist: 'MC Hariel', context: 'Festival Trap', focus: '50% 40%' },
  { src: '/images/artistas/artista-07.jpg', artist: 'Jon Vlogs', context: 'Festival Sebrae' },
  { src: '/images/artistas/artista-08.jpg', artist: 'Leonardo', context: 'Aniversário de Ipatinga' },
]

/** Quantas polaroids reservadas mostrar enquanto não houver fotos. */
export const artistPlaceholderCount = 8
