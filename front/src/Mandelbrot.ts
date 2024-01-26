import type { ViewBox } from './interfaces/geometry'
import type { MandelbrotConfig, MandelbrotDrawer } from './interfaces/Mandelbrot'
import { MandelbrotDrawerJS } from './MandelbrotDrawerJS'
import { throttle } from './utils/debounce'
import { move } from './utils/move'
import { zoom } from './utils/zoom'

export const mandelBrots: Mandelbrot[] = []

export const redrawAll = (viewBox: ViewBox) => {
  for (const mandelbrot of mandelBrots) {
    mandelbrot.setConfig({ viewBox: viewBox })
    mandelbrot.draw()
  }
}

export class Mandelbrot {
  drawer: MandelbrotDrawer

  constructor(private config: MandelbrotConfig) {
    this.config = config
    if (this.config.techno === 'wasm') {
      this.drawer = new MandelbrotDrawerJS()
    } else {
      this.drawer = new MandelbrotDrawerJS()
    }
    this.setActions()
  }

  async draw(): Promise<number> {
    const startTs = Date.now()
    await this.drawer.draw(
      this.config.canvas,
      this.config.viewBox,
      this.config.iteration,
      this.config.max
    )
    const endTs = Date.now()
    return endTs - startTs
  }

  setActions() {
    this.setMoveAction()
    this.setZoomAction()
  }

  setConfig(config: Partial<MandelbrotConfig>) {
    Object.assign(this.config, config)
  }

  setMoveAction() {
    console.log('this.config.canvas: ', this.config.canvas)
    this.config.canvas.addEventListener('mousedown', (startEvent: MouseEvent) => {
      console.log('mousedown')

      const mousemove = () => {
        console.log('mousemove')
      }
      const mouseup = (endEvent: MouseEvent) => {
        console.log('mouseup')
        document.removeEventListener('mousemove', mousemove)
        document.removeEventListener('mouseup', mouseup)

        const viewBox = move(startEvent, endEvent, this.config.canvas, this.config.viewBox)
        // set the config box
        redrawAll(viewBox)
      }
      document.addEventListener('mousemove', mousemove)
      document.addEventListener('mouseup', mouseup)
    })
  }

  setZoomAction() {
    this.config.canvas.addEventListener(
      'wheel',
      throttle(300, (wheelEvent: WheelEvent) => {
        console.log('wheelEvent: ', wheelEvent)
        const viewBox = zoom(wheelEvent, this.config.canvas, this.config.viewBox)
        redrawAll(viewBox)
      })
    )
  }
}
