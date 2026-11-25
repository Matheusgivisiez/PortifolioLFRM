# LFRM — Portfólio Luís Felipe Martins

> Ideias que ganham forma.

Site em React + TypeScript + Vite, Tailwind CSS v4, Motion e React Router.
Home em página única + uma página de case por projeto (`/projetos/<slug>`).
Títulos em **Bowlby One SC** (peso único — nunca usar negrito), textos em **DM Sans**.

## Rodar

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # gera /dist para publicar
npm run assets    # regenera favicon, ícones e imagem Open Graph
```

## Onde editar o conteúdo

| O quê | Arquivo |
|---|---|
| Nome, textos, habilidades, ferramentas, contatos, foto | `src/data/profile.ts` |
| Projetos e cases (capa, título, categoria, ano, papel, ferramentas, seções, galeria, cor) | `src/data/projects.ts` |
| Imagens dos projetos | `public/images/projects/` (sugestão: uma pasta por projeto) |
| Cores, fontes, escala tipográfica, curva de animação | `src/styles/index.css` (bloco `@theme`) |

Campos `null` aparecem no site com o selo **"A definir"** e somem/viram link quando preenchidos.
Os 6 projetos atuais são **exemplos** (`placeholder: true`) com capas ilustrativas.
Na galeria do case, `src: null` mostra um quadro "Imagem a adicionar".

Publicação: `public/_redirects` (Netlify) e `vercel.json` (Vercel) já fazem as rotas `/projetos/...` funcionarem.

## Estrutura

```
src/
  data/          conteúdo (perfil + projetos)
  lib/           identidade de movimento e hooks
  components/
    ui/          Logo, ArrowButton, Reveal, Marquee, RotatingBadge, FitLine (título que
                 preenche a largura), Tape (fita), Frame (imagem ou quadro reservado)…
    layout/      Header (cor adaptável ao topo da página), Footer
  pages/         Home, ProjectPage (case), NotFound
  sections/      Hero, Projects, About, Skills, Contact
  styles/        tokens do design system
scripts/         gerador de favicon / Open Graph
```
