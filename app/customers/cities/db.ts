import type { ParsedUrlQuery } from 'querystring'

export function where({ term }: ParsedUrlQuery) {
  if (!term) { return {} }
  const containsTerm = { contains: String(term) }
  return {
    OR: [
      { city: containsTerm },
      { pindex: containsTerm },
    ]
  }
}
