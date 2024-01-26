import type { ViewBox } from '@/utils/image'

export interface MandelbrotConfig {
  canvas: HTMLCanvasElement
  techno: 'js' | 'wasm'
}

export interface MandelbrotDrawer {
  draw(
    canvas: HTMLCanvasElement,
    viewBox: ViewBox,
    iterationMaximum: number,
    limit: number
  ): Promise<void>
}
