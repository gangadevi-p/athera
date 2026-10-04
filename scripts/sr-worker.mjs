/**
 * One super-resolution worker: takes frames from the parent, upscales each 4×
 * with the ESRGAN "thick" model (UpscalerJS) on TensorFlow.js' WASM backend,
 * and writes the result as a PNG. See crop-sheets.mjs.
 */
import { parentPort } from 'node:worker_threads'
import { readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'
import sharp from 'sharp'

const require = createRequire(import.meta.url)
const tf = require('@tensorflow/tfjs')
const wasm = require('@tensorflow/tfjs-backend-wasm')
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const SCALE = 4
const PATCH = 48 // low-res px per patch
const PAD = 6 // context around a patch, discarded after

wasm.setWasmPaths(resolve(root, 'node_modules/@tensorflow/tfjs-backend-wasm/dist') + '/')
await tf.setBackend('wasm')
await tf.ready()

// the model's two custom layers (they are registered by UpscalerJS in the browser)
const { Layer } = tf.layers
const first = i => (Array.isArray(i) ? i[0] : i)
class MultiplyBeta extends Layer { constructor() { super({}); this.beta = 0.2 } call(i) { return tf.mul(first(i), this.beta) } }
MultiplyBeta.className = 'MultiplyBeta'
class PixelShuffle extends Layer {
  constructor() { super({}); this.scale = SCALE }
  computeOutputShape(s) { return [s[0], s[1], s[2], 3] }
  call(i) { return tf.depthToSpace(first(i), this.scale, 'NHWC') }
}
PixelShuffle.className = `PixelShuffle${SCALE}x`
tf.serialization.registerClass(MultiplyBeta)
tf.serialization.registerClass(PixelShuffle)

const dir = resolve(root, `node_modules/@upscalerjs/esrgan-thick/models/x${SCALE}`)
const json = JSON.parse(readFileSync(resolve(dir, 'model.json'), 'utf8'))
const all = Buffer.concat(json.weightsManifest.flatMap(g => g.paths.map(p => readFileSync(resolve(dir, p)))))
const model = await tf.loadLayersModel(tf.io.fromMemory({
  modelTopology: json.modelTopology,
  weightSpecs: json.weightsManifest.flatMap(g => g.weights),
  weightData: all.buffer.slice(all.byteOffset, all.byteOffset + all.byteLength),
}))

async function upscale(rgb, w, h) {
  const W = w * SCALE
  const out = Buffer.alloc(W * h * SCALE * 3)
  for (let y = 0; y < h; y += PATCH) for (let x = 0; x < w; x += PATCH) {
    const x0 = Math.max(0, x - PAD), y0 = Math.max(0, y - PAD)
    const x1 = Math.min(w, x + PATCH + PAD), y1 = Math.min(h, y + PATCH + PAD)
    const pw = x1 - x0, ph = y1 - y0
    const px = new Float32Array(pw * ph * 3)
    for (let j = 0; j < ph; j++) for (let i = 0; i < pw; i++) for (let c = 0; c < 3; c++) px[(j * pw + i) * 3 + c] = rgb[((y0 + j) * w + x0 + i) * 3 + c] / 255
    const res = tf.tidy(() => model.predict(tf.tensor4d(px, [1, ph, pw, 3])).mul(255).clipByValue(0, 255).round())
    const d = await res.data()
    res.dispose()
    const ow = pw * SCALE
    const cx = (x - x0) * SCALE, cy = (y - y0) * SCALE
    const cw = (Math.min(w, x + PATCH) - x) * SCALE, ch = (Math.min(h, y + PATCH) - y) * SCALE
    for (let j = 0; j < ch; j++) for (let i = 0; i < cw; i++) for (let c = 0; c < 3; c++)
      out[((y * SCALE + j) * W + x * SCALE + i) * 3 + c] = d[((cy + j) * ow + cx + i) * 3 + c]
  }
  return out
}

parentPort.on('message', async job => {
  const { data, info } = await sharp(job.source).extract(job.rect).removeAlpha().raw().toBuffer({ resolveWithObject: true })
  const out = await upscale(data, info.width, info.height)
  await sharp(out, { raw: { width: info.width * SCALE, height: info.height * SCALE, channels: 3 } }).png().toFile(job.file)
  parentPort.postMessage({ id: job.id })
})
parentPort.postMessage({ ready: true })
