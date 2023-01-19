import {
  City,
  Customer,
  Order,
  OrderItem,
  Prisma,
  Product,
  ProductType
} from "@prisma/client"

export type AnyObject = CustomerSelect | ProductSelect | OrderSelect

// export type AnyObjectType = (Prisma.UserCreateInput
//   & { password1?: string, password2?: string }) | {
//   object?: AnyObject
// }

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

// export type Params = {
//   params: Record<string, string>
// }

// export interface SearchParams {
//   [SearchParams: string]: any
// }

export type IdParam = {
  id: string
}

export type ObjectId = {
  id: number
}

export type CustomerSelect =
  Pick<Customer, 'nick' | 'name' | 'address' | 'created_at'> &
  { city?: Pick<City, 'id' | 'city' | 'pindex'> | null }

export type CustomersSelect =
  Pick<Customer, 'id' | 'nick' | 'name' | 'address' | 'created_at' |
    'updated_at'> & { city?: Pick<City, 'id' | 'city' | 'pindex'> | null }

export type ProductSelect =
  Pick<Product, 'name' | 'threads' | 'contents' | 'price' | 'weight' | 'width' |
    'density' | 'dollar_price' | 'dollar_rate' |
    'width_shop' | 'density_shop' | 'weight_for_count' | 'length_for_count' |
    'price_pre' | 'image' | 'created_at' | 'fleece'> &
  { productType?: Pick<ProductType, 'id' | 'name'> | number | null }

export type ProductCalcValues = {
  density_for_count?: string
  meters_in_roll?: string
  prices?: string
}

export type ProductsSelect =
  Pick<Product, 'id' | 'name' | 'threads' | 'contents' | 'fleece' | 'price' |
    'width' | 'density' | 'created_at' | 'updated_at'> &
  { productType?: Pick<ProductType, 'id' | 'name'> | null }

export type OrdersSelect =
  Pick<Order, 'id' | 'address' | 'created_at' | 'updated_at'> &
  { order_items_cost: number } & Pick<Customer, 'nick' | 'name' | 'address'> &
  { city?: Pick<City, 'pindex' | 'city'> }

export type OrderItemSelect = Pick<OrderItem, 'id' | 'amount' | 'price'
  | 'created_at' | 'updated_at'> &
{
  product?: Pick<Product, 'id' | 'name' | 'threads' | 'contents' |
    'fleece' | 'price' | 'weight' | 'width' | 'density'> &
  { productType?: Pick<ProductType, 'id' | 'name'> | null } | null
} & {
  cost?: string
  weight?: string
}

export type OrderSelect =
  Pick<Order, 'post_cost' | 'packet' | 'delivery_type' | 'address' | 'gift' |
    'created_at'> &
  {
    customer?: Pick<Customer, 'id' | 'nick' | 'name' | 'address'> &
    { city?: Pick<City, 'id' | 'pindex' | 'city'> | null } | null
  } &
  {
    orderItems?: OrderItemSelect[]
  }

export type OrderCalcValues = {
  samples_weight?: number
  packet_weight?: number
  gift_weight?: number
  order_items_amount?: string
  order_items_cost?: string
  order_items_weight?: number
  post_cost_with_packet?: string
  post_discount?: string
  total_postals?: string
  total_sum?: string
  total_weight?: number
}
