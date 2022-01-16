import { createAction, createReducer } from 'redux-act'
import axios from 'axios'
import { push } from 'connected-react-router'
import { objectToFormData } from 'object-to-formdata'
import config from '../Config'
import { tokenHeaders } from './auth'

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
        // this.initialState = initialState
        this.to_form_data = to_form_data
        this.pre_submit_action = pre_submit_action

        this.init_objects_info = {
            totalCount: 0,
            page: null,
            totalPages: 0,
            term: null,
            results: []
        }

        this.reducer_actions = {}
        this.exclude_from_results = (results, id) =>
            results.filter(result => (result.id != id))

        this.requestObjects = createAction()
        this.receiveObjects = createAction()
        this.requestObject = createAction()
        this.receiveObject = createAction()
        this.requestUpdateObject = createAction()
        this.receiveUpdateObject = createAction()
        this.requestDeleteObject = createAction()
        this.receiveDeleteObject = createAction()
        this.requestSearchObjects = createAction()
        this.receiveSearchObjects = createAction()

        this.reducer_actions[this.requestObjects] = (state) => ({
            ...state,
            ...this.init_objects_info,
            isFetching: true,
            didInvalidate: false
        })

        this.reducer_actions[this.receiveObjects] = (state, objects_info) => ({
            ...state,
            ...objects_info,
            isFetching: false,
            loaded: true
        })

        this.reducer_actions[this.requestObject] = (state) => ({
            ...state,
            object: this.initObject,
            isFetching: true
        })

        this.reducer_actions[this.receiveObject] = (state, object = initObject) => ({
            ...state,
            object,
            isFetching: false
        })

        this.reducer_actions[this.requestUpdateObject] = (state) => ({
            ...state,
            isFetching: true
        })

        this.reducer_actions[this.receiveUpdateObject] = (state, object) => ({
            ...state,
            object,
            results: [
                ...this.exclude_from_results(state.results, object.id),
                object
            ],
            totalCount: state.totalCount + (state.object.id ? 0 : 1),
            isFetching: false
        })

        this.reducer_actions[this.requestDeleteObject] = (state) => ({
            ...state,
            isFetching: true
        })

        this.reducer_actions[this.receiveDeleteObject] = (state, object_id) => ({
            ...state,
            results: this.exclude_from_results(state.results, object_id),
            totalCount: state.totalCount - 1,
            isFetching: false
        })

        this.reducer_actions[this.requestSearchObjects] = (state, search_results) => ({
            ...state,
            search_results,
            isFetching: false,
            loaded: true
        })

        this.reducer_actions[this.receiveSearchObjects] = (state, search_results) => ({
            ...state,
            search_results,
            isFetching: false,
            loaded: true
        })

        this.initialState = {
            ...this.init_objects_info,
            isFetching: false,
            didInvalidate: false,
            loaded: false,
            object: this.initObject,
            search_results: []
        }

        this.reducer = createReducer(this.reducer_actions, this.initialState)
    }

    getReducer = () => this.reducer

    error_handler = e => console.log(`Error: ${e}`)

    extract_data = ({ data }) => data

    extract_results = ({ results }) => results

    getObjects = (page, term, accessToken) =>
        axios.get(`${this.base_url}/`, {
            params: {
                page,
                term: decodeURIComponent(term)
            },
            ...tokenHeaders(accessToken)
        })
        .catch(this.error_handler)
        .then(this.extract_data)

    getObjectsAction1 = () => (page, term, accessToken) => dispatch => {
        dispatch(this.requestObjects())
        return this.getObjects(page, term, accessToken)
            .then(objects_info => dispatch(this.receiveObjects({
                ...objects_info,
                page,
                term
            })))
    }

    getObjectsAction = () => (page, term, accessToken) => dispatch => {
        dispatch(this.requestObjects())
        return axios.get(`${this.base_url}/`, {
                params: {
                    page,
                    term: decodeURIComponent(term)
                },
                ...tokenHeaders(accessToken)
            })
            .then(({ data }) => {
                dispatch(this.receiveObjects({
                    ...data,
                    page,
                    term
                }))
            })
            .catch((e) => {
                console.log(e)
            })
        // .then(({ detail }) => alert(detail))


        // return this.getObjects(page, term, accessToken)
        //     .then(objects_info => dispatch(this.receiveObjects({
        //         ...objects_info,
        //         page,
        //         term
        //     })))
    }



    getObject = (id, accessToken) =>
        axios.get(`${this.base_url}/${id}`,
            tokenHeaders(accessToken)
        )
        .catch(this.error_handler)
        .then(this.extract_data)

    getObjectAction() {
        return (id, accessToken) => dispatch => {
            if (accessToken) {
                dispatch(this.requestObject())
                return ((id == 'new') ? dispatch(this.receiveObject()) :
                    this.getObject(id, accessToken)
                    .then(object => dispatch(this.receiveObject(object)))
                )
            }
        }
    }

    createOrUpdateObject = (data, accessToken) => axios({
            url: `${this.base_url}/${ data.id ? data.id + '/' : ''}`,
            method: data.id ? 'PUT' : 'POST',
            ...tokenHeaders(accessToken),
            data: this.to_form_data ? objectToFormData(data) : data
        })
        .catch(this.error_handler)
        .then(this.extract_data)

    onSubmitAction = () => values => (dispatch, getState) => {
        const {
            auth: {
                accessToken
            }
        } = getState()
        if (accessToken) {
            // console.log('values: ', values)
            dispatch(this.requestUpdateObject())
            if (this.pre_submit_action) { this.pre_submit_action(values) }
            return this.createOrUpdateObject(values, accessToken)
                .then(object => dispatch(this.receiveUpdateObject(object)))
                .then(() => dispatch(push(this.redirect_url)))
        }
    }

    deleteObject = (id, accessToken) =>
        axios.delete(`${this.base_url}/${id}`, tokenHeaders(accessToken))
        .catch(this.error_handler)

    deleteObjectAction = () => (id, accessToken) => dispatch => {
        if (accessToken) {
            dispatch(this.requestDeleteObject())
            return this.deleteObject(id, accessToken)
                .then(() => dispatch(this.receiveDeleteObject(id)))
        }
    }

    searchObjects = (term, accessToken) =>
        axios.get(`${this.base_url}/`, {
            params: {
                term: decodeURIComponent(term),
                page_size: 1000000
            },
            // ...tokenHeaders(accessToken)
        })
        .catch(this.error_handler)
        .then(this.extract_data)
        .then(this.extract_results)

    searchObjectsAction = () => value => (dispatch, getState) => {
        const {
            auth: {
                accessToken
            }
        } = getState()
        if (accessToken) {
            // alert(accessToken)
            if (typeof(value) == 'string' && value.length > 0) {
                dispatch(this.requestSearchObjects())
                this.searchObjects(value, accessToken)
                    .then(search_results => dispatch(this.receiveSearchObjects(search_results)))
            }
        }
    }
}