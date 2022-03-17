import { createAction, createReducer } from 'redux-act'
import axios from 'axios'
import { push } from 'connected-react-router'
import config from '../Config'
// import { closeModal } from './NavBar'
import { errorHandler, formErrorHandler } from './ErrorHandlers'
import { clearErrors } from './Errors'
import { startRequest, successRequest } from './TempState'
import { receiveCommonConsts } from './CommonConsts'

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
const requestOptions = createAction('requestOptions')
const successReceiveOptions = createAction('successReceiveOptions')
const failedReceiveOptions = createAction('failedReceiveOptions')

export const tokenHeaders = (accessToken, to_form_data) => {
    return {
        headers: {
            'Content-Type': to_form_data ?
                'multipart/form-data' : 'application/json',
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
    errors: null
}

reducer_actions[startAuthentication] = state =>
    ({
        ...state,
        ...initialState,
    })

reducer_actions[successAuthentication] = (state, accessToken) =>
    ({
        ...state,
        isAuthenticated: true,
        accessToken,
        errors: null
    })

reducer_actions[failedAuthentication] = (state, errors) =>
    ({
        ...state,
        ...initialState,
        errors
    })

reducer_actions[startRegister] = state =>
    ({
        ...state,
        ...initialState,
    })

reducer_actions[successRegister] = state =>
    ({
        ...state,
        errors: null
    })

reducer_actions[failedRegister] = (state, errors) =>
    ({
        ...state,
        ...initialState,
        errors
    })

reducer_actions[startSignout] = state =>
    ({
        ...state,
        errors: null
    })

reducer_actions[successSignout] = state =>
    ({
        ...state,
        ...initialState
        // isAuthenticated: false,
    })

reducer_actions[failedSignout] = (state, errors) =>
    ({
        ...state,
        errors
    })

reducer_actions[requestUser] = state =>
    ({
        ...state,
        object: initUser,
        errors: null
    })

reducer_actions[successReceiveUser] = (state, object) =>
    ({
        ...state,
        object,
        errors: null
    })

reducer_actions[failedReceiveUser] = (state, errors) =>
    ({
        ...state,
        object: initUser,
        errors
    })

reducer_actions[toggleModal] = state =>
    ({
        ...state,
        modal: !state.modal
    })

reducer_actions[closeModal] = state =>
    ({
        ...state,
        modal: false
    })

reducer_actions[toggleLogin] = state =>
    ({
        ...state,
        login: !state.login
    })

reducer_actions[requestOptions] = state =>
    ({
        ...state,
        options: {},
        errors: null
    })

reducer_actions[successReceiveOptions] = (state, options) =>
    ({
        ...state,
        options,
        errors: null
    })

reducer_actions[failedReceiveOptions] = (state, errors) =>
    ({
        ...state,
        options: {},
        errors
    })


const auth = createReducer(reducer_actions, initialState)

export default auth

// Server requests:

const base_url = `${config.BACKEND}/api`

export const getOptions = login => () => dispatch => {
    dispatch(requestOptions())
    dispatch(startRequest())
    return axios.options(`${base_url}/${login ? 'login' : 'register'}/`)
        .then(({
            data: {
                actions: {
                    POST
                },
                // name: object_name
            }
        }) => {
            dispatch(successRequest())
            dispatch(successReceiveOptions(POST))
            dispatch(clearErrors())
        })
        .catch(errorHandler(dispatch, failedReceiveOptions))
}


export const onSubmitLogin = dispatch => values => {
    dispatch(startAuthentication())
    dispatch(startRequest())
    return axios.post(`${base_url}/login/`, values)
        .then(({
            data: {
                key
            }
        }) => {
            dispatch(successRequest())
            dispatch(successAuthentication(key))
            dispatch(clearErrors())
            dispatch(closeModal())
            return dispatch(push('/user/'))
        })
        .catch(formErrorHandler(dispatch, failedAuthentication))
}

export const onSubmitRegister = dispatch => values => {
    dispatch(startRegister())
    dispatch(startRequest())
    return axios.post(`${base_url}/register/`, values)
        .then(() => {
            dispatch(successRequest())
            dispatch(successRegister())
            dispatch(clearErrors())
            dispatch(closeModal())
            alert('Успешно зарегистрировались!')
        })
        .catch(formErrorHandler(dispatch, failedRegister))
}

export const signOut = (dispatch, accessToken) => () => {
    dispatch(startSignout())
    dispatch(startRequest())
    return axios.post(`${base_url}/logout/`,
            tokenHeaders(accessToken))
        .then(({
            data: {
                detail
            }
        }) => {
            dispatch(successRequest())
            dispatch(successSignout())
            alert(detail)
            return dispatch(push('/'))
        })
        .catch(errorHandler(dispatch, failedSignout))
}

const getExistingObject = (dispatch, accessToken, { common_consts, ...options }) => {
    // dispatch(startRequest())
    return axios.get(`${base_url}/user/`,
            tokenHeaders(accessToken)
        )
        .then(({
            data
        }) => {
            dispatch(successRequest())
            dispatch(receiveCommonConsts(common_consts))
            dispatch(successReceiveUser({
                ...data,
                options
            }))
            dispatch(clearErrors())
        })
        .catch(errorHandler(dispatch, failedReceiveUser))
}

const getExistingObjectWihOptions = (dispatch, accessToken, isAuthenticated) => {
    dispatch(startRequest())
    return axios.options(`${base_url}/user/`, {
                params: {
                    isAuthenticated
                },
                ...tokenHeaders(accessToken)
            },
        )
        .then(({
            data: {
                actions: {
                    PUT
                },
                // name: object_name
            }
        }) => getExistingObject(dispatch, accessToken, PUT))
        .catch(errorHandler(dispatch, failedReceiveUser))
}

export const getObjectAction = () => (dispatch, getState) => {
    const {
        auth: {
            accessToken,
            isAuthenticated
        }
    } = getState()
    if (accessToken) {
        dispatch(requestUser())
        return getExistingObjectWihOptions(dispatch, accessToken, isAuthenticated)
    }
}



// export const getObjectAction11 = actions => id => (dispatch, getState) => {
//     const {
//         auth: {
//             accessToken
//         }
//     } = getState()
//     if (accessToken) {
//         dispatch(actions.requestObject())
//         if (id == 'new') getNewObjectOptions(dispatch, actions, accessToken)
//         else getExistingObjectWihOptions(dispatch, actions, id, accessToken)
//     }
// }