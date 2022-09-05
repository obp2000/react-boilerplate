import createDecorator from 'final-form-submit-listener'
import type { Mutator, Decorator } from 'final-form'
import type { FormProps } from 'react-final-form'
import arrayMutators from 'final-form-arrays'
import {
  getOrders as getObjects,
  useGetOrderQuery as useGetObjectQuery,
  useCreateOrderMutation as useCreateObjectMutation,
  useUpdateOrderMutation as useUpdateObjectMutation,
  useDeleteOrderMutation as useDeleteObjectMutation,
} from './apiSlice'
import objectFormRender from './OrderFormRender'
import { validate } from './Validators'
import { formInitialOrderItems } from '../orderItems/hooks'
import {
  calculator,
  orderItemsAmount,
  orderItemsCost,
  orderItemsWeight,
  postCostWithPacket,
  postDiscount,
  totalPostals,
  totalSum,
  totalWeight,
} from './Calculator'
import TableRow from './tableRow'
import TableLabels from './tableLabels'
import {
  Order,
  OrderFormValues,
  OrderOptions,
  OrderItemFormValues,
  CustomerOptions,
  OrderItemOptions,
} from '../../../interfaces'

const emptyObject = {}
const emptyArray = []

export const indexUrl = '/orders/'

export type OrdersTableConfig = {
  indexUrl: string
  getObjects: typeof getObjects
  TableRow: typeof TableRow
  TableLabels: typeof TableLabels
  useDeleteObjectMutation: typeof useDeleteObjectMutation
}

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

const deleteValues = [
  'customer',
  'samples_weight',
  'packet_weight',
  'gift_weight',
  'order_items_amount',
  'order_items_cost',
  'order_items_weight',
  'created_at',
  'updated_at',
  'consts',
  ...calculatedFields,
]

const deleteOrderItemValues = [
  'product',
  'cost',
  'weight',
  '_destroy',
]

const preSubmitAction = (values: OrderFormValues): void => {
  if (values.customer) {
    values.customer_id = values.customer.id
  }
  (values.order_items ?? emptyArray).map((orderItem: OrderItemFormValues) => {
    orderItem.product_id = orderItem.product?.id
    deleteOrderItemValues.map((deleteValue) => {
      delete orderItem[deleteValue as keyof OrderItemFormValues]
    })
  })
  deleteValues.map((deleteValue) => {
    delete values[deleteValue as keyof OrderFormValues]
  })
}

const submitListener: Decorator = createDecorator({
  beforeSubmit: (form: FormProps): void =>
    preSubmitAction(form.getState().values)
})

const formInitialValues = (
  object: Order,
  options: OrderOptions
): OrderFormValues => {
  // let {created_at, updated_at, ...object1} = object || emptyObject
  const orderItems = {
    order_items: formInitialOrderItems(object?.order_items),
  }
  let objectValues: OrderFormValues = {
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

const postCostCount: Mutator = (
  _,
  state,
  { getIn, changeValue, resetFieldState }
): void => {
  const pindex = getIn(state, 'formState.values.customer.city.pindex')
  const totalWeight = getIn(state, 'formState.values.total_weight')
  const postBaseUrl = 'http://api.print-post.com/api/sendprice/v2/'

  const params = new URLSearchParams()
  params.set('from_index', '153038')
  params.set('to_index', pindex)
  params.set('weight', totalWeight)

  fetch(`${postBaseUrl}?${params.toString()}`)
    .then((response) => response.json())
    .then(({ posilka_nds: posilkaNds }) => {
      changeValue(state, 'post_cost',
        () => (posilkaNds ?? 0).toFixed(2))
      return resetFieldState('post_cost')
    })
    .catch((e) => console.error(e))
}

const formDecorators = (options: OrderOptions): any[] =>
  [calculator(options), submitListener]

const mutators = { postCostCount, ...arrayMutators }

export const objectFormConfig = {
  indexUrl,
  useGetObjectQuery,
  formInitialValues,
  formDecorators,
  mutators,
  validate,
  useUpdateObjectMutation,
  useCreateObjectMutation,
  objectFormRender,
  calculatedFields,
}

type OrderOrderItemOptionsProps = {
  order_items: {
    child: {
      children: OrderItemOptions
    }
  }
}

export const orderOrderItemOptions = (
  props: OrderOrderItemOptionsProps): OrderItemOptions =>
  props?.order_items?.child?.children
