import { ParsedUrlQuery } from 'querystring'

export function where({ term }: ParsedUrlQuery) {
  if (!term) { return {} }
  const containsTerm = { contains: String(term) }
  return {
    customer: {
      OR: [
        { nick: containsTerm },
        { name: containsTerm },
        { address: containsTerm },
        { city: { city: containsTerm } }
      ]
    }
  }
}
