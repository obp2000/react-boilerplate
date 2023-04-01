import { Prisma } from "@prisma/client"
import tables from '@/app/objectPage/tables.json'
// import type { Customer } from './customers'

export type OrderItem = Prisma.OrderItemGetPayload<{
  select: typeof tables.orders.select.object.orderItems.select
}>

export type NewOrderItem = Prisma.OrderItemCreateWithoutOrderInput

export type OrderItemUpdate = Prisma.OrderItemUpdateWithWhereUniqueWithoutOrderInput

// export type OrderUpdateInput = Prisma.OrderUncheckedUpdateInput

export type Values = (Prisma.OrderUncheckedCreateWithoutOrderItemsInput |
  Prisma.OrderUncheckedUpdateWithoutOrderItemsInput) & {
    orderItems?: (NewOrderItem | OrderItemUpdate)[]
  }

export type Order = {
  id: string
  orderAddress: string
  createdAt: string
  updatedAt: string
  orderItemsCost: string
  nick: string
  name: string
  customerAddress: string
  pindex: string
  city: string
}

export type OrderObject = Prisma.OrderGetPayload<{
  select: typeof tables.orders.select.object
}>
