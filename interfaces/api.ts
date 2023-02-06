import { Customer, Prisma } from "@prisma/client"

// export type CustomerSelect = Prisma.CustomerGetPayload<{ select: typeof CustomerFields }>

// export type Customers = Prisma.CustomerGetPayload<{ select: typeof CustomersFields }>

// export type ProductSelect = Prisma.ProductGetPayload<{ select: typeof ProductFields }>

// export type OrderCalcValues = {
//   samples_weight?: number
//   packet_weight?: number
//   gift_weight?: number
//   order_items_amount?: string
//   order_items_cost?: string
//   order_items_weight?: number
//   post_cost_with_packet?: string
//   post_discount?: string
//   total_postals?: string
//   total_sum?: string
//   total_weight?: number
// }

// export type OrderSelect = Prisma.OrderGetPayload<{ select: Prisma.OrderSelect }> &
//   Pick<OrderCalcValues, 'order_items_cost'> & Partial<Customer>


// export type ProductsSelect = Product & ProductTypeType

// export type OrdersSelect = Order & { order_items_cost: number } &
//   Partial<Customer> & CityType

// export type CustomerSelect2 = Prisma.CustomerDelegate<undefined>['findUniqueOrThrow'] | undefined
// export type Test2 = CustomerSelect

// export type CustomersSelect = Customer & CityType

// export type ProductTypeType = { productType?: ProductType | null }

// export type ProductSelect = Prisma.ProductUpdateInput & ProductTypeType

// export type CitySelect = Partial<City>

// export type CityType = { city?: CitySelect | null }

// export type CustomerSelect = Omit<Prisma.CustomerUpdateInput, 'city'> & CityType
// export type CustomerSelect = Prisma.CustomerGetPayload<{ select: { nick: true } }>
// type Test1 = typeof customerSelect

// export type OrderItemSelect22 = Omit<OrderItem, 'order_id' | 'product_id'> &
// {
//   product?: Partial<Product> | null
//   cost?: string
//   weight?: string
// }
// export type OrderItemSelect222 = OrderItemSelect &
// {
//   cost?: string
//   weight?: string
// }


// export type OrderSelect22 =
//   Omit<Order, 'id' | 'customer_id' | 'updated_at'> &
//   { customer?: (Partial<Customer> & CityType) | null } &
//   { orderItems?: OrderItemSelect[] }

// export type OrderItemSelect11 = Pick<OrderItem, 'id' | 'amount' | 'price'
//   | 'created_at' | 'updated_at'> &
// {
//   product?: Pick<Product, 'id' | 'name' | 'threads' | 'contents' |
//     'fleece' | 'price' | 'weight' | 'width' | 'density'> &
//   { productType?: ProductTypeSelect | null } | null
// } & {
//   cost?: string
//   weight?: string
// }

// export type ProductSelect =
//   Pick<Product, 'name' | 'threads' | 'contents' | 'price' | 'weight' | 'width' |
//     'density' | 'dollar_price' | 'dollar_rate' |
//     'width_shop' | 'density_shop' | 'weight_for_count' | 'length_for_count' |
//     'price_pre' | 'image' | 'created_at' | 'fleece'> &
//   { productType?: ProductTypeSelect | number | null }

// export type ProductsSelect =
//   Pick<Product, 'id' | 'name' | 'threads' | 'contents' | 'fleece' | 'price' |
//     'width' | 'density' | 'created_at' | 'updated_at'> & ProductTypeType

// export type OrderSelect =
  // Pick<Order, 'post_cost' | 'packet' | 'delivery_type' | 'address' | 'gift' |
  //   'created_at'> &
  // { customer?: Partial<Customer> & CityType | null } &
  // { orderItems?: OrderItemSelect[] }
