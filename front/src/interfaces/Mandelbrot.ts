export interface MandelbrotConfig {
  canvas: HTMLCanvasElement
  techno: 'js' | 'wasm'
}

export interface MandelbrotDrawer {
  draw(canvas: HTMLCanvasElement): void
}
