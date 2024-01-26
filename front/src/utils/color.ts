import convert from 'color-convert'

export type Color = [number, number, number]

export const rgb2Color = (rvb: string): Color => {
  const red = parseInt(rvb.substring(1, 3), 16)
  const green = parseInt(rvb.substring(3, 5), 16)
  const blue = parseInt(rvb.substring(5, 7), 16)
  return [red, green, blue]
}

export const generatePalette = (size: number): Color[] => {
  const array: Color[] = []
  for (let i = 0; i < size; i++) {
    const ratio = i / size
    const hue = (ratio * (360 * 2)) % 360
    const luminosity = (ratio * 0.2 + 0.7) * 100
    const saturation = 100
    const color = convert.hsl.rgb([hue, saturation, luminosity])
    array.push(color)
  }
  const black: Color = [0, 0, 0]
  array.push(black)
  return array
}

export const getColor = (
  mandelbrotNumber: number,
  iterationMaximum: number,
  palette: Color[]
): Color => {
  // return [(1 - mandelbrotNumber / iterationMaximum) * 255, 0, 0]

  const indexReal = (palette.length * mandelbrotNumber) / (iterationMaximum + 1)
  const index = Math.floor(indexReal)
  if (index >= palette.length) {
    throw new Error('not normal')
  }
  const color: Color = palette[index]
  return color
}
