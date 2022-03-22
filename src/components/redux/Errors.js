import { createAction, createReducer } from 'redux-act'

const reducer_actions = {}

export const receiveErrors = createAction('receiveErrors')
export const clearErrors = createAction('clearErrors')
export const renderFlash = createAction('renderFlash')

const initialState = {
    errors: null,
    // flash: null
}

reducer_actions[receiveErrors] = (state, errors) =>
    ({
        ...state,
        errors
    })

reducer_actions[clearErrors] = state =>
    ({
        ...state,
        ...initialState
    })

// reducer_actions[renderFlash] = (state, flash) =>
//     ({
//         ...state,
//         flash
//     })

const errors = createReducer(reducer_actions, initialState)

export default errors