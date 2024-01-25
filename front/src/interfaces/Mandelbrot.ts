import type { ViewBox } from '@/utils/image'

export interface MandelbrotConfig {
  canvas: HTMLCanvasElement
  techno: 'js' | 'wasm'
}

export interface MandelbrotDrawer {
  draw(canvas: HTMLCanvasElement, viewBox: ViewBox, iteration: number, max: number): Promise<void>
}
