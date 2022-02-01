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

export const getObjectsAction = actions => page => (dispatch, getState) => {
    const {
        auth: {
            accessToken
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
    dispatch(startRequest())
    return axios.get(`${actions.base_url}/`, {
            params: {
                page,
                term: decodeURIComponent(term)
            },
            ...tokenHeaders(accessToken)
        })
        .then(({ data }) => {
            dispatch(successRequest())
            dispatch(actions.successReceiveObjects(data))
            dispatch(clearErrors())
        })
        .catch(errorHandler(dispatch, actions.failedReceiveObjects))
}

const options = (choices_names = [], method_options) => choices_names.reduce(
    (choices, names) => {
        choices[names[0]] = method_options[names[1]].choices
        return choices
    }, {})

const getNewObjectOptions = (dispatch, actions, accessToken) => {
    dispatch(startRequest())
    return axios.options(`${actions.base_url}/`, tokenHeaders(accessToken))
        .then(({
            data: {
                actions: {
                    POST
                }
            }
        }) => {
            dispatch(successRequest())
            return dispatch(actions.successReceiveObject({
                ...actions.initObject,
                ...options(actions.choices_names, POST),
            }))
        })
        .catch(errorHandler(dispatch, actions.failedReceiveObject))
}

const getExistingObject = (dispatch, actions, id, accessToken, method_options) => {
    dispatch(startRequest())
    return axios.get(`${actions.base_url}/${id}`,
            tokenHeaders(accessToken)
        )
        .then(({
            data
        }) => {
            dispatch(successRequest())
            dispatch(actions.successReceiveObject({
                ...data,
                ...options(actions.choices_names, method_options)
            }))
            dispatch(clearErrors())
        })
        .catch(errorHandler(dispatch, actions.failedReceiveObject))
}

const getExistingObjectWihOptions = (dispatch, actions, id, accessToken) => {
    dispatch(startRequest())
    return axios.options(`${actions.base_url}/${id}`,
            tokenHeaders(accessToken)
        )
        .then(({
                data: {
                    actions: {
                        PUT
                    }
                }
            }) => {
                // dispatch(successRequest())
                return getExistingObject(dispatch, actions, id, accessToken, PUT)
            }

        )
        .catch(errorHandler(dispatch, actions.failedReceiveObject))
}

export const getObjectAction = actions => id => (dispatch, getState) => {
    const {
        auth: {
            accessToken
        }
    } = getState()
    if (accessToken) {
        dispatch(actions.requestObject())
        if (id == 'new') {
            if (actions.choices_names) {
                return getNewObjectOptions(dispatch, actions, accessToken)
            } else {
                return dispatch(actions.successReceiveObject(actions.initObject))
            }
        } else {
            if (actions.choices_names) {
                return getExistingObjectWihOptions(dispatch, actions, id, accessToken)
            } else {
                return getExistingObject(dispatch, actions, id, accessToken)
            }
        }
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