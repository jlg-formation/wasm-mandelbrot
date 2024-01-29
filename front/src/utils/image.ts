import type { Point, Dimension, ViewBox } from '@/interfaces/geometry'

export interface GetPointInput {
  index: number
  canvas: HTMLCanvasElement
  viewBox: ViewBox
}

export const getImageCoordinate = (input: GetPointInput): Point => {
  return { x: input.index % input.canvas.width, y: Math.floor(input.index / input.canvas.width) }
}

export const getViewboxDimension = (viewBox: ViewBox): Dimension => {
  const viewboxWidth = viewBox.bottomRight.x - viewBox.topLeft.x
  const viewboxHeight = viewBox.topLeft.y - viewBox.bottomRight.y
  return { width: viewboxWidth, height: viewboxHeight }
}
