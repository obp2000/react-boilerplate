import { createAction, createReducer } from 'redux-act'
import axios from 'axios'
import { push } from 'connected-react-router'
import { objectToFormData } from 'object-to-formdata'
import config from '../Config'
import { tokenHeaders } from './auth'
import { errorHandler } from './ErrorHandlers'
// import { FORM_ERROR } from 'final-form'

export class CommonActions {

    constructor({
        index_url,
        redirect_url,
        initObject = {},
        // initialState,
        to_form_data,
        pre_submit_action
    }) {
        this.base_url = `${config.BACKEND}/api${index_url}`
        this.redirect_url = redirect_url
        this.initObject = initObject
        // this.FORM_ERROR = FORM_ERROR
        // this.initialState = initialState
        this.to_form_data = to_form_data
        this.pre_submit_action = pre_submit_action
        // this.formErrorHandler = formErrorHandler

        this.init_objects_info = {
            results: [],
            totalCount: 0,
            page: null,
            totalPages: 0,
            term: null
        }

        this.initialState = {
            ...this.init_objects_info,
            object: this.initObject,
            search_results: [],
            isFetching: false,
            loaded: false,
            errors: null,
        }

        this.reducer_actions = {}
        this.exclude_from_results = (results, id) =>
            results.filter(result => (result.id != id))

        this.requestObjects = createAction('requestObjects')
        this.successReceiveObjects = createAction('successReceiveObjects')
        this.failedReceiveObjects = createAction('failedReceiveObjects')

        this.requestObject = createAction('requestObject')
        this.successReceiveObject = createAction('successReceiveObject')
        this.failedReceiveObject = createAction('failedReceiveObject')

        this.requestUpdateObject = createAction('requestUpdateObject')
        this.successUpdateObject = createAction('successUpdateObject')
        this.failedUpdateObject = createAction('failedUpdateObject')

        this.requestDeleteObject = createAction('requestDeleteObject')
        this.successDeleteObject = createAction('successDeleteObject')
        this.failedDeleteObject = createAction('failedDeleteObject')

        this.requestSearchObjects = createAction('requestSearchObjects')
        this.successSearchObjects = createAction('successSearchObjects')
        this.failedSearchObjects = createAction('failedSearchObjects')

        this.reducer_actions[this.requestObjects] = (state) => ({
            ...state,
            ...this.init_objects_info,
            isFetching: true,
            loaded: false,
            errors: null
        })

        this.reducer_actions[this.successReceiveObjects] = (state, objects_info) =>
            ({
                ...state,
                ...objects_info,
                isFetching: false,
                loaded: true,
                errors: null
            })

        this.reducer_actions[this.failedReceiveObjects] = (state, errors) =>
            ({
                ...state,
                ...this.init_objects_info,
                isFetching: false,
                loaded: false,
                errors
            })

        this.reducer_actions[this.requestObject] = (state) =>
            ({
                ...state,
                object: this.initObject,
                isFetching: true,
                loaded: false,
                errors: null
            })

        this.reducer_actions[this.successReceiveObject] = (state, object) =>
            ({
                ...state,
                object,
                isFetching: false,
                loaded: true,
                errors: null
            })

        this.reducer_actions[this.failedReceiveObject] = (state, errors) =>
            ({
                ...state,
                object: this.initObject,
                isFetching: false,
                loaded: false,
                errors,
            })

        this.reducer_actions[this.requestUpdateObject] = (state) =>
            ({
                ...state,
                isFetching: true,
                loaded: false,
                errors: null
            })

        this.reducer_actions[this.successUpdateObject] = (state, object, id) =>
            ({
                ...state,
                object,
                results: [
                    ...this.exclude_from_results(state.results, object.id),
                    object
                ],
                totalCount: state.totalCount + (id ? 0 : 1),
                isFetching: false,
                loaded: true,
                errors: null
            })

        this.reducer_actions[this.failedUpdateObject] = (state, errors) =>
            ({
                ...state,
                isFetching: false,
                loaded: false,
                errors
            })

        this.reducer_actions[this.requestDeleteObject] = (state) =>
            ({
                ...state,
                isFetching: true,
                loaded: false,
                errors: null
            })

        this.reducer_actions[this.successDeleteObject] = (state, id) =>
            ({
                ...state,
                results: this.exclude_from_results(state.results, id),
                totalCount: state.totalCount - 1,
                isFetching: false,
                loaded: true,
                errors: null
            })

        this.reducer_actions[this.failedDeleteObject] = (state, errors) =>
            ({
                ...state,
                isFetching: false,
                loaded: false,
                errors
            })

        this.reducer_actions[this.requestSearchObjects] = (state) =>
            ({
                ...state,
                search_results: [],
                isFetching: true,
                loaded: false,
                errors: null
            })

        this.reducer_actions[this.successSearchObjects] = (state, search_results) =>
            ({
                ...state,
                search_results,
                isFetching: false,
                loaded: true,
                errors: null
            })

        this.reducer_actions[this.failedSearchObjects] = (state, errors) =>
            ({
                ...state,
                search_results: [],
                isFetching: false,
                loaded: false,
                errors
            })

        this.reducer = createReducer(this.reducer_actions, this.initialState)
    }

