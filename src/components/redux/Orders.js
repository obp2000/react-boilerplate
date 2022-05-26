import createDecorator from 'final-form-submit-listener'
import arrayMutators from 'final-form-arrays'
import {shortName} from '../customers/CustomerName'
import {customerLabels} from './Customers'
import {cityLabels} from './Cities'
import {initOrderItem} from './OrderItems'
import OrderFormRender from '../orders/OrderFormRender'
import {validate} from '../orders/Validators'
import {orderCalculator} from '../orders/Calculator'
import {orderItemsCalculator} from '../order_items/Calculator'

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

const rowData = (object, options) => [
  object.id,
  shortName(object?.customer, customerLabels(options?.customer?.children)),
  object.order_items_cost,
  object.created_at,
  object.updated_at,
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
}

export default config

export const addOrderItemAction = (fields) => fields.push(initOrderItem)

export const deleteOrderItemAction = (fields, id) => fields.remove(id)

export const customerAndCityLabels = (options) => {
  const customerProps = options?.customer?.children
  const cityProps = customerProps?.city?.children
  return {
    ...customerLabels(customerProps),
    ...cityLabels(cityProps),
  }
}


// console.log('post_cost ', post_cost)
// tools.changeValue(state, 'post_cost', (oldValue) => post_cost)

// fetchJsonp(`${postBaseUrl}?${params.toString()}`)
//   // .then(response => response.json())
//       .then((resp) => {
//         // dispatch(change('order', 'post_cost', parseInt(Тариф)))
//         // dispatch(successPostCost(parseInt(Тариф)))
//         console.log('resp ', resp)
//       })
//   .catch((e) => console.error(e))
// params.set('o', 'json')
// params.set('st', 'localhost')
// params.set('ml', 'obp2000@mail.ru')
// params.set('key', 'test')


// const params = {
//   f: 'Иваново',
//   o: 'json',
//   st: 'localhost',
//   ml: 'obp2000@mail.ru',
//   key: 'test',
//   t: '101000',
//   w: 2300,
// }
// const query = fetchBaseQuery({
//   baseUrl: `${postBaseUrl}?${params.toString()}`,
// })

// let headers = new Headers()
// headers.append('Content-Type', 'application/json')
// headers.append('Accept', 'application/json')
// headers.append('Origin','http://localhost:8080')
// headers.append('Access-Control-Allow-Origin', '*')

// console.log('query ', query)
// let post_cost
