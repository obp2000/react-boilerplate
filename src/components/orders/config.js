import createDecorator from 'final-form-submit-listener'
import arrayMutators from 'final-form-arrays'
import {shortName} from '../customers/name'
import {customerCityOptions, customerLabels} from '../customers/options'
import {cityLabels} from '../cities/options'
import OrderFormRender from './OrderFormRender'
import {validate} from './Validators'
import {orderCalculator} from './Calculator'
import {orderItemsCalculator} from '../order_items/Calculator'
import {orderCustomerOptions} from './options'
import {
    getOrders,
    useGetOrderQuery,
    useCreateOrderMutation,
    useUpdateOrderMutation,
    useDeleteOrderMutation,
} from './apiSlice'

const indexUrl = '/orders/'

const redirectUrl = '/orders/'

const searchUrl = indexUrl

const preSubmitAction = (values) => {
  if (values.customer) {
    values.customer_id = values.customer.id
    delete values.customer
  }
  (values.order_items || []).map((orderItem, index) => {
    delete orderItem.cost
    delete orderItem.weight
    delete orderItem._destroy
    if (orderItem.product) {
      orderItem.product_id = orderItem.product.id
      delete orderItem.product
      // delete order_item.product.name
      // delete order_item.product.get_product_type_display
      // delete order_item.product.get_threads_display
      // delete order_item.product.get_contents_display
    }
  })
  delete values.delivery_types
  delete values.packets
  delete values.samples_weight
  delete values.packet_weight
  delete values.post_cost_with_packet
  delete values.post_discount
  delete values.total_postals
  delete values.total_sum
  delete values.total_text
  delete values.total_weight
  delete values.order_items_amount
  delete values.order_items_cost
  delete values.order_items_weight
  delete values.created_at
  delete values.updated_at
  delete values.Consts
  delete values.gift_weight
  delete values.order_items_cost_label
  delete values.need_gift_label
  delete values.need_gift
}

const tableFieldNames = [
  'id',
  'customer',
  'order_items_cost',
  'created_at',
  'updated_at',
]

const rowData = ({
  id,
  customer,
  order_items_cost,
  created_at,
  updated_at
} = {},
options) => [
  id,
  shortName(customer, customerLabels(orderCustomerOptions(options))),
  order_items_cost,
  created_at,
  updated_at,
]

const submitListener = createDecorator({
  beforeSubmit: (form) => {
    // console.log('pre.....')
    preSubmitAction(form.getState().values)
  },
})

const formInitialValues = (object, {
  Consts = {},
  order_items_cost: orderItemsCost = {},
  need_gift: needGift = {},
}) => ({
  ...object,
  Consts,
  samples_weight: Consts?.SAMPLES_WEIGHT,
  packet_weight: Consts?.PACKET_WEIGHT,
  gift_weight: Consts?.GIFT_WEIGHT,
  order_items_cost_label: orderItemsCost.label,
  need_gift_label: needGift.label,
})

const postCostCount = (args, state, {getIn, changeValue, resetFieldState}) => {
  const pindex = getIn(state, 'formState.values.customer.city.pindex')
  // console.log('pindex ', pindex)
  const totalWeight = getIn(state, 'formState.values.total_weight')
  const postBaseUrl = 'http://api.print-post.com/api/sendprice/v2/'

  const params = new URLSearchParams()
  params.set('from_index', '153038')
  params.set('to_index', pindex)
  params.set('weight', totalWeight)

  fetch(`${postBaseUrl}?${params.toString()}`)
      .then((response) => response.json())
      .then(({posilka_nds: posilkaNds}) => {
        changeValue(state, 'post_cost', (oldValue) => parseInt(posilkaNds))
        return resetFieldState('post_cost')
      })
      .catch((e) => console.error(e))
}

const config = {
  indexUrl,
  redirectUrl,
  decorators: [orderCalculator, orderItemsCalculator, submitListener],
  searchUrl,
  tableFieldNames,
  rowData,
  ObjectFormRender: OrderFormRender,
  validate,
  formInitialValues,
  mutators: {postCostCount, ...arrayMutators},
  getObjects: getOrders,
  useGetObjectQuery: useGetOrderQuery,
  useCreateObjectMutation: useCreateOrderMutation,
  useUpdateObjectMutation: useUpdateOrderMutation,
  useDeleteObjectMutation: useDeleteOrderMutation,
}

export default config
