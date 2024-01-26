import type { ViewBox } from './interfaces/geometry'
import type { MandelbrotConfig, MandelbrotDrawer } from './interfaces/Mandelbrot'
import { MandelbrotDrawerJS } from './MandelbrotDrawerJS'

export class Mandelbrot {
  drawer: MandelbrotDrawer

  constructor(private config: MandelbrotConfig) {
    this.config = config
    if (this.config.techno === 'wasm') {
      this.drawer = new MandelbrotDrawerJS()
      return
    }
    this.drawer = new MandelbrotDrawerJS()
  }

  async draw(viewBox: ViewBox, iteration: number, max: number): Promise<number> {
    const startTs = Date.now()
    await this.drawer.draw(this.config.canvas, viewBox, iteration, max)
    const endTs = Date.now()
    return endTs - startTs
  }
}
