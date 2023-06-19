import { getGetOptionLabel as getGetCityOptionLabel } from './cities/helpers'
import type { Translation } from '@/app/i18n/dictionaries'
import type { Customer } from '@/interfaces/customers'

export function getGetOptionLabel({
  name,
  city: {
    pindex,
  },
  address
}: Translation['customer']) {
  return (customer: Customer) => {
    if (!customer) { return '' }
    const label = []
    label.push(customer.nick)
    if (customer.name) {
      label.push(`${name}: ${customer.name}`)
    }
    if (customer.city) {
      label.push(getGetCityOptionLabel(pindex)(customer.city))
    }
    if (customer.address) {
      label.push(`${address}: ${customer.address}`)
    }
    return label.join(' ')
  }
}
