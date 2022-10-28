import type { EntityState } from '@reduxjs/toolkit'
import type { RootState } from '../services/store'
import { getCustomers } from '../components/customers/apiSlice'
import { getOrders } from '../components/orders/apiSlice'
import { getProducts } from '../components/products/apiSlice'
import type { Customer } from './customers'
import type { Order } from './orders'
import type { Product } from './products'

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
