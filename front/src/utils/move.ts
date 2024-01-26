import type { Vector, ViewBox } from '@/interfaces/geometry'
import { getCursorPositionInsideCanvas, getCursorPositionInsideViewBox } from './misc'

export const move = (
  startEvent: MouseEvent,
  endEvent: MouseEvent,
  canvas: HTMLCanvasElement,
  viewBox: ViewBox
): ViewBox => {
  const startP = getCursorPositionInsideCanvas(canvas, startEvent)
  const endP = getCursorPositionInsideCanvas(canvas, endEvent)

  const startV = getCursorPositionInsideViewBox(canvas, startP, viewBox)
  const endV = getCursorPositionInsideViewBox(canvas, endP, viewBox)

  const delta: Vector = {
    x: endV.x - startV.x,
    y: endV.y - startV.y
  }

  const newViewPort: ViewBox = {
    topLeft: {
      x: viewBox.topLeft.x - delta.x,
      y: viewBox.topLeft.y - delta.y
    },
    bottomRight: {
      x: viewBox.bottomRight.x - delta.x,
      y: viewBox.bottomRight.y - delta.y
    }
  }

  return newViewPort
}
