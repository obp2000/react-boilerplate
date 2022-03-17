import { createAction, createReducer } from 'redux-act'

const reducer_actions = {}

export const receiveCommonConsts = createAction('receiveCommonConsts')

const initialState = {}

reducer_actions[receiveCommonConsts] = (state, consts) =>
    ({
        ...state,
        ...consts
    })

const common_consts = createReducer(reducer_actions, initialState)

export default common_consts
