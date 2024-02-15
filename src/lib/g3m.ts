export function computePrice(reserveX: number, reserveY: number, weightX: number, weightY: number): number {
  return (reserveY / weightY) / (reserveX / weightX);
}

export function computeAndFormatPrice(reserveX: number, reserveY: number, weightX: number, weightY: number): string {
  const price = computePrice(reserveX, reserveY, weightX, weightY);
  return isNaN(price) ? '0.0' : price.toLocaleString(undefined, { maximumFractionDigits: 8, minimumFractionDigits: 2 });
}

export function computeL(x: bigint, y: bigint, wX: bigint, wY: bigint): bigint {
  const a = x ** wX;
  const b = y ** wY;
  return a * b;
}