import 'server-only'

import type { ParsedUrlQuery } from 'querystring'
import { Prisma } from '@prisma/client'
import tables from '@/app/_tables/tables.json'

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

export function findManyArgs(searchParams: ParsedUrlQuery): Prisma.CityFindManyArgs {
  return {
    where: where(searchParams),
    select: tables.customers.select.objects.city.select,
  }
}
