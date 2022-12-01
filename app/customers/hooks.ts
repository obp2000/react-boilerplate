'use client'

import type { Customer } from '@/interfaces/customers'
import CustomerName from './CustomerName'
import { indexUrl } from './[id]/config'

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
