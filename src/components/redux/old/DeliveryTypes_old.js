import {
  createAction,
  createReducer
} from 'redux-act'
import axios from 'axios'
import config from '../Config'

const requestDeliveryTypes = createAction()
const receiveDeliveryTypes = createAction()

export const initDeliveryType = {
  id: '',
  name: ''
}

const initialState = {
  results: [],
  isFetching: false
}

const reduceRequestDeliveryTypes = (state) => ({
  ...state,
  results: [],
  isFetching: true
})

const reduceReceiveDeliveryTypes = (state, results) => ({
  ...state,
  results,
  isFetching: false
})

const delivery_types = createReducer({
    [requestDeliveryTypes]: reduceRequestDeliveryTypes,
    [receiveDeliveryTypes]: reduceReceiveDeliveryTypes
  },
  initialState
)

export default delivery_types

// Server requests:

const base_url = `${config.BACKEND}/api/delivery_types`

const error_handler = e => console.log(`Error: ${e}`)

const extract_data = ({
  data
}) => data

const getDeliveryTypes = () => axios.get(base_url)
  .catch(error_handler)
  .then(extract_data)

// Async actions:

export const getDeliveryTypesAction = () => dispatch => {
  dispatch(requestDeliveryTypes())
  return getDeliveryTypes()
    .then(results => dispatch(receiveDeliveryTypes(results)))
}