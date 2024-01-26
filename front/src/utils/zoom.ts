import type { Point, ViewBox } from '@/interfaces/geometry'
import { getViewboxDimension } from './image'
import { getCursorPositionInsideCanvas, getCursorPositionInsideViewBox } from './misc'

export const getRatio = (viewBox: ViewBox, v: Point): Point => {
  const dim = getViewboxDimension(viewBox)
  return {
    x: (v.x - viewBox.topLeft.x) / dim.width,
    y: (v.y - viewBox.bottomRight.y) / dim.height
  }
}

export const getNewViewPort = (
  zoomFactor: number,
  ratio: Point,
  v: Point,
  viewPort: ViewBox
): ViewBox => {
  const dim = getViewboxDimension(viewPort)
  const width = dim.width / zoomFactor
  const height = dim.height / zoomFactor
  //   return {
  //     width,
  //     height,
  //     x: v.x - ratio.x * width,
  //     y: v.y - ratio.y * height
  //   }

  return {
    topLeft: { x: v.x - ratio.x * width, y: v.y - ratio.y * height + height },
    bottomRight: { x: v.x - ratio.x * width + width, y: v.y - ratio.y * height }
  }
}

export const zoom = (event: WheelEvent, canvas: HTMLCanvasElement, viewBox: ViewBox): ViewBox => {
  const zoomFactor = event.deltaY > 0 ? 0.5 : 2
  const p = getCursorPositionInsideCanvas(canvas, event)
  const v = getCursorPositionInsideViewBox(canvas, p, viewBox)
  const ratio = getRatio(viewBox, v)

  const newViewPort = getNewViewPort(zoomFactor, ratio, v, viewBox)
  return newViewPort
}
