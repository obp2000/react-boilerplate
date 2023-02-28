import { Prisma } from '@prisma/client'
import CityName from './CityName'
import select from './select.json'
import type { Translation } from "@/app/i18n/dictionaries"

export type City = Prisma.CityGetPayload<{ select: typeof select }>

export function getGetOptionLabel(labels: Translation['customer']['city']) {
    return (city: City) => {
      if (!city) { return '' }
      const pindexLabel = labels.pindex.substring(0, 3).toLowerCase()
      return `${pindexLabel}.${city.pindex} ${city.city}`
  }
}


// const dropdownListTextField = ({ city, pindex }: City) => [city, pindex]

// export function useDropdown() {
//   return {
//     textField: dropdownListTextField,
//     dataKey: 'id',
//     searchPath: '/cities/',
//     renderValueComponent: CityName,
//   }
// }
