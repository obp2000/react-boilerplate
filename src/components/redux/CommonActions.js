import { createAction, createReducer } from 'redux-act'

const init_objects_info = {
    results: [],
    totalCount: 0,
    page: null,
    totalPages: 0,
    term: null
}

export const initialState = initObject => ({
    ...init_objects_info,
    object: initObject
})

export const createActions = () => {

    const actions = {}

    actions.requestObjects = createAction('requestObjects')
    actions.successReceiveObjects = createAction('successReceiveObjects')
    actions.failedReceiveObjects = createAction('failedReceiveObjects')

    actions.requestObject = createAction('requestObject')
    actions.successReceiveObject = createAction('successReceiveObject')
    actions.failedReceiveObject = createAction('failedReceiveObject')

    actions.successUpdateObject = createAction('successUpdateObject')

    actions.successDeleteObject = createAction('successDeleteObject')

    return actions
}

export const reducerActions = (actions, initObject) => {

    const init_objects_info = {
        results: [],
        totalCount: 0,
        page: null,
        totalPages: 0,
        term: null
    }

    const exclude_from_results = (results, id) =>
        results.filter(result => (result.id != id))

    let reducer_actions = {}

    reducer_actions[actions.requestObjects] = state => ({
        ...state,
        ...init_objects_info,
    })

    reducer_actions[actions.successReceiveObjects] = (state, objects_info) =>
        ({
            ...state,
            ...objects_info,
        })

    reducer_actions[actions.failedReceiveObjects] = state =>
        ({
            ...state,
            ...init_objects_info,
        })

    reducer_actions[actions.requestObject] = state =>
        ({
            ...state,
            object: initObject,
        })

    reducer_actions[actions.successReceiveObject] = (state, object) =>
        ({
            ...state,
            object,
        })

    reducer_actions[actions.failedReceiveObject] = state =>
        ({
            ...state,
            object: initObject,
        })

    reducer_actions[actions.successUpdateObject] = (state, object, id) =>
        ({
            ...state,
            object,
            results: [
                ...exclude_from_results(state.results, object.id),
                object
            ],
            totalCount: state.totalCount + (id ? 0 : 1),
        })

    reducer_actions[actions.successDeleteObject] = (state, id) =>
        ({
            ...state,
            results: exclude_from_results(state.results, id),
            totalCount: state.totalCount - 1,
        })

    return reducer_actions
}


// import config from '../Config'
// import { FORM_ERROR } from 'final-form'

// export class CommonActions {

//     constructor({
//         index_url,
//         redirect_url,
//         initObject = {},
//         to_form_data,
//         pre_submit_action,
//     }) {
//         this.index_url = index_url
//         this.base_url = `${config.BACKEND}/api${index_url}`
//         this.redirect_url = redirect_url
//         this.initObject = initObject
//         this.to_form_data = to_form_data
//         this.pre_submit_action = pre_submit_action

//         this.init_objects_info = {
//             results: [],
//             totalCount: 0,
//             page: null,
//             totalPages: 0,
//             term: null
//         }

//         this.initialState = {
//             ...this.init_objects_info,
//             object: this.initObject,
//         }

//         this.reducer_actions = {}
//         this.exclude_from_results = (results, id) =>
//             results.filter(result => (result.id != id))

//         this.requestObjects = createAction('requestObjects')
//         this.successReceiveObjects = createAction('successReceiveObjects')
//         this.failedReceiveObjects = createAction('failedReceiveObjects')

//         this.requestObject = createAction('requestObject')
//         this.successReceiveObject = createAction('successReceiveObject')
//         this.failedReceiveObject = createAction('failedReceiveObject')
//         this.setNewObject = createAction('setNewObject')

//         this.successUpdateObject = createAction('successUpdateObject')

//         this.successDeleteObject = createAction('successDeleteObject')

//         this.reducer_actions[this.requestObjects] = state => ({
//             ...state,
//             ...this.init_objects_info,
//         })

//         this.reducer_actions[this.successReceiveObjects] = (state, objects_info) =>
//             ({
//                 ...state,
//                 ...objects_info,
//             })

//         this.reducer_actions[this.failedReceiveObjects] = state =>
//             ({
//                 ...state,
//                 ...this.init_objects_info,
//             })

//         this.reducer_actions[this.requestObject] = state =>
//             ({
//                 ...state,
//                 object: this.initObject,
//             })

//         this.reducer_actions[this.successReceiveObject] = (state, object) =>
//             ({
//                 ...state,
//                 object,
//             })

//         this.reducer_actions[this.failedReceiveObject] = state =>
//             ({
//                 ...state,
//                 object: this.initObject,
//             })

//         this.reducer_actions[this.setNewObject] = state =>
//             ({
//                 ...state,
//                 object: this.initObject,
//             })

//         this.reducer_actions[this.successUpdateObject] = (state, object, id) =>
//             ({
//                 ...state,
//                 object,
//                 results: [
//                     ...this.exclude_from_results(state.results, object.id),
//                     object
//                 ],
//                 totalCount: state.totalCount + (id ? 0 : 1),
//             })

//         this.reducer_actions[this.successDeleteObject] = (state, id) =>
//             ({
//                 ...state,
//                 results: this.exclude_from_results(state.results, id),
//                 totalCount: state.totalCount - 1,
//             })
//     }

//     getSearchPath = () => this.index_url
//     // getReducer = () => this.reducer
//     getReducerActions = () => this.reducer_actions
//     getInitialState = () => this.initialState
// }