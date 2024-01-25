import { addz, modulez, multz, type Complex, type Integer } from './complex'

export const mandelbrotIteration = (z: Complex, c: Complex): Complex => {
  return addz(multz(z, z), c)
}

export const mandelbrotSuite = (c: Complex, iteration: Integer) => {
  let z = { x: 0, y: 0 }
  for (let i = 0; i < iteration; i++) {
    z = mandelbrotIteration(z, c)
  }
  return modulez(z)
}
