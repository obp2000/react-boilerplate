import 'server-only'

import { Prisma } from '@prisma/client'
import tables from '@/app/_tables/tables.json'

export function where({ term }: { term?: string }) {
  if (!term) { return {} }
  const containsTerm = { contains: term }
  return {
    OR: [
      { city: containsTerm },
      { pindex: containsTerm },
    ]
  }
}

export function findManyArgs(
  searchParams: { page?: string, term?: string }
): Prisma.CityFindManyArgs {
  return {
    where: where(searchParams),
    select: tables.customers.select.objects.city.select,
  }
}
