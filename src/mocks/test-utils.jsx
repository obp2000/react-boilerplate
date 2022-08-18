import PropTypes from 'prop-types'
import React from 'react'
import {render as rtlRender} from '@testing-library/react'
import {configureStore} from '@reduxjs/toolkit'
import {Provider} from 'react-redux'
import {MemoryRouter as Router} from 'react-router-dom'
import {apiSlice} from '../services/apiSlice'
import auth from '../components/auth/authSlice'
import authModal from '../components/auth/modalSlice'
import {rtkQueryErrorLogger} from '../components/ErrorMiddleware'
import ToastContainer from '../components/Shared/ToastContainer'

export const authPreloadedState = {
  auth: {
    isAuthenticated: true,
  },
}

function render(
    ui, {
      preloadedState,
      store = configureStore({
        reducer: {
          auth,
          authModal,
          [apiSlice.reducerPath]: apiSlice.reducer,
        },
        middleware: (getDefaultMiddleware) =>
          getDefaultMiddleware().concat([
            apiSlice.middleware,
            rtkQueryErrorLogger,
          ]),
        preloadedState,
      }),
      ...renderOptions
    } = {},
) {
  const Wrapper = ({children}) =>
    <Provider {...{store}}>
      <Router>
        {/* <ToastContainer />*/}
        {children}
      </Router>
    </Provider>
  Wrapper.propTypes = {
    children: PropTypes.object,
  }
  return rtlRender(ui, {wrapper: Wrapper, ...renderOptions})
}

// re-export everything
export * from '@testing-library/react'
// override render method
export {render}
