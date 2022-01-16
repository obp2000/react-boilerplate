import { createAction, createReducer } from 'redux-act'

export const toggleModal = createAction()
export const closeModal = createAction()
export const toggleLogin = createAction()

const initialState = {
  modal: false,
  login: true
}

const reduceToggleModal = (state) => ({
  ...state,
  modal: !state.modal
})

const reduceCloseModal = (state) => ({
  ...state,
  modal: false
})

const reduceToggleLogin = (state) => ({
  ...state,
  login: !state.login
})


const navBar = createReducer({
    [toggleModal]: reduceToggleModal,
    [closeModal]: reduceCloseModal,
    [toggleLogin]: reduceToggleLogin,
  },
  initialState
)

export default navBar