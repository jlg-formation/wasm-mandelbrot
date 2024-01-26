import type { Point, ViewBox } from './image'

export const getViewBoxFromCanvas = (
  canvas: HTMLCanvasElement,
  viewBoxWidth: number,
  center: Point
): ViewBox => {
  const ratio = canvas.height / canvas.width
  const viewBoxHeight = viewBoxWidth * ratio
  const topLeft: Point = { x: center.x - viewBoxWidth / 2, y: center.y + viewBoxHeight / 2 }
  const bottomRight: Point = { x: center.x + viewBoxWidth / 2, y: center.y - viewBoxHeight / 2 }
  return { topLeft, bottomRight }
}
