import { CustomerSelect } from '@/interfaces/api'
import CustomerName from './CustomerName'

const dropdownListTextField = ({
  nick,
  name,
  city,
  address,
}: CustomerSelect) => [
    String(nick),
    String(name),
    String(city?.pindex),
    String(city?.city),
    String(address)
  ]

export function useDropdown() {
  return {
    textField: dropdownListTextField,
    dataKey: 'id',
    searchPath: '/customers/',
    renderValueComponent: CustomerName,
  }
}
