import { createAction, createReducer } from 'redux-act'
import axios from 'axios'
import { push } from 'connected-react-router'
import config from '../Config'
import { closeModal } from './NavBar'
import { errorHandler, formErrorHandler } from './ErrorHandlers'

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

const auth = createReducer(reducer_actions, initialState)

export default auth

// Server requests:

const base_url = `${config.BACKEND}/api`

export const onSubmitLogin = values => dispatch => {
    dispatch(startAuthentication())
    return axios.post(`${base_url}/login/`, values)
        .then(({
            data: {
                key
            }
        }) => {
            dispatch(successAuthentication(key))
            dispatch(closeModal())
            return dispatch(push('/user/'))
        })
        .catch(formErrorHandler(dispatch, failedAuthentication))
}

export const onSubmitRegister = values => dispatch => {
    dispatch(startRegister())
    return axios.post(`${base_url}/register/`, values)
        .then(() => {
            dispatch(successRegister())
            dispatch(closeModal())
            alert('Успешно зарегистрировались!')
        })
        .catch(formErrorHandler(dispatch, failedRegister))
}

export const signOut = () => dispatch => {
    dispatch(startSignout())
    return axios.post(`${base_url}/logout/`)
        .then(() => dispatch(successSignout()))
        .catch(errorHandler(dispatch, failedSignout))
}

export const getObjectAction = accessToken => dispatch => {
    dispatch(requestUser())
    return axios.get(`${base_url}/user/`,
            tokenHeaders(accessToken)
        )
        .then(({ data }) => dispatch(successReceiveUser(data)))
        .catch(errorHandler(dispatch, failedReceiveUser))
}

// const onFailedGetObjectAction = dispatch => ({
//     message,
//     response: {
//         data: {
//             detail
//         } = {}
//     } = {}
// }) => dispatch(failedReceiveUser([detail || message]))

// const onFailedSignout = dispatch => ({
//     message,
//     response: {
//         data: {
//             detail
//         } = {}
//     } = {}
// }) => dispatch(failedSignout([detail || message]))

// const onFailedLogin1 = dispatch => ({
//     message,
//     response: {
//         data: {
//             non_field_errors
//         } = {}
//     } = {}
// }) => {
//     dispatch(failedAuthentication(non_field_errors || [message]))
//     return {
//         [FORM_ERROR]: non_field_errors
//     }
// }

// const logout = (accessToken) => axios.post(`${base_url}/logout/`, null,
//         tokenHeaders(accessToken))
//     .catch(error_handler)

// const login = (values) => axios.post(`${base_url}/login/`, values)
//     .catch(failedLogin)
// // .then(extract_data)

// const register = (values) => axios.post(`${base_url}/register/`, values)
//     .catch(failedRegister)

// Async actions:

// export const onSubmitLogin11 = (values, dispatch, props) => {
//     dispatch(startAuthentication())
//     return login(values)
// }

// export const onSubmitSuccessLogin = ({ key }, dispatch, props) => {
//     dispatch(successAuthentication(key))
//     dispatch(closeModal())
//     dispatch(push('/user/'))
// }

// const successLogin = ({
//     data: {
//         key
//     }
// }) => {
//     dispatch(successAuthentication(key))
//     dispatch(closeModal())
//     return dispatch(push('/user/'))
// }





// export const onSubmitFailLogin = (errors, dispatch, submitError, props) => {
//     dispatch(failAuthentication(errors))
// }

// export const onSubmitRegister1 = (values, dispatch, props) => {
//     // return dispatch(register(values))
//     dispatch(startRegister())
//     return register(values)
// }



//     dispatch(failRegister(data))
//     const reg_errors = Object.values(data).map(
//         field_errors => field_errors.map(
//             field_error => field_error.join(' ')))
//     return {
//         [FORM_ERROR]: reg_errors]
// }



// export const onSubmitSuccessRegister = (result, dispatch, props) => {
//     dispatch(successRegister())
//     dispatch(closeModal())
//     alert('Успешно зарегистрировались!')
//     // dispatch(push('/profile'))
// }

// export const onSubmitFailRegister = (errors, dispatch, submitError, props) => {
//     dispatch(failRegister(errors))
// }