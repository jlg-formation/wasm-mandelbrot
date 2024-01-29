export const getMandelbrotNumber = (
  cx: number,
  cy: number,
  iterationMaximum: number,
  limit: number
): number => {
  let zx = 0
  let zy = 0
  for (let i = 0; i < iterationMaximum; i++) {
    const newx = zx * zx - zy * zy + cx
    const newy = 2 * zx * zy + cy
    zx = newx
    zy = newy
    if (zx * zx + zy * zy > limit * limit) {
      return i
    }
  }
  return iterationMaximum
}
