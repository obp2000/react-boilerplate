// import { createAction, createReducer } from 'redux-act'
import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { createSelector } from 'reselect'
import { push } from 'connected-react-router'
import { toast } from 'react-toastify'
import config from '../Config'
import { errorHandler, formErrorHandler } from './ErrorHandlers'
import { receiveErrors, clearErrors } from './Errors'
import { startRequest, successRequest } from './TempState'
// import { receiveCommonConsts } from './CommonConsts'
import {
    getOptions as getObjectOptions,
    getExistingObject
} from './ServerActions'
import {
    selectOptions as selectUserOptions,
    selectCommonConsts
} from './CommonConsts'

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
    options: {},
    login: true,
    modal: false,
    // errors: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        successAuthentication: (state, { payload }) => {
            state.isAuthenticated = true
            state.accessToken = payload
        },
        requestUser: state => {
            state.object = initUser
        },
        successReceiveUser: (state, { payload }) => {
            state.object = payload
        },
        failedReceiveUser: state => {
            // console.log('action ', action)
            state.object = initUser
        },
        toggleModal: state => {
            state.modal = !state.modal
        },
        closeModal: state => {
            state.modal = false
        },
        toggleLogin: state => {
            state.login = !state.login
        },
        requestOptions: state => {
            state.options = {}
        },
        successReceiveOptions: (state, { payload }) => {
            state.options = payload
        },
        failedReceiveOptions: state => {
            state.options = {}
        },
        reset: () => initialState
    }
})

export const {
    successAuthentication,
    requestUser,
    successReceiveUser,
    failedReceiveUser,
    toggleModal,
    closeModal,
    toggleLogin,
    requestOptions,
    successReceiveOptions,
    failedReceiveOptions,
    reset
} = authSlice.actions

export default authSlice.reducer

// Server requests:

const base_url = `${config.BACKEND}/api`

export const tokenHeaders = (accessToken, to_form_data) => ({
    headers: {
        'Content-Type': to_form_data ?
            'multipart/form-data' : 'application/json',
        'Authorization': `Token ${accessToken}`
    }
})

export const getOptions = login => () => dispatch => {
    dispatch(requestOptions())
    // dispatch(startRequest())
    return axios.options(`${base_url}/${login ? 'login' : 'register'}/`)
        .then(({
            data: {
                actions: {
                    POST
                }
            }
        }) => {
            // dispatch(successRequest())
            dispatch(successReceiveOptions(POST))
            dispatch(clearErrors())
        })
        .catch(errorHandler(dispatch, failedReceiveOptions))
}

export const onSubmitLogin = values => (dispatch, getState) => {
    const {
        common_consts: {
            successfully
        }
    } = getState()
    dispatch(reset())
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
            toast.success(successfully)
            return dispatch(push('/user/'))
        })
        .catch(formErrorHandler(dispatch, reset))
}

export const onSubmitRegister = values => (dispatch, getState) => {
    const {
        common_consts: {
            successfully
        }
    } = getState()
    dispatch(reset())
    dispatch(startRequest())
    return axios.post(`${base_url}/register/`, values)
        .then(() => {
            dispatch(successRequest())
            dispatch(reset())
            dispatch(clearErrors())
            dispatch(closeModal())
            toast.success(successfully)
        })
        .catch(formErrorHandler(dispatch, reset))
}

export const signOut = (dispatch, accessToken) => () => {
    dispatch(startRequest())
    return axios.post(`${base_url}/logout/`,
            tokenHeaders(accessToken))
        .then(({
            data: {
                detail
            }
        }) => {
            dispatch(successRequest())
            dispatch(reset())
            toast.success(detail)
            return dispatch(push('/'))
        })
        .catch(errorHandler(dispatch, receiveErrors))
}

export const getObjectAction = () => (dispatch, getState) => {
    const {
        auth: {
            isAuthenticated
        }
    } = getState()
    const actions = {
        base_url: `${base_url}/user`,
        successReceiveObject: successReceiveUser,
        failedReceiveObject: failedReceiveUser
    }
    if (isAuthenticated) {
        dispatch(requestUser())
        getObjectOptions(actions,
            dispatch,
            getState,
            getExistingObject(actions, dispatch, getState),
            failedReceiveUser,
            'PUT')
    }
}

export const selectAuth = ({
    auth
}) => auth

export const selectAuthButtonLabel =
    createSelector([selectAuth, selectCommonConsts], ({
        isAuthenticated,
        accessToken,
        object: {
            username = ''
        } = {}
    }, {
        auth_menu_item: {
            label
        } = {}
    }) => isAuthenticated ? `${label} (${username || ''})` : label)

export const selectOnClickAuthButton = dispatch =>
    createSelector([selectAuth], ({
            isAuthenticated,
            accessToken
        }) => isAuthenticated ?
        signOut(dispatch, accessToken) :
        () => dispatch(toggleModal())
    )

export const selectModalHeader =
    createSelector([selectAuth, selectCommonConsts], ({
        login = false
    }, {
        login: login_text,
        register: register_text
    }) => login ? login_text : register_text)

export const selectModalButtonlabel =
    createSelector([selectAuth, selectCommonConsts], ({
        login = false
    }, {
        login: login_text,
        register: register_text
    }) => login ? register_text : login_text)

export const selectOptions =
    createSelector([selectAuth], ({
        options
    }) => options)

export const selectObject =
    createSelector([selectAuth], ({
        object
    }) => object)

