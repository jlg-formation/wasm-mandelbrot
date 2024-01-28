import { Complex, addz, modulez, multz } from "./complex";

export function mandelbrotIteration(z: Complex, c: Complex): Complex {
  return addz(multz(z, z), c);
}

export function getMandelbrotNumber(
  cx: f64,
  cy: f64,
  iterationMaximum: i32,
  limit: f64
): i32 {
  const c = new Complex(cx, cy);
  let z: Complex = new Complex(0, 0);
  for (let i = 0; i < iterationMaximum; i++) {
    z = mandelbrotIteration(z, c);
    if (modulez(z) > limit) {
      return i;
    }
  }
  return iterationMaximum;
}

function getImageCoordinate(index: i32, width: i32): Complex {
  return new Complex(index % width, Math.floor(index / width));
}

function getPoint(
  index: i32,
  topLeftx: f64,
  topLefty: f64,
  bottomRightx: f64,
  bottomRighty: f64,
  width: i32,
  height: i32
): Complex {
  const p = getImageCoordinate(index, width);
  const viewBoxWidth = bottomRightx - topLeftx;
  const viewBoxHeight = topLefty - bottomRighty;
  const x: f64 = topLeftx + (viewBoxWidth / width) * p.x;
  const y: f64 = bottomRighty + (viewBoxHeight / height) * p.y;
  return new Complex(x, y);
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
    const c = getPoint(
      i,
      topLeftx,
      topLefty,
      bottomRightx,
      bottomRighty,
      width,
      height
    );
    const mandelbrotNumber = getMandelbrotNumber(
      c.x,
      c.y,
      iterationMaximum,
      limit
    );

    // store the mandelbrotNumber in the memory
    store<i32>(i * 4, mandelbrotNumber);
  }
}
