import { createAction, createReducer } from 'redux-act'
import axios from 'axios'
import { push } from 'connected-react-router'
import config from '../Config'
// import { closeModal } from './NavBar'
import { errorHandler, formErrorHandler } from './ErrorHandlers'
import { clearErrors } from './Errors'

const reducer_actions = {}

const startAuthentication = createAction('startAuthentication')
const successAuthentication = createAction('successAuthentication')
const failedAuthentication = createAction('failedAuthentication')
const startRegister = createAction('startRegister')
const successRegister = createAction('successRegister')
const failedRegister = createAction('failedRegister')
const startSignout = createAction('startSignout')
const successSignout = createAction('successSignout')
const failedSignout = createAction('failedSignout')
const requestUser = createAction('requestUser')
const successReceiveUser = createAction('successReceiveUser')
const failedReceiveUser = createAction('failedReceiveUser')
export const toggleModal = createAction('toggleModal')
export const closeModal = createAction('closeModal')
export const toggleLogin = createAction('toggleLogin')

export const tokenHeaders = (accessToken) => {
    return {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${accessToken}`
        }
    }
}

export const initUser = {
    id: null,
    username: null,
    email: null,
    first_name: null,
    last_name: null,
}

const initialState = {
    isAuthenticated: false,
    accessToken: null,
    object: initUser,
    // modal: false,
    // login: true,
    isFetching: false,
    loaded: false,
    errors: null
}

reducer_actions[startAuthentication] = (state) =>
    ({
        ...state,
        ...initialState,
        isFetching: true
    })

reducer_actions[successAuthentication] = (state, accessToken) =>
    ({
        ...state,
        isAuthenticated: true,
        accessToken,
        isFetching: false,
        loaded: true,
        errors: null
    })

reducer_actions[failedAuthentication] = (state, errors) =>
    ({
        ...state,
        ...initialState,
        errors
    })

reducer_actions[startRegister] = (state) =>
    ({
        ...state,
        ...initialState,
        isFetching: true,
    })

reducer_actions[successRegister] = (state) =>
    ({
        ...state,
        isFetching: false,
        loaded: false,
        errors: null
    })

reducer_actions[failedRegister] = (state, errors) =>
    ({
        ...state,
        ...initialState,
        errors
    })

reducer_actions[startSignout] = (state) =>
    ({
        ...state,
        isFetching: true,
        loaded: false,
        errors: null
    })

reducer_actions[successSignout] = (state) =>
    ({
        ...state,
        ...initialState,
        loaded: true,
    })

reducer_actions[failedSignout] = (state, errors) =>
    ({
        ...state,
        isFetching: false,
        loaded: false,
        errors
    })

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
        object: initUser,
        isFetching: false,
        loaded: false,
        errors
    })

reducer_actions[toggleModal] = (state) =>
    ({
        ...state,
        modal: !state.modal
    })

reducer_actions[closeModal] = (state) =>
    ({
        ...state,
        modal: false
    })

reducer_actions[toggleLogin] = (state) =>
    ({
        ...state,
        login: !state.login
    })

const auth = createReducer(reducer_actions, initialState)

export default auth

// Server requests:

const base_url = `${config.BACKEND}/api`

export const onSubmitLogin = dispatch => values => {
    dispatch(startAuthentication())
    return axios.post(`${base_url}/login/`, values)
        .then(({
            data: {
                key
            }
        }) => {
            dispatch(successAuthentication(key))
            dispatch(clearErrors())
            dispatch(closeModal())
            return dispatch(push('/user/'))
        })
        .catch(formErrorHandler(dispatch, failedAuthentication))
}

export const onSubmitRegister = dispatch => values => {
    dispatch(startRegister())
    return axios.post(`${base_url}/register/`, values)
        .then(() => {
            dispatch(successRegister())
            dispatch(clearErrors())
            dispatch(closeModal())
            alert('Успешно зарегистрировались!')
        })
        .catch(formErrorHandler(dispatch, failedRegister))
}

export const signOut = dispatch => () => {
    dispatch(startSignout())
    return axios.post(`${base_url}/logout/`)
        .then(() => dispatch(successSignout()))
        .catch(errorHandler(dispatch, failedSignout))
}

export const getObjectAction = () => (dispatch, getState) => {
    const {
        auth: {
            accessToken
        }
    } = getState()
    dispatch(requestUser())
    return axios.get(`${base_url}/user/`,
            tokenHeaders(accessToken)
        )
        .then(({ data }) => dispatch(successReceiveUser(data)))
        .catch(errorHandler(dispatch, failedReceiveUser))
}
