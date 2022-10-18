import { indexUrl } from './config'
import CityName from './CityName'
import type { City } from '../../../interfaces/cities'

const dropdownListTextField = ({ city, pindex }: City) => [city, pindex]

export const useDropdown = () => ({
  textField: dropdownListTextField,
  dataKey: 'id',
  searchPath: indexUrl,
  renderValueComponent: CityName,
})
