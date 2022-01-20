import { createAction, createReducer } from 'redux-act'
// import axios from 'axios'
// import { change } from 'redux-form'
// import { push, goBack } from 'connected-react-router'
import config from '../Config'
// import { validate } from '../products/Validators'
import {
    // error_handler,
    // extract_data,
    // extract_results,
    init_objects_info,
    // reduceRequestObjects,
    // reduceReceiveObjects,
    buildGetObjectsAction,

    // reduceRequestObject,
    // reduceReceiveObject,
    buildGetObjectAction,

    // reduceRequestUpdateObject,
    // reduceReceiveUpdateObject,
    buildOnSubmitAction,

    // reduceRequestDeleteObject,
    // reduceReceiveDeleteObject,
    buildDeleteObjectAction,

    // reduceRequestSearchObjects,
    // reduceRecieveSearchObjects,
    builSearchObjectsAction,
    buildReducer,

} from './common_actions'

const base_url = `${config.BACKEND}/api/products`

// const reducer_actions = {}

// Get collection

// const requestObjects = createAction()

// reducer_actions[requestObjects] = reduceRequestObjects

// const receiveObjects = createAction()

// reducer_actions[receiveObjects] = reduceReceiveObjects

export const getObjectsAction = buildGetObjectsAction({
    // requestObjects,
    // receiveObjects,
    base_url
})

// Get object

