import { createAction, createReducer } from 'redux-act'
import axios from 'axios'
import config from '../Config'

const requestSearchCities = createAction()
const receiveSearchCities = createAction()

export const initCity = {
    city: '',
    pindex: ''
}

const initialState = {
    results: [],
    isFetching: false
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

const extract_data = ({ data }) => data

const searchCities = (term) => axios.get(`${base_url}/`, {
        params: {
            term
        }
    })
    .then(extract_data)
    .catch(error_handler)
// .then((data) => console.log('data: ', data))

// Async actions:

export const onChangeCity = (value) => dispatch => {
    // alert('sssss')
    // console.log('obj: ', obj)
    // console.log('value: ', value)
    // console.log('value1: ', value1)
    if (typeof(value) == 'string' && value.length > 0) {
        dispatch(requestSearchCities())
        return searchCities(value)
            .then(results => dispatch(receiveSearchCities(results)))
        // .then((data) => console.log('data: ', data))
    }
}


// export const onSearchCustomer1 = value => (dispatch, getState) => {
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