export const get2dContext = (canvas: HTMLCanvasElement): CanvasRenderingContext2D => {
  const result = canvas.getContext('2d')
  if (result === null) {
    throw new Error(`Cannot get the 2d Context for canvas ${canvas}`)
  }
  return result
}
