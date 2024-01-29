import type { MandelbrotDrawer } from './interfaces/Mandelbrot'
import type { ViewBox } from './interfaces/geometry'
import { generatePalette, getColor } from './utils/color'
import { getMandelbrotNumber } from './utils/mandelbrot.utils'
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

    const palette = generatePalette(iterationMaximum)
    const { width, height } = canvas

    const imageContentBuffer = new Uint8Array(width * height * 4)
    for (let i = 0; i < width * height; i++) {
      const px = i % width
      const viewBoxWidth = viewBox.bottomRight.x - viewBox.topLeft.x
      const cx = viewBox.topLeft.x + (viewBoxWidth / width) * px

      const py = Math.floor(i / width)
      const viewBoxHeight = viewBox.topLeft.y - viewBox.bottomRight.y
      const cy = viewBox.bottomRight.y + (viewBoxHeight / height) * py

      const mandelbrotNumber = getMandelbrotNumber(cx, cy, iterationMaximum, limit)
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

  async instantiate(): Promise<void> {}
}
