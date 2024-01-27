import { Complex, addz, modulez, multz } from "./complex";

export const mandelbrotIteration = (z: Complex, c: Complex): Complex => {
  return addz(multz(z, z), c);
};

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
