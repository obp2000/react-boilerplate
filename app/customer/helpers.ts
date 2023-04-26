import { getGetOptionLabel as getGetCityOptionLabel } from './cities/helpers'
import type { Translation } from '@/app/i18n/dictionaries'
import type { Customer } from '@/interfaces/customers'

export function getGetOptionLabel(labels: Translation['customer']) {
    return (customer: Customer) => {
      if (!customer) { return '' }
      const label = []
      label.push(customer.nick)
      if (customer.name) {
        label.push(`${labels.name}: ${customer.name}`)
      }
      if(customer.city) {
        label.push(getGetCityOptionLabel(labels.city)(customer.city))
      }
      if (customer.address) {
        label.push(`${labels.address}: ${customer.address}`)
      }
      return label.join(' ')
  }
}
