import type { Prisma } from "@prisma/client"
import CustomerName from './CustomerName'
import select from './select.json'

export type Customer = Prisma.CustomerGetPayload<{ select: typeof select }>

const dropdownListTextField = ({
  nick,
  name,
  city,
  address,
}: Customer) => [
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