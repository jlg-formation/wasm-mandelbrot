export interface Color {
  red: number
  green: number
  blue: number
}

export const getColor = (mandelbrotNumber: number, iterationMaximum: number): Color => {
  return { red: (1 - mandelbrotNumber / iterationMaximum) * 255, green: 0, blue: 0 }
}
