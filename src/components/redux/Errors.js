import { createAction, createReducer } from 'redux-act'

const reducer_actions = {}

export const receiveErrors = createAction('receiveErrors')
export const clearErrors = createAction('clearErrors')

const initialState = {
    errors: null,
}

reducer_actions[receiveErrors] = (state, errors) =>
    ({
        ...state,
        errors
    })

reducer_actions[clearErrors] = state =>
    ({
        ...state,
        errors: null
    })

const errors = createReducer(reducer_actions, initialState)

export default errors