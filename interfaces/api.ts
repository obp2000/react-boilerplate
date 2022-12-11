import type { Customer } from './customers'
// import { Children } from './layout'
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

// export type ObjectsWithTotals = EntityState<AnyObject> & {
//   totalCount: number
//   totalPages: number
// }

// export type GetObjectsEndpoint = typeof getCustomers | typeof getProducts |
//   typeof getOrders

// export type SelectObjectsData =
//   (state: RootState) => ObjectsWithTotals | undefined

export type ObjectsWithTotals = {
  totalCount: number
  totalPages: number
  results: AnyObject[]
}

export type ObjectsContextType = ObjectsWithTotals | AnyObjectType

export type Params = {
  params: Record<string, string>
}

export type SearchParams = {
  searchParams?: Record<string, string>
}

export type IdParam = {
  id: string
}
