import arrayMutators from 'final-form-arrays'
import {
  getOrders as getObjects,
  useGetOrderQuery as useGetObjectQuery,
  useCreateOrderMutation as useCreateObjectMutation,
  useUpdateOrderMutation as useUpdateObjectMutation,
  useDeleteOrderMutation as useDeleteObjectMutation,
} from './apiSlice'
import objectFormRender from './OrderFormRender'
import { validate } from './validators'
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
  postCostCount,
} from './calculator'
import TableRow from './TableRow'
import TableLabels from './TableLabels'
import {
  OrderFormValues,
  OrderWithOptions,
} from '../../../interfaces'

export const initFormValues: OrderFormValues = {
  id: undefined,
  customer: undefined,
  post_cost: undefined,
  packet: undefined,
  delivery_type: undefined,
  address: undefined,
  gift: undefined,
  order_items: undefined,
  order_items_amount: undefined,
  order_items_cost: undefined,
  order_items_weight: undefined,
  samples_weight: undefined,
  packet_weight: undefined,
  gift_weight: undefined,
  post_cost_with_packet: undefined,
  post_discount: undefined,
  total_postals: undefined,
  total_sum: undefined,
  total_weight: undefined,
  consts: undefined,
}

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
}


// const deleteValues = [
//   'customer',
//   'samples_weight',
//   'packet_weight',
//   'gift_weight',
//   'order_items_amount',
//   'order_items_cost',
//   'order_items_weight',
//   'created_at',
//   'updated_at',
//   'consts',
//   ...calculatedFields,
// ]

// export const deleteOrderItemValues = [
//   'product',
//   'cost',
//   'weight',
//   '_destroy',
// ]

// const preSubmitAction = (values: OrderFormValues): void => {
//   // if (values.customer) {
//   //   values.customer_id = values.customer.id
//   // }
//   // values.updated_at = new Date().toISOString()
//   // deleteValues.map((deleteValue) => {
//   //   delete values[deleteValue as keyof OrderFormValues]
//   // })
//   // if (values.order_items) {
//   //   const orderItems = values.order_items.map(({
//   //     product,
//   //     cost,
//   //     weight,
//   //     _destroy,
//   //     ...orderItem
//   //   }: OrderItemFormValues) => {
//   //     if (product) {
//   //       orderItem.product_id = product.id
//   //     }
//   //     return orderItem
//   //     // deleteOrderItemValues.map((deleteValue) => {
//   //     //   delete orderItem[deleteValue as keyof OrderItemFormValues]
//   //     // })
//   //   })
//   //   values.order_items = orderItems
//   // }
// }

// const submitListener: Decorator = createDecorator({
//   beforeSubmit: (form: FormProps): void => {
//     // console.log({form})
//     // form.batch(() => {
//     // form.unsubscribe()
//     preSubmitAction(form.getState().values)
//     console.log('values  ', form.getState().values)
//     // }) // NOW all listeners notified
//   }
// })


// type OrderOrderItemOptionsProps = {
//   order_items: {
//     child: {
//       children: OrderItemOptions
//     }
//   }
// }

// export const orderOrderItemOptions = (
//   props: OrderOrderItemOptionsProps): OrderItemOptions =>
//   props?.order_items?.child?.children

// const formDecorators = (options: OrderOptions): Decorator[] =>
//   [calculator(options), submitListener]
