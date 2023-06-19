import type { Translation } from "@/app/i18n/dictionaries"
import type { City } from '@/interfaces/cities'

export function getGetOptionLabel(pindex:
  Translation['customer']['city']['pindex']) {
  return (city: City) => {
    if (!city) { return '' }
    return `${pindex.substring(0, 3).toLowerCase()}.${city.pindex} ${city.city}`
  }
}
