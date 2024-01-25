import type { MandelbrotDrawer } from './interfaces/Mandelbrot'
import { get2dContext } from './utils/misc'

export class MandelbrotDrawerJS implements MandelbrotDrawer {
  draw(canvas: HTMLCanvasElement): void {
    const context = get2dContext(canvas)
    const imageData = context.createImageData(canvas.width, canvas.height)

    const imageContentBuffer = new Uint8Array(canvas.width * canvas.height * 4)
    for (let i = 0; i < canvas.width * canvas.height * 4; i++) {
      imageContentBuffer[i] = i % 256
    }
    console.log('imageContentBuffer: ', imageContentBuffer)
    imageData.data.set(imageContentBuffer)

    context.putImageData(imageData, 0, 0)
  }
}
