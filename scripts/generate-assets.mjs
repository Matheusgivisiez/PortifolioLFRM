/**
 * Gera favicon, ícones e imagem Open Graph com a identidade LFRM.
 * O texto é convertido em contornos (paths) a partir da Bowlby One SC,
 * então o resultado não depende de fontes instaladas no sistema.
 *
 * Uso: npm run assets
 */
import { readFile, writeFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import opentype from 'opentype.js'
import sharp from 'sharp'

const require = createRequire(import.meta.url)
const C = { paper: '#F5F2EC', ink: '#202020', violet: '#7547F8', coral: '#FF7548' }

const loadFont = async () => {
  const file = require.resolve('@fontsource/bowlby-one-sc/files/bowlby-one-sc-latin-400-normal.woff')
  const buf = await readFile(file)
  return opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength))
}

// Bowlby One SC tem peso único; os dois nomes mantêm o restante do script legível
const bold = await loadFont()
const semi = bold

/** Texto → <path>, com tracking (em) e alinhamento opcional. */
function text(font, str, { x, y, size, fill, tracking = 0, anchor = 'start' }) {
  const glyphs = font.stringToGlyphs(str)
  const scale = size / font.unitsPerEm
  let width = 0
  glyphs.forEach((g, i) => {
    width += g.advanceWidth * scale + (i < glyphs.length - 1 ? tracking * size : 0)
  })
  let cx = anchor === 'middle' ? x - width / 2 : anchor === 'end' ? x - width : x
  let d = ''
  glyphs.forEach((g) => {
    d += g.getPath(cx, y, size).toPathData(2)
    cx += g.advanceWidth * scale + tracking * size
  })
  return { svg: `<path d="${d}" fill="${fill}"/>`, width }
}

// ---------- Favicon (SVG) ----------
const mark = text(bold, 'LFRM', { x: 30, y: 39.5, size: 16.5, fill: C.paper, tracking: -0.02, anchor: 'middle' })
const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
<rect width="64" height="64" rx="12" fill="${C.violet}"/>
${mark.svg}
<circle cx="${32 + mark.width / 2 + 3.2}" cy="25" r="3.4" fill="${C.coral}"/>
</svg>`
await writeFile('public/favicon.svg', favicon)
await sharp(Buffer.from(favicon), { density: 300 }).resize(32, 32).png().toFile('public/favicon-32.png')
await sharp(Buffer.from(favicon.replace('rx="12"', 'rx="0"')), { density: 600 })
  .resize(180, 180)
  .png()
  .toFile('public/apple-touch-icon.png')
await sharp(Buffer.from(favicon), { density: 600 }).resize(512, 512).png().toFile('public/icon-512.png')

// ---------- Open Graph 1200×630 ----------
const l1 = text(bold, 'Ideias fora', { x: 72, y: 320, size: 100, fill: C.ink, tracking: -0.01 })
const l2 = text(bold, 'do óbvio', { x: 72, y: 450, size: 100, fill: C.ink, tracking: -0.01 })
const logo = text(bold, 'LFRM', { x: 72, y: 112, size: 40, fill: C.ink, tracking: -0.02 })
const name = text(semi, 'LUÍS FELIPE MARTINS', { x: 72, y: 566, size: 18, fill: C.ink, tracking: 0.08 })
const role = text(semi, 'PUBLICIDADE E PROPAGANDA', { x: 1128, y: 566, size: 22, fill: C.ink, tracking: 0.12, anchor: 'end' })

const og = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
<rect width="1200" height="630" fill="${C.paper}"/>
<circle cx="1000" cy="250" r="200" fill="${C.violet}"/>
<circle cx="1060" cy="320" r="130" fill="none" stroke="${C.ink}" stroke-width="2"/>
<rect x="1060" y="60" width="64" height="64" fill="${C.coral}" transform="rotate(12 1092 92)"/>
<path d="M800 470 a100 100 0 0 1 200 0 z" fill="${C.ink}"/>
${logo.svg}
<circle cx="${72 + logo.width + 9}" cy="84" r="7" fill="${C.coral}"/>
${l1.svg}
${l2.svg}
<circle cx="${72 + l2.width + 22}" cy="438" r="14" fill="${C.coral}"/>
<line x1="72" y1="530" x2="1128" y2="530" stroke="${C.ink}" stroke-opacity=".2" stroke-width="2"/>
${name.svg}
${role.svg}
</svg>`
await sharp(Buffer.from(og)).png({ compressionLevel: 9 }).toFile('public/og-image.png')

await writeFile(
  'public/site.webmanifest',
  JSON.stringify(
    {
      name: 'Luís Felipe Martins — Portfólio',
      short_name: 'LFRM',
      icons: [{ src: '/icon-512.png', sizes: '512x512', type: 'image/png' }],
      theme_color: C.paper,
      background_color: C.paper,
      display: 'standalone',
    },
    null,
    2,
  ),
)

console.log('✓ favicon.svg, favicon-32.png, apple-touch-icon.png, icon-512.png, og-image.png, site.webmanifest')
