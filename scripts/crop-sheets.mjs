/**
 * Cuts the contact sheets in /img into single photographs.
 *
 *   node scripts/crop-sheets.mjs            # the frames the site uses → public/photos
 *   node scripts/crop-sheets.mjs --all      # every frame on every sheet
 *   node scripts/crop-sheets.mjs --preview out.png   # a numbered contact sheet of the used frames
 *
 * Frame boundaries are found from the white gutters between frames (a row or
 * column whose pixels average near-white), so a sheet may be any layout — a
 * regular grid, or rows with different numbers of frames. Frames are numbered
 * left to right, top to bottom, from 00. Each is trimmed a little inside its
 * boundary (the gutters are anti-aliased) and upscaled 4× with an ESRGAN model
 * (scripts/sr-worker.mjs; slow — minutes per frame — but cached). `--fast` skips
 * that for a plain Lanczos 3× upscale. Either way an upscale only reconstructs
 * detail: for a truly sharp photograph, export the sheet at a larger size and
 * run this again.
 */
import sharp from 'sharp'
import { mkdirSync, writeFileSync, existsSync, statSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { cpus } from 'node:os'
import { Worker } from 'node:worker_threads'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { SHEETS, USED } from '../src/data/sheets.js'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const out = resolve(root, 'public/photos')

const TRIM = 3 // px cut inside every frame edge
const GUTTER = 233 // mean of the darkest channel above which a row/column is gutter

/** Frames the gutter detector gets wrong (a very bright frame bleeds into its gutter). */
const FIX = { coffee: { 18: { width: 297 } } }

const runs = flags => {
  const r = []
  let s = -1
  flags.forEach((f, i) => {
    if (!f && s < 0) s = i
    if (f && s >= 0) { r.push([s, i]); s = -1 }
  })
  if (s >= 0) r.push([s, flags.length])
  return r.filter(([a, b]) => b - a > 40)
}

async function frames(key) {
  const { data, info } = await sharp(resolve(root, SHEETS[key])).removeAlpha().raw().toBuffer({ resolveWithObject: true })
  const { width: W, height: H } = info
  const dark = (x, y) => { const i = (y * W + x) * 3; return Math.min(data[i], data[i + 1], data[i + 2]) }
  const rows = []
  for (let y = 0; y < H; y++) { let s = 0; for (let x = 0; x < W; x++) s += dark(x, y); rows.push(s / W >= GUTTER) }
  const list = []
  for (const [y0, y1] of runs(rows)) {
    const cols = []
    for (let x = 0; x < W; x++) { let s = 0; for (let y = y0; y < y1; y++) s += dark(x, y); cols.push(s / (y1 - y0) >= GUTTER) }
    for (const [x0, x1] of runs(cols)) list.push({ left: x0, top: y0, width: x1 - x0, height: y1 - y0 })
  }
  list.forEach((f, i) => Object.assign(f, FIX[key]?.[i]))
  return list.map(f => ({
    left: f.left + TRIM, top: f.top + TRIM, width: f.width - 2 * TRIM, height: f.height - 2 * TRIM,
  }))
}

const args = process.argv.slice(2)
const all = args.includes('--all')
const prev = args.includes('--preview') ? args[args.indexOf('--preview') + 1] : null
const wanted = new Set(USED)
const SR = !args.includes('--fast')

/**
 * Sheets whose frames are wide studio shots on a plain backdrop. Cropped to a
 * 3:4 card they would show a fragment of a sofa, so each is extended to a full
 * 3:4 portrait instead: the wall continues above, the floor below, softened.
 */
const PORTRAIT = new Set(['sofas'])

async function portrait(buf, w, h, scale = 3) {
  const total = Math.round((w * 4) / 3)
  const extra = total - h
  if (extra <= 0) return buf
  const top = Math.round(extra * 0.6)
  const bottom = extra - top
  const grown = await sharp(buf).extend({ top, bottom, extendWith: 'copy' }).toBuffer()
  const soft = await sharp(grown).blur(scale * 9.3).toBuffer()
  // the soft copy shows only over the new bands, fading out 40px into the photograph
  const fade = Math.round(scale * 13.3)
  const mask = Buffer.alloc(w * total * 4)
  for (let y = 0; y < total; y++) {
    const inside = y >= top && y < top + h
    const d = inside ? Math.max(0, fade - Math.min(y - top, top + h - 1 - y)) : fade + (y < top ? top - y : y - (top + h))
    const a = Math.min(255, Math.round((d / fade) * 255))
    for (let x = 0; x < w; x++) mask[(y * w + x) * 4 + 3] = a
  }
  const overlay = await sharp(soft)
    .ensureAlpha()
    .composite([{ input: mask, raw: { width: w, height: total, channels: 4 }, blend: 'dest-in' }])
    .png().toBuffer()
  return sharp(grown).composite([{ input: overlay }]).toBuffer()
}

mkdirSync(out, { recursive: true })

// 1. every frame to write
const jobs = []
for (const key of Object.keys(SHEETS)) {
  const list = await frames(key)
  console.log(`${key}: ${list.length} frames`)
  list.forEach((rect, i) => {
    const id = `${key}-${String(i).padStart(2, '0')}`
    if (all || wanted.has(id)) jobs.push({ id, key, rect, source: resolve(root, SHEETS[key]) })
  })
}

// 2. super-resolve each one (4×, ESRGAN) unless --fast; results are cached by frame and source
if (SR) {
  const cache = resolve(root, 'node_modules/.cache/athera-sr')
  mkdirSync(cache, { recursive: true })
  for (const j of jobs) {
    const st = statSync(j.source)
    const tag = createHash('md5').update(JSON.stringify([j.rect, st.size, st.mtimeMs])).digest('hex').slice(0, 8)
    j.file = resolve(cache, `${j.id}-${tag}.png`)
  }
  const todo = jobs.filter(j => !existsSync(j.file))
  console.log(`super-resolution: ${jobs.length - todo.length} cached, ${todo.length} to do`)
  if (todo.length) {
    const t0 = Date.now()
    let done = 0
    let finished = 0
    await new Promise((ok, fail) => {
      const n = Math.max(1, Math.min(3, cpus().length - 1, todo.length))
      for (let w = 0; w < n; w++) {
        const worker = new Worker(resolve(root, 'scripts/sr-worker.mjs'))
        const next = () => {
          const j = todo.shift()
          if (j) worker.postMessage(j)
          else { worker.terminate(); if (++finished === n) ok() }
        }
        worker.on('message', m => {
          if (m.id) {
            done++
            const left = (jobs.length - jobs.filter(x => existsSync(x.file)).length)
            console.log(`  ${m.id} (${left} left, ${Math.round((Date.now() - t0) / 60000)} min)`)
          }
          next()
        })
        worker.on('error', fail)
      }
    })
  }
}

// 3. trim, finish and write
const cut = []
for (const j of jobs) {
  const f = j.rect
  let buf
  let scale
  if (SR) {
    scale = 4
    buf = await sharp(j.file).toBuffer()
  } else {
    scale = 3
    buf = await sharp(j.source).extract(f).resize({ width: f.width * 3, height: f.height * 3, kernel: 'lanczos3' }).sharpen({ sigma: 0.7, m1: 0.6, m2: 1.4 }).png().toBuffer()
  }
  const w = f.width * scale
  let h = f.height * scale
  if (PORTRAIT.has(j.key)) { buf = await portrait(buf, w, h, scale); h = Math.round((w * 4) / 3) }
  await sharp(buf).webp({ quality: 92, effort: 6, smartSubsample: false }).toFile(resolve(out, `${j.id}.webp`))
  cut.push({ id: j.id, ...f, out: [w, h] })
}
writeFileSync(resolve(out, 'frames.json'), JSON.stringify(cut, null, 1))
console.log(`wrote ${cut.length} photographs to public/photos`)

if (prev) {
  // a numbered contact sheet of every used frame, cropped 3:4 on its subject as a card would show it
  const { AT, DEFAULT_AT } = await import('../src/data/sheets.js')
  const tiles = []
  for (const f of cut) {
    const [ax, ay] = AT[f.id] || DEFAULT_AT
    const [W, H] = f.out
    const cw = Math.min(W, Math.round((H * 3) / 4)), ch = Math.min(H, Math.round((W * 4) / 3))
    const left = Math.max(0, Math.min(W - cw, Math.round(ax * W - cw / 2)))
    const top = Math.max(0, Math.min(H - ch, Math.round(ay * H - ch / 2)))
    const buf = await sharp(resolve(out, `${f.id}.webp`))
      .extract({ left, top, width: cw, height: ch })
      .resize(240, 320, { fit: 'cover' })
      .composite([{ input: Buffer.from(`<svg width="240" height="22"><rect width="240" height="22" fill="#000" opacity=".6"/><text x="6" y="16" font-size="14" fill="#fff" font-family="Arial">${f.id}</text></svg>`), top: 0, left: 0 }])
      .png().toBuffer()
    tiles.push(buf)
  }
  const cols = 8
  const rowsN = Math.ceil(tiles.length / cols)
  await sharp({ create: { width: cols * 244, height: rowsN * 324, channels: 3, background: '#fff' } })
    .composite(tiles.map((input, i) => ({ input, left: (i % cols) * 244, top: Math.floor(i / cols) * 324 })))
    .png().toFile(prev)
  console.log('preview →', prev)
}
