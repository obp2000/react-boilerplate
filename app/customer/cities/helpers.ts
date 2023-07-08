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
