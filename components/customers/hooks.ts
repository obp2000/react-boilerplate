import type {
  Customer, CustomerFormValues, CustomerType
} from '../../interfaces/customers'
import { url as indexUrl } from './apiSlice'
import CustomerName from './CustomerName'

const dropdownListTextField = ({
  nick,
  name,
  city,
  address,
}: Customer): string[] => [
    String(nick),
    String(name),
    String(city?.pindex),
    String(city?.city),
    String(address)
  ]

export const useDropdown = () => ({
  textField: dropdownListTextField,
  dataKey: 'id',
  searchPath: indexUrl,
  renderValueComponent: CustomerName,
})

export const useFormInitialValues = ({
  object
}: CustomerType): CustomerFormValues => {
  let objectValues = object ?? {}
  return objectValues
}
