import {createAction, createReducer} from 'redux-act'
import config from '../Config'
import {
  init_objects_info,
  buildGetObjectsAction,
  buildGetObjectAction,
  buildOnSubmitAction,
  buildDeleteObjectAction,
  builSearchObjectsAction,
  buildReducer,
} from './common_actions'
import {initObject as initCustomer} from './Customers'
import {initObject as initProduct} from './Products'

const base_url = `${config.BACKEND}/api/orders`

const init_orders_info = {
  results: [],
  totalCount: 0,
  page: '1',
  totalPages: 0,
  term: null,
}

const initOrder = {
  post_cost: 0,
  packet: 0,
  created_at: '',
  customer: initCustomer,
  order_items: [],
}

export const initOrderItem = {
  product: initProduct,
  price: 0,
  amount: 0,
  _destroy: false,
}

const initialState = {
  ...init_orders_info,
  isFetching: false,
  loaded: false,
  order: initOrder,
}

const redirectUrl = '/orders'

export const getObjectsAction = buildGetObjectsAction({
  base_url,
})

export const getObjectAction = buildGetObjectAction({
  base_url,
})

export const onSubmit = buildOnSubmitAction({
  base_url,
  redirectUrl,
})

export const deleteObjectAction = buildDeleteObjectAction({
  base_url,
})

export const onSearchOrder = builSearchObjectsAction({
  base_url,
})

export const addOrderItemAction = (fields) => () => fields.push(initOrderItem)

export default buildReducer(initialState)
