import type { Translation } from "@/app/i18n/dictionaries"
import type { City } from '@/interfaces/cities'

export function getGetOptionLabel(labels: Translation['customer']['city']) {
    return (city: City) => {
      // console.log('city ', city)
      if (!city) { return '' }
      const pindexLabel = labels.pindex.substring(0, 3).toLowerCase()
      return `${pindexLabel}.${city.pindex} ${city.city}`
  }
}
