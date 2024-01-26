import type { MandelbrotDrawer } from './interfaces/Mandelbrot'
import type { ViewBox } from './interfaces/geometry'
import { generatePalette, getColor } from './utils/color'
import { getPoint } from './utils/image'
import { getMandelbrotNumber } from './utils/mandelbrot.utils'
import { get2dContext } from './utils/misc'

import init from '@wasm@/release.wasm?init'

interface MandelbrotWasmModule {
  add(a: number, b: number): number
}

export class MandelbrotDrawerWasm implements MandelbrotDrawer {
  static isInitialized = false
  constructor() {}

  async init() {
    if (MandelbrotDrawerWasm.isInitialized) {
      return
    }
    const instance = await init()
    MandelbrotDrawerWasm.isInitialized = true
    const result = (instance.exports as unknown as MandelbrotWasmModule).add(3, 4)
    console.log('result: ', result)
  }

  async draw(
    canvas: HTMLCanvasElement,
    viewBox: ViewBox,
    iterationMaximum: number,
    limit: number
  ): Promise<void> {
    await this.init()
    const context = get2dContext(canvas)
    const imageData = context.createImageData(canvas.width, canvas.height)

    const palette = generatePalette(iterationMaximum)

    const imageContentBuffer = new Uint8Array(canvas.width * canvas.height * 4)
    for (let i = 0; i < canvas.width * canvas.height; i++) {
      const c = getPoint({ index: i, canvas, viewBox })
      const mandelbrotNumber = getMandelbrotNumber(c, iterationMaximum, limit)
      const color = getColor(mandelbrotNumber, iterationMaximum, palette)
      const bufferIndex = i * 4
      imageContentBuffer[bufferIndex] = color[0]
      imageContentBuffer[bufferIndex + 1] = color[1]
      imageContentBuffer[bufferIndex + 2] = color[2]
      imageContentBuffer[bufferIndex + 3] = 255
    }
    imageData.data.set(imageContentBuffer)

    context.putImageData(imageData, 0, 0)
  }
}
