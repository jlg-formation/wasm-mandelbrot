export interface Color {
  red: number
  green: number
  blue: number
  alpha: number
}

export const getColor = (intensite: number, max: number): Color => {
  if (intensite > max) {
    return { red: 255, green: 255, blue: 255, alpha: 1 }
  }
  return { red: 0, green: 0, blue: 0, alpha: 1 }
}
