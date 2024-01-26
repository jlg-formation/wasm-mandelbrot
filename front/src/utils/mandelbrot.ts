import { addz, modulez, multz, type Complex, type Integer } from './complex'

export const mandelbrotIteration = (z: Complex, c: Complex): Complex => {
  return addz(multz(z, z), c)
}

export const getMandelbrotNumber = (c: Complex, iterationMaximum: Integer, limit: number) => {
  let z = { x: 0, y: 0 }
  for (let i = 0; i < iterationMaximum; i++) {
    z = mandelbrotIteration(z, c)
    if (modulez(z) > limit) {
      return i
    }
  }
  return iterationMaximum
}
