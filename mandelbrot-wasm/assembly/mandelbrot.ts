export function getMandelbrotNumber(
  cx: f64,
  cy: f64,
  iterationMaximum: i32,
  limit: f64
): i32 {
  let zx: f64 = 0;
  let zy: f64 = 0;
  for (let i = 0; i < iterationMaximum; i++) {
    zx = zx * zx - zy * zy + cx;
    zy = 2 * zx * zy + cy;
    if (zx * zx + zy * zy > limit * limit) {
      return i;
    }
  }
  return iterationMaximum;
}

export function setMandelbrotNumbers(
  topLeftx: f64,
  topLefty: f64,
  bottomRightx: f64,
  bottomRighty: f64,
  width: i32,
  height: i32,
  iterationMaximum: i32,
  limit: f64
): void {
  for (let i = 0; i < width * height; i++) {
    const px = i % width;
    const viewBoxWidth = bottomRightx - topLeftx;
    const cx: f64 = topLeftx + (viewBoxWidth / width) * px;

    const py = Math.floor(i / width);
    const viewBoxHeight = topLefty - bottomRighty;
    const cy: f64 = bottomRighty + (viewBoxHeight / height) * py;

    const mandelbrotNumber = getMandelbrotNumber(
      cx,
      cy,
      iterationMaximum,
      limit
    );

    // store the mandelbrotNumber in the memory
    store<i32>(i * 4, mandelbrotNumber);
  }
}
