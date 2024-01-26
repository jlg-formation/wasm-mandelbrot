export interface Point {
  x: number
  y: number
}

export type Vector = Point

export interface ViewBox {
  topLeft: Point
  bottomRight: Point
}

export interface Dimension {
  width: number
  height: number
}
