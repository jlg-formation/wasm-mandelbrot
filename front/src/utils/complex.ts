export interface Complex {
  x: number
  y: number
}

export type Integer = number

export const addz = (a: Complex, b: Complex): Complex => {
  return { x: a.x + b.x, y: a.y + b.y }
}

export const multz = (a: Complex, b: Complex): Complex => {
  return { x: a.x * b.x - a.y * b.y, y: a.x * b.y + b.x * a.y }
}

export const modulez = (z: Complex): number => {
  return Math.sqrt(z.x * z.x + z.y * z.y)
}
