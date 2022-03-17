import axios from 'axios'
import { push } from 'connected-react-router'
import { objectToFormData } from 'object-to-formdata'
import config from '../Config'
import { tokenHeaders } from './auth'
import { errorHandler } from './ErrorHandlers'
import { clearErrors } from './Errors'
import {
    startRequest,
    successRequest,
    requestSearchObjects,
    successSearchObjects,
    failedSearchObjects,
    clearSearchObjects
} from './TempState'
import { receiveCommonConsts } from './CommonConsts'

const getObjects = (dispatch, actions, accessToken, page, term, { common_consts, ...options }) => {
    return axios.get(`${actions.base_url}/`, {
            params: {
                page,
                term: decodeURIComponent(term)
            },
            // ...tokenHeaders(accessToken)
        })
        .then(({ data }) => {
            dispatch(successRequest())
            dispatch(receiveCommonConsts(common_consts))
            dispatch(actions.successReceiveObjects({
                ...data,
                options
            }))
            dispatch(clearErrors())
        })
        .catch(errorHandler(dispatch, actions.failedReceiveObjects))
}

const getObjectsWihOptions = (dispatch, actions, accessToken, isAuthenticated, page, term) => {
    dispatch(startRequest())
    return axios.options(`${actions.base_url}/`, {
                params: {
                    isAuthenticated
                },
            // ...tokenHeaders(accessToken)
            },
        )
        .then(({
            data: {
                actions: {
                    POST
                },
                // name: object_name
            }
        }) => getObjects(dispatch, actions, accessToken, page, term, POST))
        .catch(errorHandler(dispatch, actions.failedReceiveObjects))
}

export const getObjectsAction = actions => page => (dispatch, getState) => {
    const {
        auth: {
            accessToken,
            isAuthenticated
        },
        router: {
            location: {
                query: {
                    term = ''
                }
            }
        }
    } = getState()
    dispatch(actions.requestObjects())
    return getObjectsWihOptions(dispatch, actions, accessToken, isAuthenticated, page, term)
}

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

const getNewObjectOptions = (dispatch, actions, accessToken, isAuthenticated) => {
    dispatch(startRequest())
    return axios.options(`${actions.base_url}/`, {
                params: {
                    isAuthenticated
                },
                // ...tokenHeaders(accessToken)
            },
        )
        .then(({
            data: {
                actions: {
                    POST: {
                        common_consts,
                        ...options
                    }
                },
                // name: object_name
            }
        }) => {
            dispatch(successRequest())
            dispatch(receiveCommonConsts(common_consts))
            dispatch(actions.successReceiveObject({
                ...actions.initObject,
                // ...options(actions.choices_names, {...POST, object_name}),
                options
            }))
            dispatch(clearErrors())
        })
        .catch(errorHandler(dispatch, actions.failedReceiveObject))
}

const getExistingObject = (dispatch, actions, id, accessToken, { common_consts, ...options }) => {
    // dispatch(startRequest())
    return axios.get(`${actions.base_url}/${id}`,
            tokenHeaders(accessToken)
        )
        .then(({
            data
        }) => {
            dispatch(successRequest())
            dispatch(receiveCommonConsts(common_consts))
            dispatch(actions.successReceiveObject({
                ...data,
                // ...options(actions.choices_names, method_options),
                options
            }))
            dispatch(clearErrors())
        })
        .catch(errorHandler(dispatch, actions.failedReceiveObject))
}

const getExistingObjectWihOptions = (dispatch, actions, id, accessToken, isAuthenticated) => {
    dispatch(startRequest())
    return axios.options(`${actions.base_url}/${id}`, {
                params: {
                    isAuthenticated
                },
                // ...tokenHeaders(accessToken)
            },
        )
        .then(({
            data: {
                actions: {
                    PUT
                }
                // name: object_name
            }
        }) => getExistingObject(dispatch, actions, id, accessToken, PUT))
        .catch(errorHandler(dispatch, actions.failedReceiveObject))
}

export const getObjectAction = actions => id => (dispatch, getState) => {
    const {
        auth: {
            accessToken,
            isAuthenticated
        }
    } = getState()
    if (accessToken) {
        dispatch(actions.requestObject())
        if (id == 'new') getNewObjectOptions(dispatch, actions, accessToken, isAuthenticated)
        else getExistingObjectWihOptions(dispatch, actions, id, accessToken, isAuthenticated)
    }
}

const onSuccessCreateOrUpdateObject = (dispatch, actions, id) => ({ data }) => {
    dispatch(successRequest())
    dispatch(actions.successUpdateObject(data, id))
    dispatch(clearErrors())
    return dispatch(push(actions.redirect_url))
}

export const onSubmitAction = (dispatch, actions, accessToken) => values => {
    // console.log('accessToken: ', accessToken)
    if (accessToken) {
        if (actions.pre_submit_action) { actions.pre_submit_action(values) }
        const id = values.id
        dispatch(startRequest())
        return axios({
                url: `${actions.base_url}/${ id ? id + '/' : ''}`,
                method: id ? 'PUT' : 'POST',
                ...tokenHeaders(accessToken, actions.to_form_data),
                data: actions.to_form_data ? objectToFormData(values) : values
            })
            .then(onSuccessCreateOrUpdateObject(dispatch, actions, id))
            .catch(errorHandler(dispatch))
    }
}

export const deleteObjectAction = (dispatch, actions, accessToken) => id => {
    if (accessToken) {
        dispatch(startRequest())
        return axios.delete(`${actions.base_url}/${id}`,
                tokenHeaders(accessToken))
            .then(() => {
                dispatch(successRequest())
                dispatch(actions.successDeleteObject(id))
                dispatch(clearErrors())
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

export const clearSearchObjectsAction = (dispatch, actions) => () => {
    dispatch(clearSearchObjects())
}