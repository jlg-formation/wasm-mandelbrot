import type { MandelbrotDrawer } from './interfaces/Mandelbrot'
import type { ViewBox } from './interfaces/geometry'
import { generatePalette, getColor } from './utils/color'
import { getPoint } from './utils/image'
import { get2dContext } from './utils/misc'

import { getMandelbrotNumber } from '../../mandelbrot-wasm/build/release'

export class MandelbrotDrawerWasm implements MandelbrotDrawer {
  async draw(
    canvas: HTMLCanvasElement,
    viewBox: ViewBox,
    iterationMaximum: number,
    limit: number
  ): Promise<void> {
    const context = get2dContext(canvas)
    const imageData = context.createImageData(canvas.width, canvas.height)

    const palette = generatePalette(iterationMaximum)

    const imageContentBuffer = new Uint8Array(canvas.width * canvas.height * 4)
    for (let i = 0; i < canvas.width * canvas.height; i++) {
      const c = getPoint({ index: i, canvas, viewBox })
      const mandelbrotNumber = getMandelbrotNumber(c.x, c.y, iterationMaximum, limit)
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
