import { City } from '@prisma/client'
import CityName from './CityName'

const dropdownListTextField = ({ city, pindex }: City) => [city, pindex]

export function useDropdown() {
  return {
    textField: dropdownListTextField,
    dataKey: 'id',
    searchPath: '/cities/',
    renderValueComponent: CityName,
  }
}
