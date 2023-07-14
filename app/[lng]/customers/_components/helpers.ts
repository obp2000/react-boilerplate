import { getGetCityName } from './cities/helpers'
import { Prisma } from '@prisma/client'
import tables from '@/app/_tables/tables.json'

import type { Translation } from '@/app/i18n/dictionaries'
import type { Customer } from '@/interfaces/customers'

export function getGetCustomerFullName({
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
      label.push(getGetCityName(pindex)(customer.city))
    }
    if (customer.address) {
      label.push(`${address}: ${customer.address}`)
    }
    return label.join(' ')
  }
}

export function getGetCustomerShortName(labels: Translation['customer']) {
  return (customer: Partial<Customer>) => {
    if (!customer) { return '' }
    const label = []
    label.push(customer.nick)
    if (customer.name) {
      label.push(`${labels.name}: ${customer.name}`)
    }
    return label.join(' ')
  }
}

function where(term?: string | null) {
  if (!term) { return {} }
  const containsTerm = { contains: term }
  return {
    OR: [
      { nick: containsTerm },
      { name: containsTerm },
      { address: containsTerm },
      { city: { city: containsTerm } }
    ]
  }
}

export function findManyArgs(term?: string | null) {
  return {
    select: tables.customers.select.objects,
    where: where(term),
    orderBy: [
      {
        updatedAt: 'desc' as Prisma.SortOrder,
      },
    ],
  }
}
