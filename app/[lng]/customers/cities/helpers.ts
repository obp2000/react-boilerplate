import { Prisma } from '@prisma/client'
import CityName from './CityName'
import select from './select.json'

export type City = Prisma.CityGetPayload<{ select: typeof select }>

const dropdownListTextField = ({ city, pindex }: City) => [city, pindex]

export function useDropdown() {
  return {
    textField: dropdownListTextField,
    dataKey: 'id',
    searchPath: '/cities/',
    renderValueComponent: CityName,
  }
}
