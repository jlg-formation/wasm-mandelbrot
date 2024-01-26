import convert from 'color-convert'

export type Color = [number, number, number]

export const rgb2Color = (rvb: string): Color => {
  const red = parseInt(rvb.substring(1, 3), 16)
  const green = parseInt(rvb.substring(3, 5), 16)
  const blue = parseInt(rvb.substring(5, 7), 16)
  return [red, green, blue]
}

const generatePalette = (size: number): Color[] => {
  const hueNbr = 8
  const array: Color[] = []
  for (let i = 0; i < size; i++) {
    const hue = i * (360 / hueNbr)
    const luminosity = (0.9 - (i * 0.5) / size) * 100
    const saturation = 100
    const color = convert.hsl.rgb([hue, saturation, luminosity])
    array.push(color)
  }
  const black: Color = [0, 0, 0]
  array.push(black)
  return array
}

const palette = generatePalette(20)

export const getColor = (mandelbrotNumber: number, iterationMaximum: number): Color => {
  // return [(1 - mandelbrotNumber / iterationMaximum) * 255, 0, 0]
  const index = Math.floor(palette.length * ((mandelbrotNumber - 1) / iterationMaximum))
  if (index > palette.length - 1) {
    throw new Error('merde !')
  }
  const color: Color = palette[index]
  return color
}
