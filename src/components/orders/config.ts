import arrayMutators from 'final-form-arrays'
import type { Order, OrderWithOptions } from '../../../interfaces/orders'
import { formInitialOrderItems } from '../orderItems/config'
import {
  getOrders as getObjects,
  useCreateOrderMutation as useCreateObjectMutation,
  useDeleteOrderMutation as useDeleteObjectMutation,
  useGetOrderQuery as useGetObjectQuery,
  useUpdateOrderMutation as useUpdateObjectMutation
} from './apiSlice'
import {
  calculator,
  orderItemsAmount,
  orderItemsCost,
  orderItemsWeight, postCostCount, postCostWithPacket,
  postDiscount,
  totalPostals,
  totalSum,
  totalWeight
} from './calculator'
import objectFormRender from './OrderFormRender'
import TableLabels from './TableLabels'
import TableRow from './TableRow'
import { validate } from './validators'

export const indexUrl = '/orders/'

export const objectsTableConfig = {
  indexUrl,
  getObjects,
  TableRow,
  TableLabels,
  useDeleteObjectMutation,
}

export const calculatedFields = [
  'post_cost_with_packet',
  'post_discount',
  'total_postals',
  'total_sum',
  'total_weight',
]

export const formInitialValues = ({ object, options }: OrderWithOptions) => {
  const orderItems = {
    order_items: formInitialOrderItems(object?.order_items),
  }
  let objectValues: Partial<Order> = {
    ...object,
    consts: options?.Consts,
    samples_weight: options?.Consts.SAMPLES_WEIGHT,
    packet_weight: options?.Consts.PACKET_WEIGHT,
    gift_weight: options?.Consts.GIFT_WEIGHT,
    ...orderItems,
    order_items_amount: orderItemsAmount(null, orderItems),
    order_items_cost: orderItemsCost(null, orderItems),
    order_items_weight: orderItemsWeight(null, orderItems),
  }
  objectValues = {
    ...objectValues,
    post_cost_with_packet: postCostWithPacket(null, objectValues),
    post_discount: postDiscount(null, objectValues),
    total_postals: totalPostals(null, objectValues),
  }
  return {
    ...objectValues,
    total_sum: totalSum(null, objectValues),
    total_weight: totalWeight(null, objectValues),
  }
}

const validatedFields = {
  notBlank: ['customer'],
}

export const objectFormConfig = {
  indexUrl,
  useGetObjectQuery,
  formInitialValues,
  formDecorators: [calculator],
  mutators: { postCostCount, ...arrayMutators },
  validate,
  useUpdateObjectMutation,
  useCreateObjectMutation,
  objectFormRender,
  calculatedFields,
  validatedFields,
}
