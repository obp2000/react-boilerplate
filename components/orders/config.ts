import arrayMutators from 'final-form-arrays'
import { calculator, postCostCount } from './calculator'
import { useFormInitialValues } from './hooks'
import objectFormRender from './OrderFormRender'
import TableLabels from './TableLabels'
import TableRow from './TableRow'
import type { Order } from '@/interfaces/orders'
import type { OrderItem } from '@/interfaces/orderItems'

export const objectsTableConfig = {
  TableRow,
  TableLabels,
}

export const calculatedFields = [
  'post_cost_with_packet',
  'post_discount',
  'total_postals',
  'total_sum',
  'total_weight',
]

const validatedFields = {
  notBlank: ['customer'],
}

const modOrderItem = ({
  product,
  cost,
  weight,
  _destroy,
  ...orderItem
}: OrderItem): OrderItem => {
  if (product) {
    orderItem.product_id = product.id
  }
  return orderItem as OrderItem
}

const modOrderItems = (orderItems: OrderItem[]) => orderItems.map(modOrderItem)

export const modFormValues = ({
  id,
  customer,
  samples_weight,
  packet_weight,
  gift_weight,
  order_items_amount,
  order_items_cost,
  order_items_weight,
  created_at,
  updated_at,
  consts,
  post_cost_with_packet,
  post_discount,
  total_postals,
  total_sum,
  total_weight,
  ...values
}: Order): Partial<Order> => {
  if (customer) {
    values.customer_id = customer.id
  }
  if (values.order_items) {
    values.order_items = modOrderItems(values.order_items)
  }
  return values
}

export const objectFormConfig = {
  useFormInitialValues,
  formDecorators: [calculator],
  mutators: { postCostCount, ...arrayMutators },
  objectFormRender,
  validatedFields,
  modFormValues,
}


// const modOrderItems = (orderItems: OrderItem[]) => orderItems.map(({
//   product,
//   cost,
//   weight,
//   _destroy,
//   ...orderItem
// }) => {
//   if (product) {
//     orderItem.product_id = product.id
//   }
//   return orderItem as OrderItem
// })
