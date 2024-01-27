import { get2dContext } from './misc'

export const setCanvasDim = (canvas: HTMLCanvasElement, defaultWidth?: number) => {
  if (defaultWidth) {
    canvas.width = defaultWidth
    canvas.height = canvas.width / 2
    return
  }
  const boundingRect = canvas.getBoundingClientRect()
  console.log('boundingRect: ', boundingRect)
  const ctx = get2dContext(canvas)

  // Compute the size of the viewport
  const ratio = window.devicePixelRatio || 1
  console.log('ratio: ', ratio)
  const width = (boundingRect.width | 0) * ratio

  canvas.style.width = boundingRect.width + 'px'
  canvas.style.height = boundingRect.width / 2 + 'px'

  canvas.width = width
  canvas.height = canvas.width / 2

  ctx.scale(ratio, ratio)

  window.addEventListener('resize', () => {
    const boundingRect = canvas.getBoundingClientRect()
    console.log('canvas resize')
    canvas.style.width = boundingRect.width + 'px'
    console.log('canvas.style.width: ', canvas.style.width)
    canvas.style.height = boundingRect.width / 2 + 'px'
    console.log('canvas.style.height: ', canvas.style.height)
  })
}