    getReducer = () => this.reducer

    error_handler = e => console.log(`Error: ${e}`)

    extract_data = ({ data }) => data

    extract_results = ({ results }) => results

    // onFailedAction = (dispatch, errorHandler) => e => {
    //     console.log(e)
    //     const {
    //         message,
    //         response: {
    //             data: {
    //                 detail
    //             } = {}
    //         } = {}
    //     } = e
    //     return dispatch(errorHandler([detail || message]))
    // }

    // formErrorHandler = (dispatch, failedAction) => e => {
    //     // console.error(e)
    //     const {
    //         message,
    //         response: {
    //             data = {}
    //         } = {}
    //     } = e
    //     const messages = Object.values(data).flat()
    //     // const form_error = {
    //     //     [this.FORM_ERROR]: messages }
    //     return dispatch(failedAction(messages || [message]))
    //     // const { non_field_errors = [], ...field_errors } = data
    //     // const { errors_obj } = data
    //     // console.log('field_errors: ', Object.values(data).flat())
    //     // console.log('messages: ', messages)
    //     // return form_error
    // }

    getObjectsAction = () => (page, term, accessToken) => dispatch => {
        dispatch(this.requestObjects())
        return axios.get(`${this.base_url}/`, {
                params: {
                    page,
                    term: decodeURIComponent(term)
                },
                ...tokenHeaders(accessToken)
            })
            .then(({ data }) => dispatch(this.successReceiveObjects(data)))
            .catch(errorHandler(dispatch, this.failedReceiveObjects))
    }

    getObjectAction = () => (id, accessToken) => dispatch => {
        if (accessToken) {
            if (id == 'new') {
                return dispatch(this.successReceiveObject())
            } else {
                dispatch(this.requestObject())
                return axios.get(`${this.base_url}/${id}`,
                        tokenHeaders(accessToken)
                    )
                    .then(({ data }) => dispatch(this.successReceiveObject(data)))
                    .catch(errorHandler(dispatch, this.failedReceiveObject))
            }
        }
    }

    onSuccessCreateOrUpdateObject = (dispatch, id) => ({ data }) => {
        dispatch(this.successUpdateObject(data, id))
        return dispatch(push(this.redirect_url))
    }

    onSubmitAction = () => values => (dispatch, getState) => {
        const {
            auth: {
                accessToken
            }
        } = getState()
        if (accessToken) {
            if (this.pre_submit_action) { this.pre_submit_action(values) }
            const id = values.id
            console.log('id: ', id)
            dispatch(this.requestUpdateObject())
            return axios({
                    url: `${this.base_url}/${ id ? id + '/' : ''}`,
                    method: id ? 'PUT' : 'POST',
                    ...tokenHeaders(accessToken),
                    data: this.to_form_data ? objectToFormData(values) : values
                })
                .then(this.onSuccessCreateOrUpdateObject(dispatch, id))
                .catch(errorHandler(dispatch, this.failedUpdateObject))
        }
    }

