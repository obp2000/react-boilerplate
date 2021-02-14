import {
  createAction,
  createReducer
} from 'redux-act'
import axios from 'axios'
import config from '../Config'

const requestSearchCities = createAction()
const receiveSearchCities = createAction()

export const initCity = {
  city: '',
  pindex: ''
}

const initialState = {
  results: []
}

const reduceRequestSearchCities = (state) => ({
  ...state,
  results: [],
  isFetching: true
})

const reduceReceiveSearchCities = (state, results) => ({
  ...state,
  results,
  isFetching: false
})

const cities = createReducer({
    [requestSearchCities]: reduceRequestSearchCities,
    [receiveSearchCities]: reduceReceiveSearchCities
  },
  initialState
)

export default cities

// Server requests:

const base_url = `${config.BACKEND}/api/cities`

const error_handler = e => console.log(`Error: ${e}`)

const extract_data = ({
  data
}) => data

const searchCities = (term) => axios.get(`${base_url}/`, {
    params: {
      term
    }
  })
  .catch(error_handler)
  .then(extract_data)

// Async actions:

export const onChangeCity = (obj, value) => dispatch => {
  if (typeof(value) == 'string' && value.length > 0) {
    dispatch(requestSearchCities())
    searchCities(value)
      .then(results => dispatch(receiveSearchCities(results)))
  }
}