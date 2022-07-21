import createDecorator from 'final-form-submit-listener'
import arrayMutators from 'final-form-arrays'
import OrderFormRender from './OrderFormRender'
import {validate} from './Validators'
import {orderCalculator} from './Calculator'
import {
    getOrders,
    useGetOrderQuery,
    useCreateOrderMutation,
    useUpdateOrderMutation,
    useDeleteOrderMutation,
} from './apiSlice'
import {
  postCostWithPacket,
  postDiscount,
  totalPostals,
  totalSum,
  totalWeight,
} from './Calculator'
import {formInitialOrderItems} from '../orderItems/config'
import {
  orderItemsAmount,
  orderItemsCost,
  orderItemsWeight,
} from './Calculator'
import ObjectsTableRow from './ObjectsTableRow'

const emptyObject = {}
const emptyArray = []

const indexUrl = '/orders/'

const redirectUrl = '/orders/'

const searchUrl = indexUrl

const calculatedFields = [
  'need_gift',
  'post_cost_with_packet',
  'post_discount',
  'total_postals',
  'total_sum',
  'total_weight',
]

const deleteValues = [
  'customer',
  'delivery_types',
  'packets',
  'samples_weight',
  'packet_weight',
  'post_cost_with_packet',
  'post_discount',
  'total_postals',
  'total_sum',
  'total_weight',
  'order_items_amount',
  'order_items_cost',
  'order_items_weight',
  'created_at',
  'updated_at',
  'Consts',
  'gift_weight',
  'order_items_cost_label',
  'need_gift_label',
  'need_gift',
]

const deleteOrderItemValues = [
    'cost',
    'weight',
    '_destroy',
    'product',
]

const preSubmitAction = (values) => {
  if (values.customer) {
    values.customer_id = values.customer.id
  }
  (values.order_items ?? emptyArray).map((orderItem, index) => {
    if (orderItem.product) {
      orderItem.product_id = orderItem.product.id
    }
    deleteOrderItemValues.map((deleteValue) => {
      delete orderItem[deleteValue]
    })
  })
  deleteValues.map((deleteValue) => {
    delete values[deleteValue]
  })
}

const tableFieldNames = [
  'id',
  'customer',
  'order_items_cost',
  'created_at',
  'updated_at',
]

const submitListener = createDecorator({
  beforeSubmit: (form) => preSubmitAction(form.getState().values)
})

const formInitialValues = (
  object,
  {Consts} = emptyObject,
) => {
    // const Consts = options?.Consts || {}
    const orderItems = {
      order_items: formInitialOrderItems(object?.order_items)
    }
    let objectValues = {
      ...object,
      ...Consts,
      samples_weight: Consts?.SAMPLES_WEIGHT,
      packet_weight: Consts?.PACKET_WEIGHT,
      gift_weight: Consts?.GIFT_WEIGHT,
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



const postCostCount = (args, state, {getIn, changeValue, resetFieldState}) => {
  const pindex = getIn(state, 'formState.values.customer.city.pindex')
  const totalWeight = getIn(state, 'formState.values.total_weight')
  const postBaseUrl = 'http://api.print-post.com/api/sendprice/v2/'

  const params = new URLSearchParams()
  params.set('from_index', '153038')
  params.set('to_index', pindex)
  params.set('weight', totalWeight)

  fetch(`${postBaseUrl}?${params.toString()}`)
      .then((response) => response.json())
      .then(({posilka_nds: posilkaNds}) => {
        changeValue(state, 'post_cost',
          (oldValue) => (posilkaNds ?? 0).toFixed(2))
        return resetFieldState('post_cost')
      })
      .catch((e) => console.error(e))
}

const config = {
  indexUrl,
  redirectUrl,
  decorators: [orderCalculator, submitListener],
  searchUrl,
  tableFieldNames,
  ObjectsTableRow,
  ObjectFormRender: OrderFormRender,
  validate,
  formInitialValues,
  mutators: {postCostCount, ...arrayMutators},
  getObjects: getOrders,
  useGetObjectQuery: useGetOrderQuery,
  useCreateObjectMutation: useCreateOrderMutation,
  useUpdateObjectMutation: useUpdateOrderMutation,
  useDeleteObjectMutation: useDeleteOrderMutation,
  calculatedFields,
}

export default config