export const selectUserFields =
    createSelector([selectObject, selectUserOptions], (object = {}, options) => ['username', 'email', 'first_name', 'last_name'].reduce(
        (fields, field_name) => {
            fields.push({
                label: options[field_name] && options[field_name].label,
                value: object[field_name]
            })
            return fields
        }, []))


export const authButtonLabel = ({
    isAuthenticated,
    accessToken,
    object
}, {
    auth_menu_item
} = {}) => isAuthenticated ? `${auth_menu_item?.label} (${object?.username || ''})` : label


// const reducer_actions = {}

// const startAuthentication = createAction('startAuthentication')
// const successAuthentication = createAction('successAuthentication')
// const failedAuthentication = createAction('failedAuthentication')
// const startRegister = createAction('startRegister')
// const successRegister = createAction('successRegister')
// const failedRegister = createAction('failedRegister')
// const startSignout = createAction('startSignout')
// const successSignout = createAction('successSignout')
// const failedSignout = createAction('failedSignout')
// const requestUser = createAction('requestUser')
// const successReceiveUser = createAction('successReceiveUser')
// const failedReceiveUser = createAction('failedReceiveUser')
// export const toggleModal = createAction('toggleModal')
// export const closeModal = createAction('closeModal')
// export const toggleLogin = createAction('toggleLogin')
// const requestOptions = createAction('requestOptions')
// const successReceiveOptions = createAction('successReceiveOptions')
// const failedReceiveOptions = createAction('failedReceiveOptions')

// reducer_actions[startAuthentication] = state =>
//     ({
//         ...state,
//         ...initialState,
//     })

// reducer_actions[successAuthentication] = (state, accessToken) =>
//     ({
//         ...state,
//         isAuthenticated: true,
//         accessToken,
//         errors: null
//     })

// reducer_actions[failedAuthentication] = (state, errors) =>
//     ({
//         ...state,
//         ...initialState,
//         errors
//     })

// reducer_actions[startRegister] = state =>
//     ({
//         ...state,
//         ...initialState,
//     })

// reducer_actions[successRegister] = state =>
//     ({
//         ...state,
//         errors: null
//     })

// reducer_actions[failedRegister] = (state, errors) =>
//     ({
//         ...state,
//         ...initialState,
//         errors
//     })

// reducer_actions[startSignout] = state =>
//     ({
//         ...state,
//         errors: null
//     })

// reducer_actions[successSignout] = state =>
//     ({
//         ...state,
//         ...initialState
//         // isAuthenticated: false,
//     })

// reducer_actions[failedSignout] = (state, errors) =>
//     ({
//         ...state,
//         errors
//     })

// reducer_actions[requestUser] = state =>
//     ({
//         ...state,
//         object: initUser,
//         errors: null
//     })

// reducer_actions[successReceiveUser] = (state, object) =>
//     ({
//         ...state,
//         object,
//         errors: null
//     })

// reducer_actions[failedReceiveUser] = (state, errors) =>
//     ({
//         ...state,
//         object: initUser,
//         errors
//     })

// reducer_actions[toggleModal] = state =>
//     ({
//         ...state,
//         modal: !state.modal
//     })

// reducer_actions[closeModal] = state =>
//     ({
//         ...state,
//         modal: false
//     })

// reducer_actions[toggleLogin] = state =>
//     ({
//         ...state,
//         login: !state.login
//     })

// reducer_actions[requestOptions] = state =>
//     ({
//         ...state,
//         options: {},
//         errors: null
//     })

// reducer_actions[successReceiveOptions] = (state, options) =>
//     ({
//         ...state,
//         options,
//         errors: null
//     })

// reducer_actions[failedReceiveOptions] = (state, errors) =>
//     ({
//         ...state,
//         options: {},
//         errors
//     })


// const auth = createReducer(reducer_actions, initialState)

// export default auth





// export const selectAllFields = ({
//     auth: {
//         object
//     },
//     common_consts: {
//         options = {},
//     }
// }) => ['username', 'email', 'first_name', 'last_name'].reduce(
//     (fields, field_name) => {
//         fields.push({
//             label: options[field_name] && options[field_name].label,
//             value: object[field_name]
//         })
//         return fields
//     }, [])

// const getExistingObject1 = (actions, dispatch, getState) => () => {
//     const {
//         auth: {
//             accessToken,
//         }
//     } = getState()
//     dispatch(startRequest())
//     return axios.get(`${actions.base_url}/`,
//             tokenHeaders(accessToken)
//         )
//         .then(({
//             data
//         }) => {
//             dispatch(successRequest())
//             dispatch(actions.successReceiveObject(data))
//             dispatch(clearErrors())
//         })
//         .catch(errorHandler(dispatch, actons.failedReceiveObject))
// }

// const getExistingObjectWihOptions = (dispatch, accessToken, isAuthenticated) => {
//     dispatch(startRequest())
//     return axios.options(`${base_url}/user/`, {
//             params: {
//                 isAuthenticated
//             },
//             ...tokenHeaders(accessToken)
//         }, )
//         .then(({
//             data: {
//                 actions: {
//                     PUT
//                 },
//                 // name: object_name
//             }
//         }) => getExistingObject(dispatch, accessToken, PUT))
//         .catch(errorHandler(dispatch, failedReceiveUser))
// }

// export const getObjectAction = () => (dispatch, getState) => {
//     const {
//         auth: {
//             accessToken,
//             isAuthenticated
//         }
//     } = getState()
//     if (accessToken) {
//         dispatch(requestUser())
//         return getExistingObjectWihOptions(dispatch, accessToken, isAuthenticated)
//     }
// }


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