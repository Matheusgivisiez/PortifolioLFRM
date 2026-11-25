/**
 * Vídeos da seção "AO VIVO" (carrossel estilo Stories).
 *
 * Para adicionar: coloque o arquivo em /public/videos/ (mp4 vertical, ideal 1080x1920,
 * até ~15 MB) e inclua um item:
 *   { src: '/videos/nome.mp4', title: 'Cobertura do evento X', role: 'Produção e captação' }
 *
 * Enquanto a lista estiver vazia, a seção mostra stories de exemplo.
 */

export type LiveVideo = {
  src: string
  /** Título do trabalho. */
  title: string
  /** Opcional: papel do Luís (ex.: "Produção", "Captação e edição"). */
  role?: string
  /** Opcional: imagem exibida enquanto o vídeo carrega. */
  poster?: string
}

export const liveVideos: LiveVideo[] = [
  { src: '/videos/ao-vivo-01.mp4', poster: '/images/videos/ao-vivo-01.jpg', title: 'Promocional JUV' },
  { src: '/videos/ao-vivo-02.mp4', poster: '/images/videos/ao-vivo-02.jpg', title: 'Promocional F.O.D.A.' },
  { src: '/videos/ao-vivo-03.mp4', poster: '/images/videos/ao-vivo-03.jpg', title: 'Promocional Hariel e Rodrigo do CN' },
  { src: '/videos/ao-vivo-04.mp4', poster: '/images/videos/ao-vivo-04.jpg', title: 'Ao vivo: Jorge & Mateus · Agência 1' },
  { src: '/videos/ao-vivo-05.mp4', poster: '/images/videos/ao-vivo-05.jpg', title: 'Promocional Agência 1' },
  { src: '/videos/ao-vivo-06.mp4', poster: '/images/videos/ao-vivo-06.jpg', title: 'Itaipava e Natanzinho Lima' },
  { src: '/videos/ao-vivo-07.mp4', poster: '/images/videos/ao-vivo-07.jpg', title: 'Pipocas Plinc' },
  { src: '/videos/ao-vivo-08.mp4', poster: '/images/videos/ao-vivo-08.jpg', title: 'Vestuário Uriely Brand' },
  { src: '/videos/ao-vivo-09.mp4', poster: '/images/videos/ao-vivo-09.jpg', title: 'Triade Fibra' },
  { src: '/videos/ao-vivo-10.mp4', poster: '/images/videos/ao-vivo-10.jpg', title: 'Elure Imóveis' },
  { src: '/videos/ao-vivo-11.mp4', poster: '/images/videos/ao-vivo-11.jpg', title: "L'Occitane au Brésil" },
  { src: '/videos/ao-vivo-12.mp4', poster: '/images/videos/ao-vivo-12.jpg', title: 'Constance' },
  { src: '/videos/ao-vivo-13.mp4', poster: '/images/videos/ao-vivo-13.jpg', title: 'Shopping Vale do Aço' },
  { src: '/videos/ao-vivo-14.mp4', poster: '/images/videos/ao-vivo-14.jpg', title: 'Santa Lolla' },
]
