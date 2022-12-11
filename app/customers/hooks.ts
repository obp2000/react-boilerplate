'use client'

import type { Customer } from '@/interfaces/customers'
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
  searchPath: '/customers/',
  renderValueComponent: CustomerName,
})
