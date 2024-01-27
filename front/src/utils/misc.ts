import type { Point, ViewBox } from '@/interfaces/geometry'
import { getViewboxDimension } from './image'

export const sleep = (delay: number) => new Promise((r) => setTimeout(r, delay))

export const get2dContext = (canvas: HTMLCanvasElement): CanvasRenderingContext2D => {
  const result = canvas.getContext('2d')
  if (result === null) {
    throw new Error(`Cannot get the 2d Context for canvas ${canvas}`)
  }
  return result
}

export const getCursorPositionInsideCanvas = (
  canvas: HTMLCanvasElement,
  event: MouseEvent
): Point => {
  const rect = canvas.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  return { x, y }
}

export const getCursorPositionInsideViewBox = (
  canvas: HTMLCanvasElement,
  p: Point,
  viewBox: ViewBox
): Point => {
  const rect = canvas.getBoundingClientRect()
  const viewBoxDim = getViewboxDimension(viewBox)
  const x = viewBox.topLeft.x + p.x * (viewBoxDim.width / rect.width)
  const y = viewBox.bottomRight.y + p.y * (viewBoxDim.height / rect.height)
  return { x, y }
}
