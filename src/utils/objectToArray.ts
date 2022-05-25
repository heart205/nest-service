export function objectToArray(obj: Record<string, unknown>): Array<unknown> {
  const arr: string[] = []
  Object.keys(obj).reduce((acc, cur) => {
    return acc.push(cur), acc
  }, arr)
  return arr
}
