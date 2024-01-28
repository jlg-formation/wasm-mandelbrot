import type { MandelbrotDrawer } from './interfaces/Mandelbrot'
import type { ViewBox } from './interfaces/geometry'
import { generatePalette, getColor } from './utils/color'
import { get2dContext } from './utils/misc'

const url = new URL('../../mandelbrot-wasm/build/release.wasm', import.meta.url)

export class MandelbrotDrawerWasm implements MandelbrotDrawer {
  memory = new WebAssembly.Memory({ initial: 10 })
  async instantiate() {
    const module = await WebAssembly.compileStreaming(fetch(url))
    const { exports } = await WebAssembly.instantiate(module, {
      env: {
        memory: this.memory
      }
    })
    return exports
  }
  async draw(
    canvas: HTMLCanvasElement,
    viewBox: ViewBox,
    iterationMaximum: number,
    limit: number
  ): Promise<void> {
    const exports: any = await this.instantiate()

    exports.setMandelbrotNumbers(
      viewBox.topLeft.x,
      viewBox.topLeft.y,
      viewBox.bottomRight.x,
      viewBox.bottomRight.y,
      canvas.width,
      canvas.height,
      iterationMaximum,
      limit
    )
    const memory = new Int32Array(this.memory.buffer)

    const context = get2dContext(canvas)
    const imageData = context.createImageData(canvas.width, canvas.height)

    const palette = generatePalette(iterationMaximum)

    const imageContentBuffer = new Uint8Array(canvas.width * canvas.height * 4)
    for (let i = 0; i < canvas.width * canvas.height; i++) {
      const mandelbrotNumber = memory[i]
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
