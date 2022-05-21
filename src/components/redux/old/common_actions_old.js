import {createAction, createReducer} from 'redux-act'
import axios from 'axios'
// import { push } from 'connected-react-router'
import {objectToFormData} from 'object-to-formdata'
import {tokenHeaders} from './auth'
// import { reduxForm } from 'redux-form'
// import { connect } from 'react-redux'
// import pickKeys from 'json-pick-keys'
// import { initCity } from './Cities'
// import config from '../Config'
// import { validate } from '../customers/Validators'

const error_handler = (e) => console.log(`Error: ${e}`)

const extract_data = ({data}) => data

const extract_results = ({results}) => results

const exclude_from_results = (results, id) => results.filter((result) => (result.id != id))

export const init_objects_info = {
  totalCount: 0,
  page: null,
  totalPages: 0,
  term: null,
  results: [],
}

const reducer_actions = {}

// Get collection

const requestObjects = createAction()

const reduceRequestObjects = (state) => ({
  ...state,
  ...init_objects_info,
  isFetching: true,
  didInvalidate: false,
})

reducer_actions[requestObjects] = reduceRequestObjects

const receiveObjects = createAction()

const reduceReceiveObjects = (state, objects_info) => ({
  ...state,
  ...objects_info,
  isFetching: false,
  loaded: true,
})

// reducer_actions[receiveObjects] = reduceReceiveObjects
reducer_actions[receiveObjects] = reduceReceiveObjects

const getObjects = (base_url) => (page, term, accessToken) => axios.get(`${base_url}/`, {
  params: {
    page,
    term: decodeURIComponent(term),
  },
  ...tokenHeaders(accessToken),
})
    .catch(error_handler)
    .then(extract_data)

export const buildGetObjectsAction = ({
  base_url,
}) => (page, term, accessToken) => (dispatch) => {
  dispatch(requestObjects())
  return getObjects(base_url)(page, term, accessToken)
      .then((objects_info) => dispatch(receiveObjects({
        ...objects_info,
        page,
        term,
      })))
}

// console.log('reducer_actions: ', reducer_actions)
// export const get_reducer_actions = () => reducer_actions

// Get object

const requestObject = createAction()

const reduceRequestObject = (state) => ({
  ...state,
  object: {},
  isFetching: true,
})

reducer_actions[requestObject] = reduceRequestObject

const receiveObject = createAction()

const reduceReceiveObject = (state, object = {}) => ({
  ...state,
  object,
  isFetching: false,
})

reducer_actions[receiveObject] = reduceReceiveObject

const getObject = (base_url) => (id, accessToken) => axios.get(
    `${base_url}/${id}`,
    tokenHeaders(accessToken),
)
    .catch(error_handler)
    .then(extract_data)

export const buildGetObjectAction = ({
  // requestObject,
  // receiveObject,
  base_url,
}) => (id, accessToken) => (dispatch) => {
  if (accessToken) {
    dispatch(requestObject())
    return ((id == 'new') ? dispatch(receiveObject()) :
      getObject(base_url)(id, accessToken)
          .then((object) => dispatch(receiveObject(object)))
    )
  }
}

// Create or update object

const requestUpdateObject = createAction()

export const reduceRequestUpdateObject = (state) => ({
  ...state,
  isFetching: true,
})

reducer_actions[requestUpdateObject] = reduceRequestUpdateObject

const receiveUpdateObject = createAction()

export const reduceReceiveUpdateObject = (state, object) => ({
  ...state,
  object,
  results: [
    ...exclude_from_results(state.results, object.id),
    object,
  ],
  totalCount: state.totalCount + (state.object.id ? 0 : 1),
  isFetching: false,
})

reducer_actions[receiveUpdateObject] = reduceReceiveUpdateObject

export const createOrUpdateObject = (base_url, to_form_data = false) => (data, accessToken) => axios({
  url: `${base_url}/${data.id ? `${data.id}/` : ''}`,
  method: data.id ? 'PUT' : 'POST',
  ...tokenHeaders(accessToken),
  data: to_form_data ? objectToFormData(data) : data,
})
    .catch(error_handler)
    .then(extract_data)

