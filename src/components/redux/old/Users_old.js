import { createAction, createReducer } from 'redux-act'
import axios from 'axios'
// import { push } from 'connected-react-router'
import { tokenHeaders } from './auth'
import config from '../Config'

const reducer_actions = {}

const requestUser = createAction()
const successReceiveUser = createAction()
const failedReceiveUser = createAction()

export const initUser = {
    id: null,
    username: null,
    name: null,
    email: null
}

const initialState = {
    object: initUser,
    isFetching: false,
    loaded: false,
    errors: null
}

reducer_actions[requestUser] = (state) =>
    ({
        ...state,
        object: initUser,
        isFetching: true,
        loaded: false,
        errors: null
    })

reducer_actions[successReceiveUser] = (state, object) =>
    ({
        ...state,
        object,
        isFetching: false,
        loaded: true,
        errors: null
    })

reducer_actions[failedReceiveUser] = (state, errors) =>
    ({
        ...state,
        ...initialState,
        errors
    })

const user = createReducer(reducer_actions, initialState)

export default user

// Server requests:

const base_url = `${config.BACKEND}/api/user/`

// const error_handler = e => console.log(`Error: ${e}`)

// Async actions:

export const getObjectAction = (accessToken) => dispatch => {
    dispatch(requestUser())
    return axios.get(`${base_url}`,
            tokenHeaders(accessToken)
        )
        .then(({
            data
        } = {}) => dispatch(successReceiveUser(data)))
        .catch(({
            message,
            response: {
                data: {
                    detail
                } = {}
            } = {}
        }) => dispatch(failedReceiveUser([detail || message])))
}
