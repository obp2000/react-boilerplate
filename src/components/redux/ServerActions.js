import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { push } from 'connected-react-router'
import { objectToFormData } from 'object-to-formdata'
import { toast } from 'react-toastify'
import config, { api } from '../Config'
import { tokenHeaders } from './auth'
import { errorHandler } from './ErrorHandlers'
import { clearErrors } from './Errors'
import {
    startRequest,
    successRequest,
    requestSearchObjects,
    successSearchObjects,
    failedSearchObjects
} from './TempState'
// import { receiveCommonConsts } from './CommonConsts'
import { receiveErrors } from './Errors'
import { selectLocation } from './Router'

// export const getObjectsAction = createAsyncThunk(
//     'getObjects',
//     async config => await api.request(config))

// export const getObjectsAction = createAsyncThunk(
//         'getObjects',
//         async (index_url, { getState }) => {
//             const { data } = await api.get(
//                 index_url,
//                 { params: selectLocation(getState()).query }
//             )
//             return data
//         }
//     )


// export const getOptionsAction = createAsyncThunk(
//     'getOptions',
//     async config => await api.request({...config, method: 'options' }))

// export const getObjectAction = createAsyncThunk(
//     'getObject',
//     async config => await api.request(config))





export const getExistingObject = (actions, dispatch, getState) => () => {
    const {
        router: {
            location: {
                pathname
            }
        },
        auth: {
            accessToken,
        }
    } = getState()
    dispatch(startRequest())
    return axios.get(`${config.BACKEND}/api${pathname}`,
            tokenHeaders(accessToken)
        )
        .then(({
            data
        }) => {
            dispatch(successRequest())
            dispatch(actions.successReceiveObject(data))
            dispatch(clearErrors())
        })
        .catch(errorHandler(dispatch, actions.failedReceiveObject))
}

export const getObjectAction222 = actions => () => (dispatch, getState) => {
    const {
        router: {
            location: {
                pathname
            }
        },
        auth: {
            isAuthenticated
        }
    } = getState()
    if (isAuthenticated) {
        dispatch(actions.requestObject())
        if (pathname == `${actions.index_url}/new`) {
            getOptions(actions, dispatch, getState,
                null,
                actions.failedReceiveObject)
        } else {
            getOptions(actions, dispatch, getState,
                getExistingObject(actions, dispatch, getState),
                actions.failedReceiveObject)
        }
    }
}






const onSuccessCreateOrUpdateObject = (dispatch, actions, id, successfully) =>
    ({ data }) => {
        dispatch(successRequest())
        // dispatch(actions.successUpdateObject(data, id))
        dispatch(actions.successUpdateObject(data))
        dispatch(clearErrors())
        toast.success(successfully)
        return dispatch(push(actions.redirect_url))
    }

// export const onSubmitAction = (dispatch, actions, accessToken, flash) => values => {
export const onSubmitAction = actions => values => (dispatch, getState) => {
    const {
        // router: {
        //     location: {
        //         pathname
        //     }
        // },
        auth: {
            accessToken,
        },
        common_consts: {
            successfully
        }
    } = getState()
    if (accessToken) {
        if (actions.pre_submit_action) actions.pre_submit_action(values)
        const id = values.id
        dispatch(startRequest())
        return axios({
                url: `${actions.base_url}/${ id ? id + '/' : ''}`,
                // url: `${config.BACKEND}/api${pathname}/`,
                method: id ? 'PUT' : 'POST',
                ...tokenHeaders(accessToken, actions.to_form_data),
                data: actions.to_form_data ? objectToFormData(values) : values
            })
            .then(onSuccessCreateOrUpdateObject(dispatch, actions, id, successfully))
            .catch(errorHandler(dispatch))
    }
}

// export const deleteObjectAction = (dispatch, actions, accessToken, flash) => id => {
export const deleteObjectAction = actions => id => (dispatch, getState) => {
    const {
        auth: {
            accessToken,
        },
        common_consts: {
            successfully
        }
    } = getState()
    if (accessToken) {
        dispatch(startRequest())
        return axios.delete(`${actions.base_url}/${id}`,
                tokenHeaders(accessToken))
            .then(() => {
                dispatch(successRequest())
                dispatch(actions.successDeleteObject(id))
                dispatch(clearErrors())
                toast.success(successfully)
            })
            .catch(errorHandler(dispatch))
    }
}

export const searchObjectsAction = (dispatch, search_path, accessToken) => term => {
    if (accessToken && typeof(term) == 'string' && term.length > 1) {
        dispatch(requestSearchObjects())
        return axios.get(`${config.BACKEND}/api${search_path}/`, {
                params: {
                    term: decodeURIComponent(term),
                    page_size: 1000000
                },
                // ...tokenHeaders(accessToken)
            })
            .then(({
                data: {
                    results
                }
            }) => {
                dispatch(successSearchObjects(results))
                dispatch(clearErrors())
            })
            .catch(errorHandler(dispatch, failedSearchObjects))
    }
}


// const getObjects = (actions, dispatch, getState) => () => {
//     const {
//         auth: {
//             accessToken
//         },
//         router: {
//             location: {
//                 pathname,
//                 query: {
//                     term,
//                     page
//                 }
//             }
//         }
//     } = getState()
//     dispatch(startRequest())
//     // console.log('base_url get ', `${actions.base_url}/`)
//     // return axios.get(`${actions.base_url}/`)
//     return axios.get(`${actions.base_url}/`, {
//             params: {
//                 page,
//                 term: term ? decodeURIComponent(term) : null
//             },
//             // ...tokenHeaders(accessToken)
//         })
//         .then(({ data }) => {
//             // console.log('get data ', data)
//             dispatch(successRequest())
//             dispatch(actions.successReceiveObjects(data))
//             dispatch(clearErrors())
//         })
//         .catch(errorHandler(dispatch, actions.failedReceiveObjects))
// }

