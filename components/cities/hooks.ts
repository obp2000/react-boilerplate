import type { City } from '../../interfaces/cities'
import CityName from './CityName'
import { url as indexUrl } from './config'

const dropdownListTextField = ({ city, pindex }: City) => [city, pindex]

export const useDropdown = () => ({
  textField: dropdownListTextField,
  dataKey: 'id',
  searchPath: indexUrl,
  renderValueComponent: CityName,
})
