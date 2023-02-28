import type { Prisma } from "@prisma/client"
import select from './select.json'
import { getGetOptionLabel as getGetCityOptionLabel } from '@/app/customers/cities/helpers'
import type { Translation } from '@/app/i18n/dictionaries'

export type Customer = Prisma.CustomerGetPayload<{ select: typeof select.objects }>

export function getGetOptionLabel(labels: Translation['customer']) {
    return (customer: Customer) => {
      if (!customer) { return '' }
      const nick = customer.nick
      const name = customer.name ? ` ${labels.name}: ${customer.name}` : ''
      const city = customer.city ? ` ${getGetCityOptionLabel(labels.city)(customer.city)}` : ''
      const address = customer.address ? ` ${labels.address}: ${customer.address}` : ''
      return `${nick}${name}${city}${address}`
  }
}


// function dropdownListTextField({
//   nick,
//   name,
//   city,
//   address,
// }: Prisma.CustomerGetPayload<{ select: typeof select.objects }>) {
//   return [
//     String(nick),
//     String(name),
//     String(city?.pindex),
//     String(city?.city),
//     String(address)
//   ]
// }

// export function useDropdown() {
//   return {
//     textField: dropdownListTextField,
//     dataKey: 'id',
//     searchPath: '/customers/',
//     renderValueComponent: CustomerName,
//   }
// }