import { createAction, createReducer } from 'redux-act'
import config from '../Config'
// import { FORM_ERROR } from 'final-form'

export class CommonActions {

    constructor({
        index_url,
        redirect_url,
        initObject = {},
        // initialState,
        to_form_data,
        pre_submit_action,
        choices_names
    }) {
        this.base_url = `${config.BACKEND}/api${index_url}`
        this.redirect_url = redirect_url
        this.initObject = initObject
        // this.FORM_ERROR = FORM_ERROR
        // this.initialState = initialState
        this.to_form_data = to_form_data
        this.pre_submit_action = pre_submit_action
        this.choices_names = choices_names

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
        this.setNewObject = createAction('setNewObject')

        this.requestUpdateObject = createAction('requestUpdateObject')
        this.successUpdateObject = createAction('successUpdateObject')
        this.failedUpdateObject = createAction('failedUpdateObject')

        this.requestDeleteObject = createAction('requestDeleteObject')
        this.successDeleteObject = createAction('successDeleteObject')
        this.failedDeleteObject = createAction('failedDeleteObject')

        this.requestSearchObjects = createAction('requestSearchObjects')
        this.successSearchObjects = createAction('successSearchObjects')
        this.failedSearchObjects = createAction('failedSearchObjects')
        this.clearSearchObjects = createAction('clearSearchObjects')

        this.reducer_actions[this.requestObjects] = (state) => ({
            ...state,
            ...this.init_objects_info,
            isFetching: true,
            loaded: false,
        })

        this.reducer_actions[this.successReceiveObjects] = (state, objects_info) =>
            ({
                ...state,
                ...objects_info,
                isFetching: false,
                loaded: true,
            })

        this.reducer_actions[this.failedReceiveObjects] = state =>
            ({
                ...state,
                ...this.init_objects_info,
                isFetching: false,
                loaded: false,
            })

        this.reducer_actions[this.requestObject] = state =>
            ({
                ...state,
                object: this.initObject,
                isFetching: true,
                loaded: false,
            })

        this.reducer_actions[this.successReceiveObject] = (state, object) =>
            ({
                ...state,
                object,
                isFetching: false,
                loaded: true,
            })

        this.reducer_actions[this.failedReceiveObject] = state =>
            ({
                ...state,
                object: this.initObject,
                isFetching: false,
                loaded: false,
            })

        this.reducer_actions[this.setNewObject] = state =>
            ({
                ...state,
                object: this.initObject,
            })

        this.reducer_actions[this.requestUpdateObject] = state =>
            ({
                ...state,
                isFetching: true,
                loaded: false,
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
            })

        this.reducer_actions[this.failedUpdateObject] = state =>
            ({
                ...state,
                isFetching: false,
                loaded: false,
            })

        this.reducer_actions[this.requestDeleteObject] = state =>
            ({
                ...state,
                isFetching: true,
                loaded: false,
            })

        this.reducer_actions[this.successDeleteObject] = (state, id) =>
            ({
                ...state,
                results: this.exclude_from_results(state.results, id),
                totalCount: state.totalCount - 1,
                isFetching: false,
                loaded: true,
            })

        this.reducer_actions[this.failedDeleteObject] = state =>
            ({
                ...state,
                isFetching: false,
                loaded: false,
            })

        this.reducer_actions[this.requestSearchObjects] = state =>
            ({
                ...state,
                search_results: [],
                isFetching: true,
                loaded: false,
            })

        this.reducer_actions[this.successSearchObjects] = (state, search_results) =>
            ({
                ...state,
                search_results,
                isFetching: false,
                loaded: true,
            })

        this.reducer_actions[this.failedSearchObjects] = state =>
            ({
                ...state,
                search_results: [],
                isFetching: false,
                loaded: false,
            })

        this.reducer_actions[this.clearSearchObjects] = state =>
            ({
                ...state,
                search_results: []
            })

        this.reducer = createReducer(this.reducer_actions, this.initialState)
    }

    getReducer = () => this.reducer
}