export const getOptions = (actions, dispatch, getState, getData, failed, method = 'POST') => {
    // console.log('getOptions.............')
    const {
        auth: {
            isAuthenticated,
            accessToken
        }
    } = getState()
    dispatch(startRequest())
    // console.log('base_url ', `${actions.base_url}/`)
    axios.options(`${actions.base_url}/`, {
            params: {
                isAuthenticated
            },
            ...(isAuthenticated ? tokenHeaders(accessToken) : {})
        })
        .then(({
            data: {
                actions: {
                    [method]: {
                        common_consts,
                        ...options
                    }
                }
            }
        }) => {
            // console.log('common_consts ', common_consts)
            dispatch(successRequest())
            // dispatch(receiveCommonConsts({ ...common_consts, options }))
            dispatch(clearErrors())
            // console.log('getData ', getData)
            if (getData) getData()
        })
        // .then(({
        //     data
        // }) => {
        //     // const { actions } = data
        //     console.log('actions ', data.actions)
        //     dispatch(successRequest())
        //     // dispatch(receiveCommonConsts({ ...common_consts, options }))
        //     dispatch(clearErrors())
        //     if (getData) getData()
        // })
        .catch(errorHandler(dispatch, failed))
}

// export const getObjectsAction33 = actions =>
//     createAsyncThunk('getObjects',
//         (_, { dispatch, getState }) => {
//             dispatch(actions.requestObjects())
//             getOptions(actions, dispatch, getState,
//                 getObjects(actions, dispatch, getState), actions.failedReceiveObjects)
//         }
//     )


// export const getObjectsAction22 = actions => () => (dispatch, getState) => {
//     dispatch(actions.requestObjects())
//     getOptions(actions, dispatch, getState,
//         getObjects(actions, dispatch, getState), actions.failedReceiveObjects)
// }


// export const clearSearchObjectsAction = dispatch => () => {
//     dispatch(clearSearchObjects())
// }

// const getObjectsWihOptions = (actions, page, dispatch, accessToken, isAuthenticated, term) => {
//     dispatch(startRequest())
//     return axios.options(`${actions.base_url}/`, {
//             params: {
//                 isAuthenticated
//             },
//             // ...tokenHeaders(accessToken)
//         })
//         .then(({
//             data: {
//                 actions: {
//                     POST
//                 },
//                 // name: object_name
//             }
//         }) => getObjects(dispatch, actions, accessToken, page, term, POST))
//         .catch(errorHandler(dispatch, actions.failedReceiveObjects))
// }

// export const getObjectsAction1 = actions => page => (dispatch, getState) => {
//     const {
//         auth: {
//             accessToken,
//             isAuthenticated
//         },
//         router: {
//             location: {
//                 query: {
//                     term = ''
//                 }
//             }
//         }
//     } = getState()
//     dispatch(actions.requestObjects())
//     return getObjectsWihOptions(dispatch, actions, accessToken, isAuthenticated, page, term)
// }

// export const getObjectsAction111 = actions => page => (dispatch, getState) => {
//     const {
//         auth: {
//             accessToken
//         },
//         router: {
//             location: {
//                 query: {
//                     term = ''
//                 }
//             }
//         }
//     } = getState()
//     dispatch(actions.requestObjects())
//     dispatch(startRequest())
//     return axios.get(`${actions.base_url}/`, {
//             params: {
//                 page,
//                 term: decodeURIComponent(term)
//             },
//             ...tokenHeaders(accessToken)
//         })
//         .then(({ data }) => {
//             dispatch(successRequest())
//             dispatch(actions.successReceiveObjects(data))
//             dispatch(clearErrors())
//         })
//         .catch(errorHandler(dispatch, actions.failedReceiveObjects))
// }

// const options = (choices_names = [], method_options) => choices_names.reduce(
//     (choices, names) => {
//         choices[names[0]] = method_options[names[1]].choices
//         return choices
//     }, {})

// const getExistingObjectWihOptions = (dispatch, actions, id, accessToken, isAuthenticated) => {
//     dispatch(startRequest())
//     return axios.options(`${actions.base_url}/${id}`, {
//             params: {
//                 isAuthenticated
//             },
//             // ...tokenHeaders(accessToken)
//         }, )
//         .then(({
//             data: {
//                 actions: {
//                     PUT
//                 }
//                 // name: object_name
//             }
//         }) => getExistingObject(dispatch, actions, id, accessToken, PUT))
//         .catch(errorHandler(dispatch, actions.failedReceiveObject))
// }

// const getNewObjectOptions = (dispatch, actions, accessToken, isAuthenticated) => {
//     dispatch(startRequest())
//     return axios.options(`${actions.base_url}/`, {
//             params: {
//                 isAuthenticated
//             },
//             // ...tokenHeaders(accessToken)
//         }, )
//         .then(({
//             data: {
//                 actions: {
//                     POST: {
//                         common_consts,
//                         ...options
//                     }
//                 }
//             }
//         }) => {
//             dispatch(successRequest())
//             dispatch(receiveCommonConsts(common_consts))
//             dispatch(actions.successReceiveObject({
//                 ...actions.initObject,
//                 options
//             }))
//             dispatch(clearErrors())
//         })
//         .catch(errorHandler(dispatch, actions.failedReceiveObject))
// }