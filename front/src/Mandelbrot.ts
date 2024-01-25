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

  draw() {
    this.drawer.draw(this.config.canvas)
  }
}
