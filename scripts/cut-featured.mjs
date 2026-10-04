/**
 * Cuts the featured-collection photographs into public/photos with no resampling.
 *
 *   node scripts/cut-featured.mjs
 *
 * img/featured1.png is a 2×2 sheet (white gutter at x 764–771, y 508–515): its
 * four frames are extracted pixel-for-pixel, trimmed 2px inside the gutter edge
 * for the anti-aliasing, and written as lossless WebP. img/featured2.png is one
 * photograph and is only re-encoded, also lossless. Nothing is upscaled or
 * sharpened — the tiles are never drawn larger than these pixels.
 */
import sharp from 'sharp'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const out = resolve(root, 'public/photos')
const T = 2
const lossless = { lossless: true, effort: 6 }

const sheet = resolve(root, 'img/featured1.png')
const frames = [
  ['featured-00', { left: 0, top: 0, width: 764 - T, height: 508 - T }], // lamp on a walnut chest
  ['featured-01', { left: 772 + T, top: 0, width: 764 - T, height: 508 - T }], // black bowl on a travertine block
  ['featured-02', { left: 0, top: 516 + T, width: 764 - T, height: 508 - T }], // walnut bed
  ['featured-03', { left: 772 + T, top: 516 + T, width: 764 - T, height: 508 - T }], // cane lounge chair
]
for (const [id, rect] of frames) {
  await sharp(sheet).extract(rect).webp(lossless).toFile(resolve(out, `${id}.webp`))
  console.log(id, `${rect.width}x${rect.height}`)
}
const vase = await sharp(resolve(root, 'img/featured2.png')).webp(lossless).toFile(resolve(out, 'featured-04.webp'))
console.log('featured-04', `${vase.width}x${vase.height}`)
