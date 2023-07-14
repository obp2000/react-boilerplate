import tables from '@/app/_tables/tables.json'
import { Prisma } from "@prisma/client"
import type { Translation } from "@/app/i18n/dictionaries"
import type {
  Control, UseFieldArrayRemove,
  UseFormRegister,
  UseFormSetValue
} from "react-hook-form"
import type { ServerActionResult } from './form'

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
  }
  initialValues: SerializedOrderObject
  labels: {
    save: string
    errorMessages: Translation['errorMessages']
    units: Translation['units']
    add: string
    textDelete: string
    notFound: string
    count: string
    label: string
    okText: string
    cancelText: string
    labels: Translation['order']
    customer: Translation['customer']
    product: Translation['product']
  }
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
  customer: Translation['customer'],
  product: Translation['product'],
}

export type OrderItemProps = {
  index: number
  initOrderItem: OrderItem
  getProductOptionLabel:
  (product: SerializedOrderObject['orderItems'][number]['product']) => string
  control: Control<SerializedOrderObject, any>
  register: UseFormRegister<SerializedOrderObject>
  // errors: FieldErrors['root']
  errorMessages: Translation['errorMessages']
  // labels: Translation['order']
  units: Translation['units']
  busy: boolean
  orderItem: SerializedOrderObject['orderItems'][number]
  label: string
  okText: string
  cancelText: string
  textDelete: string
  notFound: string
  remove: UseFieldArrayRemove
  setValue: UseFormSetValue<SerializedOrderObject>
}

export type OrderPageProps = {
  params: { lng: string, id: string }
  table: string
  labels: OrderLabels
  form: (props: OrderFormProps) => JSX.Element
  handleSubmit?: (formData: FormData) => Promise<ServerActionResult>
}


// export type DeliveryTypeSelect = {
//   label: string
//   choices: typeof deliveryTypeChoices
//   busy: boolean
//   choiceLabels: Translation['order']['deliveryTypeLabels']
// } & UseControllerProps<SerializedOrderObject, 'deliveryType'>

// export type PacketSelect = {
//   label: string
//   choices: typeof packetChoices
//   busy: boolean
//   choiceLabels: Translation['order']['packetLabels']
// } & UseControllerProps<SerializedOrderObject, 'packet'>