    deleteObjectAction = () => id => (dispatch, getState) => {
        const {
            auth: {
                accessToken
            }
        } = getState()
        if (accessToken) {
            dispatch(this.requestDeleteObject())
            return axios.delete(`${this.base_url}/${id}`, tokenHeaders(accessToken))
                .then(() => dispatch(this.successDeleteObject(id)))
                .catch(errorHandler(dispatch, this.failedDeleteObject))
        }
    }

    searchObjectsAction = () => term => (dispatch, getState) => {
        const {
            auth: {
                accessToken
            }
        } = getState()
        if (accessToken) {
            if (typeof(term) == 'string' && term.length > 0) {
                dispatch(this.requestSearchObjects())
                return axios.get(`${this.base_url}/`, {
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
                    }) => dispatch(this.successSearchObjects(results)))
                    .catch(errorHandler(dispatch, this.failedSearchObjects))
            }
        }
    }



    // deleteObject = (id, accessToken) =>
    //     axios.delete(`${this.base_url}/${id}`, tokenHeaders(accessToken))
    //     .catch(this.error_handler)

    // deleteObjectAction = () => (id, accessToken) => dispatch => {
    //     if (accessToken) {
    //         dispatch(this.requestDeleteObject())
    //         return this.deleteObject(id, accessToken)
    //             .then(() => dispatch(this.receiveDeleteObject(id)))
    //     }
    // }

    // searchObjects = (term, accessToken) =>
    //     axios.get(`${this.base_url}/`, {
    //         params: {
    //             term: decodeURIComponent(term),
    //             page_size: 1000000
    //         },
    //         // ...tokenHeaders(accessToken)
    //     })
    //     .catch(this.error_handler)
    //     .then(this.extract_data)
    //     .then(this.extract_results)

    // searchObjectsAction = () => value => (dispatch, getState) => {
    //     const {
    //         auth: {
    //             accessToken
    //         }
    //     } = getState()
    //     if (accessToken) {
    //         // alert(accessToken)
    //         if (typeof(value) == 'string' && value.length > 0) {
    //             dispatch(this.requestSearchObjects())
    //             this.searchObjects(value, accessToken)
    //                 .then(search_results => dispatch(this.receiveSearchObjects(search_results)))
    //         }
    //     }
    // }
}


// getObject = (id, accessToken) =>
//     axios.get(`${this.base_url}/${id}`,
//         tokenHeaders(accessToken)
//     )
//     .then(this.extract_data)

// getObjectAction = () => (id, accessToken) => dispatch => {
//     if (accessToken) {
//         return (id == 'new') ? dispatch(this.successReceiveObject()) :
//             dispatch(this.requestObject())
//         axios.get(`${this.base_url}/${id}`,
//                 tokenHeaders(accessToken)
//             )
//             .then(({ data }) => dispatch(this.successReceiveObject(data)))
//             .catch(({
//                 message,
//                 response: {
//                     data: {
//                         detail
//                     } = {}
//                 } = {}
//             }) => dispatch(this.failedReceiveObject([detail || message])))
//     }
// }

// createOrUpdateObject = (data, accessToken) => axios({
//         url: `${this.base_url}/${ data.id ? data.id + '/' : ''}`,
//         method: data.id ? 'PUT' : 'POST',
//         ...tokenHeaders(accessToken),
//         data: this.to_form_data ? objectToFormData(data) : data
//     })
//     .catch(this.error_handler)
//     .then(this.extract_data)

// onSubmitAction1 = () => values => (dispatch, getState) => {
//     const {
//         auth: {
//             accessToken
//         }
//     } = getState()
//     if (accessToken) {
//         // console.log('values: ', values)
//         dispatch(this.requestUpdateObject())
//         if (this.pre_submit_action) { this.pre_submit_action(values) }
//         return this.createOrUpdateObject(values, accessToken)
//             .then(object => dispatch(this.receiveUpdateObject(object)))
//             .then(() => dispatch(push(this.redirect_url)))
//     }
// }