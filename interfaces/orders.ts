import { Prisma } from "@prisma/client"
import tables from '@/app/_tables/tables.json'
import { Translation } from "@/app/i18n/dictionaries"
import type {
  Control,
  FieldArrayWithId,
  FieldErrors,
  UseFieldArrayRemove,
  UseFormRegister,
  UseFormSetValue
} from "react-hook-form"

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

export type SerializedOrder = Omit<Order, 'createdAt' | 'updatedAt'> &
{
  createdAt: string
  updatedAt: string
}

export type SerializedOrderObject = Omit<OrderObject, 'createdAt'> &
{
  createdAt?: string
}

export type OrderFormProps = {
  mutateArgs: {
    lng: string
    table: string
    id?: number
    message: string
  }
  initialValues: SerializedOrderObject
  save: string
  add: string
  textDelete: string
  notFound: string
  count: string
  errorMessages: Translation['errorMessages']
  label: string
  okText: string
  cancelText: string
  units: Translation['units']
  labels: Translation['order']
  customerLabels: Translation['customer']
  productLabels: Translation['product']
}

export type OrderRowType = (arg0: Order) => (string | JSX.Element)[]

export type OrderLabels = (dict: Translation) => {
  add: Translation['add'],
  textDelete: Translation['delete'],
  notFound: Translation['not_found'],
  count: Translation['count'],
  labels: Translation['order'],
  label: Translation['delete'],
  okText: Translation['yes'],
  cancelText: Translation['no'],
  customerLabels: Translation['customer'],
  productLabels: Translation['product'],
}
