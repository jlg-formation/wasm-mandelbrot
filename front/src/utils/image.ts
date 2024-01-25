import type { Complex } from './complex'

export interface Point {
  x: number
  y: number
}

export interface ViewBox {
  topLeft: Point
  bottomRight: Point
}

export interface GetPointInput {
  index: number
  width: number
  height: number
  viewBox: ViewBox
}

export const getImageCoordinate = (input: GetPointInput): Point => {
  const p = { x: input.index % input.width, y: Math.floor(input.index / input.width) }
  return p
}

export const getPoint = (input: GetPointInput): Complex => {
  const p = getImageCoordinate(input)
  const viewboxWidth = input.viewBox.bottomRight.x - input.viewBox.topLeft.x
  const viewboxHeight = input.viewBox.topLeft.y - input.viewBox.bottomRight.y

  const c = {
    x: input.viewBox.topLeft.x + (viewboxWidth / input.width) * p.x,
    y: input.viewBox.bottomRight.y + (viewboxHeight / input.height) * p.y
  }
  return c
}
