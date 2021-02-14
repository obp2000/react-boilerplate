import {
  createAction,
  createReducer
} from 'redux-act'
import axios from 'axios'
import {
  change
} from 'redux-form'
import {
  push,
  goBack
} from 'connected-react-router'
// import pickKeys from 'json-pick-keys'
import config from '../Config'
import {
  initCustomer
} from './Customers'
import {
  initProduct
} from './Products'

const requestOrders = createAction()
const receiveOrders = createAction()
const requestOrder = createAction()
const receiveOrder = createAction()
const requestUpdateOrder = createAction()
const receiveUpdateOrder = createAction()
const requestDeleteOrder = createAction()
const receiveDeleteOrder = createAction()

const exclude_from_results = (results, id) => {
  return results.filter(result => {
    return (result.id != id)
  })
}

const init_orders_info = {
  results: [],
  totalCount: 0,
  page: "1",
  totalPages: 0,
  term: null
}

const initOrder = {
  post_cost: 0,
  packet: 0,
  created_at: '',
  customer: initCustomer,
  order_items: []
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
  order: initOrder
}

const reduceRequestOrders = (state) => ({
  ...state,
  ...init_orders_info,
  isFetching: true,
  didInvalidate: false
})

const reduceReceiveOrders = (state, orders_info) => ({
  ...state,
  ...orders_info,
  isFetching: false,
  loaded: true
})

const reduceRequestOrder = (state) => ({
  ...state,
  order: initOrder,
  isFetching: true
})

const reduceReceiveOrder = (state, order = initOrder) => ({
  ...state,
  order,
  isFetching: false
})

const reduceRequestDeleteOrder = (state) => ({
  ...state,
  isFetching: true
})

const reduceReceiveDeleteOrder = (state, id) => ({
  ...state,
  results: exclude_from_results(state.results, id),
  totalCount: state.totalCount - 1,
  isFetching: false
})

const reduceRequestUpdateOrder = (state) => ({
  ...state,
  isFetching: true
})

const reduceReceiveUpdateOrder = (state, order) => ({
  ...state,
  order,
  results: [
    ...exclude_from_results(state.results, order.id),
    order
  ],
  totalCount: state.totalCount + (state.order.id ? 0 : 1),
  isFetching: false
})

const orders = createReducer({
    [requestOrders]: reduceRequestOrders,
    [receiveOrders]: reduceReceiveOrders,
    [requestOrder]: reduceRequestOrder,
    [receiveOrder]: reduceReceiveOrder,
    [requestDeleteOrder]: reduceRequestDeleteOrder,
    [receiveDeleteOrder]: reduceReceiveDeleteOrder,
    [requestUpdateOrder]: reduceRequestUpdateOrder,
    [receiveUpdateOrder]: reduceReceiveUpdateOrder
  },
  initialState
)

export default orders

// Server requests:

const base_url = `${config.BACKEND}/api/orders`

const error_handler = e => console.log(`Error: ${e}`)

const extract_data = ({
  data
}) => data

const getOrders = (page, term) => axios.get(`${base_url}/`, {
    params: {
      page,
      term
    }
  })
  .catch(error_handler)
  .then(extract_data)

const getOrder = (id) => axios.get(`${base_url}/${id}`)
  .catch(error_handler)
  .then(extract_data)

const createOrUpdateOrder = (id, data) => axios({
    url: `${base_url}/${id ? id + '/' : ''}`,
    method: id ? 'PUT' : 'POST',
    data
  })
  .catch(error_handler)
  .then(extract_data)

const deleteOrder = (id) => axios.delete(`${base_url}/${id}`)
  .catch(error_handler)

// Async actions:

export const getOrdersAction = (page, term) => dispatch => {
  dispatch(requestOrders())
  return getOrders(page, term)
    .then(orders_info => dispatch(receiveOrders({
      ...orders_info,
      page,
      term
    })))
}

export const getOrderAction = (id) => dispatch => {
  dispatch(requestOrder())
  if (id == 'new') {
    return dispatch(receiveOrder())
  } else {
    return getOrder(id)
      .then(order => dispatch(receiveOrder(order)))
  }
}

// export const onSubmitOrderAction = (id, values) => dispatch => {
//  dispatch(requestUpdateOrder())
//  return createOrUpdateOrder(id, values)
// }

// export const onSubmitSuccessOrderAction = (order) => dispatch => {
//  dispatch(receiveUpdateOrder(order))
//  dispatch(push('/orders'))
// }

export const onSubmit = (values, dispatch, {
  id = ''
}) => {
  dispatch(requestUpdateOrder())
  return createOrUpdateOrder(id, values)
}

export const onSubmitSuccess = (order, dispatch) => {
  dispatch(receiveUpdateOrder(order))
  dispatch(push('/orders'))
}

export const deleteOrderAction = id => dispatch => {
  dispatch(requestDeleteOrder())
  return deleteOrder(id)
    .then(() => dispatch(receiveDeleteOrder(id)))
}  