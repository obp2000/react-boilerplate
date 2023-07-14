import tables from '@/app/_tables/tables.json'

import type { Translation } from "@/app/i18n/dictionaries"
import type { City } from '@/interfaces/cities'

export function getGetCityName(pindex:
  Translation['customer']['city']['pindex']) {
  return (city: City) => {
    if (!city) { return '' }
      // console.log('city ', city)
    return `${pindex.substring(0, 3).toLowerCase()}.${city.pindex} ${city.city}`
  }
}

function where(term?: string | null) {
 if (!term) { return {} }
 const containsTerm = { contains: term }
 return {
   OR: [
     { city: containsTerm },
     { pindex: containsTerm },
   ]
 }
}

export function findManyArgs(term?: string | null) {
 return {
   where: where(term),
   select: tables.customers.select.objects.city.select,
 }
}