export const buildOnSubmitAction = ({
  // requestUpdateObject,
  // receiveUpdateObject,
  base_url,
  redirectUrl,
  to_form_data,
  preSubmitAction,
}) => (values) => (dispatch, getState) => {
  const {
    auth: {
      accessToken,
    },
  } = getState()
  if (accessToken) {
    // console.log('values: ', values)
    dispatch(requestUpdateObject())
    if (preSubmitAction) {
      preSubmitAction(values)
    }
    return createOrUpdateObject(base_url, to_form_data)(values, accessToken)
        .then((object) => dispatch(receiveUpdateObject(object)))
        .then(() => dispatch(push(redirectUrl)))
  }
}

// Delete object

const requestDeleteObject = createAction()

export const reduceRequestDeleteObject = (state) => ({
  ...state,
  isFetching: true,
})

reducer_actions[requestDeleteObject] = reduceRequestDeleteObject

const receiveDeleteObject = createAction()

export const reduceReceiveDeleteObject = (state, object_id) => ({
  ...state,
  results: exclude_from_results(state.results, object_id),
  totalCount: state.totalCount - 1,
  isFetching: false,
})

reducer_actions[receiveDeleteObject] = reduceReceiveDeleteObject

export const deleteObject = (base_url) => (id, accessToken) => axios.delete(`${base_url}/${id}`, tokenHeaders(accessToken))
    .catch(error_handler)

export const buildDeleteObjectAction = ({
  // requestDeleteObject,
  // receiveDeleteObject,
  base_url,
}) => (id, accessToken) => (dispatch) => {
  if (accessToken) {
    dispatch(requestDeleteObject())
    return deleteObject(base_url)(id, accessToken)
        .then(() => dispatch(receiveDeleteObject(id)))
  }
}

// Search objects

const requestSearchObjects = createAction()

export const reduceRequestSearchObjects = (state) => ({
  ...state,
  search_results: [],
  isFetching: true,
  didInvalidate: false,
})

reducer_actions[requestSearchObjects] = reduceRequestSearchObjects

const receiveSearchObjects = createAction()

export const reduceRecieveSearchObjects = (state, search_results) => ({
  ...state,
  search_results,
  isFetching: false,
  loaded: true,
})

reducer_actions[receiveSearchObjects] = reduceRecieveSearchObjects

export const searchObjects = (base_url) => (term, accessToken) => axios.get(`${base_url}/`, {
  params: {
    term: decodeURIComponent(term),
    page_size: 1000000,
  },
  // ...tokenHeaders(accessToken)
})
    .catch(error_handler)
    .then(extract_data)
    .then(extract_results)

export const builSearchObjectsAction = ({
  // requestSearchObjects,
  // receiveSearchObjects,
  base_url,
}) => (value) => (dispatch, getState) => {
  const {
    auth: {
      accessToken,
    },
  } = getState()
  if (accessToken) {
    // alert(accessToken)
    if (typeof (value) === 'string' && value.length > 0) {
      dispatch(requestSearchObjects())
      searchObjects(base_url)(value, accessToken)
          .then((search_results) => dispatch(receiveSearchObjects(search_results)))
    }
  }
}

export const buildReducer = (initialState) => createReducer(reducer_actions, initialState)

// / ///////

// export const createCollectionActions = (base_url) => {

//     const reducer_actions = {}

//     const requestObjects = createAction()

//     reducer_actions[requestObjects] = reduceRequestObjects

//     const receiveObjects = createAction()

//     reducer_actions[receiveObjects] = reduceReceiveObjects

//     const getObjectsAction = (page, term, accessToken) => dispatch => {
//         dispatch(requestObjects())
//         return getObjects(base_url)(page, term, accessToken)
//             .then(objects_info => dispatch(receiveObjects({
//                 ...objects_info,
//                 page,
//                 term
//             })))
//     }

//     return { reducer_actions, getObjectsAction }
// }

// class CollectionActions {

//     constructor(base_url) {
//         this.base_url = base_url
//         this.reducer_actions = {}
//         this.requestObjects = createAction()
//         this.reducer_actions[requestObjects] = reduceRequestObjects
//         this.receiveObjects = createAction()
//         this.reducer_actions[receiveObjects] = reduceReceiveObjects
//     }

//     test1() {
//         return (page, term, accessToken) => dispatch => {
//             dispatch(requestObjects())
//             return getObjects(base_url)(page, term, accessToken)
//                 .then(objects_info => dispatch(receiveObjects({
//                     ...objects_info,
//                     page,
//                     term
//                 })))
//         }
//     }
// }
