import { createSlice, createSelector } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { apiSlice } from '../../services/apiSlice';

export const initUser = {
  id: null,
  username: null,
  email: null,
  first_name: null,
  last_name: null,
};

const initialState = {
  isAuthenticated: false,
  accessToken: null,
  user: initUser,
  isLogin: true,
  modal: false,
  lastOptionsArg: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    toggleLogin: (state, { payload }) => {
      state.isLogin = !state.isLogin;
    },
    toggleModal: (state, { payload }) => {
      state.modal = !state.modal;
    },
    closeModal: (state, { payload }) => {
      state.modal = false;
    },
    setAuthenticated: (state, { payload }) => {
      state.isAuthenticated = true;
      state.accessToken = payload.key;
      state.modal = false;
      toast.dismiss();
      toast.success(payload.message);
    },
  },
  extraReducers: (builder) => {
    builder
    // .addMatcher(
    //     apiSlice.endpoints.login.matchPending, (state, { payload }) => {
    //         toast.dismiss()
    //         toast.info('ssssssssss')
    //     }
    // )
    // .addMatcher(
    //     apiSlice.endpoints.login.matchFulfilled, (state, { payload }) => {
    //         state.isAuthenticated = true
    //         state.accessToken = payload.key
    //         state.modal = false
    //         // apiSlice.endpoints.getUser.initiate()
    //         toast.dismiss()
    //         toast.success(payload.message)
    //     }
    // )
      .addMatcher(apiSlice.endpoints.login.matchRejected, (state, { payload }) => {
        toast.dismiss();
        toast.error(payload.data.non_field_errors[0], { autoClose: false });
      })
      .addMatcher(apiSlice.endpoints.signOut.matchFulfilled, (state, { payload }) => {
        toast.dismiss();
        toast.success(payload.detail);
        return initialState;
      })
    // .addMatcher(
    //     apiSlice.endpoints.register.matchFulfilled, (state, { payload }) => {
    //         // state.isAuthenticated = true
    //         // state.accessToken = payload.key
    //         state.modal = false
    //         toast.dismiss()
    //         toast.success(payload.message)
    //         // return initialState
    //     }
    // )
      .addMatcher(apiSlice.endpoints.register.matchRejected, (state, { payload }) => {
        const message = Object.values(payload.data).join('\n\n');
        toast.dismiss();
        toast.error(message, { autoClose: false });
      })
      .addMatcher(apiSlice.endpoints.getUser.matchFulfilled, (state, { payload }) => {
        state.user = payload;
      })
      .addMatcher(apiSlice.endpoints.getOptions.matchFulfilled, (state, { payload }) => {
        state.lastOptionsArg = payload.arg;
      });
  },
});

export const {
  toggleLogin,
  toggleModal,
  closeModal,
  setAuthenticated,
} = authSlice.actions;

export default authSlice.reducer;

export const selectAuth = ({ auth }) => auth;

export const userFieldNames = ['username', 'email', 'first_name', 'last_name'];
