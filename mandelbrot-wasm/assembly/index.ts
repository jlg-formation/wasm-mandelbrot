// The entry file of your WebAssembly module.

// export { getMandelbrotNumber } from "./mandelbrot";

export function add(a: i32, b: i32): i32 {
  return a + b;
}

export function minus(a: i32, b: i32): i32 {
  return a - b;
}

class Complex {
  constructor(
    public x: f64,
    public y: f64
  ) {}
}

function addz(a: Complex, b: Complex): Complex {
  return new Complex(a.x + b.x, a.y + b.y);
}

function multz(a: Complex, b: Complex): Complex {
  return new Complex(a.x * b.x - a.y * b.y, a.x * b.y + a.y * b.x);
}

function modulez(a: Complex): f64 {
  return NativeMath.sqrt(a.x * a.x + a.y * a.y);
}

function mandelbrotIteration(z: Complex, c: Complex): Complex {
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
