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
import {
  tokenHeaders
} from './auth'
import config from '../Config'

const requestUser = createAction()
const receiveUser = createAction()

export const initUser = {
    id: null,
    username: null,
    email: null
}

const initialState = {
    isFetching: false,
    loaded: false,
    user: initUser
}

const reduceRequestUser = (state) => ({
    ...state,
    initUser,
    isFetching: true
})

const reduceReceiveUser = (state, user = initUser) => ({
    ...state,
    user,
    isFetching: false
})

const user = createReducer({
        [requestUser]: reduceRequestUser,
        [receiveUser]: reduceReceiveUser,
    },
    initialState
)

export default user

// Server requests:

const base_url = `${config.BACKEND}/api/user/`

const error_handler = e => console.log(`Error: ${e}`)

const extract_data = ({
    data
}) => data

const getUser = (accessToken) => axios.get(`${base_url}`,
    tokenHeaders(accessToken)
  )
  .catch(error_handler)
  .then(extract_data)

// Async actions:

export const getUserAction = (accessToken) => dispatch => {
    dispatch(requestUser())
    return getUser(accessToken)
        .then(user => dispatch(receiveUser(user)))
}

// export const getCustomerAction = (id, accessToken) => dispatch => {
//   if (accessToken) {
//     dispatch(requestCustomer())
//     if (id == 'new') {
//       return dispatch(receiveCustomer())
//     } else {
//       return getCustomer(id, accessToken)
//         .then(customer => dispatch(receiveCustomer(customer)))
//     }
//   }
// }