import { createAction, createReducer } from 'redux-act'

export const startRequest = createAction('startRequest')
export const successRequest = createAction('successRequest')
export const failedRequest = createAction('failedRequest')

export const requestSearchObjects = createAction('requestSearchObjects')
export const successSearchObjects = createAction('successSearchObjects')
export const failedSearchObjects = createAction('failedSearchObjects')
export const clearSearchObjects = createAction('clearSearchObjects')

const reducer_actions = {}

const initialState = {
    data: [],
    isFetching: false,
    loaded: false,
    isFieldFetching: false
}

reducer_actions[startRequest] = state =>
    ({
        ...state,
        isFetching: true,
        loaded: false,
    })

reducer_actions[successRequest] = state =>
    ({
        ...state,
        isFetching: false,
        loaded: true,
    })

reducer_actions[failedRequest] = state =>
    ({
        ...state,
        isFetching: false,
        loaded: false,
    })

reducer_actions[requestSearchObjects] = state =>
    ({
        ...state,
        data: [],
        isFieldFetching: true
    })

reducer_actions[successSearchObjects] = (state, data) =>
    ({
        ...state,
        data,
        isFieldFetching: false
    })

reducer_actions[failedSearchObjects] = state =>
    ({
        ...state,
        data: [],
        isFieldFetching: false
    })

reducer_actions[clearSearchObjects] = state =>
    ({
        ...state,
        data: []
    })

const TempState = createReducer(reducer_actions, initialState)

export default TempState