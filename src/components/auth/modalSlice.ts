import {createSlice} from '@reduxjs/toolkit'
import {signOut} from '../auth/authApi'

interface ModalState {
  isLogin: boolean
  modal: boolean
}

const initialState: ModalState = {
  isLogin: true,
  modal: false,
}

const modalSlice = createSlice({
  name: 'authModal',
  initialState,
  reducers: {
    toggleLogin: (state) => {
      state.isLogin = !state.isLogin
    },
    toggleModal: (state) => {
      state.modal = !state.modal
    },
    closeModal: (state) => {
      state.modal = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(signOut.matchFulfilled, (state) => {
        state.modal = false
      }
    )
  },
})

export const {
  toggleLogin,
  toggleModal,
  closeModal,
} = modalSlice.actions

export default modalSlice.reducer
