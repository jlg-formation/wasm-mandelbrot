import type { MandelbrotDrawer } from './interfaces/Mandelbrot'
import { getColor, type Color } from './utils/color'
import { getPoint, type ViewBox } from './utils/image'
import { getMandelbrotNumber } from './utils/mandelbrot'
import { get2dContext } from './utils/misc'

export class MandelbrotDrawerJS implements MandelbrotDrawer {
  async draw(
    canvas: HTMLCanvasElement,
    viewBox: ViewBox,
    iterationMaximum: number,
    limit: number
  ): Promise<void> {
    const context = get2dContext(canvas)
    const imageData = context.createImageData(canvas.width, canvas.height)
    console.log('canvas.height: ', canvas.height)
    console.log('canvas.width: ', canvas.width)

    const imageContentBuffer = new Uint8Array(canvas.width * canvas.height * 4)
    for (let i = 0; i < canvas.width * canvas.height; i++) {
      const c = getPoint({ index: i, height: canvas.height, width: canvas.width, viewBox })
      const mandelbrotNumber = getMandelbrotNumber(c, iterationMaximum, limit)
      const color: Color = getColor(mandelbrotNumber, iterationMaximum)
      const bufferIndex = i * 4
      imageContentBuffer[bufferIndex] = color.red
      imageContentBuffer[bufferIndex + 1] = color.green
      imageContentBuffer[bufferIndex + 2] = color.blue
      imageContentBuffer[bufferIndex + 3] = 255
    }
    imageData.data.set(imageContentBuffer)

    context.putImageData(imageData, 0, 0)
  }
}
