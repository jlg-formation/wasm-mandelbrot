import type { Point, Dimension, ViewBox } from '@/interfaces/geometry'
import type { Complex } from './complex'

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

export const getPoint = (input: GetPointInput): Complex => {
  const p = getImageCoordinate(input)
  const viewboxDim = getViewboxDimension(input.viewBox)

  const c = {
    x: input.viewBox.topLeft.x + (viewboxDim.width / input.canvas.width) * p.x,
    y: input.viewBox.bottomRight.y + (viewboxDim.height / input.canvas.height) * p.y
  }
  return c
}
