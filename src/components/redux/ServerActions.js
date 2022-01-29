import axios from 'axios'
import { push } from 'connected-react-router'
import { objectToFormData } from 'object-to-formdata'
import { tokenHeaders } from './auth'
import { errorHandler } from './ErrorHandlers'
import { clearErrors } from './Errors'

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
    return axios.get(`${actions.base_url}/`, {
            params: {
                page,
                term: decodeURIComponent(term)
            },
            ...tokenHeaders(accessToken)
        })
        .then(({ data }) => {
            dispatch(actions.successReceiveObjects(data))
            dispatch(clearErrors())
        })
        .catch(errorHandler(dispatch, actions.failedReceiveObjects))
}

export const getObjectAction = actions => id => (dispatch, getState) => {
    const {
        auth: {
            accessToken
        }
    } = getState()
    if (accessToken) {
        if (id == 'new') {
            return dispatch(actions.setNewObject())
        } else {
            dispatch(actions.requestObject())
            return axios.get(`${actions.base_url}/${id}`,
                    tokenHeaders(accessToken)
                )
                .then(({ data }) => {
                    dispatch(actions.successReceiveObject(data))
                    dispatch(clearErrors())
                })
                .catch(errorHandler(dispatch, actions.failedReceiveObject))
        }
    }
}

const onSuccessCreateOrUpdateObject = (dispatch, actions, id) => ({ data }) => {
    dispatch(actions.successUpdateObject(data, id))
    dispatch(clearErrors())
    return dispatch(push(actions.redirect_url))
}

export const onSubmitAction = (dispatch, actions, accessToken) => values => {
    // console.log('accessToken: ', accessToken)
    if (accessToken) {
        if (actions.pre_submit_action) { actions.pre_submit_action(values) }
        const id = values.id
        dispatch(actions.requestUpdateObject())
        return axios({
                url: `${actions.base_url}/${ id ? id + '/' : ''}`,
                method: id ? 'PUT' : 'POST',
                ...tokenHeaders(accessToken),
                data: actions.to_form_data ? objectToFormData(values) : values
            })
            .then(onSuccessCreateOrUpdateObject(dispatch, actions, id))
            .catch(errorHandler(dispatch, actions.failedUpdateObject))
    }
}

export const deleteObjectAction = (dispatch, actions, accessToken) => id => {
    if (accessToken) {
        dispatch(actions.requestDeleteObject())
        return axios.delete(`${actions.base_url}/${id}`,
                tokenHeaders(accessToken))
            .then(() => {
                dispatch(actions.successDeleteObject(id))
                dispatch(clearErrors())
            })
            .catch(errorHandler(dispatch, actions.failedDeleteObject))
    }
}

export const searchObjectsAction = (dispatch, actions, accessToken) => term => {
    if (accessToken && typeof(term) == 'string' && term.length > 1) {
        dispatch(actions.requestSearchObjects())
        return axios.get(`${actions.base_url}/`, {
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
                dispatch(actions.successSearchObjects(results))
                dispatch(clearErrors())
            })
            .catch(errorHandler(dispatch, actions.failedSearchObjects))
    }
}

export const clearSearchObjectsAction = (dispatch, actions) => () => {
    dispatch(actions.clearSearchObjects())
}