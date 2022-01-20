import { createAction, createReducer } from 'redux-act'

const reducer_actions = {}

export const toggleModal = createAction()
export const closeModal = createAction()
export const toggleLogin = createAction()

const initialState = {
    modal: false,
    login: true
}

reducer_actions[toggleModal] = (state) =>
    ({
        ...state,
        modal: !state.modal
    })

reducer_actions[closeModal] = (state) =>
    ({
        ...state,
        modal: false
    })

reducer_actions[toggleLogin] = (state) =>
    ({
        ...state,
        login: !state.login
    })

const navBar = createReducer(reducer_actions, initialState)

export default navBar