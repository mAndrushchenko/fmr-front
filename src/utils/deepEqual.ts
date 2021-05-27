export function deepEqual(x: unknown, y: unknown): boolean {
  if (x === y) return true
  if (Number.isNaN(x) && Number.isNaN(y)) return true
  // if they are not strictly equal, they both need to be Objects
  if (!(x instanceof Object) || !(y instanceof Object)) return false

  for (const p in x) {
    if (!Object.prototype.hasOwnProperty.call(x, p)) continue
    if (!Object.prototype.hasOwnProperty.call(y, p)) return false
    if ((x as any)[p] === (y as any)[p]) continue
    // Numbers, Strings, Functions, Booleans must be strictly equal
    if (typeof (x as any)[p] !== 'object') return false
    // Objects and Arrays must be tested recursively
    if (!deepEqual((x as any)[p], (y as any)[p])) return false
  }

  for (const p in y) {
    if (Object.prototype.hasOwnProperty.call(y, p) &&
        !Object.prototype.hasOwnProperty.call(x, p)
    ) return false
  }

  return true
}