export const initObject = {
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

// const requestObject = createAction()

// reducer_actions[requestObject] = reduceRequestObject(initObject)

// const receiveObject = createAction()

// reducer_actions[receiveObject] = reduceReceiveObject(initObject)

export const getObjectAction = buildGetObjectAction({
    // requestObject,
    // receiveObject,
    base_url
})

// Create or update object

const redirect_url = '/products'

const to_form_data = true

const pre_submit_action = values => {
     // console.log('values: ', values, typeof(values.image))
    if (values.new_image) {
        values.image = values.new_image
    } else {
        delete values.image
    }
    delete values.new_image
}

// const requestUpdateObject = createAction()

// reducer_actions[requestUpdateObject] = reduceRequestUpdateObject

// const receiveUpdateObject = createAction()

// reducer_actions[receiveUpdateObject] = reduceReceiveUpdateObject

// export const onSubmit = (values) =>  (dispatch, getState) => {
//     const {
//         auth: {
//             accessToken
//         }
//     } = getState()
//     dispatch(requestUpdateObject())
//     // console.log('values: ', values, typeof(values.image))
//     if (values.new_image) {
//         values.image = values.new_image
//     } else {
//         delete values.image
//     }
//     delete values.new_image
//     return createOrUpdateObject(base_url, true)(values, accessToken)
//         .then(object => dispatch(receiveUpdateObject(object)))
//         .then(() => dispatch(push('/products')))
// }

export const onSubmit = buildOnSubmitAction({
    // requestUpdateObject,
    // receiveUpdateObject,
    base_url,
    redirect_url,
    to_form_data,
    pre_submit_action
})

// Delete object

// const requestDeleteObject = createAction()

// reducer_actions[requestDeleteObject] = reduceRequestDeleteObject

// const receiveDeleteObject = createAction()

// reducer_actions[receiveDeleteObject] = reduceReceiveDeleteObject

export const deleteObjectAction = buildDeleteObjectAction({
    // requestDeleteObject,
    // receiveDeleteObject,
    base_url
})

// Search objects

// const requestSearchObjects = createAction()

// reducer_actions[requestSearchObjects] = reduceRequestSearchObjects

// const receiveSearchObjects = createAction()

// reducer_actions[receiveSearchObjects] = reduceRecieveSearchObjects

export const onChangeProduct = builSearchObjectsAction({
    // requestSearchObjects,
    // receiveSearchObjects,
    base_url
})

// export const onSelectProduct = ({
//     price
// }, order_item_name) => dispatch => {
//     if (price) {
//         dispatch(change('order', `${order_item_name}.price`, price))
//     }
// }

// Create reducer

const initialState = {
    ...init_objects_info,
    isFetching: false,
    didInvalidate: false,
    loaded: false,
    object: initObject,
    search_results: []
}

export default buildReducer(initialState)
// export default createReducer(reducer_actions, initialState)


// export const deleteObjectAction = id => dispatch => {
//     dispatch(requestDeleteProduct())
//     return deleteProduct(id)
//         .then(() => dispatch(receiveDeleteProduct(id)))
// }


// const requestProducts = createAction()
// const receiveProducts = createAction()
// const requestProduct = createAction()
// const receiveProduct = createAction()
// const requestUpdateProduct = createAction()
// const receiveUpdateProduct = createAction()
// const requestDeleteProduct = createAction()
// const receiveDeleteProduct = createAction()
// const requestSearchProducts = createAction()
// const receiveSearchProducts = createAction()

// const exclude_from_results = (results, id) => {
//     return results.filter(result => {
//         return (result.id != id)
//     })
// }

// const init_products_info = {
//     results: [],
//     totalCount: 0,
//     page: null,
//     totalPages: 0,
//     term: null
// }

// const reduceRequestProducts = (state) => ({
//     ...state,
//     ...init_objects_info,
//     isFetching: true,
//     didInvalidate: false
// })

// const reduceReceiveProducts = (state, products_info) => ({
//     ...state,
//     ...products_info,
//     isFetching: false,
//     loaded: true
// })

// const reduceRequestProduct = (state) => ({
//     ...state,
//     product: initObject,
//     isFetching: true
// })

// const reduceReceiveProduct = (state, product = initObject) => ({
//     ...state,
//     product,
//     isFetching: false
// })

// const reduceRequestDeleteProduct = (state) => ({
//     ...state,
//     isFetching: true
// })

// const reduceReceiveDeleteProduct = (state, id) => ({
//     ...state,
//     results: exclude_from_results(state.results, id),
//     totalCount: state.totalCount - 1,
//     isFetching: false
// })

// const reduceRequestUpdateProduct = (state) => ({
//     ...state,
//     isFetching: true
// })

// const reduceReceiveUpdateProduct = (state, product) => ({
//     ...state,
//     product,
//     results: [
//         ...exclude_from_results(state.results, product.id),
//         product
//     ],
//     totalCount: state.totalCount + (state.product.id ? 0 : 1),
//     isFetching: false
// })

// const reduceRequestSearchProducts = (state) => ({
//     ...state,
//     search_results: [],
//     isFetching: true,
//     didInvalidate: false
// })

// const reduceReceiveSearchProducts = (state, search_results) => ({
//     ...state,
//     search_results,
//     isFetching: false,
//     loaded: true
// })

// const products = createReducer({
//         // [requestProducts]: reduceRequestProducts,
//         // [receiveProducts]: reduceReceiveProducts,
//         ...reducer_actions,
//         // [requestProduct]: reduceRequestProduct,
//         // [receiveProduct]: reduceReceiveProduct,
//         // [requestDeleteProduct]: reduceRequestDeleteProduct,
//         // [receiveDeleteProduct]: reduceReceiveDeleteProduct,
//         // [requestUpdateProduct]: reduceRequestUpdateProduct,
//         // [receiveUpdateProduct]: reduceReceiveUpdateProduct,
//         // [requestSearchProducts]: reduceRequestSearchProducts,
//         // [receiveSearchProducts]: reduceReceiveSearchProducts
//     },
//     initialState
// )

// export default products

// Server requests:



// const new_object_test = (id) => (id == 'new')

// const getProducts = (page, term) => axios.get(`${base_url}/`, {
//         params: {
//             page,
//             // term
//             term: decodeURIComponent(term)
//         }
//     })
//     .catch(error_handler)
//     .then(extract_data)

// const getProduct = (id) => axios.get(`${base_url}/${id}`)
//     .catch(error_handler)
//     .then(extract_data)



// const deleteProduct = (id) => axios.delete(`${base_url}/${id}`)
//     .catch(error_handler)

// const searchProducts = term => axios.get(`${base_url}/`, {
//         params: {
//             term: decodeURIComponent(term),
//             page_size: 1000000
//         }
//     })
//     .catch(error_handler)
//     .then(extract_data)
//     .then(extract_results)

// Async actions:








// export const onSubmit = (values) => (dispatch, getState) => {
//     const {
//         auth: {
//             accessToken
//         }
//     } = getState()
//     if (accessToken) {
//         console.log('values: ', values)
//         dispatch(requestUpdateCustomer())
//         return createOrUpdateCustomer(values, accessToken)
//             .then(customer => dispatch(receiveUpdateCustomer(customer)))
//             .then(() => dispatch(push('/customers')))
//     }
// }


// export const onSubmitSuccess = (product, dispatch) => {
//     dispatch(receiveUpdateProduct(product))
//     dispatch(push('/products'))
// }







// export const onSearchCustomer = value => (dispatch, getState) => {
//     const {
//         auth: {
//             accessToken
//         }
//     } = getState()
//     if (accessToken) {
//         // alert(accessToken)
//         if (typeof(value) == 'string' && value.length > 0) {
//             dispatch(requestSearchCustomers())
//             searchCustomers(value, accessToken)
//                 .then(search_results => dispatch(receiveSearchCustomers(search_results)))
//         }
//     } else {
//         alert('sssssssss')
//     }
// }



// redux form

// export const setReduxForm = () => reduxForm({
//     form: 'product',
//     validate,
//     onSubmit,
//     onSubmitSuccess,
//     enableReinitialize: true
// })