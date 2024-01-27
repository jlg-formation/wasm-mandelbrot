export class Complex {
  constructor(
    public x: f64,
    public y: f64
  ) {}
}

export const addz = (a: Complex, b: Complex): Complex => {
  return new Complex(a.x + b.x, a.y + b.y);
};

export const multz = (a: Complex, b: Complex): Complex => {
  return new Complex(a.x * b.x - a.y * b.y, a.x * b.y + a.y * b.x);
};

export const modulez = (a: Complex): f64 => {
  return NativeMath.sqrt(a.x * a.x + a.y * a.y);
};
