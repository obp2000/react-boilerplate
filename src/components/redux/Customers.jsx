import {
  createAction,
  createReducer
} from 'redux-act'
import axios from 'axios'
import {
  push
} from 'connected-react-router'
// import pickKeys from 'json-pick-keys'
import {
  initCity
} from './Cities'
import {
  tokenHeaders
} from './auth'
import config from '../Config'

const requestCustomers = createAction()
const receiveCustomers = createAction()
const requestCustomer = createAction()
const receiveCustomer = createAction()
const requestUpdateCustomer = createAction()
const receiveUpdateCustomer = createAction()
const requestDeleteCustomer = createAction()
const receiveDeleteCustomer = createAction()
const requestSearchCustomers = createAction()
const receiveSearchCustomers = createAction()

const exclude_from_results = (results, id) => {
  return results.filter(result => {
    return (result.id != id)
  })
}

const init_customers_info = {
  totalCount: 0,
  page: null,
  totalPages: 0,
  term: null,
  results: []
}

export const initCustomer = {
  nick: '',
  name: '',
  city: initCity,
  address: ''
}

const initialState = {
  ...init_customers_info,
  isFetching: false,
  didInvalidate: false,
  loaded: false,
  customer: initCustomer,
  search_customers: []
}

const reduceRequestCustomers = (state) => ({
  ...state,
  ...init_customers_info,
  isFetching: true,
  didInvalidate: false
})

const reduceReceiveCustomers = (state, customers_info) => ({
  ...state,
  ...customers_info,
  isFetching: false,
  loaded: true
})

const reduceRequestCustomer = (state) => ({
  ...state,
  customer: initCustomer,
  isFetching: true
})

const reduceReceiveCustomer = (state, customer = initCustomer) => ({
  ...state,
  customer,
  isFetching: false
})

const reduceRequestDeleteCustomer = (state) => ({
  ...state,
  isFetching: true
})

const reduceReceiveDeleteCustomer = (state, customer_id) => ({
  ...state,
  results: exclude_from_results(state.results, customer_id),
  totalCount: state.totalCount - 1,
  isFetching: false
})

const reduceRequestUpdateCustomer = (state) => ({
  ...state,
  isFetching: true
})

const reduceReceiveUpdateCustomer = (state, customer) => ({
  ...state,
  customer,
  results: [
    ...exclude_from_results(state.results, customer.id),
    customer
  ],
  totalCount: state.totalCount + (state.customer.id ? 0 : 1),
  isFetching: false
})

const reduceRequestSearchCustomers = (state) => ({
  ...state,
  search_customers: [],
  isFetching: true,
  didInvalidate: false
})

const reduceReceiveSearchCustomers = (state, search_customers) => ({
  ...state,
  search_customers,
  isFetching: false,
  loaded: true
})

const customers = createReducer({
    [requestCustomers]: reduceRequestCustomers,
    [receiveCustomers]: reduceReceiveCustomers,
    [requestCustomer]: reduceRequestCustomer,
    [receiveCustomer]: reduceReceiveCustomer,
    [requestDeleteCustomer]: reduceRequestDeleteCustomer,
    [receiveDeleteCustomer]: reduceReceiveDeleteCustomer,
    [requestUpdateCustomer]: reduceRequestUpdateCustomer,
    [receiveUpdateCustomer]: reduceReceiveUpdateCustomer,
    [requestSearchCustomers]: reduceRequestSearchCustomers,
    [receiveSearchCustomers]: reduceReceiveSearchCustomers
  },
  initialState
)

export default customers

// Server requests:

const base_url = `${config.BACKEND}/api/customers`

const error_handler = e => console.log(`Error: ${e}`)

const extract_data = ({
  data
}) => data

const extract_results = ({
  results
}) => results

// const extract_customers3 = ({
//   data: {
//     results = []
//   } = {}
// }) => results

// const extract_customers = ({
//   data
// }) => {
//   const {
//     results = []
//   } = data
//   // console.log('customers:', results)
//   return results
// }

const getCustomers = (page, term, accessToken) => axios.get(`${base_url}/`, {
    params: {
      page,
      term
    },
    ...tokenHeaders(accessToken)
  })
  .catch(error_handler)
  .then(extract_data)

const getCustomer = (id, accessToken) => axios.get(`${base_url}/${id}`,
    tokenHeaders(accessToken)
  )
  .catch(error_handler)
  .then(extract_data)

const createOrUpdateCustomer = (id, data, accessToken) => axios({
    url: `${base_url}/${id ? id + '/' : ''}`,
    method: id ? 'PUT' : 'POST',
    ...tokenHeaders(accessToken),
    data
  })
  .catch(error_handler)
  .then(extract_data)

const deleteCustomer = (id, accessToken) => axios.delete(`${base_url}/${id}`,
    tokenHeaders(accessToken))
  .catch(error_handler)

const searchCustomers = (term, accessToken) => axios.get(`${base_url}/`, {
    params: {
      term,
      page_size: 1000000
    },
    ...tokenHeaders(accessToken)
  })
  .catch(error_handler)
  .then(extract_data).then(extract_results)

// Async actions:

export const getCustomersAction = (page, term, accessToken) => dispatch => {
  dispatch(requestCustomers())
  return getCustomers(page, term, accessToken)
    .then(customers_info => dispatch(receiveCustomers({
      ...customers_info,
      page,
      term
    })))
}

export const getCustomerAction = (id, accessToken) => dispatch => {
  if (accessToken) {
    dispatch(requestCustomer())
    if (id == 'new') {
      return dispatch(receiveCustomer())
    } else {
      return getCustomer(id, accessToken)
        .then(customer => dispatch(receiveCustomer(customer)))
    }
  }
}

export const onSubmit = (values, dispatch, {
  id = '',
  accessToken
}) => {
  if (accessToken) {
    dispatch(requestUpdateCustomer())
    // return createOrUpdateCustomer(id, { ...values,
    //   city: values.city ? values.city.pindex : ''
    // }, accessToken)
    // if (values.city) {}
    return createOrUpdateCustomer(id, values, accessToken)
  }
}

export const onSubmitSuccess = (customer, dispatch) => {
  dispatch(receiveUpdateCustomer(customer))
  dispatch(push('/customers'))
}

export const deleteCustomerAction = (id, accessToken) => dispatch => {
  if (accessToken) {
    dispatch(requestDeleteCustomer())
    return deleteCustomer(id, accessToken)
      .then(() => dispatch(receiveDeleteCustomer(id)))
  }
}

export const onSearchCustomer = value => (dispatch, getState) => {
  const {
    auth: {
      accessToken
    }
  } = getState()
  if (accessToken) {
    // alert(accessToken)
    if (typeof(value) == 'string' && value.length > 0) {
      dispatch(requestSearchCustomers())
      searchCustomers(value, accessToken)
        .then(search_customers => dispatch(receiveSearchCustomers(search_customers)))
    }
  } else {
    alert('sssssssss')
  }
}