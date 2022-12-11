import type { City } from '@/interfaces/cities'
import CityName from './CityName'

const dropdownListTextField = ({ city, pindex }: City) => [city, pindex]

export const useDropdown = () => ({
  textField: dropdownListTextField,
  dataKey: 'id',
  searchPath: '/cities/',
  renderValueComponent: CityName,
})
