import {
  createAction,
  createReducer
} from 'redux-act'
import axios from 'axios'
import {
  objectToFormData
} from 'object-to-formdata'
import {
  change
} from 'redux-form'
import {
  push,
  goBack
} from 'connected-react-router'
import config from '../Config'

const requestProducts = createAction()
const receiveProducts = createAction()
const requestProduct = createAction()
const receiveProduct = createAction()
const requestUpdateProduct = createAction()
const receiveUpdateProduct = createAction()
const requestDeleteProduct = createAction()
const receiveDeleteProduct = createAction()
const requestSearchProducts = createAction()
const receiveSearchProducts = createAction()

const exclude_from_results = (results, id) => {
  return results.filter(result => {
    return (result.id != id)
  })
}

const init_products_info = {
  results: [],
  totalCount: 0,
  page: null,
  totalPages: 0,
  term: null
}

export const initProduct = {
  id: null,
  name: '',
  price: null,
  density: null,
  weight: null,
  width: null,
  density: null,
  dollar_price: null,
  dollar_rate: null,
  width_shop: null,
  density_shop: null,
  weight_for_count: null,
  length_for_count: null,
  price_pre: null,
  image: null
}

const initialState = {
  ...init_products_info,
  isFetching: false,
  loaded: false,
  product: initProduct,
  search_products: []
}

const reduceRequestProducts = (state) => ({
  ...state,
  ...init_products_info,
  isFetching: true,
  didInvalidate: false
})

const reduceReceiveProducts = (state, products_info) => ({
  ...state,
  ...products_info,
  isFetching: false,
  loaded: true
})

const reduceRequestProduct = (state) => ({
  ...state,
  product: initProduct,
  isFetching: true
})

const reduceReceiveProduct = (state, product = initProduct) => ({
  ...state,
  product,
  isFetching: false
})

const reduceRequestDeleteProduct = (state) => ({
  ...state,
  isFetching: true
})

const reduceReceiveDeleteProduct = (state, id) => ({
  ...state,
  results: exclude_from_results(state.results, id),
  totalCount: state.totalCount - 1,
  isFetching: false
})

const reduceRequestUpdateProduct = (state) => ({
  ...state,
  isFetching: true
})

const reduceReceiveUpdateProduct = (state, product) => ({
  ...state,
  product,
  results: [
    ...exclude_from_results(state.results, product.id),
    product
  ],
  totalCount: state.totalCount + (state.product.id ? 0 : 1),
  isFetching: false
})

const reduceRequestSearchProducts = (state) => ({
  ...state,
  search_products: [],
  isFetching: true,
  didInvalidate: false
})

const reduceReceiveSearchProducts = (state, search_products) => ({
  ...state,
  search_products,
  isFetching: false,
  loaded: true
})

const products = createReducer({
    [requestProducts]: reduceRequestProducts,
    [receiveProducts]: reduceReceiveProducts,
    [requestProduct]: reduceRequestProduct,
    [receiveProduct]: reduceReceiveProduct,
    [requestDeleteProduct]: reduceRequestDeleteProduct,
    [receiveDeleteProduct]: reduceReceiveDeleteProduct,
    [requestUpdateProduct]: reduceRequestUpdateProduct,
    [receiveUpdateProduct]: reduceReceiveUpdateProduct,
    [requestSearchProducts]: reduceRequestSearchProducts,
    [receiveSearchProducts]: reduceReceiveSearchProducts
  },
  initialState
)

export default products

// Server requests:

const base_url = `${config.BACKEND}/api/products`

const error_handler = e => console.log(`Error: ${e}`)

const extract_data = ({
  data
}) => data

const extract_products = ({
  data: {
    results = []
  } = {}
}) => results

const getProducts = (page, term) => axios.get(`${base_url}/`, {
    params: {
      page,
      // term
      term: decodeURIComponent(term)
    }
  })
  .catch(error_handler)
  .then(extract_data)

const getProduct = (id) => axios.get(`${base_url}/${id}`)
  .catch(error_handler)
  .then(extract_data)

const createOrUpdateProduct = (id, data) => axios({
    url: `${base_url}/${id ? id + '/' : ''}`,
    method: id ? 'PUT' : 'POST',
    data: objectToFormData(data)
  })
  .catch(error_handler)
  .then(extract_data)

const deleteProduct = (id) => axios.delete(`${base_url}/${id}`)
  .catch(error_handler)

const searchProducts = (term) => axios.get(`${base_url}/`, {
    params: {
      term: decodeURIComponent(term),
      page_size: 1000000
    }
  })
  .catch(error_handler)
  .then(extract_products)

// Async actions:

export const getProductsAction = (page, term) => dispatch => {
  dispatch(requestProducts())
  return getProducts(page, term)
    .then(products_info => dispatch(receiveProducts({
      ...products_info,
      page,
      term
    })))
}

export const getProductAction = (id) => dispatch => {
  dispatch(requestProduct())
  if (id == 'new') {
    return dispatch(receiveProduct())
  } else {
    return getProduct(id)
      .then(product => dispatch(receiveProduct(product)))
  }
}

export const onSubmit = (values, dispatch, {
  id = ''
}) => {
  dispatch(requestUpdateProduct())
  // console.log('values: ', values, typeof(values.image))
  if (values.new_image) {
    values.image = values.new_image
  } else {
    delete values.image
  }
  delete values.new_image
  return createOrUpdateProduct(id, values)
}

export const onSubmitSuccess = (product, dispatch) => {
  dispatch(receiveUpdateProduct(product))
  dispatch(push('/products'))
}

export const deleteProductAction = id => dispatch => {
  dispatch(requestDeleteProduct())
  return deleteProduct(id)
    .then(() => dispatch(receiveDeleteProduct(id)))
}

export const onChangeProduct = (obj, value) => dispatch => {
  if (typeof(value) == 'string' && value.length > 0) {
    dispatch(requestSearchProducts())
    searchProducts(value)
      .then(search_products => dispatch(receiveSearchProducts(search_products)))
  }
}

export const onSelectProduct = ({
  price
}, order_item_name) => dispatch => {
  if (price) {
    dispatch(change('order', `${order_item_name}.price`, price))
  }
}