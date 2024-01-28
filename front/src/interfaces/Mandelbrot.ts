import type { ViewBox } from './geometry'

export interface MandelbrotConfig {
  canvas: HTMLCanvasElement
  techno: 'js' | 'wasm'
  viewBox: ViewBox
  iteration: number
  max: number
}

export interface MandelbrotDrawer {
  instantiate(): Promise<void>
  draw(
    canvas: HTMLCanvasElement,
    viewBox: ViewBox,
    iterationMaximum: number,
    limit: number
  ): Promise<void>
}
