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

    this.setActions()
  }

  async draw(viewBox: ViewBox, iteration: number, max: number): Promise<number> {
    const startTs = Date.now()
    await this.drawer.draw(this.config.canvas, viewBox, iteration, max)
    const endTs = Date.now()
    return endTs - startTs
  }

  setActions() {
    this.config.canvas.addEventListener('mousedown', () => {
      console.log('mousedown')
      const mousemove = () => {
        console.log('mousemove')
      }
      const mouseup = () => {
        console.log('mouseup')
        document.removeEventListener('mousemove', mousemove)
        document.removeEventListener('mouseup', mouseup)
      }
      document.addEventListener('mousemove', mousemove)
      document.addEventListener('mouseup', mouseup)
    })
  }
}
