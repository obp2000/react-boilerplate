import type { EntityState } from '@reduxjs/toolkit'
import { getCustomers } from '../src/components/customers/apiSlice'
import { getProducts } from '../src/components/products/apiSlice'
import { getOrders } from '../src/components/orders/apiSlice'
import type { Customer } from './customers'
import type { Product } from './products'
import type { Order } from './orders'
import type { RootState } from '../src/components/store'

export type AnyObject = Customer | Product | Order

export type AnyObjectType = {
  object?: AnyObject
}

export type GetObjectsArg = {
  params?: {
    page?: number
    term?: string
  }
}

export type RawObjectsWithTotals = {
  totalCount: number
  totalPages: number
  results: AnyObject[]
}

export type ObjectsWithTotals = EntityState<AnyObject> & {
  totalCount: number
  totalPages: number
}

export type GetObjectsEndpoint = typeof getCustomers | typeof getProducts |
  typeof getOrders

export type SelectObjectsData =
  (state: RootState) => ObjectsWithTotals | undefined
