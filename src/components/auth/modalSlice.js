import {createSlice} from '@reduxjs/toolkit'
import {HYDRATE} from 'next-redux-wrapper'
import {signOut} from '../auth/authApi'

const initialState = {
  isLogin: true,
  modal: false,
}

const modalSlice = createSlice({
  name: 'authModal',
  initialState,
  reducers: {
    toggleLogin: (state, {payload}) => {
      state.isLogin = !state.isLogin
    },
    toggleModal: (state, {payload}) => {
      state.modal = !state.modal
    },
    closeModal: (state, {payload}) => {
      state.modal = false
    },
  },
  extraReducers: (builder) => {
    builder
    // .addCase(HYDRATE, (state, {payload}) => {
    //   console.log('payload............', payload)
    //   // state.isLogin = payload.authModal.isLogin
    //   // state.modal = payload.authModal.modal
    // })
        .addMatcher(signOut.matchFulfilled, (state, {payload}) => {
          state.modal = false
        })
  },
})

export const {
  toggleLogin,
  toggleModal,
  closeModal,
} = modalSlice.actions

export default modalSlice.reducer
